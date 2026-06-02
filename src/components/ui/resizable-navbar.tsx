"use client";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import React, { useState } from "react";

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

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Hide navbar if scrolling down and scrolled more than 150px
    if (latest > previous && latest > 40) {
      setHidden(true);
    } else {
      setHidden(false);
    }
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
        "hidden sm:flex w-full bg-white dark:bg-zinc-950 border border-neutral-200/80 dark:border-neutral-800 rounded-lg flex-row items-center justify-between px-4 py-2",
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
  return (
    <div className={cn("sm:hidden flex flex-col w-full bg-white dark:bg-zinc-950 border border-neutral-200/80 dark:border-neutral-800 rounded-lg px-4 py-3", className)}>
      <div className="flex flex-row justify-between items-center w-full">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === Logo) {
            return child;
          }
          return null;
        })}
        <button onClick={() => setOpen(!open)} className="p-2">
          {open ? <X className="w-5 h-5 text-neutral-800 dark:text-neutral-200" /> : <Menu className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-col gap-4 mt-4"
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
