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

  const postUrl = absoluteUrl(`/blog/${post.slug}`);
  const postImage = post.coverImage ? absoluteUrl(post.coverImage) : absoluteUrl("/og-image.png");

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: `${post.title} | Nikhil Siwan`,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: postUrl,
      images: [
        {
          url: postImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Nikhil Siwan`,
      description: post.description,
      creator: "@ThisisNikkk",
      images: [postImage],
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
