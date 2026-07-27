"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { projects } from "@/data/projects";

interface ProjectMockupProps {
  projectId: number;
}

export default function ProjectMockup({ projectId }: ProjectMockupProps) {
  const project = projects.find((p) => p.id === projectId);

  if (!project) return null;

  // Use user-defined mockupImage or fallback to standard naming convention
  const imageSrc = project.mockupImage || `/projects/project-${project.id}.png`;

  return (
    <div className="w-full aspect-[16/10] rounded-[30px] overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-[0_10px_20px_rgba(0,0,0,0.10)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.35)] relative group">
      {/* Background gradient style */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 z-0", project.color)} />

      {/* Project Image */}
      <img
        src={imageSrc}
        alt={`${project.title} project showcase`}
        className="w-full h-full object-cover relative z-10 block"
        onError={(e) => {
          // If the image has not been uploaded yet, hide the img element to show fallback
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          const fallback = target.parentElement?.querySelector(".placeholder-fallback");
          if (fallback) {
            fallback.classList.remove("hidden");
          }
        }}
      />

      {/* Premium Placeholder Fallback */}
      <div className="placeholder-fallback hidden absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-0 bg-zinc-950/40 backdrop-blur-sm">
        <span className="text-xs font-black tracking-widest text-[#c6f023] uppercase mb-2">
          Showcase Visual Needed
        </span>
        <h4 className="text-xl md:text-2xl font-black text-white mb-2">
          {project.title}
        </h4>
        <p className="text-zinc-300 text-xs md:text-sm max-w-xs leading-normal">
          Upload your project asset to:
          <code className="block mt-2 text-white font-mono text-[10px] bg-zinc-900/80 px-2 py-1 rounded border border-zinc-700/50 select-all">
            public{imageSrc}
          </code>
        </p>
      </div>
    </div>
  );
}
