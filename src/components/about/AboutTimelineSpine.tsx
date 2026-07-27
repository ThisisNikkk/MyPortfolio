"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { timelineData, values } from "./data";
import PhotoMarquee from "./PhotoMarquee";
import StackMarquee from "./StackMarquee";
import FaqAccordion from "./FaqAccordion";
import { ACCENT, EASE, Highlight, SectionHeading } from "@/components/ui/editorial";

/* ------------------------------------------------------------------ *
 * Type scale mirrors the reference layout: 60px/66px section headings
 * at weight 500 with -3px tracking, 14px/600 kickers, 16px/400 body in
 * a muted grey. Font family stays Urbanist; accent stays the site lime.
 * Heading/highlight primitives live in @/components/ui/editorial so the
 * case study pages share them.
 * ------------------------------------------------------------------ */

// Left-column visual for a story row. Falls back to a labelled placeholder
// frame until a real image is supplied via the item's `visual` field.
//
// Stacked (below md) the frame holds a 4:5 portrait. Side by side it drops the
// ratio and fills the row instead, so the visual ends up exactly as tall as the
// card beside it — the card is what sets the row height. `object-cover` absorbs
// whatever crop that implies.
const VISUAL_FRAME = "w-full aspect-[4/5] md:aspect-auto md:h-full rounded-[30px]";

function StoryVisual({ visual }: { visual?: { src: string; alt: string } }) {
    if (visual?.src) {
        return (
            <div
                className={cn(
                    VISUAL_FRAME,
                    "relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-[0_10px_20px_rgba(0,0,0,0.10)]"
                )}
            >
                <Image src={visual.src} alt={visual.alt} fill className="object-cover" />
            </div>
        );
    }
    return (
        <div
            className={cn(
                VISUAL_FRAME,
                "border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/40 flex items-center justify-center"
            )}
        >
            <span className="text-xs font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
                Add photo
            </span>
        </div>
    );
}

interface StoryRowProps {
    kicker: string;
    visual?: { src: string; alt: string };
    children: React.ReactNode;
    index: number;
}

// One story beat: a visual and a card flanking the central spine. The visual
// alternates sides down the list (left, right, left…) so the timeline zigzags.
// Card geometry mirrors the reference — 30px radius, ~50px padding, 26px inner
// rhythm, no border, soft drop shadow.
//
// Reveal is scroll-scrubbed rather than a one-shot: opacity and slide are
// driven by the row's own scroll position, so each side eases in from its edge
// as the row travels up the viewport.
function StoryRow({ kicker, visual, children, index }: StoryRowProps) {
    // Even rows: visual left / card right. Odd rows: the reverse.
    const visualOnRight = index % 2 === 1;

    const rowRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: rowRef,
        // 0 when the row's top hits the bottom of the viewport, 1 once its
        // centre reaches the middle — the reveal completes just before centre.
        offset: ["start end", "center center"],
    });
    const opacity = useTransform(scrollYProgress, [0, 0.75], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 0.75], [64, 0]);
    const visualX = useTransform(
        scrollYProgress,
        [0, 0.75],
        [visualOnRight ? 64 : -64, 0]
    );
    const cardX = useTransform(
        scrollYProgress,
        [0, 0.75],
        [visualOnRight ? -64 : 64, 0]
    );
    const dotScale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    return (
        <div
            ref={rowRef}
            // No items-center: the columns stretch instead, so the visual takes
            // its height from the row and matches the card exactly.
            className="relative md:grid md:grid-cols-2 md:gap-0 md:items-stretch pl-14 md:pl-0"
        >
            {/* Node dot, centred on the spine. On mobile the 3px track sits at
                left-[20px] (centre 21.5px); a 16px dot centres there at 13.5px. */}
            <motion.span
                style={{ scale: dotScale }}
                className="absolute left-[13.5px] md:left-1/2 md:-translate-x-1/2 top-8 md:top-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-[#c6f023] border-[3px] border-white dark:border-zinc-950 z-10"
            />

            {/* Visual */}
            <motion.div
                style={{ opacity, x: visualX, y }}
                className={cn(
                    "mb-6 md:mb-0",
                    visualOnRight ? "md:col-start-2 md:ml-12" : "md:col-start-1 md:mr-12"
                )}
            >
                <StoryVisual visual={visual} />
            </motion.div>

            {/* Card */}
            <motion.div
                style={{ opacity, x: cardX, y }}
                className={cn(
                    "md:row-start-1 flex flex-col gap-[26px] bg-white dark:bg-zinc-900/50 rounded-[30px] p-8 sm:p-12 shadow-[0_10px_20px_rgba(0,0,0,0.10)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_30px_rgba(0,0,0,0.13)] transition-shadow duration-300",
                    visualOnRight ? "md:col-start-1 md:mr-12" : "md:col-start-2 md:ml-12"
                )}
            >
                <span className="text-xs font-black uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
                    {kicker}
                </span>
                {children}
            </motion.div>
        </div>
    );
}

