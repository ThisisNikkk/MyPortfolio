"use client";

import React, { useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Loader2, Target, PenTool, Paperclip } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

// Location already sits in the header, so this only adds what it doesn't say.
const callFacts = [
    { label: "Timezone", value: "IST (UTC+5:30)" },
    { label: "Replies", value: "Within one business day" },
];

const callPoints = [
    {
        icon: Target,
        title: "Good fits",
        text: "AI agents and assistants, React Native products, and design systems for SaaS teams that have outgrown ad-hoc components.",
    },
    {
        icon: PenTool,
        title: "How I work",
        text: "Design and engineering in the same pair of hands, so there is no handoff gap between the mockup and what actually ships.",
    },
    {
        icon: Paperclip,
        title: "Bring along",
        text: "Whatever you already have: a rough brief, a Figma file, a live product, or just the problem written down in a paragraph.",
    },
];

const emptySubscribe = () => () => {};
// Hydration-safe "has this mounted on the client" check, without the
// cascading re-render a useState+useEffect combo would cause.
function useMounted() {
    return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export default function ContactPage() {
    const { resolvedTheme } = useTheme();
    const mounted = useMounted();

    // Cal.com only takes its theme from the URL, so a theme switch means a new
    // iframe. Rather than blanking the calendar while that loads, the one on
    // screen stays put until the new one is ready, then the new one fades in
    // over it and the old one is dropped.
    type CalTheme = "light" | "dark";
    const calTheme: CalTheme = resolvedTheme === "dark" ? "dark" : "light";
    const [shownTheme, setShownTheme] = useState<CalTheme | null>(null);
    const [retiringTheme, setRetiringTheme] = useState<CalTheme | null>(null);
    const calLink = (theme: CalTheme) => `https://cal.com/thisisnikk/30min?embed=true&theme=${theme}`;

    const handleCalLoad = (theme: CalTheme) => {
        if (theme === shownTheme) return;
        setRetiringTheme(shownTheme);
        setShownTheme(theme);
        // Matches the 500ms opacity transition on the incoming frame.
        window.setTimeout(() => setRetiringTheme(null), 520);
    };

    // Old frame underneath, current on top, a pending one hidden until loaded.
    const calFrames = [retiringTheme, shownTheme, calTheme].filter(
        (t, i, all): t is CalTheme => t !== null && all.indexOf(t) === i
    );

    return (
        // overflow-x-clip, not -hidden: `hidden` would compute overflow-y to
        // auto and make this a nested scroll container competing with Lenis.
        <main className="min-h-screen relative flex flex-col items-center justify-start overflow-x-clip">
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c6f023]/20 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="max-w-6xl w-full mx-auto px-6 pt-32 pb-16 z-10 flex flex-col gap-12">

                {/* Top Row: Typography & Info */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="lg:col-span-8 flex flex-col"
                    >
                        <div className="inline-flex items-center gap-2 mb-4">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#c6f023] ring-4 ring-[#c6f023]/20" aria-hidden="true" />
                            <span className="text-xs font-black tracking-[0.2em] uppercase text-zinc-500 dark:text-zinc-400">
                                Get In Touch
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
                            Let&apos;s build something{" "}
                            <span className="relative inline-block px-2 py-0.5 text-zinc-950 font-black rounded-[4px] transform rotate-1 inline-flex leading-none align-middle mx-1">
                                <span className="relative z-10">extraordinary.</span>
                                <motion.span
                                    className="absolute inset-0 bg-[#c6f023] shadow-sm origin-left -z-10"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                />
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="lg:col-span-4 flex flex-row lg:flex-col gap-6 justify-start lg:justify-end text-sm text-zinc-600 dark:text-zinc-400"
                    >
                        <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-zinc-900 dark:text-[#c6f023]" />
                            <span className="font-medium text-zinc-900 dark:text-white">developer.nikk@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-zinc-900 dark:text-[#c6f023]" />
                            <span className="font-medium text-zinc-900 dark:text-white">Chandigarh, India</span>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Row: Cal.com Iframe Embed spanning full width */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative w-full"
                >
                    {/* Decorative frame */}
                    <div className="absolute -inset-4 bg-zinc-200/30 dark:bg-zinc-800/20 rounded-[40px] -z-10 blur-xl" />

                    <div className="bg-white dark:bg-[#0f0f11] border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-1 sm:p-2 shadow-2xl overflow-hidden h-[700px] relative w-full flex items-center justify-center">
                        {shownTheme === null && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-[#0f0f11] z-20 rounded-[24px]">
                                <Loader2 className="w-8 h-8 text-zinc-900 dark:text-[#c6f023] animate-spin mb-4" />
                                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 animate-pulse">Loading calendar...</p>
                            </div>
                        )}
                        {mounted &&
                            calFrames.map((theme) => {
                                const isShown = theme === shownTheme;
                                const isRetiring = theme === retiringTheme;
                                return (
                                    <iframe
                                        key={theme}
                                        src={calLink(theme)}
                                        title="Cal.com Booking Calendar"
                                        aria-hidden={!isShown}
                                        tabIndex={isShown ? undefined : -1}
                                        onLoad={() => handleCalLoad(theme)}
                                        className={cn(
                                            "absolute inset-1 sm:inset-2 w-[calc(100%-0.5rem)] sm:w-[calc(100%-1rem)] h-[calc(100%-0.5rem)] sm:h-[calc(100%-1rem)] rounded-[24px] border-none transition-opacity duration-500",
                                            isShown ? "opacity-100 z-10" : isRetiring ? "opacity-100 z-0" : "opacity-0 z-0 pointer-events-none"
                                        )}
                                    />
                                );
                            })}
                    </div>
                </motion.div>

                {/* What the call covers. Also the page's only real prose —
                    a booking iframe is invisible to a crawler, which left this
                    page with almost no text for anyone verifying the practice
                    is real before making contact. */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12"
                >
                    <div className="lg:col-span-5">
                        <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
                            Before you book
                        </p>
                        <h2 className="mt-4 text-3xl sm:text-4xl font-black leading-[1.1] tracking-tight text-zinc-900 dark:text-white">
                            What the call covers
                        </h2>
                        <p className="mt-5 text-base leading-[1.6] text-zinc-500 dark:text-zinc-400">
                            Thirty minutes, no pitch deck. We talk through what
                            you are building, who it is for, and what has to be
                            true for it to work. You leave with a clear read on
                            scope, a rough timeline, and an honest answer about
                            whether I am the right person for it.
                        </p>
                        <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-dashed border-zinc-300 dark:border-zinc-800 pt-6">
                            {callFacts.map((f) => (
                                <div key={f.label}>
                                    <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500">{f.label}</dt>
                                    <dd className="mt-1.5 text-sm font-bold text-zinc-900 dark:text-white">{f.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    {/* Same boxy dashed grid as About's "What I'm good at", so
                        the three points read as separate cards rather than
                        more paragraphs on mobile. */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 self-start border-t border-l border-dashed border-zinc-300 dark:border-zinc-800">
                        {callPoints.map((p) => (
                            <div key={p.title} className="border-r border-b border-dashed border-zinc-300 dark:border-zinc-800 p-6">
                                <p.icon className="w-5 h-5 text-zinc-950 dark:text-[#c6f023]" />
                                <h3 className="mt-4 text-base font-extrabold tracking-tight text-zinc-900 dark:text-white">
                                    {p.title}
                                </h3>
                                <p className="mt-2 text-sm leading-[1.6] text-zinc-500 dark:text-zinc-400">
                                    {p.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.section>

            </div>
        </main>
    );
}
