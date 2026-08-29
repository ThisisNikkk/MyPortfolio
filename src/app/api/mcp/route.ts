import type { NextRequest } from "next/server";
import { projects } from "@/data/projects";
import { allCategories, toResource } from "@/lib/api";
import { person } from "@/lib/site-meta";

/**
 * Minimal Model Context Protocol server over Streamable HTTP.
 *
 * Implements the subset that matters for a read-only content source:
 * `initialize`, `tools/list`, and `tools/call`. There is no session state, so
 * no `Mcp-Session-Id` is issued and every POST is self-contained — which is
 * what lets this run on a serverless deployment without a session store.
 *
 * Responses are `application/json` rather than SSE: nothing here streams, and
 * the spec permits a single JSON response for a request that produces one
 * result.
 */

const PROTOCOL_VERSION = "2025-06-18";

const SERVER_INFO = {
  name: "nikhil-portfolio",
  title: `${person.name} Portfolio`,
  version: "1.0.0",
} as const;

interface JsonRpcRequest {
  jsonrpc?: string;
  id?: string | number | null;
  method?: string;
  params?: Record<string, unknown>;
}

const HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Mcp-Session-Id, MCP-Protocol-Version",
} as const;

function result(id: string | number | null, value: unknown) {
  return new Response(JSON.stringify({ jsonrpc: "2.0", id, result: value }), {
    headers: HEADERS,
  });
}

function rpcError(
  id: string | number | null,
  code: number,
  message: string,
  status = 200,
) {
  return new Response(
    JSON.stringify({ jsonrpc: "2.0", id, error: { code, message } }),
    { status, headers: HEADERS },
  );
}

/** Tool results are content blocks; JSON travels as text plus structuredContent. */
function toolResult(payload: unknown) {
  return {
    content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
    structuredContent: payload,
    isError: false,
  };
}

function toolError(message: string) {
  return {
    content: [{ type: "text", text: message }],
    isError: true,
  };
}

const TOOLS = [
  {
    name: "list_projects",
    title: "List portfolio projects",
    description:
      "List every project in the Nikhil Siwan portfolio, optionally filtered to one category. Use this to discover which projects exist and their ids before fetching a full case study.",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          description:
            "Optional category filter. Omit to return every project.",
          enum: allCategories(),
        },
      },
      required: [],
      additionalProperties: false,
    },
  },
  {
    name: "get_project",
    title: "Get one project case study",
    description:
      "Fetch a single portfolio project by id, including its full case study: the problem it solved, the research behind it, and the solution that shipped.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          description: "Numeric project id, as returned by list_projects.",
        },
      },
      required: ["id"],
      additionalProperties: false,
    },
  },
] as const;

function callTool(name: string, args: Record<string, unknown>) {
  if (name === "list_projects") {
    const category = args.category;
    let selected = projects;

    if (typeof category === "string" && category.length > 0) {
      const matched = allCategories().find(
        (c) => c.toLowerCase() === category.toLowerCase(),
      );
      if (!matched) {
        return toolError(
          `Unknown category "${category}". Valid categories: ${allCategories().join(", ")}.`,
        );
      }
      selected = projects.filter((p) => p.category === matched);
    }

    return toolResult({
      projects: selected.map(toResource),
      count: selected.length,
    });
  }

  if (name === "get_project") {
    const id = Number(args.id);
    if (!Number.isInteger(id)) {
      return toolError("Argument `id` must be an integer.");
    }
    const project = projects.find((p) => p.id === id);
    if (!project) {
      return toolError(
        `No project with id ${id}. Valid ids: ${projects.map((p) => p.id).join(", ")}.`,
      );
    }
    return toolResult(toResource(project));
  }

  return toolError(`Unknown tool "${name}".`);
}

export async function POST(request: NextRequest) {
  let body: JsonRpcRequest;

  try {
    body = await request.json();
  } catch {
    return rpcError(null, -32700, "Parse error: request body is not valid JSON.", 400);
  }

  const id = body.id ?? null;
  const method = body.method;

  // A notification carries no id and expects no body back.
  if (body.id === undefined && typeof method === "string" && method.startsWith("notifications/")) {
    return new Response(null, { status: 202, headers: HEADERS });
  }

  switch (method) {
    case "initialize":
      return result(id, {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER_INFO,
        instructions:
          "Read-only access to the Nikhil Siwan portfolio. Call list_projects to see every case study, then get_project for the full write-up of one. No authentication is required and nothing can be modified.",
      });

    case "ping":
      return result(id, {});

    case "tools/list":
      return result(id, { tools: TOOLS });

    case "tools/call": {
      const params = body.params ?? {};
      const name = params.name;
      if (typeof name !== "string") {
        return rpcError(id, -32602, "Invalid params: `name` is required.");
      }
      const args = (params.arguments ?? {}) as Record<string, unknown>;
      return result(id, callTool(name, args));
    }

    default:
      return rpcError(id, -32601, `Method not found: ${String(method)}`);
  }
}

/** Discovery convenience: a plain GET describes the server instead of 405ing. */
export async function GET() {
  return new Response(
    JSON.stringify(
      {
        transport: "streamable-http",
        protocolVersion: PROTOCOL_VERSION,
        serverInfo: SERVER_INFO,
        tools: TOOLS.map((t) => ({ name: t.name, description: t.description })),
        usage: "POST JSON-RPC 2.0 messages to this URL. Start with `initialize`.",
      },
      null,
      2,
    ),
    { headers: HEADERS },
  );
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: HEADERS });
}
