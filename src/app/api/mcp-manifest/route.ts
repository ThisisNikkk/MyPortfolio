import { allCategories } from "@/lib/api";
import { absoluteUrl, person } from "@/lib/site-meta";

export const dynamic = "force-static";

/**
 * MCP manifest, served at `/.well-known/mcp` via a rewrite in `next.config.ts`.
 *
 * The rewrite exists because the App Router will not route a directory whose
 * name begins with a dot, so the handler has to live at a normal path and be
 * mapped onto the well-known URL.
 */
export async function GET() {
  const manifest = {
    schemaVersion: "2025-06-18",
    name: "nikhil-portfolio",
    title: `${person.name} Portfolio`,
    description:
      "Read-only access to the Nikhil Siwan portfolio: every project case study, its problem, research, and solution.",
    version: "1.0.0",
    vendor: {
      name: person.name,
      url: absoluteUrl("/"),
      email: person.email,
    },
    documentation: absoluteUrl("/llms.txt"),
    servers: [
      {
        type: "http",
        transport: "streamable-http",
        url: absoluteUrl("/api/mcp"),
        authentication: { type: "none" },
      },
    ],
    capabilities: { tools: { listChanged: false } },
    tools: [
      {
        name: "list_projects",
        description:
          "List every project in the portfolio, optionally filtered to one category.",
        parameters: { category: { type: "string", enum: allCategories() } },
      },
      {
        name: "get_project",
        description:
          "Fetch one project by id, including its full case study.",
        parameters: { id: { type: "integer", required: true } },
      },
    ],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
