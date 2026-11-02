"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { pages } from "@/lib/site-meta";

/**
 * Animated body of the 404 page, rendered by `src/app/not-found.tsx`.
 *
 * Split out so the route file can stay a server component and export
 * `metadata`, per the pattern the rest of the app follows.
 *
 * The zero in "404" is a compass whose needle actually points somewhere:
 * at the cursor, at whichever way out you're hovering or focusing, and,
 * when there's no pointer (touch, or the mouse has left), at "Back to home".
 */

// Entrances are critically damped: nothing was thrown, so nothing overshoots.
const settle = (delay: number) => ({ type: "spring" as const, bounce: 0, duration: 0.6, delay });

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const rise = (distance: number, delay: number) => ({
  hidden: { y: distance, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: settle(delay) },
});

const compassVariants = {
  hidden: { scale: 0.6, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: settle(0.3) },
};

// The one playful beat, as on the homepage hero: a small, quickly settling pop.
const badgeVariants = {
  hidden: { scale: 0, rotate: -10, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 1,
    opacity: 1,
    transition: { type: "spring" as const, bounce: 0.15, duration: 0.5, delay: 0.55 },
  },
};

const cardsVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.75 } },
};

const cardVariants = rise(20, 0);

// Apple's rotation spring (damping ratio 0.8, response 0.4s): a needle
// should swing a touch past and settle, like a real one does.
// stiffness = (2π / 0.4)², damping = 2 · 0.8 · √stiffness.
const NEEDLE = { stiffness: 247, damping: 25, mass: 1 };

/** Shortest signed turn from `from` to `to`, in degrees (-180, 180]. */
const turnBetween = (from: number, to: number) => {
  const d = (((to - from) % 360) + 540) % 360 - 180;
  return d === -180 ? 180 : d;
};

function CompassNeedle({
  compassRef,
  homeRef,
  lockRef,
}: {
  compassRef: React.RefObject<HTMLElement | null>;
  homeRef: React.RefObject<HTMLElement | null>;
  lockRef: React.RefObject<HTMLElement | null>;
}) {
  const reduceMotion = useReducedMotion();
  const target = useMotionValue(0);
  const sprung = useSpring(target, NEEDLE);

  useEffect(() => {
    // Angle from the compass centre to a point, as a needle rotation. The
    // needle is drawn pointing up (-90° on screen), hence the +90.
    const angleTo = (x: number, y: number) => {
      const c = compassRef.current?.getBoundingClientRect();
      if (!c) return null;
      return (Math.atan2(y - (c.top + c.height / 2), x - (c.left + c.width / 2)) * 180) / Math.PI + 90;
    };
    const centreOf = (el: HTMLElement | null) => {
      const r = el?.getBoundingClientRect();
      return r ? angleTo(r.left + r.width / 2, r.top + r.height / 2) : null;
    };
    // Accumulate rather than jump to the raw angle, so crossing from 359° to
    // 1° turns the needle 2°, not a full spin the long way round.
    const aim = (angle: number | null) => {
      if (angle === null) return;
      const next = target.get() + turnBetween(target.get(), angle);
      if (reduceMotion) sprung.jump(next);
      target.set(next);
    };
    const aimHome = () => aim(centreOf(homeRef.current));

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (lockRef.current) aim(centreOf(lockRef.current));
      else aim(angleTo(e.clientX, e.clientY));
    };
    const onLeave = () => aimHome();
    // Re-aim when something gains or loses the lock (hover/focus on a way out).
    const onLockChange = () => (lockRef.current ? aim(centreOf(lockRef.current)) : aimHome());

    aimHome();
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("compass-lock", onLockChange);
    window.addEventListener("resize", aimHome);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("compass-lock", onLockChange);
      window.removeEventListener("resize", aimHome);
    };
  }, [compassRef, homeRef, lockRef, reduceMotion, sprung, target]);

  return (
    <svg viewBox="0 0 24 24" className="w-full h-full" aria-hidden="true">
      {/* Bezel and cardinal ticks stay still; only the needle turns. */}
      <circle cx="12" cy="12" r="10.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 2.6v1.6M12 19.8v1.6M2.6 12h1.6M19.8 12h1.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Framer turns SVG groups about their own bounding box; the needle's
          box is symmetric around (12, 12), so that's the compass centre. */}
      <motion.g style={{ rotate: sprung }}>
        {/* North half solid, south half outlined, so it reads which way. */}
        <path d="M12 5.2 14.3 12h-4.6Z" fill="currentColor" />
        <path d="M12 18.8 14.3 12h-4.6Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="1.25" fill="#c6f023" stroke="currentColor" strokeWidth="1" />
      </motion.g>
    </svg>
  );
}

