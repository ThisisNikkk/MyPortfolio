import { llmsTxt } from "@/lib/markdown";

export const dynamic = "force-static";

export async function GET() {
  return new Response(llmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
