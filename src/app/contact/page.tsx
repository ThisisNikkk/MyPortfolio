"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, MapPin, Loader2 } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function ContactPage() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [iframeLoaded, setIframeLoaded] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const calTheme = resolvedTheme === "dark" ? "dark" : "light";
    const calLink = `https://cal.com/thisisnikk/30min?embed=true&theme=${calTheme}`;

    return (
        <main className="min-h-screen relative flex flex-col items-center justify-start overflow-x-hidden">
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
                            <span className="text-xs font-black tracking-[0.2em] uppercase text-zinc-400">
                                Get In Touch
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
                            Let's build something{" "}
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
                        {!iframeLoaded && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-[#0f0f11] z-10 rounded-[24px]">
                                <Loader2 className="w-8 h-8 text-zinc-900 dark:text-[#c6f023] animate-spin mb-4" />
                                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 animate-pulse">Loading calendar...</p>
                            </div>
                        )}
                        {mounted && (
                            <iframe
                                src={calLink}
                                style={{ width: "100%", height: "100%", border: "none" }}
                                title="Cal.com Booking Calendar"
                                className={`rounded-[24px] transition-opacity duration-500 w-full h-full ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                                onLoad={() => setIframeLoaded(true)}
                            />
                        )}
                    </div>
                </motion.div>

            </div>
        </main>
    );
}
