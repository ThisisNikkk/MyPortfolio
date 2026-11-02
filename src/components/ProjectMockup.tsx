"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { projects } from "@/data/projects";
import PhoneFrame from "@/components/PhoneFrame";
import ZoomableImage from "@/components/ui/ZoomableImage";

interface ProjectMockupProps {
  projectId: number;
}

export default function ProjectMockup({ projectId }: ProjectMockupProps) {
  const project = projects.find((p) => p.id === projectId);
  const [imageFailed, setImageFailed] = useState(false);

  // An image that 404s before hydration fires its `error` event before React
  // has attached onError, which left a broken-image icon in the hero instead
  // of the fallback. Checking on mount catches that case too.
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setImageFailed(true);
    }
  }, []);

  if (!project) return null;

  // The hero prefers a dedicated mockupImages entry (a closer, "inside view"
  // shot) over the card thumbnail, so the two can differ.
  const heroImages = project.mockupImages;
  const imageSrc =
    (heroImages && heroImages.length === 1 ? heroImages[0] : project.mockupImage) ||
    `/projects/project-${project.id}.png`;
  // With nothing configured there's no point requesting the conventional
  // path just to watch it 404.
  const hasImage = Boolean(heroImages?.length || project.mockupImage);

  // Sized to the image's own aspect ratio so real screenshots show in full,
  // with neither letterboxing nor cropping. Only the "no visual yet" state
  // falls back to a fixed 16/10 box, since there's no image to size against.
  if (!hasImage || imageFailed) {
    return (
      <div className="w-full aspect-[16/10] rounded-[30px] overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.10)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.35)] relative">
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", project.color)} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-zinc-950/40 backdrop-blur-sm">
          {/* The upload hint is for the site owner, never for visitors. */}
          {process.env.NODE_ENV === "development" && (
            <span className="text-xs font-black tracking-widest text-[#c6f023] uppercase mb-2">
              Showcase Visual Needed
            </span>
          )}
          <h4 className="text-xl md:text-2xl font-black text-white mb-2">
            {project.title}
          </h4>
          {process.env.NODE_ENV === "development" && (
            <p className="text-zinc-300 text-xs md:text-sm max-w-xs leading-normal">
              Upload your project asset to:
              <code className="block mt-2 text-white font-mono text-[10px] bg-zinc-900/80 px-2 py-1 rounded border border-zinc-700/50 select-all">
                public{imageSrc}
              </code>
            </p>
          )}
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
            // width/height give each screen its aspect before it loads. With
            // h-full/w-auto alone a screen is 0px wide until decoded, so the
            // row reflowed sideways as each one arrived. Tap to enlarge.
            <ZoomableImage
              key={src}
              src={src}
              alt={`${project.title} screen ${i + 1}`}
              width={900}
              height={1840}
              fetchPriority={i === 0 ? "high" : "auto"}
              frameClassName="h-full shrink-0"
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
    // The hero is above the fold, so it loads first and isn't faded: a fade
    // would hold back the page's largest paint. width/height reserve its
    // space up front (the inside shots are 1800x1065; a different source
    // still lands on its own ratio once loaded), so nothing below jumps.
    <ZoomableImage
      imgRef={imgRef}
      src={imageSrc}
      alt={`${project.title} project showcase`}
      width={1800}
      height={1065}
      fetchPriority="high"
      frameClassName="w-full"
      className="w-full h-auto block rounded-[30px]"
      onError={() => setImageFailed(true)}
    />
  );
}
