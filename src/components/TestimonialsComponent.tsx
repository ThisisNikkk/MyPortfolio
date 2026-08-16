"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export default function TestimonialsComponent() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const handleNext = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section id="review" className="w-full py-24 md:py-20 relative z-10 overflow-hidden">
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
                                onClick={handlePrev}
                                className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-[#c6f023] hover:text-zinc-950 hover:border-[#c6f023] transition-all bg-white dark:bg-zinc-900 shadow-sm"
                                aria-label="Previous Review"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-[#c6f023] hover:text-zinc-950 hover:border-[#c6f023] transition-all bg-white dark:bg-zinc-900 shadow-sm"
                                aria-label="Next Review"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            {/* Pagination Indicators */}
                            <div className="flex gap-2 ml-4">
                                {testimonials.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setIsAutoPlaying(false);
                                            setCurrentIndex(idx);
                                        }}
                                        className={cn(
                                            "h-1.5 rounded-full transition-all duration-300",
                                            idx === currentIndex
                                                ? "w-8 bg-[#c6f023]"
                                                : "w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600"
                                        )}
                                        aria-label={`Go to review ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Spotlight Card */}
                    <div className="lg:col-span-7 relative">
                        {/* Decorative background blobs */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#c6f023]/20 to-transparent blur-3xl rounded-full pointer-events-none -z-10 opacity-50 dark:opacity-20" />

                        <div className="relative w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-8 sm:p-10 md:p-12 shadow-xl shadow-zinc-200/50 dark:shadow-none min-h-[400px] flex flex-col justify-between">
                            <Quote className="absolute top-8 right-8 w-20 h-20 text-zinc-100 dark:text-zinc-800/40 -z-0" />

                            <div className="relative z-10 flex-1 flex items-center mb-8">
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={currentIndex}
                                        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="text-xl sm:text-2xl lg:text-3xl font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed"
                                    >
                                        &quot;{testimonials[currentIndex].text}&quot;
                                    </motion.p>
                                </AnimatePresence>
                            </div>

                            <div className="relative z-10 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex items-center gap-4"
                                    >
                                        <div
                                            className={cn(
                                                "flex h-14 w-14 shrink-0 rounded-full items-center justify-center font-bold text-lg shadow-inner",
                                                testimonials[currentIndex].color
                                            )}
                                        >
                                            {testimonials[currentIndex].initials}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-zinc-950 dark:text-white text-lg">
                                                {testimonials[currentIndex].author}
                                            </span>
                                            <span className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                                                {testimonials[currentIndex].role}
                                            </span>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
