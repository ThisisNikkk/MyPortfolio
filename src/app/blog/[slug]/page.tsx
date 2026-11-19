import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts } from "@/data/blog";
import BlogPostClient from "@/components/blog/BlogPostClient";
import { absoluteUrl } from "@/lib/site-meta";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | Blog`,
    description: post.description,
    openGraph: {
      title: `${post.title} | Nikhil Siwan`,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: absoluteUrl(`/blog/${post.slug}`),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
