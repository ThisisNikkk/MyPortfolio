#!/usr/bin/env node
/**
 * Verifies the agent-facing surface of the site against a running server.
 *
 * This repo has no test runner, and the behaviours that matter here are HTTP
 * behaviours — status codes, content types, `Vary`, content negotiation, and
 * JSON error shapes. Those cannot be asserted from a unit test that never
 * makes a request, so this hits a real server instead.
 *
 *   yarn build && yarn start
 *   yarn verify:agents                       # defaults to localhost:3000
 *   yarn verify:agents https://example.com   # or any deployed origin
 */

const BASE = (process.argv[2] ?? process.env.VERIFY_BASE_URL ?? "http://localhost:3000")
  .replace(/\/+$/, "");

let passed = 0;
const failures = [];

function check(name, condition, detail = "") {
  if (condition) {
    passed += 1;
    console.log(`  \x1b[32mPASS\x1b[0m  ${name}`);
  } else {
    failures.push(`${name}${detail ? ` — ${detail}` : ""}`);
    console.log(`  \x1b[31mFAIL\x1b[0m  ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

function group(title) {
  console.log(`\n\x1b[1m${title}\x1b[0m`);
}

async function get(path, init) {
  return fetch(`${BASE}${path}`, { redirect: "manual", ...init });
}

/** Rough visible-text length of an HTML document. */
function textLength(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim().length;
}

function headingLevels(html) {
  return [...html.matchAll(/<h([1-6])[\s>]/gi)].map((m) => Number(m[1]));
}

/**
 * True only for a standalone `Accept` token.
 *
 * A substring test would pass on `Accept-Encoding`, which Next sets on every
 * response — that false positive hid a real failure once already.
 */
function variesOnAccept(res) {
  const vary = res.headers.get("vary") ?? "";
  return vary
    .split(",")
    .map((v) => v.trim().toLowerCase())
    .includes("accept");
}

async function rpc(method, params) {
  const res = await get("/api/mcp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  return { res, body: await res.json().catch(() => null) };
}

async function main() {
  console.log(`\nVerifying agent readiness at ${BASE}\n${"=".repeat(50)}`);

  /* ---------------------------------------------------------- 404s ---- */
  group("Agent-friendly 404s");
  {
    const res = await get("/some-path-that-does-not-exist");
    const html = await res.text();
    check("unknown path returns 404", res.status === 404, `got ${res.status}`);
    // The HTML 404 is for people, so it lists pages, not endpoints. The
    // machine recovery list lives in the markdown variant, asserted below.
    check(
      "HTML 404 offers human recovery links",
      html.includes('href="/about"') && html.includes('href="/contact"'),
      "missing links to the real pages",
    );
    check(
      "HTML 404 does not expose the agent endpoint list",
      !html.includes("/openapi.json") && !html.includes("/.well-known/mcp"),
      "agent endpoints leaked onto the human 404",
    );

    const md = await get("/some-path-that-does-not-exist", {
      headers: { Accept: "text/markdown" },
    });
    const mdBody = await md.text();
    check("404 has a markdown variant", md.status === 404, `got ${md.status}`);
    check(
      "markdown 404 is text/markdown",
      (md.headers.get("content-type") ?? "").includes("text/markdown"),
      md.headers.get("content-type") ?? "none",
    );
    check("markdown 404 body is markdown", mdBody.trimStart().startsWith("#"));
    check(
      "markdown 404 points agents at the recovery routes",
      mdBody.includes("/llms.txt") &&
        mdBody.includes("/sitemap.xml") &&
        mdBody.includes("/openapi.json"),
      "missing llms.txt, sitemap.xml, or openapi.json",
    );
  }

  /* ------------------------------------------------ SSR + JSON-LD ---- */
  group("Content without JavaScript");
  {
    const res = await get("/");
    const html = await res.text();
    const levels = headingLevels(html);
    const len = textLength(html);

    check("homepage returns 200", res.status === 200, `got ${res.status}`);
    check("homepage has an H1", levels.includes(1));
    check("homepage has H2 section headings", levels.includes(2));
    check(
      "homepage heading structure is nested, not flat",
      levels.includes(1) && levels.includes(2) && levels.includes(3),
      `levels found: ${[...new Set(levels)].sort().join(", ") || "none"}`,
    );
    check(`homepage has 500+ chars of text (${len})`, len >= 500);

    const ld = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(html);
    check("homepage embeds JSON-LD", Boolean(ld));
    if (ld) {
      let graph = null;
      try {
        graph = JSON.parse(ld[1]);
      } catch {
        /* handled by the check below */
      }
      check("JSON-LD parses", Boolean(graph));
      const nodes = graph?.["@graph"] ?? [];
      const org = nodes.find((n) => n["@type"] === "Organization");
      const person = nodes.find((n) => n["@type"] === "Person");
      check("JSON-LD has a Person node", Boolean(person));
      check("JSON-LD has an Organization node", Boolean(org));
      check("Organization has contactPoint", Boolean(org?.contactPoint?.length));
      check(
        "Organization has a PostalAddress",
        org?.address?.["@type"] === "PostalAddress",
      );
      check(
        "contactPoint carries an email and a contactType",
        Boolean(org?.contactPoint?.[0]?.email && org?.contactPoint?.[0]?.contactType),
      );
    }
  }

  /* ------------------------------------------------------- OpenAPI ---- */
  group("OpenAPI spec");
  {
    const res = await get("/openapi.json");
    check("/openapi.json returns 200", res.status === 200, `got ${res.status}`);
    check(
      "/openapi.json is application/json",
      (res.headers.get("content-type") ?? "").includes("application/json"),
      res.headers.get("content-type") ?? "none",
    );

    const spec = await res.json().catch(() => null);
    check("spec parses as JSON", Boolean(spec));
    check("spec declares OpenAPI 3.x", /^3\./.test(spec?.openapi ?? ""), spec?.openapi);

    const ops = Object.values(spec?.paths ?? {}).flatMap((item) =>
      Object.entries(item).map(([method, op]) => ({ method, ...op })),
    );
    check("spec documents at least one operation", ops.length > 0);

    const ids = ops.map((o) => o.operationId).filter(Boolean);
    check("every operation has an operationId", ids.length === ops.length);
    check("operationIds are unique", new Set(ids).size === ids.length);
    check(
      "every operation has a description",
      ops.every((o) => typeof o.description === "string" && o.description.length > 20),
    );
    check(
      "every operation documents response schemas",
      ops.every((o) =>
        Object.values(o.responses ?? {}).every(
          (r) => !r.content || Boolean(r.content["application/json"]?.schema),
        ),
      ),
    );
    check(
      "every parameter is typed",
      ops.every((o) => (o.parameters ?? []).every((p) => Boolean(p.schema?.type))),
    );
  }

  /* ----------------------------------------------------- JSON API ---- */
  group("Public API and JSON errors");
  {
    const res = await get("/api/projects");
    const body = await res.json().catch(() => null);
    check("/api/projects returns 200", res.status === 200, `got ${res.status}`);
    check("/api/projects returns a data array", Array.isArray(body?.data));
    check("/api/projects reports meta.count", typeof body?.meta?.count === "number");
    check(
      "/api/projects sets CORS",
      res.headers.get("access-control-allow-origin") === "*",
    );

    const id = body?.data?.[0]?.id;
    if (id !== undefined) {
      const one = await get(`/api/projects/${id}`);
      const oneBody = await one.json().catch(() => null);
      check(`/api/projects/${id} returns 200`, one.status === 200, `got ${one.status}`);
      check("single project includes a caseStudy key", "caseStudy" in (oneBody?.data ?? {}));
    }

    const missing = await get("/api/projects/999999");
    const missingBody = await missing.json().catch(() => null);
    check("unknown project id returns 404", missing.status === 404, `got ${missing.status}`);
    check(
      "404 body is JSON, not HTML",
      (missing.headers.get("content-type") ?? "").includes("application/json"),
      missing.headers.get("content-type") ?? "none",
    );
    check("error has code/message/hint", Boolean(
      missingBody?.error?.code && missingBody?.error?.message && missingBody?.error?.hint,
    ));
    check(
      "error code is project_not_found",
      missingBody?.error?.code === "project_not_found",
      missingBody?.error?.code,
    );

    const bad = await get("/api/projects/not-a-number");
    const badBody = await bad.json().catch(() => null);
    check("non-numeric id returns 400", bad.status === 400, `got ${bad.status}`);
    check(
      "error code is invalid_project_id",
      badBody?.error?.code === "invalid_project_id",
      badBody?.error?.code,
    );

    const badCat = await get("/api/projects?category=nonsense");
    const badCatBody = await badCat.json().catch(() => null);
    check("unknown category returns 400", badCat.status === 400, `got ${badCat.status}`);
    check(
      "error code is invalid_category",
      badCatBody?.error?.code === "invalid_category",
      badCatBody?.error?.code,
    );
  }

  /* --------------------------------------------- markdown / Vary ---- */
  group("Markdown content negotiation (acceptmarkdown.com)");
  {
    for (const path of ["/", "/about", "/contact", "/projects/1"]) {
      const res = await get(path, { headers: { Accept: "text/markdown" } });
      const ct = res.headers.get("content-type") ?? "";
      const body = await res.text();

      check(`${path} honours Accept: text/markdown`, ct.includes("text/markdown"), ct || "none");
      check(
        `${path} markdown response sets Vary: Accept`,
        variesOnAccept(res),
        res.headers.get("vary") ?? "none",
      );
      check(`${path} markdown body starts with a heading`, body.trimStart().startsWith("#"));
      check(`${path} markdown URL is unchanged`, res.url.endsWith(path) || path === "/");
    }

    const q = await get("/about?format=md");
    check(
      "?format=md works without headers",
      (q.headers.get("content-type") ?? "").includes("text/markdown"),
      q.headers.get("content-type") ?? "none",
    );
    check("?format=md also sets Vary: Accept", variesOnAccept(q), q.headers.get("vary") ?? "none");

    const html = await get("/about", {
      headers: { Accept: "text/html,application/xhtml+xml,*/*;q=0.8" },
    });
    check(
      "a browser Accept still gets HTML",
      (html.headers.get("content-type") ?? "").includes("text/html"),
      html.headers.get("content-type") ?? "none",
    );

    // The HTML variant's Vary is not asserted: Next computes and owns that
    // header on App Router page responses (rsc, next-router-*), overwriting
    // anything set from next.config headers. Next's own markdown-negotiation
    // guide sets Vary on the markdown Route Handler only, for the same reason.
  }

  /* ------------------------------------------------------ llms.txt ---- */
  group("Agent instructions");
  {
    const res = await get("/llms.txt");
    const body = await res.text();
    check("/llms.txt returns 200", res.status === 200, `got ${res.status}`);
    check("/llms.txt has when-to-use guidance", /## When to use/i.test(body));
    check("/llms.txt has when-NOT-to-use guidance", /## When not to use/i.test(body));
    check("/llms.txt explains how to call the API", /## How to call it/i.test(body));
    check("/llms.txt lists the OpenAPI spec", body.includes("/openapi.json"));
    check("/llms.txt lists projects", /## Projects/i.test(body));
  }

  /* ----------------------------------------------------------- MCP ---- */
  group("MCP server");
  {
    const manifest = await get("/.well-known/mcp");
    const mBody = await manifest.json().catch(() => null);
    check("/.well-known/mcp returns 200", manifest.status === 200, `got ${manifest.status}`);
    check("manifest names a server URL", Boolean(mBody?.servers?.[0]?.url));
    check(
      "manifest declares streamable-http",
      mBody?.servers?.[0]?.transport === "streamable-http",
      mBody?.servers?.[0]?.transport,
    );

    const init = await rpc("initialize", {
      protocolVersion: "2025-06-18",
      capabilities: {},
      clientInfo: { name: "verify-agents", version: "1.0.0" },
    });
    check("initialize returns 200", init.res.status === 200, `got ${init.res.status}`);
    check("initialize returns a protocolVersion", Boolean(init.body?.result?.protocolVersion));
    check("initialize returns serverInfo", Boolean(init.body?.result?.serverInfo?.name));

    const list = await rpc("tools/list", {});
    const tools = list.body?.result?.tools ?? [];
    check("tools/list returns tools", tools.length > 0, `got ${tools.length}`);
    check(
      "every tool has a description and an inputSchema",
      tools.every((t) => t.description && t.inputSchema?.type === "object"),
    );

    const call = await rpc("tools/call", { name: "list_projects", arguments: {} });
    check("tools/call list_projects succeeds", call.body?.result?.isError === false);
    check(
      "tools/call returns structured content",
      Array.isArray(call.body?.result?.structuredContent?.projects),
    );

    const badCall = await rpc("tools/call", { name: "get_project", arguments: { id: 999999 } });
    check("unknown project via MCP reports isError", badCall.body?.result?.isError === true);

    const badMethod = await rpc("does/not/exist", {});
    check(
      "unknown method returns JSON-RPC -32601",
      badMethod.body?.error?.code === -32601,
      String(badMethod.body?.error?.code),
    );
  }

  /* -------------------------------------------------- trust pages ---- */
  group("Trust anchor pages");
  {
    for (const path of ["/about", "/contact"]) {
      const res = await get(path);
      const len = textLength(await res.text());
      check(`${path} returns 200`, res.status === 200, `got ${res.status}`);
      check(`${path} has 500+ chars of text (${len})`, len >= 500);
    }
  }

  /* ----------------------------------------------------- discovery ---- */
  group("Discovery");
  {
    const robots = await get("/robots.txt");
    const robotsBody = await robots.text();
    check("/robots.txt returns 200", robots.status === 200, `got ${robots.status}`);
    check("robots.txt points at the sitemap", robotsBody.includes("sitemap.xml"));
    check(
      "robots.txt does not reference an unregistered domain",
      !robotsBody.includes("nikhilsiwan.dev"),
      "still points at nikhilsiwan.dev",
    );

    const sitemap = await get("/sitemap.xml");
    const sitemapBody = await sitemap.text();
    check("/sitemap.xml returns 200", sitemap.status === 200, `got ${sitemap.status}`);
    check("sitemap lists case study pages", sitemapBody.includes("/projects/"));
    check(
      "sitemap contains no fragment-only URLs",
      !sitemapBody.includes("/#"),
      "fragment URLs are not separate documents",
    );

    // The site deliberately has no human-facing developer or privacy page, so
    // nothing asserts a link to one from the homepage. The agent surface is
    // discovered through /llms.txt and /robots.txt instead.
    const home = await get("/");
    const homeHtml = await home.text();
    check("homepage is not an empty shell", textLength(homeHtml) >= 500);
  }

  /* ------------------------------------------------------- summary ---- */
  console.log(`\n${"=".repeat(50)}`);
  if (failures.length === 0) {
    console.log(`\x1b[32mAll ${passed} checks passed.\x1b[0m\n`);
    process.exit(0);
  }
  console.log(`\x1b[31m${failures.length} failed\x1b[0m, ${passed} passed:\n`);
  for (const f of failures) console.log(`  - ${f}`);
  console.log("");
  process.exit(1);
}

main().catch((err) => {
  console.error(`\nCould not reach ${BASE}: ${err.message}`);
  console.error("Start the server first:  yarn build && yarn start\n");
  process.exit(1);
});
