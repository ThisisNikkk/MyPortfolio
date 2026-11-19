import type { Metadata } from "next";
import { blogPosts } from "@/data/blog";
import BlogCatalogClient from "@/components/blog/BlogCatalogClient";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description:
    "Essays, architectural notes, and field stories on shipping React Native apps, Next.js web applications, and autonomous AI agents.",
  openGraph: {
    title: "Blog & Insights | Nikhil Siwan",
    description:
      "Articles on AI Agents, React Native mobile engineering, and modern Next.js architecture.",
  },
};

export default function BlogPage() {
  return <BlogCatalogClient initialPosts={blogPosts} />;
}
