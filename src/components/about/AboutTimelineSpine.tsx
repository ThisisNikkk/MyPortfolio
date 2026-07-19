"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { timelineData, stack, values } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ *
 * Type scale mirrors the reference layout: 60px/66px section headings
 * at weight 500 with -3px tracking, 14px/600 kickers, 16px/400 body in
 * a muted grey. Font family stays Urbanist; accent stays the site lime.
 * ------------------------------------------------------------------ */

const ACCENT = "text-[#8aa617] dark:text-[#c6f023]";

function SectionHeading({
    kicker,
    title,
    subtitle,
    accent = false,
}: {
    kicker: string;
    title: string;
    subtitle: string;
    accent?: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-center max-w-2xl mx-auto"
        >
            <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
                {kicker}
            </p>
            <h2
                className={cn(
                    "mt-4 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight",
                    accent ? ACCENT : "text-zinc-900 dark:text-white"
                )}
            >
                {title}
            </h2>
            <p className="mt-5 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#707070] dark:text-zinc-400">
                {subtitle}
            </p>
        </motion.div>
    );
}

interface MilestoneProps {
    side: "left" | "right";
    kicker: string;
    children: React.ReactNode;
    index: number;
}

// A card that hangs off the central spine, alternating sides on desktop.
// Geometry mirrors the reference: 30px radius, ~50px padding, 26px inner
// rhythm, no border, soft drop shadow.
function Milestone({ side, kicker, children, index }: MilestoneProps) {
    const isLeft = side === "left";
    return (
        <div className="relative md:grid md:grid-cols-2 md:gap-0 pl-14 md:pl-0">
            {/* Node dot on the spine */}
            <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
                className="absolute left-[18px] md:left-1/2 md:-translate-x-1/2 top-10 w-4 h-4 rounded-full bg-[#c6f023] border-[3px] border-white dark:border-zinc-950 z-10"
            />

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE, delay: index * 0.04 }}
                className={cn(
                    "flex flex-col gap-[26px] bg-white dark:bg-zinc-900/50 rounded-[30px] p-8 sm:p-12 shadow-[0_10px_20px_rgba(0,0,0,0.10)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.35)] hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(0,0,0,0.13)] transition-all duration-300",
                    isLeft
                        ? "md:col-start-1 md:mr-10 md:text-right"
                        : "md:col-start-2 md:ml-10"
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
        <main className="min-h-screen relative overflow-x-hidden">
            {/* Background wash */}
            <div className="absolute top-[8%] left-1/4 w-96 h-96 bg-[#c6f023]/10 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-[15%] right-1/4 w-96 h-96 bg-[#c6f023]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

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
                    className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.08] tracking-tight text-zinc-900 dark:text-white max-w-3xl mb-28"
                >
                    Nikhil builds fast, considered cross-platform apps
                    <br className="hidden sm:block" /> for the people on the other side of the screen
                    <span className={cn("font-normal", ACCENT)}>
                        {" "}
                        — and sweats every detail getting there.
                    </span>
                </motion.h1>

                {/* ---------------- MY STORY ---------------- */}
                <SectionHeading
                    kicker="Past few years"
                    title="My Story."
                    subtitle="From first curiosity to building cross-platform apps full-time."
                    accent
                />

                <div ref={spineRef} className="relative mt-20">
                    {/* Static track */}
                    <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[3px] bg-zinc-200 dark:bg-zinc-800" />
                    {/* Animated fill */}
                    <motion.div
                        style={{ scaleY: lineScale }}
                        className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[3px] bg-[#c6f023] origin-top"
                    />

                    <div className="flex flex-col gap-12">
                        {timelineData.map((item, i) => {
                            const isRole = Boolean(item.company);
                            const alignEnd = i % 2 === 0;
                            return (
                                <Milestone
                                    key={i}
                                    side={alignEnd ? "left" : "right"}
                                    kicker={item.kicker}
                                    index={i}
                                >
                                    {/* period + title sit as one tight group */}
                                    <div className="flex flex-col gap-1.5">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                                            {item.period}
                                        </span>
                                        <div
                                            className={cn(
                                                "flex items-center gap-2.5 flex-wrap",
                                                alignEnd && "md:justify-end"
                                            )}
                                        >
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

                                    <p className="text-base font-normal leading-[1.4] tracking-[-0.16px] text-[#707070] dark:text-zinc-400">
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
                                </Milestone>
                            );
                        })}
                    </div>
                </div>

                {/* ---------------- WHAT I'M GOOD AT ---------------- */}
                <div className="mt-32">
                    <SectionHeading
                        kicker="What I bring"
                        title="What I'm good at"
                        subtitle="Building for clarity, speed, and the person on the other side of the screen."
                    />

                    <div className="mt-16 grid sm:grid-cols-2 gap-x-10 gap-y-12">
                        {values.map((v, i) => (
                            <motion.div
                                key={v.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
                                className="relative pl-16"
                            >
                                <div className="absolute left-0 top-0 w-11 h-11 rounded-xl bg-[#c6f023] flex items-center justify-center">
                                    <v.icon className="w-5 h-5 text-zinc-950" />
                                </div>
                                <h4 className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-snug">
                                    {v.title}
                                </h4>
                                <p className="mt-3 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#707070] dark:text-zinc-400">
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
                        title="My Stacks."
                        subtitle="A lightweight stack that carries me from idea to shipped."
                        accent
                    />

                    <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                        {stack.map((tool, i) => (
                            <motion.div
                                key={`${tool.category}-${tool.name}`}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-30px" }}
                                transition={{ duration: 0.4, ease: EASE, delay: i * 0.03 }}
                                className="flex items-center gap-3 rounded-lg p-2.5 hover:bg-white dark:hover:bg-zinc-900/50 transition-colors duration-200"
                            >
                                <div className="w-12 h-12 shrink-0 rounded-xl bg-white dark:bg-zinc-900/60 shadow-[0_10px_20px_rgba(0,0,0,0.08)] flex items-center justify-center">
                                    <tool.icon className="w-5 h-5 text-[#8aa617] dark:text-[#c6f023]" />
                                </div>
                                <div className="flex flex-col gap-[5px] min-w-0">
                                    <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white leading-tight truncate">
                                        {tool.name}
                                    </span>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 leading-tight">
                                        {tool.category}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ---------------- GET IN TOUCH ---------------- */}
                <div className="mt-32 text-center">
                    <SectionHeading
                        kicker="Crafted with care"
                        title="Get in touch"
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
