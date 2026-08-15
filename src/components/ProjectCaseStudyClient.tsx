"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CaseStudySection, Project, projects } from "@/data/projects";
import { ACCENT, EASE, Highlight, SectionHeading } from "@/components/ui/editorial";

interface ClientProps {
  project: Project;
  children: React.ReactNode;
}

const pad = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ *
 * One case-study chapter (Problem / Research / Solution).
 *
 * The chapter framing — index, title, description — parks in a sticky
 * left rail while its points scroll past on the right, so you always
 * know which chapter you're reading. The sticky lives on the outer
 * column and the reveal transform on an inner div: a transform on the
 * sticky element itself would make it its own containing block and the
 * stick would fight the animation.
 * ------------------------------------------------------------------ */
function CaseChapter({ section, index }: { section: CaseStudySection; index: number }) {
  return (
    <section className="mt-24 md:mt-32 border-t border-zinc-200 dark:border-zinc-800 pt-12 md:grid md:grid-cols-12 md:gap-12">
      <div className="md:col-span-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          // Sticky only earns its keep when the points column is long enough to
          // scroll behind the rail. With two points the column barely clears the
          // rail, so sticking just slides the rail out of line with its own
          // points — it sits still instead.
          className={cn(section.points.length > 2 && "md:sticky md:top-32")}
        >
          <span className="block text-5xl font-black leading-none tracking-tight text-zinc-200 dark:text-zinc-800 tabular-nums">
            {pad(index + 1)}
          </span>
          <h2 className="mt-5 text-3xl md:text-4xl font-black leading-[1.15] tracking-tight text-zinc-900 dark:text-white">
            <Highlight>{section.title}</Highlight>
          </h2>
          <p className="mt-6 text-base font-normal leading-[1.5] tracking-[-0.16px] text-zinc-500 dark:text-zinc-400">
            {section.description}
          </p>
        </motion.div>
      </div>

      {/* Points as a dashed ledger — same rule language as the About grid,
          run vertically so long point copy still gets a full measure. */}
      <div className="md:col-span-8 mt-10 md:mt-0 border-t border-dashed border-zinc-300 dark:border-zinc-800">
        {section.points.map((pt, i) => (
          <motion.div
            key={pt.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: EASE, delay: Math.min(i, 3) * 0.05 }}
            className="group flex gap-5 sm:gap-6 border-b border-dashed border-zinc-300 dark:border-zinc-800 py-7"
          >
            <span className="shrink-0 pt-1 text-xs font-black tabular-nums text-zinc-400 dark:text-zinc-600 group-hover:text-[#c6f023] transition-colors duration-200">
              {pad(i + 1)}
            </span>
            <div>
              <h3 className="text-lg md:text-xl font-extrabold leading-snug tracking-tight text-zinc-900 dark:text-white">
                {pt.title}
              </h3>
              <p className="mt-2 text-base font-normal leading-[1.5] tracking-[-0.16px] text-zinc-500 dark:text-zinc-400">
                {pt.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function ProjectCaseStudyClient({ project, children }: ClientProps) {
  const index = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(index + 1) % projects.length];
  const sections = project.caseStudy?.sections ?? [];

  // The hero visual settles as it scrolls in: starts fractionally small and
  // lifted, lands at rest by the time it's fully on screen.
  const visualRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ["start end", "center center"],
  });
  const visualScale = useTransform(scrollYProgress, [0, 0.8], [0.94, 1]);

  return (
    // A div, not <main>: the route's page.tsx already provides the landmark.
    // overflow-x-clip, not -hidden: `overflow-x: hidden` forces the computed
    // `overflow-y` to auto and creates a nested scroll container that competes
    // with Lenis (same reason the About page uses clip).
    <div className="min-h-screen relative overflow-x-clip">
      <div className="max-w-5xl w-full mx-auto px-6 pt-28 pb-24">

        {/* ---------------- BACK ---------------- */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-14"
        >
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Work
          </Link>
        </motion.div>

        {/* ---------------- HERO ---------------- */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center text-xs font-black uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400"
        >
          Case study
        </motion.p>

        {/* Project titles run long ("AI Search Analytics"), so this clamp tops
            out well below the About page's — it has to survive a wrap. */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
          className="mt-5 text-center text-balance font-black tracking-[-0.045em] leading-[0.9] text-zinc-900 dark:text-white text-[clamp(2.75rem,9vw,6.5rem)]"
        >
          {project.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="mt-7 mx-auto max-w-2xl text-center text-base font-normal leading-[1.5] tracking-[-0.16px] text-zinc-500 dark:text-zinc-400"
        >
          {project.description}
        </motion.p>

        {/* Rule + meta row, mirroring the About hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          className="mt-14 border-t border-zinc-200 dark:border-zinc-800 pt-5"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <span>{project.category}</span>
            <span>
              Project <span className={ACCENT}>{pad(index + 1)}</span> / {pad(projects.length)}
            </span>
          </div>
        </motion.div>

        {/* ---------------- HERO VISUAL ---------------- */}
        <motion.div
          ref={visualRef}
          style={{ scale: visualScale }}
          className="mt-14"
        >
          {children}
        </motion.div>

        {/* ---------------- OVERVIEW ---------------- */}
        {project.caseStudy && (
          <>
            <div className="mt-28 md:mt-36">
              <SectionHeading
                kicker="Overview"
                title={<>What <Highlight>this is</Highlight></>}
                subtitle={project.caseStudy.overview}
              />
            </div>

            {/* Chapter index — derived from the sections themselves, so it can
                never fall out of step with what's actually below. */}
            {sections.length > 0 && (
              <div
                className={cn(
                  "mt-16 grid border-t border-l border-dashed border-zinc-300 dark:border-zinc-800",
                  sections.length >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"
                )}
              >
                {sections.map((sec, i) => (
                  <motion.div
                    key={sec.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, ease: EASE, delay: (i % 3) * 0.06 }}
                    className="border-r border-b border-dashed border-zinc-300 dark:border-zinc-800 p-8 lg:p-10"
                  >
                    <span className={cn("text-xs font-black tabular-nums", ACCENT)}>
                      {pad(i + 1)}
                    </span>
                    <h4 className="mt-5 text-xl font-extrabold tracking-tight leading-snug text-zinc-900 dark:text-white">
                      {sec.title}
                    </h4>
                    <p className="mt-3 text-base font-normal leading-[1.5] tracking-[-0.16px] text-zinc-500 dark:text-zinc-400">
                      {sec.points.length} {sec.points.length === 1 ? "key point" : "key points"}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            {/* ---------------- CHAPTERS ---------------- */}
            {sections.map((sec, i) => (
              <CaseChapter key={sec.title} section={sec} index={i} />
            ))}
          </>
        )}

        {/* ---------------- NEXT PROJECT ---------------- */}
        <div className="mt-32 md:mt-40">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
            Next project
          </p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Link
              href={`/projects/${nextProject.id}`}
              className="group mt-6 block rounded-[30px] bg-white dark:bg-zinc-900/50 p-8 sm:p-12 shadow-[0_10px_20px_rgba(0,0,0,0.10)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_30px_rgba(0,0,0,0.13)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-6 sm:gap-10">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    {nextProject.category}
                  </span>
                  <h3 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.05] text-zinc-900 dark:text-white">
                    {nextProject.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base font-normal leading-[1.5] tracking-[-0.16px] text-zinc-500 dark:text-zinc-400">
                    {nextProject.description}
                  </p>
                </div>
                <span className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full grid place-items-center bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white group-hover:bg-[#c6f023] group-hover:text-zinc-950 transition-colors duration-300">
                  <MoveRight className="w-6 h-6 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
