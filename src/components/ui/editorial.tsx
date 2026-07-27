"use client";

import React from "react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ *
 * Shared editorial primitives for the long-form pages (/about and the
 * /projects/[id] case studies). Extracted so the two can't drift apart
 * the way they had — the case study was still on the older treatment
 * (lime box around the h1, plain rules between sections) while /about
 * had moved on to centred headings and a single accented phrase.
 * ------------------------------------------------------------------ */

export const EASE = [0.16, 1, 0.3, 1] as const;

export const ACCENT = "text-[#c6f023]";

/**
 * Lime highlight box for one phrase inside a heading — the same treatment the
 * homepage hero gives "powerful", scaled down for section headings. The heading
 * itself stays zinc/white and only the highlighted phrase carries the accent,
 * rather than tinting the whole line.
 */
export function Highlight({ children }: { children: React.ReactNode }) {
    return (
        <span className="relative inline-block px-3 py-1 mx-0.5 bg-[#c6f023] text-zinc-950 rounded-[6px] md:rounded-[10px] rotate-1 shadow-sm leading-none align-middle">
            {children}
        </span>
    );
}

export function SectionHeading({
    kicker,
    title,
    subtitle,
}: {
    kicker: string;
    /** Wrap the phrase to accent in <Highlight> rather than tinting the lot. */
    title: React.ReactNode;
    subtitle: string;
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
            {/* leading-[1.15], not tighter: the highlight box needs the extra
                room so it can't collide with the line above on wrapped titles. */}
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.15] tracking-tight text-zinc-900 dark:text-white">
                {title}
            </h2>
            <p className="mt-5 text-base font-normal leading-[1.5] tracking-[-0.16px] text-zinc-500 dark:text-zinc-400">
                {subtitle}
            </p>
        </motion.div>
    );
}
