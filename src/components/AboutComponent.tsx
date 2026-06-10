"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Monitor, Bot, Cpu, MoveRight, Layers, Sparkles, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

// Connection Visualizer Sub-Component
function ConnectionVisualizer() {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    const nodes = [
        { id: "ai", label: "AI Agents", icon: Bot, x: "25%", y: "25%" },
        { id: "mobile", label: "Mobile", icon: Smartphone, x: "75%", y: "25%" },
        { id: "design", label: "UI/UX", icon: Layers, x: "25%", y: "75%" },
        { id: "web", label: "Web Apps", icon: Monitor, x: "75%", y: "75%" },
    ];

    return (
        <div
            className="w-full h-full min-h-[260px] relative bg-zinc-950 rounded-2xl overflow-hidden flex items-center justify-center p-6 border border-zinc-800"
            role="region"
            aria-label="Capability Interaction Map"
        >
            {/* Grid Pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:16px_16px] opacity-25" />

            {/* SVG Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                {/* Connection lines from center to outer nodes */}
                {nodes.map((node, i) => {
                    const isHovered = hoveredNode === node.id || hoveredNode === null;
                    return (
                        <motion.line
                            key={i}
                            x1="50%"
                            y1="50%"
                            x2={node.x}
                            y2={node.y}
                            stroke={isHovered ? "#3f3f46" : "#18181b"}
                            strokeWidth={isHovered ? "1.5" : "1"}
                            strokeDasharray={isHovered ? "4 4" : "none"}
                            animate={isHovered ? { strokeDashoffset: [0, -20] } : {}}
                            transition={{ repeat: Infinity, ease: "linear", duration: 1.5 }}
                        />
                    );
                })}
            </svg>

            {/* Central Node */}
            <motion.div
                className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center z-10 relative cursor-pointer group"
                whileHover={{ scale: 1.1 }}
                tabIndex={0}
                aria-label="Core Engineering & Design"
            >
                <div className="absolute inset-0 rounded-full bg-[#c6f023]/20 animate-ping opacity-60 pointer-events-none" />
                <div className="absolute inset-2 rounded-full bg-[#c6f023]/10 animate-pulse pointer-events-none" />
                <Cpu className="w-6 h-6 text-white group-hover:text-[#c6f023] transition-colors duration-300" aria-hidden="true" />
            </motion.div>

            {/* Outer Nodes */}
            {nodes.map((node) => {
                const Icon = node.icon;
                const isHovered = hoveredNode === node.id;
                return (
                    <motion.div
                        key={node.id}
                        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-10 cursor-pointer"
                        style={{ left: node.x, top: node.y }}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        whileHover={{ scale: 1.1 }}
                        tabIndex={0}
                        aria-label={`${node.label} capability node`}
                    >
                        <div
                            className={cn(
                                "w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-300",
                                isHovered
                                    ? "bg-[#c6f023] border-zinc-950 text-zinc-950 shadow-[0_0_15px_rgba(198,240,35,0.4)]"
                                    : "bg-zinc-900 border-zinc-800 text-zinc-400"
                            )}
                        >
                            <Icon className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <span
                            className={cn(
                                "text-[10px] font-bold uppercase tracking-wider select-none transition-colors duration-200",
                                isHovered ? "text-[#c6f023]" : "text-zinc-500"
                            )}
                        >
                            {node.label}
                        </span>
                    </motion.div>
                );
            })}
        </div>
    );
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 120, damping: 20 },
    },
};

