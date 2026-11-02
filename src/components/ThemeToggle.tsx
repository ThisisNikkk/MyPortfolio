"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ICON_TURN = { type: "spring" as const, bounce: 0, duration: 0.4 };

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={cn("w-9 h-9", className)} />;
  }

  const isDark = resolvedTheme === "dark";

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    // next-themes applies the class in an effect, too late for a view
    // transition's snapshot — so flip it here first, then sync its state.
    const apply = () => {
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(next);
      root.style.colorScheme = next;
      setTheme(next);
    };

    if (typeof document.startViewTransition === "function") {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  };

  return (
    <button
      onClick={toggle}
      className={cn(
        "flex items-center justify-center rounded-md w-9 h-9 transition-[color,background-color,transform] duration-200 active:scale-90 active:duration-100",
        "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/50",
        "dark:text-zinc-400 dark:hover:text-zinc-50 dark:hover:bg-zinc-800/50",
        className
      )}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {/* Both glyphs stay mounted and cross-rotate, the same way the mobile
          menu's icon morphs, so the switch reads as one icon turning over. */}
      <span className="relative w-5 h-5">
        <motion.span
          aria-hidden
          className="absolute inset-0"
          initial={false}
          animate={isDark ? { opacity: 1, rotate: 0, scale: 1 } : { opacity: 0, rotate: -90, scale: 0.6 }}
          transition={ICON_TURN}
        >
          <Sun className="w-5 h-5" />
        </motion.span>
        <motion.span
          aria-hidden
          className="absolute inset-0"
          initial={false}
          animate={isDark ? { opacity: 0, rotate: 90, scale: 0.6 } : { opacity: 1, rotate: 0, scale: 1 }}
          transition={ICON_TURN}
        >
          <Moon className="w-5 h-5" />
        </motion.span>
      </span>
    </button>
  );
}
