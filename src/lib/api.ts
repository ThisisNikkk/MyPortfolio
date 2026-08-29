/**
 * Shared shapes for the public read-only API.
 *
 * Every response — success or failure — is JSON. Agents cannot parse an HTML
 * error page, so nothing here is allowed to fall through to the app shell.
 */

import { projects, type Project } from "@/data/projects";
import { absoluteUrl } from "@/lib/site-meta";

/** Stable, machine-matchable error codes. Never renamed once published. */
export type ApiErrorCode =
  | "project_not_found"
  | "invalid_project_id"
  | "invalid_category"
  | "not_found"
  | "method_not_allowed"
  | "internal_error";

export interface ApiErrorBody {
  error: {
    code: ApiErrorCode;
    message: string;
    /** How to recover — a concrete next call, not a restatement of the error. */
    hint: string;
  };
}

/** JSON headers shared by every API response. */
const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  // The API is public and read-only, so cross-origin agent access is safe.
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
} as const;

export function jsonOk(body: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(body, null, 2), {
    status: 200,
    ...init,
    headers: { ...JSON_HEADERS, ...init?.headers },
  });
}

export function jsonError(
  status: number,
  code: ApiErrorCode,
  message: string,
  hint: string,
): Response {
  const body: ApiErrorBody = { error: { code, message, hint } };
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: JSON_HEADERS,
  });
}

/** Public JSON representation of a project. */
export interface ProjectResource {
  id: number;
  title: string;
  category: string;
  description: string;
  url: string;
  apiUrl: string;
  markdownUrl: string;
  caseStudy: Project["caseStudy"] | null;
}

/**
 * Serialise a project for the API. Presentation-only fields (`color`,
 * `mockupImage*`) are deliberately dropped — they describe how the site draws
 * the card, which is meaningless to a consumer.
 */
export function toResource(project: Project): ProjectResource {
  return {
    id: project.id,
    title: project.title,
    category: project.category,
    description: project.description,
    url: absoluteUrl(`/projects/${project.id}`),
    apiUrl: absoluteUrl(`/api/projects/${project.id}`),
    markdownUrl: absoluteUrl(`/projects/${project.id}?format=md`),
    caseStudy: project.caseStudy ?? null,
  };
}

/** Distinct categories, in the order the data declares them. */
export function allCategories(): string[] {
  return [...new Set(projects.map((p) => p.category))];
}
