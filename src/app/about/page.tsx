import AboutPageClient from "@/components/AboutPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
  description: "About Nikhil Siwan — Software Developer specialising in AI agents, high-performance mobile apps, and enterprise SaaS design systems. Explore my professional timeline and journey.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
