import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://nikhilsiwan.dev/sitemap.xml",
    host: "https://nikhilsiwan.dev",
  };
}