export default function NotFoundClient() {
  const pathname = usePathname();
  const compassRef = useRef<HTMLSpanElement>(null);
  const homeRef = useRef<HTMLAnchorElement>(null);
  const lockRef = useRef<HTMLElement | null>(null);

  // Hovering or focusing a way out locks the needle onto it.
  const lock = (el: HTMLElement | null) => {
    lockRef.current = el;
    window.dispatchEvent(new Event("compass-lock"));
  };
  const lockHandlers = {
    onPointerEnter: (e: React.PointerEvent<HTMLElement>) => e.pointerType === "mouse" && lock(e.currentTarget),
    onPointerLeave: (e: React.PointerEvent<HTMLElement>) => e.pointerType === "mouse" && lock(null),
    onFocus: (e: React.FocusEvent<HTMLElement>) => lock(e.currentTarget),
    onBlur: () => lock(null),
  };

  // Home has its own button below, so the cards are everywhere else.
  const destinations = pages.filter((page) => page.path !== "/");

  return (
    // overflow-x-clip, not -hidden: `hidden` would make this a nested scroll
    // container competing with Lenis.
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-x-clip px-6 pt-32 pb-20">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full mx-auto flex flex-col items-center text-center"
      >
        <motion.p
          variants={rise(20, 0)}
          className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400"
        >
          Error 404
        </motion.p>

        {/* Oversized numeral, with the zero standing in as a lime compass —
            the same lime-circle-in-a-headline device as the hero's zap. */}
        <div className="mt-6 flex items-center justify-center gap-1 sm:gap-2 leading-none" aria-hidden="true">
          <motion.span
            variants={rise(50, 0.15)}
            className="text-[92px] sm:text-[140px] lg:text-[180px] font-black tracking-[-0.05em] text-zinc-950 dark:text-white"
          >
            4
          </motion.span>

          <motion.span
            ref={compassRef}
            variants={compassVariants}
            className="inline-flex items-center justify-center rounded-full bg-[#c6f023] shadow-sm shrink-0 p-2.5 sm:p-4 lg:p-5 text-zinc-950 w-[70px] h-[70px] sm:w-[106px] sm:h-[106px] lg:w-[136px] lg:h-[136px]"
          >
            <CompassNeedle compassRef={compassRef} homeRef={homeRef} lockRef={lockRef} />
          </motion.span>

          <motion.span
            variants={rise(50, 0.15)}
            className="text-[92px] sm:text-[140px] lg:text-[180px] font-black tracking-[-0.05em] text-zinc-950 dark:text-white"
          >
            4
          </motion.span>
        </div>

        <motion.h1
          variants={rise(30, 0.4)}
          className="mt-8 text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.15] tracking-[-0.03em] text-zinc-950 dark:text-white"
        >
          That page doesn&apos;t{" "}
          <motion.span
            variants={badgeVariants}
            className="relative inline-block px-3 py-1 mx-0.5 bg-[#c6f023] text-zinc-950 rounded-[6px] md:rounded-[10px] shadow-sm leading-none align-middle"
          >
            exist
          </motion.span>
        </motion.h1>

        {/* Say what actually happened: the address they tried. */}
        <motion.p
          variants={rise(20, 0.55)}
          className="mt-5 max-w-lg text-base sm:text-lg font-medium leading-relaxed text-zinc-500 dark:text-zinc-400"
        >
          Nothing lives at{" "}
          <code className="px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-900 font-mono text-[0.85em] text-zinc-900 dark:text-zinc-100 break-all">
            {pathname}
          </code>
          . Here&apos;s where everything is.
        </motion.p>

        {/* One clear way back, first. */}
        <motion.div variants={rise(15, 0.65)} className="mt-10 w-full sm:w-auto">
          <Link
            ref={homeRef}
            href="/"
            {...lockHandlers}
            className="group w-full sm:w-auto justify-center bg-zinc-900 dark:bg-[#c6f023] text-white dark:text-zinc-950 font-bold text-sm sm:text-base px-6 py-4 rounded-xl inline-flex items-center gap-3 shadow-md hover:shadow-lg active:scale-[0.97] active:duration-100 transition-[box-shadow,transform] duration-200"
          >
            <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to home
          </Link>
        </motion.div>

        {/* Everywhere else. */}
        <motion.nav
          aria-label="Pages"
          variants={cardsVariants}
          className="mt-10 grid w-full grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
        >
          {destinations.map((page) => (
            <motion.div key={page.path} variants={cardVariants}>
              <Link
                href={page.path}
                {...lockHandlers}
                className="group h-full flex flex-col text-left rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/50 p-5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#c6f023] hover:shadow-lg dark:hover:shadow-black/40 active:translate-y-0 active:scale-[0.98] active:duration-100"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white">
                    {page.title}
                  </span>
                  <ArrowUpRight className="w-5 h-5 shrink-0 text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-950 dark:group-hover:text-[#c6f023]" />
                </div>
                <span className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {page.summary}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.nav>
      </motion.div>
    </main>
  );
}
