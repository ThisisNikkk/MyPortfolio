"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { projects } from "@/data/projects";
import PhoneFrame from "@/components/PhoneFrame";

interface ProjectMockupProps {
  projectId: number;
}

export default function ProjectMockup({ projectId }: ProjectMockupProps) {
  const project = projects.find((p) => p.id === projectId);
  const [imageFailed, setImageFailed] = useState(false);

  if (!project) return null;

  // The hero prefers a dedicated mockupImages entry (a closer, "inside view"
  // shot) over the card thumbnail, so the two can differ; falls back to the
  // standard naming convention when neither is set.
  const heroImages = project.mockupImages;
  const imageSrc =
    (heroImages && heroImages.length === 1 ? heroImages[0] : project.mockupImage) ||
    `/projects/project-${project.id}.png`;

  // Sized to the image's own aspect ratio so real screenshots show in full,
  // with neither letterboxing nor cropping. Only the "not uploaded yet" state
  // falls back to a fixed 16/10 box, since there's no image to size against.
  if (imageFailed) {
    return (
      <div className="w-full aspect-[16/10] rounded-[30px] overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.10)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.35)] relative">
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", project.color)} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-zinc-950/40 backdrop-blur-sm">
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

  // Multi-screen projects (e.g. a mobile app with a few key screens) split
  // the hero into a grid instead of picking one screenshot to represent it.
  if (project.mockupImages && project.mockupImages.length > 1) {
    return (
      <div className="w-full aspect-[16/10] flex items-center justify-center gap-4">
        {project.mockupImages.map((src, i) =>
          project.mockupImagesFramed ? (
            <img
              key={src}
              src={src}
              alt={`${project.title} screen ${i + 1}`}
              className="h-full w-auto object-contain block"
            />
          ) : (
            <PhoneFrame key={src} src={src} alt={`${project.title} screen ${i + 1}`} />
          )
        )}
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={`${project.title} project showcase`}
      className="w-full h-auto block rounded-[30px]"
      onError={() => setImageFailed(true)}
    />
  );
}