export default function AboutTimelineSpine() {
    const spineRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: spineRef,
        offset: ["start center", "end center"],
    });
    const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        // overflow-x-clip, not -hidden: `overflow-x: hidden` forces the
        // computed `overflow-y` to auto, turning this into a nested scroll
        // container that competes with Lenis. `clip` contains the full-bleed
        // marquees without creating one.
        <main className="min-h-screen relative overflow-x-clip">

            <div className="max-w-5xl w-full mx-auto px-6 pt-28 pb-24">
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
                    subtitle="From first curiosity to building cross-platform apps full-time."
                />

                <div ref={spineRef} className="relative mt-20">
                    {/* Static track */}
                    <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[3px] bg-zinc-200 dark:bg-zinc-800" />
                    {/* Animated fill */}
                    <motion.div
                        style={{ scaleY: lineScale }}
                        className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[3px] bg-[#c6f023] origin-top"
                    />

                    <div className="flex flex-col gap-16 md:gap-24">
                        {timelineData.map((item, i) => {
                            const isRole = Boolean(item.company);
                            return (
                                <StoryRow
                                    key={i}
                                    kicker={item.kicker}
                                    visual={item.visual}
                                    index={i}
                                >
                                    {/* period + title sit as one tight group */}
                                    <div className="flex flex-col gap-1.5">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                                            {item.period}
                                        </span>
                                        <div className="flex items-center gap-2.5 flex-wrap">
                                            {isRole && item.logo}
                                            <h3 className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-snug">
                                                {isRole ? item.company : item.title}
                                            </h3>
                                        </div>
                                        {isRole && (
                                            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                                                {item.role}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-base font-normal leading-[1.4] tracking-[-0.16px] text-zinc-500 dark:text-zinc-400">
                                        {item.description}
                                    </p>

                                    {item.highlight && (
                                        <p
                                            className={cn(
                                                "text-base font-light leading-[1.4] tracking-[-0.16px]",
                                                ACCENT
                                            )}
                                        >
                                            {item.highlight}
                                        </p>
                                    )}
                                </StoryRow>
                            );
                        })}
                    </div>
                </div>

                {/* ---------------- WHAT I'M GOOD AT ---------------- */}
                <div className="mt-32">
                    <SectionHeading
                        kicker="What I bring"
                        title={<>What I&apos;m <Highlight>good at</Highlight></>}
                        subtitle="Building for clarity, speed, and the person on the other side of the screen."
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
                        subtitle="A lightweight stack that carries me from idea to shipped."
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
                        subtitle="Everything you need to know — quick answers to the questions I get most."
                    />
                    <FaqAccordion />
                </div>

                {/* ---------------- GET IN TOUCH ---------------- */}
                <div className="mt-32 text-center">
                    <SectionHeading
                        kicker="Crafted with care"
                        title={<>Get in <Highlight>touch</Highlight></>}
                        subtitle="Every good story needs a next chapter. If you've got something worth building, let's write it together."
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5, ease: EASE }}
                    >
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 mt-10 px-8 py-4 rounded-xl text-sm font-black uppercase tracking-wider bg-[#c6f023] text-zinc-950 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(0,0,0,0.12)] transition-all duration-200 group"
                        >
                            <span>Get in Touch</span>
                            <MoveRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
