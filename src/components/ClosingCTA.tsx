"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
    AnimatePresence,
    motion,
    useMotionTemplate,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from "framer-motion";
import { Check, Copy, MoveRight } from "lucide-react";
import { EASE, Highlight } from "@/components/ui/editorial";

/* ------------------------------------------------------------------ *
 * The landing page's closer, as a pass you can pick up.
 *
 * Someone who has read this far is the most ready they'll be, so the card
 * makes the next step obvious (book a call) and answers the questions
 * people have right before reaching out: is he taking work, how long is
 * the call, how fast does he reply, what time is it there right now.
 *
 * On a precise pointer the card leans toward the cursor with a glint that
 * follows it, like a focused tile on Apple TV. Each axis has its own
 * critically damped spring, so it tracks smoothly and settles without
 * wobble, and any move mid-settle simply re-targets it.
 * ------------------------------------------------------------------ */

const EMAIL = "developer.nikk@gmail.com";
// Degrees of lean at the card's edge. Enough to feel physical, not so much
// that a big card seems to swing.
const MAX_TILT = 4;
// Damping ratio 1, response 0.35s: stiffness = (2π/0.35)², damping = 2√k.
const TILT_SPRING = { stiffness: 322, damping: 36, mass: 1 };

const subscribeFinePointer = (onChange: () => void) => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
};
function useFinePointer() {
    return useSyncExternalStore(
        subscribeFinePointer,
        () => window.matchMedia("(hover: hover) and (pointer: fine)").matches,
        () => false
    );
}

/** "9:45 PM" in Chandigarh, kept current. Client-only, so it can't mismatch the server render. */
function useChandigarhTime() {
    const [time, setTime] = useState<string | null>(null);
    useEffect(() => {
        const format = new Intl.DateTimeFormat("en-US", {
            timeZone: "Asia/Kolkata",
            hour: "numeric",
            minute: "2-digit",
        });
        const tick = () => setTime(format.format(new Date()));
        tick();
        const id = window.setInterval(tick, 20_000);
        return () => window.clearInterval(id);
    }, []);
    return time;
}

function CopyEmail() {
    const [copied, setCopied] = useState(false);
    const reset = useRef<number | undefined>(undefined);
    useEffect(() => () => window.clearTimeout(reset.current), []);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            window.clearTimeout(reset.current);
            reset.current = window.setTimeout(() => setCopied(false), 2000);
        } catch {
            // No clipboard access: fall back to opening the mail app.
            window.location.href = `mailto:${EMAIL}`;
        }
    };

    return (
        <button
            type="button"
            onClick={copy}
            className="group inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl border border-zinc-200 dark:border-white/15 text-sm font-bold text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-white/[0.06] hover:border-zinc-300 dark:hover:border-white/25 active:scale-[0.97] active:duration-100 transition-[background-color,border-color,transform] duration-200"
        >
            {/* The two states share one slot and cross-fade, so the button
                never changes width when it flips to "Copied". */}
            <span className="relative grid w-4 h-4 place-items-center">
                <AnimatePresence initial={false} mode="popLayout">
                    {copied ? (
                        <motion.span key="check" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} transition={{ type: "spring", bounce: 0, duration: 0.25 }}>
                            <Check className="w-4 h-4 text-zinc-950 dark:text-[#c6f023]" />
                        </motion.span>
                    ) : (
                        <motion.span key="copy" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} transition={{ type: "spring", bounce: 0, duration: 0.25 }}>
                            <Copy className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                        </motion.span>
                    )}
                </AnimatePresence>
            </span>
            <span className="grid text-left">
                {/* Both labels occupy the same cell; the wider one sets the width. */}
                <span className={copied ? "invisible col-start-1 row-start-1" : "col-start-1 row-start-1"}>{EMAIL}</span>
                <span className={copied ? "col-start-1 row-start-1 text-zinc-950 dark:text-[#c6f023]" : "invisible col-start-1 row-start-1"}>Copied to clipboard</span>
            </span>
            <span className="sr-only" aria-live="polite">{copied ? "Email address copied" : ""}</span>
        </button>
    );
}

const details = [
    { label: "Format", value: "30-minute video call" },
    { label: "Replies", value: "Within one business day" },
    { label: "Based in", value: "Chandigarh, India (IST)" },
];

