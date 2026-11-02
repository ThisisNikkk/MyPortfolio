"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type FadeImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

/**
 * An <img> that fades in once its pixels are decoded, instead of popping in
 * or painting top-down in strips. Decoding is async so it never blocks a
 * frame of the scroll or entrance animation it lands in.
 *
 * Only for images that start off-screen (cards, thumbnails): it renders
 * invisible until hydration, so an above-the-fold hero should stay a plain
 * <img> to avoid delaying its first paint.
 */
export default function FadeImage({ className, onLoad, onError, ...props }: FadeImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // A cached or fast image can finish before React attaches onLoad, which
  // would leave it stuck at opacity 0. Catch that on mount.
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- alt arrives via props; assets are pre-optimised WebP
    <img
      ref={ref}
      decoding="async"
      {...props}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      onError={(e) => {
        // Reveal the container's fallback background rather than an
        // invisible broken image.
        setLoaded(true);
        onError?.(e);
      }}
      className={cn(
        "transition-opacity duration-500 ease-out",
        loaded ? "opacity-100" : "opacity-0",
        className
      )}
    />
  );
}
