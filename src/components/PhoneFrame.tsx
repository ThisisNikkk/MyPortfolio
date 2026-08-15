"use client";

import React from "react";

interface PhoneFrameProps {
  src: string;
  alt: string;
}

// Pure-CSS device bezel for raw app screenshots that don't already have a
// frame baked in (unlike, say, a Figma-exported mockup PNG) — so a plain
// screenshot reads as a phone screen instead of a bare rectangle.
export default function PhoneFrame({ src, alt }: PhoneFrameProps) {
  return (
    <div className="relative h-full aspect-[9/19.5] rounded-[46px] bg-gradient-to-b from-zinc-700 to-zinc-950 p-[10px] shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
      <span className="absolute -right-px top-[24%] h-14 w-[3px] rounded-r-full bg-zinc-600" />
      <span className="absolute -left-px top-[20%] h-8 w-[3px] rounded-l-full bg-zinc-600" />
      <span className="absolute -left-px top-[29%] h-12 w-[3px] rounded-l-full bg-zinc-600" />

      <div className="relative h-full w-full rounded-[36px] overflow-hidden bg-black">
        <img src={src} alt={alt} className="h-full w-full object-cover" />
        <div className="absolute left-1/2 top-2.5 -translate-x-1/2 h-6 w-[88px] rounded-full bg-black" />
      </div>
    </div>
  );
}
