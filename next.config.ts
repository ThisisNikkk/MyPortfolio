import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.22"],

  // Reduce network payload — serve AVIF first, WebP as fallback
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // cache optimized images for 1 year
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Enable gzip compression
  compress: true,

  // Remove X-Powered-By header (minor security + payload improvement)
  poweredByHeader: false,

  // Strict mode helps catch performance issues early
  reactStrictMode: true,

  async rewrites() {
    /*
     * Markdown content negotiation, using the `has` rewrite pattern Next
     * documents for this exact case (see the Backend for Frontend guide).
     * A rewrite masks the destination, so `/about` keeps answering as
     * `/about` in both representations — which acceptmarkdown.com requires.
     *
     * These must be `beforeFiles`: a plain rewrites array is `afterFiles`,
     * which runs *after* filesystem routes, so `/about` would resolve to its
     * page and the rewrite would never fire.
     *
     * The source excludes the API, Next internals, and the metadata routes,
     * which define their own content types and have no markdown variant.
     * Browsers never send `text/markdown`, so matching the substring only
     * diverts a deliberate markdown request.
     */
    const markdownSource =
      "/:path((?!api/|_next/|\\.well-known/|favicon\\.ico|robots\\.txt|sitemap\\.xml|llms\\.txt|openapi\\.json).*)";

    return {
      beforeFiles: [
        {
          source: markdownSource,
          destination: "/api/markdown/:path",
          has: [
            { type: "header", key: "accept", value: "(.*)text/markdown(.*)" },
          ],
        },
        // Fallback for clients that cannot set request headers.
        {
          source: markdownSource,
          destination: "/api/markdown/:path",
          has: [{ type: "query", key: "format", value: "md" }],
        },
      ],
      afterFiles: [
        // The App Router will not route a directory whose name starts with a
        // dot, so the MCP manifest handler lives at a normal path and is
        // mapped onto its well-known URL here.
        { source: "/.well-known/mcp", destination: "/api/mcp-manifest" },
        { source: "/.well-known/mcp.json", destination: "/api/mcp-manifest" },
      ],
      fallback: [],
    };
  },

  async headers() {
    return [
      {
        // Markdown negotiation (src/proxy.ts) makes these URLs return two
        // different representations, so caches must key on Accept. Set here as
        // well as in the proxy because config headers survive the static
        // responses the proxy does not touch.
        source: "/:path*",
        headers: [{ key: "Vary", value: "Accept, Accept-Encoding" }],
      },
      {
        source: "/llms.txt",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
      {
        source: "/openapi.json",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },
};

export default nextConfig;
