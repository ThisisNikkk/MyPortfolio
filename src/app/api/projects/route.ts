import type { NextRequest } from "next/server";
import { projects } from "@/data/projects";
import { allCategories, jsonError, jsonOk, toResource } from "@/lib/api";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");

  let selected = projects;

  if (category !== null) {
    const categories = allCategories();
    // Case-insensitive so an agent guessing "ai projects" still succeeds.
    const matched = categories.find(
      (c) => c.toLowerCase() === category.toLowerCase(),
    );

    if (!matched) {
      return jsonError(
        400,
        "invalid_category",
        `"${category}" is not a known project category.`,
        `Valid categories are: ${categories.join(", ")}.`,
      );
    }

    selected = projects.filter((p) => p.category === matched);
  }

  return jsonOk({
    data: selected.map(toResource),
    meta: {
      count: selected.length,
      total: projects.length,
      categories: allCategories(),
    },
  });
}
