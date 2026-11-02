"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";
import type { TimelineItem } from "./data";
import TimelineArt from "./TimelineArt";

/* ------------------------------------------------------------------ *
 * "My Story" as a scroll-driven chapter reel.
 *
 * Desktop: a sticky stage on the left holds the current chapter's
 * illustration, its number and its period; the chapters scroll past on
 * the right. Whichever chapter crosses the middle of the viewport is the
 * active one — it reads at full strength while the rest recede, and the
 * stage swaps to it. Phones drop the stage and show each chapter's art
 * inline, so nothing depends on side-by-side space.
 *
 * Everything the user sees moving is tied to scroll position (1:1, and
 * fully reversible), or is a critically damped spring that can be
 * interrupted mid-flight by the next chapter change.
 * ------------------------------------------------------------------ */

const pad = (n: number) => String(n).padStart(2, "0");

// No overshoot anywhere: nothing here was flung, so nothing should bounce.
const SWAP = { type: "spring" as const, bounce: 0, duration: 0.45 };

// Stage content arrives from the direction the reader is travelling —
// scrolling down brings the next chapter up from below, scrolling back
// returns the previous one from above — and leaves the opposite way.
const stageSwap = {
    enter: (dir: number) => ({ opacity: 0, y: dir * 24 }),
    center: { opacity: 1, y: 0 },
    exit: (dir: number) => ({ opacity: 0, y: dir * -24 }),
};

const isCurrent = (item: TimelineItem) => /present/i.test(item.period);

function ChapterVisual({ item, className }: { item: TimelineItem; className?: string }) {
    if (item.visual?.src) {
        return (
            <div className={cn("relative w-full h-full overflow-hidden rounded-[22px]", className)}>
                <Image src={item.visual.src} alt={item.visual.alt} fill className="object-cover" />
            </div>
        );
    }
    if (item.art) {
        return <TimelineArt name={item.art} className={cn("text-zinc-400 dark:text-zinc-600", className)} />;
    }
    return null;
}

function NowPill() {
    // Static on purpose: a slow looping pulse is exactly the kind of
    // ambient motion that wears on people, and "now" doesn't need it.
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-700 dark:text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c6f023]" aria-hidden />
            Now
        </span>
    );
}

interface ChapterProps {
    item: TimelineItem;
    index: number;
    reached: boolean;
    active: boolean;
    register: (index: number, el: HTMLElement | null) => void;
}

function Chapter({ item, index, reached, active, register }: ChapterProps) {
    const ref = useRef<HTMLElement>(null);
    const isRole = Boolean(item.company);

    // Focus is a continuous function of where the chapter sits relative to
    // the viewport, not a toggle: it brightens as it approaches the middle
    // and recedes as it leaves, frame for frame with the scroll.
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    // A wide full-strength band, so a chapter taller than the screen (common
    // on phones) stays readable for its whole length, not just its middle.
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.32, 1, 1, 0.32]);

    useEffect(() => {
        register(index, ref.current);
        return () => register(index, null);
    }, [index, register]);

    return (
        <motion.article
            ref={ref}
            data-index={index}
            style={{ opacity }}
            aria-current={active ? "step" : undefined}
            className="relative py-14 md:py-0 md:min-h-[72vh] md:flex md:flex-col md:justify-center"
        >
            <div className="relative">
                {/* Node on the rail, aligned to the chapter's first line. */}
                <span
                    aria-hidden
                    className={cn(
                        "absolute -left-[calc(2.5rem+7px)] md:-left-[calc(3.5rem+7px)] top-[3px] w-4 h-4 rounded-full border-2 transition-[background-color,border-color,transform] duration-300",
                        reached
                            ? "bg-[#c6f023] border-[#c6f023]"
                            : "bg-[var(--background)] border-zinc-300 dark:border-zinc-700",
                        active && "scale-125"
                    )}
                />

                <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs font-black tabular-nums text-zinc-400 dark:text-zinc-600">
                        {pad(index + 1)}
                    </span>
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                        {item.kicker}
                    </span>
                    {isCurrent(item) && <NowPill />}
                </div>

                {/* Phones: the stage is gone, so each chapter carries its own art. */}
                {(item.art || item.visual?.src) && (
                    <div className="md:hidden mt-6 rounded-[26px] bg-white dark:bg-zinc-900/50 shadow-[0_10px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.35)] aspect-[4/3] flex items-center justify-center p-8">
                        <ChapterVisual item={item} className="max-w-[220px]" />
                    </div>
                )}

                <p className="md:hidden mt-6 text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    {item.period}
                </p>

                <h3 className="mt-3 md:mt-5 flex items-center gap-3 flex-wrap text-3xl sm:text-4xl font-black tracking-[-0.03em] leading-[1.08] text-zinc-900 dark:text-white">
                    {isRole && item.logo}
                    <span>{isRole ? item.company : item.title}</span>
                </h3>

                {isRole && (
                    <p className="mt-2 text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        {item.role}
                    </p>
                )}

                <p className="mt-6 max-w-xl text-base font-normal leading-[1.65] tracking-[-0.01em] text-zinc-500 dark:text-zinc-400">
                    {item.description}
                </p>

                {item.highlight && (
                    // Lime as a rule beside the line, never as the text colour:
                    // lime text on white is unreadable.
                    <p className="mt-6 max-w-xl border-l-2 border-[#c6f023] pl-5 text-base font-semibold leading-[1.55] tracking-[-0.01em] text-zinc-800 dark:text-zinc-200">
                        {item.highlight}
                    </p>
                )}
            </div>
        </motion.article>
    );
}

