import type { Project } from "@/data/projects";

const requested = new Set<string>();

/**
 * Fetches and decodes images ahead of need, so when they are finally shown
 * they paint in one frame from cache instead of loading in front of the user.
 * Each URL is only ever requested once per page session.
 */
export function preloadImages(srcs: (string | undefined)[]) {
  if (typeof window === "undefined") return;
  for (const src of srcs) {
    if (!src || requested.has(src)) continue;
    requested.add(src);
    const img = new Image();
    img.decoding = "async";
    img.src = src;
    // decode() also warms the decoded bitmap, not just the HTTP cache.
    img.decode?.().catch(() => {});
  }
}

/** Runs work once the main thread is idle, so it never competes with scroll or entrance animations. */
export function whenIdle(work: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(work, { timeout: 3000 });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(work, 1500);
  return () => clearTimeout(id);
}

/** The images a project's case-study hero will show. */
export function heroImagesOf(project: Project): string[] {
  if (project.mockupImages?.length) return project.mockupImages;
  return project.mockupImage ? [project.mockupImage] : [];
}
