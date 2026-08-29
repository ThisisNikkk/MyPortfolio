import type { NextRequest } from "next/server";
import { markdownForPath } from "@/lib/markdown";
import { pages } from "@/lib/site-meta";

/**
 * Markdown variant of any page, reached by rewrite from `src/proxy.ts` when a
 * request negotiates `Accept: text/markdown` or passes `?format=md`.
 *
 * The rewrite keeps the browser URL unchanged, so `/about` with a markdown
 * Accept header answers as `/about` — which is what acceptmarkdown.com
 * requires. `Vary` is set here as well as in the proxy so a direct hit on this
 * route is still cache-correct.
 */
export async function GET(
  _request: NextRequest,
  ctx: RouteContext<"/api/markdown/[[...slug]]">,
) {
  const { slug } = await ctx.params;
  const pathname = `/${(slug ?? []).join("/")}`;

  const markdown = markdownForPath(pathname);

  if (markdown === null) {
    const known = pages.map((p) => `- ${p.path} — ${p.summary}`).join("\n");
    return new Response(
      `# 404 — Not found\n\nNo markdown representation exists for \`${pathname}\`.\n\n## Try instead\n\n${known}\n- /api/projects — JSON list of every project\n\nSite index for agents: /llms.txt\nAPI description: /openapi.json\nAll indexable URLs: /sitemap.xml\n`,
      {
        status: 404,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          Vary: "Accept, Accept-Encoding",
        },
      },
    );
  }

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      Vary: "Accept, Accept-Encoding",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
