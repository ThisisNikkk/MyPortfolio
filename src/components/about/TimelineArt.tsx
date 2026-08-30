"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * One-line-art illustrations for the "My Story" timeline — one per
 * beat, in place of the old "Add photo" placeholder frame. Every
 * drawing is a single 2.2px stroke on a 240×240 canvas, no fills,
 * round joins, currentColor so it takes the muted zinc set on the
 * wrapper. A lone element per drawing carries the site lime.
 *
 * Each stroke draws itself on once (scroll-scrubbed reveal handled by
 * the row; this is a one-shot pathLength tween keyed off `custom`).
 * ------------------------------------------------------------------ */

export type TimelineArtName = "pc" | "grad" | "team" | "voice" | "mobile";

const ACCENT = "text-[#c6f023]";

const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i = 0) => ({
        pathLength: 1,
        opacity: 1,
        transition: {
            pathLength: { delay: 0.15 + i * 0.13, duration: 0.85, ease: [0.65, 0, 0.35, 1] },
            // snap opacity so a not-yet-drawn stroke never shows as a dot
            opacity: { delay: 0.15 + i * 0.13, duration: 0.01 },
        },
    }),
};

function ArtFrame({ children }: { children: React.ReactNode }) {
    return (
        <motion.svg
            viewBox="0 0 240 240"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="h-auto w-full"
            aria-hidden="true"
        >
            {children}
        </motion.svg>
    );
}

/* Early Years — a desktop tower + monitor, a question mark left on screen. */
function PcArt() {
    return (
        <ArtFrame>
            <motion.path
                variants={draw}
                custom={0}
                d="M40 56 h128 a10 10 0 0 1 10 10 v78 a10 10 0 0 1 -10 10 H40 a10 10 0 0 1 -10 -10 V66 a10 10 0 0 1 10 -10 Z"
            />
            <motion.path variants={draw} custom={1} d="M104 154 v22 M84 178 h40" />
            <motion.path
                variants={draw}
                custom={2}
                d="M196 66 h34 a6 6 0 0 1 6 6 v78 a6 6 0 0 1 -6 6 h-34 a6 6 0 0 1 -6 -6 V72 a6 6 0 0 1 6 -6 Z"
            />
            <motion.path variants={draw} custom={3} d="M199 138 h22 M199 150 h22" />
            <motion.circle variants={draw} custom={3} cx="213" cy="82" r="3.4" />
            <motion.path
                variants={draw}
                custom={4}
                className={ACCENT}
                d="M88 92 q0 -18 20 -18 q20 0 20 18 q0 14 -18 22 q-4 3 -4 10"
            />
            <motion.circle variants={draw} custom={5} className={ACCENT} cx="106" cy="132" r="2.4" />
        </ArtFrame>
    );
}

/* The Shift — a graduation cap over a small neural graph. */
function GradArt() {
    return (
        <ArtFrame>
            <motion.path variants={draw} custom={0} d="M120 44 L198 76 L120 108 L42 76 Z" />
            <motion.circle variants={draw} custom={0} cx="120" cy="76" r="3" />
            <motion.path variants={draw} custom={1} d="M94 90 v26 q26 18 52 0 v-26" />
            <motion.path variants={draw} custom={2} d="M120 78 C150 82 174 82 174 94 L174 120" />
            <motion.circle variants={draw} custom={2} cx="174" cy="124" r="3.6" />
            <motion.path
                variants={draw}
                custom={3}
                className={ACCENT}
                d="M120 138 L74 158 M120 138 L166 158 M74 158 L104 192 M74 158 L140 192 M166 158 L104 192 M166 158 L140 192"
            />
            <motion.circle variants={draw} custom={4} className={ACCENT} cx="120" cy="138" r="4" />
            <motion.circle variants={draw} custom={4} className={ACCENT} cx="74" cy="158" r="4" />
            <motion.circle variants={draw} custom={4} className={ACCENT} cx="166" cy="158" r="4" />
            <motion.circle variants={draw} custom={5} className={ACCENT} cx="104" cy="192" r="4" />
            <motion.circle variants={draw} custom={5} className={ACCENT} cx="140" cy="192" r="4" />
        </ArtFrame>
    );
}

