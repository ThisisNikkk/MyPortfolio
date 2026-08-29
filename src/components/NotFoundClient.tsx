"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft, Compass, Mail } from "lucide-react";
import { pages } from "@/lib/site-meta";

/**
 * Animated body of the 404 page, rendered by `src/app/not-found.tsx`.
 *
 * Split out so the route file can stay a server component and export
 * `metadata`, per the pattern the rest of the app follows.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const kickerVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 20 },
  },
};

const digitVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 20, delay: 0.15 },
  },
};

const compassVariants = {
  hidden: { scale: 0, rotate: -60, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 200, damping: 13, delay: 0.35 },
  },
};

const headlineVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 110, damping: 22, delay: 0.45 },
  },
};

const badgeVariants = {
  hidden: { scale: 0, rotate: -10, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 1,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 220, damping: 12, delay: 0.6 },
  },
};

const copyVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 20, delay: 0.7 },
  },
};

const cardsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.8 },
  },
};

const cardVariants = {
  hidden: { y: 24, opacity: 0, scale: 0.97 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

const ctaVariants = {
  hidden: { y: 15, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 140, damping: 18, delay: 1.05 },
  },
};

export default function NotFoundClient() {
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
          variants={kickerVariants}
          className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400"
        >
          Error 404
        </motion.p>

        {/* Oversized numeral, with the zero standing in as a lime compass —
            the same lime-circle-in-a-headline device as the hero's zap. */}
        <div
          className="mt-6 flex items-center justify-center gap-1 sm:gap-2 leading-none"
          aria-hidden="true"
        >
          <motion.span
            variants={digitVariants}
            className="text-[92px] sm:text-[140px] lg:text-[180px] font-black tracking-tighter text-zinc-950 dark:text-white"
          >
            4
          </motion.span>

          <motion.span
            variants={compassVariants}
            className="inline-flex items-center justify-center rounded-full bg-[#c6f023] shadow-sm shrink-0 w-[70px] h-[70px] sm:w-[106px] sm:h-[106px] lg:w-[136px] lg:h-[136px]"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className="inline-flex"
            >
              <Compass
                className="w-9 h-9 sm:w-14 sm:h-14 lg:w-[72px] lg:h-[72px] text-zinc-950"
                strokeWidth={2.25}
              />
            </motion.span>
          </motion.span>

          <motion.span
            variants={digitVariants}
            className="text-[92px] sm:text-[140px] lg:text-[180px] font-black tracking-tighter text-zinc-950 dark:text-white"
          >
            4
          </motion.span>
        </div>

        <motion.h1
          variants={headlineVariants}
          className="mt-8 text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.15] tracking-tight text-zinc-950 dark:text-white"
        >
          That page doesn&apos;t{" "}
          <motion.span
            variants={badgeVariants}
            className="relative inline-block px-3 py-1 mx-0.5 bg-[#c6f023] text-zinc-950 rounded-[6px] md:rounded-[10px] shadow-sm leading-none align-middle"
          >
            exist
          </motion.span>
        </motion.h1>

        <motion.p
          variants={copyVariants}
          className="mt-5 max-w-lg text-base sm:text-lg font-medium leading-relaxed text-zinc-500 dark:text-zinc-400"
        >
          Nothing was moved — this path was never published. Here&apos;s where
          everything actually lives.
        </motion.p>

        {/* Destinations */}
        <motion.nav
          variants={cardsVariants}
          className="mt-12 grid w-full grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
        >
          {pages.map((page) => (
            <motion.div key={page.path} variants={cardVariants}>
              <Link
                href={page.path}
                className="group h-full flex flex-col text-left rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#c6f023] hover:shadow-lg dark:hover:shadow-black/40"
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

        {/* CTAs, matching the hero's button pair */}
        <motion.div
          variants={ctaVariants}
          className="mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <motion.div whileHover="hover" whileTap={{ scale: 0.98 }}>
            <Link
              href="/"
              className="w-full sm:w-auto justify-center bg-zinc-900 dark:bg-[#c6f023] text-white dark:text-zinc-950 font-bold text-sm sm:text-base px-6 py-4 rounded-xl inline-flex items-center gap-3 shadow-md transition-shadow duration-200"
            >
              <motion.span
                variants={{ hover: { x: [0, -4, 0] } }}
                transition={{ duration: 0.4 }}
                className="inline-flex"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.span>
              Back to home
            </Link>
          </motion.div>

          <motion.a
            href="mailto:developer.nikk@gmail.com"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto justify-center bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200/80 dark:border-zinc-800 font-bold text-sm sm:text-base px-6 py-4 rounded-xl inline-flex items-center gap-3 shadow-sm transition-shadow duration-200 group"
          >
            <motion.span
              variants={{ hover: { rotate: [-10, 10, -10, 10, 0] } }}
              transition={{ duration: 0.5 }}
              className="inline-flex"
            >
              <Mail className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
            </motion.span>
            Get in touch
          </motion.a>
        </motion.div>
      </motion.div>
    </main>
  );
}
