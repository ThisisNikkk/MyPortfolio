import type { Metadata } from "next";
import { blogPosts } from "@/data/blog";
import BlogCatalogClient from "@/components/blog/BlogCatalogClient";
import { absoluteUrl } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description:
    "Essays, architectural notes, and field stories on shipping React Native apps, Next.js web applications, and autonomous AI agents.",
  alternates: {
    canonical: absoluteUrl("/blog"),
  },
  openGraph: {
    title: "Blog & Insights | Nikhil Siwan",
    description:
      "Articles on AI Agents, React Native mobile engineering, and modern Next.js architecture.",
    type: "website",
    url: absoluteUrl("/blog"),
    images: [
      {
        url: absoluteUrl("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Nikhil Siwan — Blog & Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Insights | Nikhil Siwan",
    description:
      "Articles on AI Agents, React Native mobile engineering, and modern Next.js architecture.",
    creator: "@ThisisNikkk",
    images: [absoluteUrl("/og-image.png")],
  },
};

export default function BlogPage() {
  return <BlogCatalogClient initialPosts={blogPosts} />;
}
