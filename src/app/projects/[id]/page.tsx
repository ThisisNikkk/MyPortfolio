import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectMockup from "@/components/ProjectMockup";
import ProjectCaseStudyClient from "@/components/ProjectCaseStudyClient";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    id: String(p.id),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === parseInt(id));
  if (!project) return {};

  return {
    title: `${project.title} | Case Study`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    notFound();
  }

  return (
    <main className="flex-1 w-full">
      <ProjectCaseStudyClient project={project}>
        <ProjectMockup projectId={project.id} />
      </ProjectCaseStudyClient>
    </main>
  );
}