export default function ClosingCTA() {
    const reduceMotion = useReducedMotion();
    const finePointer = useFinePointer();
    const tiltEnabled = finePointer && !reduceMotion;
    const time = useChandigarhTime();

    // Pointer position over the card, 0..1 on each axis (0.5 = centre).
    const px = useMotionValue(0.5);
    const py = useMotionValue(0.5);
    const glow = useMotionValue(0);
    const rotateX = useSpring(useTransform(py, [0, 1], [MAX_TILT, -MAX_TILT]), TILT_SPRING);
    const rotateY = useSpring(useTransform(px, [0, 1], [-MAX_TILT, MAX_TILT]), TILT_SPRING);
    const glowOpacity = useSpring(glow, TILT_SPRING);
    const gx = useTransform(px, (v) => `${v * 100}%`);
    const gy = useTransform(py, (v) => `${v * 100}%`);
    // Colour comes from --glare on the card: a faint dark tint on white, a soft
    // white glint on the dark card.
    const glare = useMotionTemplate`radial-gradient(520px circle at ${gx} ${gy}, var(--glare), transparent 45%)`;

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!tiltEnabled || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
        glow.set(1);
    };
    const onPointerLeave = () => {
        px.set(0.5);
        py.set(0.5);
        glow.set(0);
    };

    return (
        <section aria-labelledby="closing-cta-title" className="relative z-20 w-full py-24 md:py-32">
            {/* Background, matching the sections above (it also has to cover
                the sticky hero underneath) */}
            <div className="absolute inset-0 bg-zinc-50 dark:bg-[#09090b] -z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.15)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />

            <div className="max-w-6xl mx-auto px-6" style={{ perspective: 1400 }}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: EASE }}
                >
                    <motion.div
                        onPointerMove={onPointerMove}
                        onPointerLeave={onPointerLeave}
                        style={tiltEnabled ? { rotateX, rotateY } : undefined}
                        className="relative overflow-hidden rounded-[32px] bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white border border-zinc-200 dark:border-zinc-800 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.18)] dark:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)] [--glare:rgba(0,0,0,0.035)] dark:[--glare:rgba(255,255,255,0.09)] will-change-transform"
                    >
                        {/* A soft lime bloom in one corner, and the cursor glint. */}
                        <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 w-[28rem] h-[28rem] rounded-full bg-[#c6f023]/[0.08] blur-3xl" />
                        {tiltEnabled && (
                            <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glare, opacity: glowOpacity }} />
                        )}

                        <div className="relative p-8 sm:p-12 lg:p-16">
                            {/* Status line */}
                            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.18em]">
                                <span className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                                    {/* Static on purpose: a pulsing dot is ambient motion with no meaning. */}
                                    <span aria-hidden className="w-2 h-2 rounded-full bg-[#c6f023]" />
                                    Open to new work
                                </span>
                                <span className="text-zinc-400 dark:text-zinc-500 tabular-nums normal-case tracking-normal font-semibold text-sm">
                                    {time ? `It's ${time} in Chandigarh` : " "}
                                </span>
                            </div>

                            <h2
                                id="closing-cta-title"
                                className="mt-10 sm:mt-14 font-black tracking-[-0.045em] leading-[1.02] text-[clamp(2.75rem,8vw,6.5rem)]"
                            >
                                Have something
                                <br />
                                <span className="inline-block mt-[0.2em]">
                                    <Highlight>in mind?</Highlight>
                                </span>
                            </h2>

                            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
                                Thirty minutes to talk through what you&apos;re building, who it&apos;s for,
                                and whether I&apos;m the right person for it.
                            </p>

                            <div className="mt-12 sm:mt-16 border-t border-dashed border-zinc-300 dark:border-white/15 pt-8 sm:pt-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
                                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
                                    {details.map((d) => (
                                        <div key={d.label}>
                                            <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500">{d.label}</dt>
                                            <dd className="mt-1.5 text-sm font-bold text-zinc-900 dark:text-white">{d.value}</dd>
                                        </div>
                                    ))}
                                </dl>

                                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                                    <Link
                                        href="/contact"
                                        className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#c6f023] text-zinc-950 text-sm font-black uppercase tracking-wider hover:shadow-[0_10px_30px_-8px_rgba(198,240,35,0.55)] active:scale-[0.97] active:duration-100 transition-[box-shadow,transform] duration-200"
                                    >
                                        Book a call
                                        <MoveRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                                    </Link>
                                    <CopyEmail />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
