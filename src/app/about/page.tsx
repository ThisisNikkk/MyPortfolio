import AboutTimelineSpine from "@/components/about/AboutTimelineSpine";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
  description: "How Nikhil Siwan got into software, where he's worked, and what he builds now: React Native apps, Next.js websites and AI agents.",
};

export default function AboutPage() {
  return <AboutTimelineSpine />;
}
