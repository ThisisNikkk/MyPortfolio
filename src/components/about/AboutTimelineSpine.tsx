"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { timelineData, values } from "./data";
import StoryTimeline from "./StoryTimeline";
import PhotoMarquee from "./PhotoMarquee";
import StackMarquee from "./StackMarquee";
import FaqAccordion from "./FaqAccordion";
import ClosingCTA from "@/components/ClosingCTA";
import { ACCENT, EASE, Highlight, SectionHeading } from "@/components/ui/editorial";

/* ------------------------------------------------------------------ *
 * Type scale mirrors the reference layout: 60px/66px section headings
 * at weight 500 with -3px tracking, 14px/600 kickers, 16px/400 body in
 * a muted grey. Font family stays Urbanist; accent stays the site lime.
 * Heading/highlight primitives live in @/components/ui/editorial so the
 * case study pages share them.
 * ------------------------------------------------------------------ */

export default function AboutTimelineSpine() {
    return (
        // overflow-x-clip, not -hidden: `overflow-x: hidden` forces the
        // computed `overflow-y` to auto, turning this into a nested scroll
        // container that competes with Lenis. `clip` contains the full-bleed
        // marquees without creating one.
        <main className="min-h-screen relative overflow-x-clip">

            <div className="max-w-5xl w-full mx-auto px-6 pt-28">
                {/* Back */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="mb-14"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200 group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                        Back to Home
                    </Link>
                </motion.div>

                {/* ---------------- HERO ---------------- */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="text-center font-black tracking-[-0.045em] leading-[0.85] text-zinc-900 dark:text-white text-[clamp(3.5rem,15vw,11rem)]"
                >
                    About me
                </motion.h1>

                {/* Rule + meta row */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
                    className="mt-14 border-t border-zinc-200 dark:border-zinc-800 pt-5"
                >
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        <span>I am a React Native Developer</span>
                        <span>
                            Currently building at{" "}
                            <span className={ACCENT}>SolarioTech</span>
                        </span>
                    </div>
                </motion.div>

                <div className="mt-16 mb-28">
                    <PhotoMarquee />
                </div>

                {/* ---------------- MY STORY ---------------- */}
                <SectionHeading
                    kicker="Past few years"
                    title={<>My <Highlight>Story.</Highlight></>}
                    subtitle="How a kid poking at the family PC ended up building apps for a living."
                />

                <StoryTimeline items={timelineData} />

                {/* ---------------- WHAT I'M GOOD AT ---------------- */}
                <div className="mt-32">
                    <SectionHeading
                        kicker="What I bring"
                        title={<>What I&apos;m <Highlight>good at</Highlight></>}
                        subtitle="What I bring to a project, and what I won't cut corners on."
                    />

                    {/* Boxy grid: dashed dividers on a top+left frame, each cell
                        closes its right+bottom edge so the lines form one grid. */}
                    <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-dashed border-zinc-300 dark:border-zinc-800">
                        {values.map((v, i) => (
                            <motion.div
                                key={v.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, ease: EASE, delay: (i % 3) * 0.06 }}
                                className="border-r border-b border-dashed border-zinc-300 dark:border-zinc-800 p-8 lg:p-10"
                            >
                                <v.icon className={cn("w-7 h-7", ACCENT)} />
                                <h4 className="mt-6 text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-snug">
                                    {v.title}
                                </h4>
                                <p className="mt-3 text-base font-normal leading-[1.5] tracking-[-0.16px] text-zinc-500 dark:text-zinc-400">
                                    {v.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ---------------- MY STACKS ---------------- */}
                <div className="mt-32">
                    <SectionHeading
                        kicker="How I work"
                        title={<>My <Highlight>Stacks.</Highlight></>}
                        subtitle="The tools I reach for most, from the first prototype to release day."
                    />

                </div>
                <div className="mt-16">
                    <StackMarquee />
                </div>

                {/* ---------------- FAQS ---------------- */}
                <div className="mt-32">
                    <SectionHeading
                        kicker="FAQs"
                        title={<>Got questions? I&apos;ve <Highlight>got answers.</Highlight></>}
                        subtitle="The questions people ask me most, with short answers."
                    />
                    <FaqAccordion />
                </div>
            </div>

            {/* Same closer as the homepage, so the page ends on one clear
                next step instead of a heading and button that both just say
                "Get in touch" right above the footer saying it again. */}
            <ClosingCTA />
        </main>
    );
}
