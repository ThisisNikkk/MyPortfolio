import { allCategories } from "@/lib/api";
import { projects } from "@/data/projects";
import { SITE_URL, person } from "@/lib/site-meta";

export const dynamic = "force-static";

/**
 * OpenAPI 3.1 description of the public read-only API.
 *
 * Written for LLM function-calling: every operation has a unique
 * `operationId`, a prose `description`, typed parameters with enums where the
 * value space is closed, and a response schema for every documented status.
 */
function spec() {
  const categories = allCategories();
  const ids = projects.map((p) => p.id);

  const errorSchema = {
    type: "object",
    required: ["error"],
    additionalProperties: false,
    properties: {
      error: {
        type: "object",
        required: ["code", "message", "hint"],
        additionalProperties: false,
        properties: {
          code: {
            type: "string",
            description:
              "Stable machine-readable error code. Safe to branch on; never renamed once published.",
            enum: [
              "project_not_found",
              "invalid_project_id",
              "invalid_category",
              "not_found",
              "method_not_allowed",
              "internal_error",
            ],
          },
          message: {
            type: "string",
            description: "Human-readable description of what went wrong.",
          },
          hint: {
            type: "string",
            description:
              "Concrete recovery step — usually the endpoint to call to obtain a valid value.",
          },
        },
      },
    },
  } as const;

  const casePointSchema = {
    type: "object",
    required: ["title", "text"],
    additionalProperties: false,
    properties: {
      title: { type: "string", description: "Short label for this point." },
      text: { type: "string", description: "Full prose for this point." },
    },
  } as const;

  const caseSectionSchema = {
    type: "object",
    required: ["title", "description", "points"],
    additionalProperties: false,
    properties: {
      title: {
        type: "string",
        description: "Section name, such as Problem, Research, or Solution.",
      },
      description: {
        type: "string",
        description: "Section summary paragraph.",
      },
      points: {
        type: "array",
        description: "Supporting points that make up the section.",
        items: casePointSchema,
      },
    },
  } as const;

  const projectSchema = {
    type: "object",
    required: [
      "id",
      "title",
      "category",
      "description",
      "url",
      "apiUrl",
      "markdownUrl",
      "caseStudy",
    ],
    additionalProperties: false,
    properties: {
      id: {
        type: "integer",
        description: "Stable numeric identifier for the project.",
        examples: ids.slice(0, 3),
      },
      title: { type: "string", description: "Project name." },
      category: {
        type: "string",
        description: "Discipline the project belongs to.",
        enum: categories,
      },
      description: {
        type: "string",
        description: "One-paragraph summary of what the project is.",
      },
      url: {
        type: "string",
        format: "uri",
        description: "Canonical human-readable case study page.",
      },
      apiUrl: {
        type: "string",
        format: "uri",
        description: "Canonical JSON representation of this project.",
      },
      markdownUrl: {
        type: "string",
        format: "uri",
        description: "Markdown rendering of the case study.",
      },
      caseStudy: {
        description:
          "Full case study, or null when the project has no written case study yet.",
        oneOf: [
          {
            type: "object",
            required: ["overview", "sections"],
            additionalProperties: false,
            properties: {
              overview: {
                type: "string",
                description: "Opening summary of the case study.",
              },
              sections: {
                type: "array",
                description: "Ordered case study sections.",
                items: caseSectionSchema,
              },
            },
          },
          { type: "null" },
        ],
      },
    },
  } as const;

  return {
    openapi: "3.1.0",
    info: {
      title: `${person.name} Portfolio API`,
      version: "1.0.0",
      summary: "Read-only access to the portfolio's project case studies.",
      description: [
        `Public, unauthenticated, read-only API over the ${person.name} portfolio.`,
        "",
        "Use it to answer questions about which projects exist, what problem each",
        "one solved, and which technologies and product domains are represented —",
        "without scraping the animated HTML pages.",
        "",
        "There is no authentication, no write access, and no rate limit beyond",
        "ordinary CDN fair use. Every error response is JSON with a stable `code`,",
        "a human `message`, and a `hint` naming the call that recovers from it.",
      ].join("\n"),
      contact: { name: person.name, email: person.email, url: `${SITE_URL}/contact` },
      license: { name: "Portfolio content — all rights reserved" },
    },
    servers: [{ url: SITE_URL, description: "Production" }],
    tags: [
      {
        name: "projects",
        description: "Portfolio case studies and their metadata.",
      },
    ],
    paths: {
      "/api/projects": {
        get: {
          operationId: "listProjects",
          summary: "List portfolio projects",
          description:
            "Returns every project in the portfolio, optionally narrowed to a single category. Use this first to discover valid project ids before calling getProjectById.",
          tags: ["projects"],
          security: [],
          parameters: [
            {
              name: "category",
              in: "query",
              required: false,
              description:
                "Restrict results to one discipline. Matching is case-insensitive. Omit to return every project.",
              schema: { type: "string", enum: categories },
              example: categories[0],
            },
          ],
          responses: {
            "200": {
              description: "The matching projects.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["data", "meta"],
                    additionalProperties: false,
                    properties: {
                      data: {
                        type: "array",
                        description: "Matching projects, in portfolio order.",
                        items: projectSchema,
                      },
                      meta: {
                        type: "object",
                        required: ["count", "total", "categories"],
                        additionalProperties: false,
                        properties: {
                          count: {
                            type: "integer",
                            description: "Number of projects returned.",
                          },
                          total: {
                            type: "integer",
                            description:
                              "Number of projects in the portfolio, ignoring filters.",
                          },
                          categories: {
                            type: "array",
                            description: "Every category the portfolio defines.",
                            items: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            "400": {
              description: "The `category` value is not a known category.",
              content: { "application/json": { schema: errorSchema } },
            },
          },
        },
      },
      "/api/projects/{id}": {
        get: {
          operationId: "getProjectById",
          summary: "Get one project case study",
          description:
            "Returns a single project including its full case study — overview plus every section and supporting point. Call listProjects first if the id is not already known.",
          tags: ["projects"],
          security: [],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "Numeric project id, as returned by listProjects.",
              schema: { type: "integer", minimum: 1, examples: ids.slice(0, 3) },
              example: ids[0],
            },
          ],
          responses: {
            "200": {
              description: "The requested project.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["data"],
                    additionalProperties: false,
                    properties: { data: projectSchema },
                  },
                },
              },
            },
            "400": {
              description: "The id is not a positive integer.",
              content: { "application/json": { schema: errorSchema } },
            },
            "404": {
              description: "No project exists with that id.",
              content: { "application/json": { schema: errorSchema } },
            },
          },
        },
      },
    },
    components: {
      securitySchemes: {},
      schemas: {
        Project: projectSchema,
        CaseStudySection: caseSectionSchema,
        CaseStudyPoint: casePointSchema,
        Error: errorSchema,
      },
    },
    security: [],
  };
}

export async function GET() {
  return new Response(JSON.stringify(spec(), null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