export default function StoryTimeline({ items }: { items: TimelineItem[] }) {
    const [[active, direction], setActive] = useState<[number, number]>([0, 1]);
    const chapters = useRef<(HTMLElement | null)[]>([]);
    const railRef = useRef<HTMLDivElement>(null);
    const lenis = useLenis();
    const reduceMotion = useReducedMotion();

    const register = React.useCallback((index: number, el: HTMLElement | null) => {
        chapters.current[index] = el;
    }, []);

    // The active chapter is whichever one straddles the viewport's centre
    // line. An IntersectionObserver on a zero-height band at the middle
    // fires only when that changes, so the stage never re-renders per frame.
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    const next = Number((entry.target as HTMLElement).dataset.index);
                    setActive(([prev]) => (next === prev ? [prev, 0] : [next, next > prev ? 1 : -1]));
                }
            },
            { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
        );
        chapters.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, [items.length]);

    // The rail fills with the reader's progress through the whole story.
    const { scrollYProgress } = useScroll({ target: railRef, offset: ["start center", "end center"] });
    const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const goTo = (index: number) => {
        const el = chapters.current[index];
        if (!el) return;
        // Land the chapter on the centre line, where it becomes active.
        const offset = -(window.innerHeight / 2) + el.offsetHeight / 2;
        if (lenis) lenis.scrollTo(el, { offset, immediate: !!reduceMotion });
        else el.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
    };

    const current = items[active];

    return (
        <div className="mt-20 md:grid md:grid-cols-12 md:gap-12 lg:gap-16">
            {/* ---------- Stage (desktop) ---------- */}
            <div className="hidden md:block md:col-span-5">
                <div className="sticky top-[max(7rem,calc(50vh_-_17rem))]">
                    <div className="flex items-end justify-between gap-4">
                        <div className="flex items-baseline gap-2 tabular-nums">
                            <span className="grid text-6xl font-black leading-none tracking-[-0.04em] text-zinc-900 dark:text-white">
                                <AnimatePresence initial={false} custom={direction}>
                                    <motion.span
                                        key={active}
                                        custom={direction}
                                        variants={stageSwap}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={SWAP}
                                        className="col-start-1 row-start-1"
                                    >
                                        {pad(active + 1)}
                                    </motion.span>
                                </AnimatePresence>
                            </span>
                            <span className="text-sm font-bold text-zinc-400 dark:text-zinc-600">
                                / {pad(items.length)}
                            </span>
                        </div>
                        <span className="grid text-right text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            <AnimatePresence initial={false} custom={direction}>
                                <motion.span
                                    key={active}
                                    custom={direction}
                                    variants={stageSwap}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={SWAP}
                                    className="col-start-1 row-start-1"
                                >
                                    {current.period}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                    </div>

                    {/* Outgoing and incoming art share one grid cell, so they
                        cross over in place and a fast scroll can redirect the
                        swap at any moment instead of queueing it. */}
                    <div className="mt-6 grid aspect-square rounded-[30px] bg-white dark:bg-zinc-900/50 shadow-[0_10px_20px_rgba(0,0,0,0.10)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.35)] overflow-hidden">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={active}
                                custom={direction}
                                variants={stageSwap}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={SWAP}
                                className="col-start-1 row-start-1 flex items-center justify-center p-10 lg:p-14"
                            >
                                <ChapterVisual item={current} className="max-w-[340px]" />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Chapter navigator: where am I, where can I go. */}
                    <nav aria-label="Story chapters" className="mt-6 flex gap-1.5">
                        {items.map((item, i) => (
                            <button
                                key={item.kicker}
                                type="button"
                                onClick={() => goTo(i)}
                                aria-label={`Chapter ${i + 1}: ${item.kicker}`}
                                aria-current={i === active ? "step" : undefined}
                                className="group flex-1 h-6 flex items-center cursor-pointer active:scale-y-150 transition-transform duration-100"
                            >
                                <span
                                    className={cn(
                                        "block w-full h-1 rounded-full transition-colors duration-300",
                                        i === active
                                            ? "bg-[#c6f023]"
                                            : i < active
                                                ? "bg-zinc-400 dark:bg-zinc-600"
                                                : "bg-zinc-200 dark:bg-zinc-800 group-hover:bg-zinc-300 dark:group-hover:bg-zinc-700"
                                    )}
                                />
                            </button>
                        ))}
                    </nav>
                    <p className="mt-3 text-xs font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 grid">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.span
                                key={active}
                                custom={direction}
                                variants={stageSwap}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={SWAP}
                                className="col-start-1 row-start-1"
                            >
                                {current.kicker}
                            </motion.span>
                        </AnimatePresence>
                    </p>
                </div>
            </div>

            {/* ---------- Chapters ---------- */}
            <div ref={railRef} className="relative md:col-span-7 pl-10 md:pl-14">
                {/* Rail: a quiet track, filled in lime as the story is read. */}
                <div aria-hidden className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <motion.div
                    aria-hidden
                    style={{ scaleY: fill }}
                    className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-[#c6f023] origin-top"
                />

                {items.map((item, i) => (
                    <Chapter
                        key={item.kicker}
                        item={item}
                        index={i}
                        reached={i <= active}
                        active={i === active}
                        register={register}
                    />
                ))}
            </div>
        </div>
    );
}
