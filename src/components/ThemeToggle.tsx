"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

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
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
