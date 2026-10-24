"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion, type PanInfo } from "framer-motion";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
    {
        id: 1,
        text: "Collaborating with Nikhil was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Nikhil's enthusiasm for every facet of development truly stands out.",
        author: "Anjali Piuaty",
        role: "Director & CEO, OctaNet Services",
        initials: "AP",
        color: "bg-[#c6f023] text-zinc-950",
    },
    {
        id: 2,
        text: "He's an excellent communicator who took the time to truly understand our vision and offered valuable insights. His patient approach made a complex project feel easy and enjoyable.",
        author: "Ganesh Karale",
        role: "CEO of Bluestock Fintech",
        initials: "GK",
        color: "bg-[#c6f023] text-zinc-950",
    },
    {
        id: 3,
        text: "The best part about working with Nikhil is his reliability and post-launch support. He ensured a smooth deployment and has been incredibly responsive to any updates.",
        author: "Naresh Sindhu",
        role: "Founder Of Tara Co.",
        initials: "NS",
        color: "bg-[#c6f023] text-zinc-950",
    },
    {
        id: 4,
        text: "Beyond his technical skills, Nikhil has a keen eye for design and user experience. He provided invaluable suggestions that greatly improved the final product, making it beautiful and intuitive.",
        author: "Udit Sharma",
        role: "Freelance Developer",
        initials: "US",
        color: "bg-[#c6f023] text-zinc-950",
    },
];

// Content travels the way the user asked it to: "next" slides in from the
// right and leaves to the left, "previous" the reverse. Transform + opacity
// only, so the swap stays on the compositor.
const slide = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 24 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -24 }),
};

const slideTransition = { type: "spring" as const, bounce: 0, duration: 0.4 };

// Where a flick would come to rest if it kept decelerating like a native
// scroll view (Apple's projection from "Designing Fluid Interfaces"). Lets a
// short, fast swipe count as decisively as a long, slow one.
const project = (velocity: number, decelerationRate = 0.998) =>
    ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);

const SWIPE_THRESHOLD = 80;

const subscribeCoarse = (onChange: () => void) => {
    const mq = window.matchMedia("(pointer: coarse)");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
};
// Swipe is a touch affordance; on a mouse it would only fight text selection.
function useCoarsePointer() {
    return useSyncExternalStore(
        subscribeCoarse,
        () => window.matchMedia("(pointer: coarse)").matches,
        () => false
    );
}

