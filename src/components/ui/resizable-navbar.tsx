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
  /** Always-visible brand mark on the left of the bar. */
  logo?: React.ReactNode;
  /** Menu items, revealed in the drawer. */
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

// Drawer motion. Critically damped — the tap carried no momentum, so nothing
// should overshoot — and closing a touch quicker than opening, so dismissal
// feels like it gets out of the way.
const MENU_OPEN = { type: "spring" as const, bounce: 0, duration: 0.32 };
const MENU_CLOSE = { type: "spring" as const, bounce: 0, duration: 0.24 };

const menuVariants = {
  closed: {
    height: 0,
    // Collapse starts on the tap, with the items fading out alongside it —
    // never waiting for them first, which would read as input lag.
    transition: { ...MENU_CLOSE, staggerChildren: 0.02, staggerDirection: -1 },
  },
  open: {
    height: "auto",
    transition: { ...MENU_OPEN, staggerChildren: 0.035, delayChildren: 0.04 },
  },
};

// Items drift down toward their resting place as the drawer grows, so the
// motion points the way the menu is opening.
const itemVariants = {
  closed: { opacity: 0, y: -6, transition: { duration: 0.12 } },
  open: { opacity: 1, y: 0, transition: { type: "spring" as const, bounce: 0, duration: 0.28 } },
};

// Scrolling this far with the menu open means the user has moved on.
const CLOSE_ON_SCROLL = 24;

export const MobileNav = ({ logo, children, className }: MobileNavProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  // An open menu should always have a way out: Escape, a tap anywhere
  // outside the bar, or scrolling away — not only the toggle button.
  useEffect(() => {
    if (!open) return;
    const openedAt = window.scrollY;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onScroll = () => {
      if (Math.abs(window.scrollY - openedAt) > CLOSE_ON_SCROLL) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={cn("nav-material sm:hidden flex flex-col w-full border border-neutral-200/80 dark:border-neutral-800 rounded-lg px-4 py-2", className)}>
      {/* The logo arrives as its own prop rather than being fished out of
          children by `child.type === Logo`: that identity check broke on every
          Fast Refresh (the re-imported Logo is a new function), dropping the
          logo from the bar and shoving the menu button to the left. */}
      <div className="flex flex-row justify-between items-center w-full">
        {logo}
        {/* 44px target; -mr-2 keeps the icon optically where p-2 had it. */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={menuId}
          className="relative -mr-2 w-11 h-11 flex items-center justify-center rounded-md transition-transform duration-200 active:scale-90 active:duration-100"
        >
          {/* Both glyphs stay mounted and cross-rotate, so the icon morphs
              rather than snapping from one to the other. */}
          <motion.span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={open ? { opacity: 0, rotate: 90, scale: 0.6 } : { opacity: 1, rotate: 0, scale: 1 }}
            transition={MENU_OPEN}
          >
            <Menu className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
          </motion.span>
          <motion.span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={open ? { opacity: 1, rotate: 0, scale: 1 } : { opacity: 0, rotate: -90, scale: 0.6 }}
            transition={MENU_OPEN}
          >
            <X className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
          </motion.span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          // Only height animates on this outer layer, and it carries no
          // margin: spacing lives on the inner wrapper as padding, so all of
          // it grows and shrinks with the drawer instead of popping in at the
          // first frame and snapping away at the last.
          <motion.div
            id={menuId}
            key="menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="overflow-hidden"
          >
            <div
              className="flex flex-col gap-4 pt-4 pb-2"
              // Following a link closes the menu; other controls in it (the
              // theme toggle) leave it open.
              onClick={(e) => {
                if ((e.target as Element).closest("a")) setOpen(false);
              }}
            >
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                  return (
                    // flex-col, not a plain block: it keeps the child a
                    // (stretched) flex item, as it was before this wrapper
                    // existed — an <a> in a block box is inline, so its
                    // w-full / text-center stop applying.
                    <motion.div variants={itemVariants} className="w-full flex flex-col">
                      {child}
                    </motion.div>
                  );
                }
                return null;
              })}
            </div>
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
