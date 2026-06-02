"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

interface SmoothScrollingProps {
  children: ReactNode;
}

function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const target = document.getElementById(hash.substring(1));
        if (target) {
          // Wait slightly for DOM/layout to settle, then scroll to the element
          setTimeout(() => {
            if (lenis) {
              lenis.scrollTo(target);
            } else {
              target.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
          return;
        }
      }
      
      // No hash, scroll to top
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    };

    handleScroll();

    window.addEventListener("hashchange", handleScroll);
    return () => {
      window.removeEventListener("hashchange", handleScroll);
    };
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScrolling({ children }: SmoothScrollingProps) {
  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true, autoRaf: true }}>
      <ScrollToTop />
      {children}
    </ReactLenis>
  );
}
