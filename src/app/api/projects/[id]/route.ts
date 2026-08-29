import type { NextRequest } from "next/server";
import { projects } from "@/data/projects";
import { jsonError, jsonOk, toResource } from "@/lib/api";

export async function GET(
  _request: NextRequest,
  ctx: RouteContext<"/api/projects/[id]">,
) {
  const { id } = await ctx.params;

  // Ids are numeric in `src/data/projects.ts`; anything else is a client bug,
  // and is worth distinguishing from "valid id, no such project".
  if (!/^\d+$/.test(id)) {
    return jsonError(
      400,
      "invalid_project_id",
      `"${id}" is not a valid project id.`,
      "Project ids are positive integers. List them at /api/projects.",
    );
  }

  const project = projects.find((p) => p.id === Number(id));

  if (!project) {
    return jsonError(
      404,
      "project_not_found",
      `No project exists with id ${id}.`,
      `Valid ids are: ${projects.map((p) => p.id).join(", ")}. List them at /api/projects.`,
    );
  }

  return jsonOk({ data: toResource(project) });
}

/** Prerender the known ids; unknown ones still fall through to the 404 above. */
export function generateStaticParams() {
  return projects.map((p) => ({ id: String(p.id) }));
}
