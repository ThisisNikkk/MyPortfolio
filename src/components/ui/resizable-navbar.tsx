"use client";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import React, { useEffect, useId, useRef, useState } from "react";

// How far the page must travel before the bar reacts to a direction change.
// Lenis eases the scroll position, so one wheel flick arrives as a long run of
// shrinking deltas that flip sign by a pixel or two as it settles; without a
// deadzone every one of those reversals re-showed the bar mid-scroll.
const DIRECTION_DEADZONE = 12;
// Don't hide until the page is clear of the bar's own resting position.
const HIDE_AFTER = 120;

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  // Last position that actually moved the bar. Held in a ref so sub-threshold
  // deltas accumulate rather than being measured against the previous frame.
  const anchorY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - anchorY.current;
    if (Math.abs(delta) < DIRECTION_DEADZONE) return;
    anchorY.current = latest;
    setHidden(delta > 0 && latest > HIDE_AFTER);
  });

  return (
    <motion.div
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed w-full max-w-6xl mx-auto top-4 inset-x-0 z-50 px-6",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible = true }: NavBodyProps) => {
  if (!visible) return null;

  return (
    <div
      className={cn(
        "nav-material hidden sm:flex w-full border border-neutral-200/80 dark:border-neutral-800 rounded-lg flex-row items-center justify-between px-4 py-1.5",
        className
      )}
    >
      {children}
    </div>
  );
};

export const NavItems = ({ children, className }: NavItemsProps) => {
  return (
    <div
      className={cn(
        "hidden sm:flex flex-row items-center gap-1 text-sm text-neutral-800 dark:text-neutral-200",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNav = ({ children, className }: MobileNavProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  // An open menu should always have a way out: Escape, or a tap anywhere
  // outside the bar — not only the toggle button.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={cn("nav-material sm:hidden flex flex-col w-full border border-neutral-200/80 dark:border-neutral-800 rounded-lg px-4 py-2", className)}>
      <div className="flex flex-row justify-between items-center w-full">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === Logo) {
            return child;
          }
          return null;
        })}
        {/* 44px target; -mr-2 keeps the icon optically where p-2 had it. */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={menuId}
          className="-mr-2 w-11 h-11 flex items-center justify-center rounded-md transition-transform duration-200 active:scale-90 active:duration-100"
        >
          {open ? <X className="w-5 h-5 text-neutral-800 dark:text-neutral-200" /> : <Menu className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.35 }}
            className="flex flex-col gap-4 mt-4 overflow-hidden"
          >
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child) && child.type !== Logo) {
                return React.cloneElement(child, {
                  onClick: (e: React.MouseEvent) => {
                    setOpen(false);
                    const props = child.props as Record<string, unknown>;
                    if (typeof props.onClick === "function") {
                      props.onClick(e);
                    }
                  },
                } as React.HTMLAttributes<HTMLElement>);
              }
              return null;
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Logo = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {children}
    </div>
  );
};
