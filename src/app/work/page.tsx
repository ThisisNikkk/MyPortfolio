import WorkComponent from "@/components/WorkComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Websites, mobile apps and AI projects by Nikhil Siwan, each with a short case study on the problem and how he solved it.",
};

export default function WorkPage() {
  return (
    <main>
      <WorkComponent asPage />
    </main>
  );
}