export default function TestimonialsComponent() {
    const [[currentIndex, direction], setPage] = useState<[number, number]>([0, 1]);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isPaused, setIsPaused] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { margin: "-20% 0px" });
    const reduceMotion = useReducedMotion();
    const isCoarse = useCoarsePointer();

    // Auto-advance only while it can be read: on screen, not hovered or
    // focused, and never for people who've asked for less motion.
    const autoAdvance = isAutoPlaying && !isPaused && inView && !reduceMotion;

    useEffect(() => {
        if (!autoAdvance) return;

        const interval = setInterval(() => {
            setPage(([i]) => [(i + 1) % testimonials.length, 1]);
        }, 5000);

        return () => clearInterval(interval);
    }, [autoAdvance]);

    const paginate = (dir: number) => {
        setIsAutoPlaying(false);
        setPage(([i]) => [(i + dir + testimonials.length) % testimonials.length, dir]);
    };

    const goTo = (idx: number) => {
        setIsAutoPlaying(false);
        setPage(([i]) => [idx, idx >= i ? 1 : -1]);
    };

    const handleDragEnd = (_: unknown, info: PanInfo) => {
        const projected = info.offset.x + project(info.velocity.x);
        if (projected < -SWIPE_THRESHOLD) paginate(1);
        else if (projected > SWIPE_THRESHOLD) paginate(-1);
    };

    const current = testimonials[currentIndex];

    return (
        <section
            ref={sectionRef}
            id="review"
            className="w-full py-24 md:py-20 relative z-20 overflow-hidden"
            onPointerEnter={(e) => e.pointerType === "mouse" && setIsPaused(true)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setIsPaused(false);
            }}
        >
            {/* Background elements */}
            <div className="absolute inset-0 bg-zinc-50 dark:bg-[#09090b] -z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.1)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />

            <div className="max-w-6xl w-full mx-auto px-6 relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    {/* Left Column: Heading & Controls */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 mb-6"
                        >
                            <span className="w-2 h-2 rounded-full bg-[#c6f023] ring-4 ring-[#c6f023]/25" />
                            <span className="text-zinc-500 font-bold tracking-[0.2em] uppercase text-xs">Client Reviews</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-950 dark:text-white tracking-tight leading-[1.1] mb-6"
                        >
                            Don&apos;t just take <br />
                            <span className="relative inline-block px-2 py-0.5 text-zinc-950 font-black rounded-[4px] transform rotate-1 inline-flex leading-none align-middle mx-1">
                                <span className="relative z-10">my word</span>
                                <motion.span
                                    className="absolute inset-0 bg-[#c6f023] shadow-sm origin-left -z-10"
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                />
                            </span>
                            for it.
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-zinc-600 dark:text-zinc-400 text-lg mb-10 max-w-md"
                        >
                            I&apos;ve had the pleasure of working with ambitious founders and companies to bring their visions to life.
                        </motion.p>

                        {/* Navigation Arrows */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center gap-4"
                        >
                            <button
                                onClick={() => paginate(-1)}
                                className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-[#c6f023] hover:text-zinc-950 hover:border-[#c6f023] transition-all active:scale-90 active:duration-100 bg-white dark:bg-zinc-900 shadow-sm"
                                aria-label="Previous Review"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => paginate(1)}
                                className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-[#c6f023] hover:text-zinc-950 hover:border-[#c6f023] transition-all active:scale-90 active:duration-100 bg-white dark:bg-zinc-900 shadow-sm"
                                aria-label="Next Review"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            {/* Pagination Indicators. The visible bar stays slim; the
                                button around it is a full 24px tall to be tappable. */}
                            <div className="flex ml-3">
                                {testimonials.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => goTo(idx)}
                                        className="group h-6 px-1 flex items-center"
                                        aria-label={`Go to review ${idx + 1}`}
                                        aria-current={idx === currentIndex ? "true" : undefined}
                                    >
                                        <span
                                            className={cn(
                                                "block h-1.5 rounded-full transition-all duration-300",
                                                idx === currentIndex
                                                    ? "w-8 bg-[#c6f023]"
                                                    : "w-2 bg-zinc-300 dark:bg-zinc-700 group-hover:bg-zinc-400 dark:group-hover:bg-zinc-600"
                                            )}
                                        />
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Spotlight Card */}
                    <div className="lg:col-span-7 relative">
                        {/* Decorative background blobs */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#c6f023]/20 to-transparent blur-3xl rounded-full pointer-events-none -z-10 opacity-50 dark:opacity-20" />

                        {/* On touch the card follows the finger with a rubber-banded
                            pull, and the release is judged by where the flick would
                            land, not where the finger lifted. */}
                        <motion.div
                            drag={isCoarse ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            dragDirectionLock
                            onDragEnd={handleDragEnd}
                            role="region"
                            aria-roledescription="carousel"
                            aria-label="Client reviews"
                            className="relative w-full bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-8 sm:p-10 md:p-12 shadow-xl shadow-zinc-200/50 dark:shadow-none min-h-[400px] flex flex-col justify-between"
                        >
                            <Quote className="absolute top-8 right-8 w-20 h-20 text-zinc-100 dark:text-zinc-800/40 -z-0" />

                            {/* Outgoing and incoming quotes share one grid cell, so they
                                cross-fade in place and a new press never waits for the
                                previous exit to finish. */}
                            <div
                                className="relative z-10 flex-1 grid items-center mb-8"
                                aria-live={autoAdvance ? "off" : "polite"}
                            >
                                <AnimatePresence initial={false} custom={direction}>
                                    <motion.p
                                        key={currentIndex}
                                        custom={direction}
                                        variants={slide}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={slideTransition}
                                        className="col-start-1 row-start-1 text-xl sm:text-2xl lg:text-3xl font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed"
                                    >
                                        &quot;{current.text}&quot;
                                    </motion.p>
                                </AnimatePresence>
                            </div>

                            <div className="relative z-10 pt-8 border-t border-zinc-200 dark:border-zinc-800 grid">
                                <AnimatePresence initial={false} custom={direction}>
                                    <motion.div
                                        key={currentIndex}
                                        custom={direction}
                                        variants={slide}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={slideTransition}
                                        className="col-start-1 row-start-1 flex items-center gap-4"
                                    >
                                        <div
                                            className={cn(
                                                "flex h-14 w-14 shrink-0 rounded-full items-center justify-center font-bold text-lg shadow-inner",
                                                current.color
                                            )}
                                        >
                                            {current.initials}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-zinc-950 dark:text-white text-lg">
                                                {current.author}
                                            </span>
                                            <span className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                                                {current.role}
                                            </span>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
