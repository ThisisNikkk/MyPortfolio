import type { Metadata } from "next";
import NotFoundClient from "@/components/NotFoundClient";

export const metadata: Metadata = {
  title: "404 — Page not found",
  description: "This page does not exist. Here is where to go instead.",
};

/**
 * Root 404, which Next also serves for any unmatched URL.
 *
 * Deliberately synchronous — not `async`: a streamed not-found renders with a
 * 200 status, and an agent that gets a 200 for every path concludes every path
 * exists. Keeping this non-streaming preserves the real 404.
 *
 * This is the page a person sees, so it lists pages a person wants. The
 * machine-readable recovery list — llms.txt, the sitemap, the API — lives in
 * the markdown variant of this same URL, which is what an agent negotiating
 * `Accept: text/markdown` receives.
 */
export default function NotFound() {
  return <NotFoundClient />;
}