export default function AboutComponent() {
    return (
        <>
            <div id="about" className="w-full h-0 pointer-events-none" aria-hidden="true" />
            <section
                aria-labelledby="about-title"
                className="w-full text-zinc-950 dark:text-white py-16 md:py-24 lg:py-10 relative overflow-clip lg:sticky lg:top-0 lg:min-h-screen lg:flex lg:flex-col lg:justify-center z-10"
            >
                {/* Background elements */}
                <div className="absolute inset-0 bg-white dark:bg-[#09090b] -z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.15)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />

                <div className="max-w-6xl w-full mx-auto px-6 relative z-10">


                    {/* SECTION HEADER */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-full mb-8 text-left"
                    >
                        <h2 id="about-title" className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1] max-w-2xl">
                            The{" "}
                            <span className="relative inline-block px-2 py-0.5 text-zinc-950 font-black rounded-[4px] transform rotate-1 inline-flex leading-none align-middle mx-1">
                                <span className="relative z-10">Person</span>
                                <motion.span
                                    className="absolute inset-0 bg-[#c6f023] shadow-sm origin-left -z-10"
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                />
                            </span>{" "}
                            Behind The Work
                        </h2>
                    </motion.div>

                    {/* BENTO GRID LAYOUT */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 w-full"
                    >

                        {/* CARD 1: MY STORY (Spans 2 columns on desktop) */}
                        <motion.div
                            variants={itemVariants}
                            className="lg:col-span-2 bg-white border border-zinc-200/80 p-6 sm:p-8 md:p-8 rounded-3xl shadow-sm flex flex-col justify-between hover:border-zinc-300 hover:shadow-md transition-all duration-300 group"
                        >
                            <div>
                                <h3 className="text-2xl sm:text-3xl lg:text-[38px] md:text-[42px] font-black tracking-tight leading-[1.15] text-zinc-950 mb-4">
                                    I transform bold ideas into meticulously crafted digital experiences that are{" "}
                                    <span className="relative inline-block px-2.5 py-1 text-zinc-950 font-black rounded-[4px] transform rotate-1 inline-flex leading-none align-middle mx-1">
                                        <span className="relative z-10">built to last.</span>
                                        <motion.span
                                            className="absolute inset-0 bg-[#c6f023] shadow-sm origin-left"
                                            initial={{ scaleX: 0 }}
                                            whileInView={{ scaleX: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                        />
                                    </span>
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-500 font-medium text-sm sm:text-base leading-relaxed">
                                    <p>
                                        I&apos;m a software developer who specialises in engineering future-ready digital products.
                                        From autonomous AI agent systems and high-performance mobile apps to scalable web platforms,
                                        I obsess over shipping clean, fast, and reliable software that solves real problems.
                                    </p>
                                    <p>
                                        I believe great software starts with a deep understanding of the user and ends with
                                        pixel-perfect execution. Every line of code is a design decision — and I treat both
                                        with equal intent, proving that engineering excellence and beautiful experience are never at odds.
                                    </p>
                                </div>

                                <div className="mt-8 flex justify-start">
                                    <Link
                                        href="/about"
                                        className="inline-flex items-center gap-2 text-zinc-950 dark:text-white hover:text-[#c6f023] dark:hover:text-[#c6f023] font-bold text-sm uppercase tracking-wider bg-zinc-100 hover:bg-zinc-900 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-5 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md group"
                                    >
                                        <span>View Full Journey & Timeline</span>
                                        <MoveRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>

                        {/* CARD 2: INTERACTIVE CAPABILITY VISUALIZER */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white border border-zinc-200/80 p-6 rounded-3xl shadow-sm flex flex-col justify-between hover:border-zinc-300 hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex flex-col gap-2 mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-zinc-600">Interactive Map</span>
                                <h3 className="font-extrabold text-xl lg:text-2xl tracking-tight text-zinc-900 flex items-center gap-1.5">
                                    Capability Matrix <Sparkles className="w-4 h-4 lg:w-6 lg:h-6 text-[#c6f023] fill-[#c6f023]" aria-hidden="true" />
                                </h3>
                                <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                                    Hover over the nodes to explore the core engineering domains I build across — from AI to mobile.
                                </p>
                            </div>
                            <div className="flex-1 flex items-center justify-center">
                                <ConnectionVisualizer />
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </section>
        </>
    );
}