/* Leading & Shipping — three figures, the one in front larger and lime. */
function TeamArt() {
    const person = (cx: number, base: number, s: number, i: number, accent = false) => (
        <React.Fragment key={cx}>
            <motion.circle
                variants={draw}
                custom={i}
                className={accent ? ACCENT : undefined}
                cx={cx}
                cy={base - 40 * s}
                r={11 * s}
            />
            <motion.path
                variants={draw}
                custom={i}
                className={accent ? ACCENT : undefined}
                d={`M${cx - 20 * s} ${base} q${20 * s} ${-30 * s} ${40 * s} 0`}
            />
        </React.Fragment>
    );
    return (
        <ArtFrame>
            {person(70, 172, 0.82, 0)}
            {person(170, 172, 0.82, 1)}
            {person(120, 184, 1.08, 2, true)}
            <motion.path
                variants={draw}
                custom={3}
                className="text-zinc-300 dark:text-zinc-700"
                d="M34 198 H206"
            />
        </ArtFrame>
    );
}

/* What I Built — a speech bubble with a voice waveform inside. */
function VoiceArt() {
    return (
        <ArtFrame>
            <motion.path
                variants={draw}
                custom={0}
                d="M50 54 h140 a20 20 0 0 1 20 20 v64 a20 20 0 0 1 -20 20 H98 l-26 26 v-26 H50 a20 20 0 0 1 -20 -20 V74 a20 20 0 0 1 20 -20 Z"
            />
            <motion.path variants={draw} custom={1} d="M74 104 v20" />
            <motion.path variants={draw} custom={2} d="M97 92 v44" />
            <motion.path variants={draw} custom={3} className={ACCENT} d="M120 76 v72" />
            <motion.path variants={draw} custom={4} d="M143 92 v44" />
            <motion.path variants={draw} custom={5} d="M166 104 v20" />
        </ArtFrame>
    );
}

/* What I Do Now — a phone wired to automation nodes, one of them lime. */
function MobileArt() {
    return (
        <ArtFrame>
            <motion.path
                variants={draw}
                custom={0}
                d="M92 48 h56 a14 14 0 0 1 14 14 v116 a14 14 0 0 1 -14 14 H92 a14 14 0 0 1 -14 -14 V62 a14 14 0 0 1 14 -14 Z"
            />
            <motion.path variants={draw} custom={1} d="M112 60 h16" />
            <motion.circle variants={draw} custom={1} cx="120" cy="168" r="3" />
            <motion.path variants={draw} custom={2} d="M78 84 C62 80 54 78 46 74" />
            <motion.path variants={draw} custom={3} className={ACCENT} d="M162 100 C178 96 188 94 196 92" />
            <motion.path variants={draw} custom={4} d="M78 150 C64 150 56 152 48 154" />
            <motion.path variants={draw} custom={5} d="M162 140 C178 142 188 148 196 152" />
            <motion.circle variants={draw} custom={2} cx="42" cy="72" r="5" />
            <motion.circle variants={draw} custom={3} className={ACCENT} cx="200" cy="90" r="5" />
            <motion.circle variants={draw} custom={4} cx="44" cy="156" r="5" />
            <motion.circle variants={draw} custom={5} cx="200" cy="154" r="5" />
        </ArtFrame>
    );
}

const ART: Record<TimelineArtName, React.FC> = {
    pc: PcArt,
    grad: GradArt,
    team: TeamArt,
    voice: VoiceArt,
    mobile: MobileArt,
};

export default function TimelineArt({
    name,
    className,
}: {
    name: TimelineArtName;
    className?: string;
}) {
    const Art = ART[name];
    return (
        <div className={cn("w-full", className)}>
            <Art />
        </div>
    );
}
