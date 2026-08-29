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

/*
 * No `generateStaticParams` here, deliberately.
 *
 * Prerendering the known ids marks this route as statically optimized, and
 * that path only expects cacheable statuses. On Vercel the 400 above then
 * killed the function outright (FUNCTION_INVOCATION_FAILED) for every
 * non-numeric id, while numeric ids and the 404 branch were fine — and the
 * local Node server tolerated it, so only a run against the deployment
 * caught it.
 *
 * The route loses nothing by staying dynamic: the payloads are small and
 * `jsonOk` already sets `s-maxage=3600, stale-while-revalidate=86400`, so
 * the CDN caches them at the edge anyway.
 */
