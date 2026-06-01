"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Monitor, Bot, Cpu, MoveRight, Layers, Sparkles, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

// Company logo badges for timeline
const SolarioTechLogo = () => (
    <div className="relative w-6 h-6 shrink-0 overflow-hidden rounded bg-white flex items-center justify-center border border-zinc-200 dark:border-zinc-700 shadow-sm" aria-hidden="true">
        <Image
            src="/solarioLogo.png"
            alt="SolarioTech Logo"
            width={24}
            height={24}
            className="object-contain p-0.5"
        />
    </div>
);

const BluestockLogo = () => (
    <div className="relative w-6 h-6 shrink-0 overflow-hidden rounded bg-white flex items-center justify-center border border-zinc-200 dark:border-zinc-700 shadow-sm" aria-hidden="true">
        <Image
            src="/BluestockLogo.webp"
            alt="Bluestock Fintech Logo"
            width={24}
            height={24}
            className="object-contain p-0.5"
        />
    </div>
);

const QSpidersLogo = () => (
    <div className="relative w-6 h-6 shrink-0 overflow-hidden rounded bg-white flex items-center justify-center border border-zinc-200 dark:border-zinc-700 shadow-sm" aria-hidden="true">
        <Image
            src="/qSpiderLogo.png"
            alt="QSpiders Logo"
            width={24}
            height={24}
            className="object-contain p-0.5"
        />
    </div>
);

interface TimelineItem {
    period: string;
    company: string;
    role: string;
    logo: React.ReactNode;
    description: string;
}

const timelineData: TimelineItem[] = [
    {
        period: "Jun 2024 – Jul 2024",
        company: "QSpiders",
        role: "Summer Intern",
        logo: <QSpidersLogo />,
        description: "Created responsive web applications using HTML, CSS, and JavaScript, increasing development efficiency by 20% through reusable components and mobile-first design patterns.",
    },
    {
        period: "Aug 2024 – Sep 2024",
        company: "Bluestock Fintech",
        role: "SDE Intern",
        logo: <BluestockLogo />,
        description: "Collaborated in a 5-person Agile team to build a fully responsive IPO website using Figma designs, HTML, CSS, JavaScript, and Bootstrap. Delivered remotely from Pune.",
    },
    {
        period: "Jun 2025 – Nov 2025",
        company: "SolarioTech",
        role: "Intern",
        logo: <SolarioTechLogo />,
        description: "Completed a 6-month internship focused on mobile application development, mastering React Native and building production-ready cross-platform applications.",
    },
    {
        period: "Nov 2025 – Present",
        company: "SolarioTech",
        role: "React Native Developer",
        logo: <SolarioTechLogo />,
        description: "Promoted to full-time React Native Developer. Currently building scalable cross-platform mobile applications and contributing to company's digital product roadmap.",
    },
];

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
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Drag speed modifier
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    // Keyboard Navigation for Timeline Scroll (Accessibility Feature)
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!scrollRef.current) return;
        if (e.key === "ArrowRight") {
            e.preventDefault();
            scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
        }
    };

    const renderRulerTicks = (isLast: boolean) => {
        const ticks = [];
        // Major tick (longer and darker) - originates from top
        ticks.push(
            <motion.div
                key="major"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-[1.5px] h-6 bg-zinc-800 dark:bg-zinc-200 -mt-[1px] shrink-0 origin-top"
            />
        );

        // Minor ticks spanning the column - cascading waterfall entrance
        const minorTicks = 16;
        for (let i = 0; i < minorTicks; i++) {
            ticks.push(
                <motion.div
                    key={`minor-${i}`}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.015, ease: "easeOut" }}
                    className="w-[1px] h-3 bg-zinc-200/80 dark:bg-zinc-700/80 shrink-0 origin-top"
                />
            );
        }

        if (isLast) {
            ticks.push(
                <motion.div
                    key="major-end"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: minorTicks * 0.015, ease: "easeOut" }}
                    className="w-[1.5px] h-6 bg-zinc-800 dark:bg-zinc-200 -mt-[1px] shrink-0 origin-top"
                />
            );
        }
        return ticks;
    };

    return (
        <section
            id="about"
            aria-labelledby="about-title"
            className="w-full text-zinc-950 dark:text-white py-16 md:py-24 relative overflow-hidden"
        >
            <div className="max-w-6xl w-full mx-auto px-6 relative z-10">

                {/* SECTION HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-2 mb-10 md:mb-10"
                >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c6f023] ring-4 ring-[#c6f023]/20" aria-hidden="true" />
                    <h2 id="about-title" className="text-md font-bold uppercase tracking-widest text-zinc-400">
                        01 / ABOUT ME
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
                        className="lg:col-span-2 bg-white border border-zinc-200/80 p-6 sm:p-8 md:p-10 rounded-3xl shadow-sm flex flex-col justify-between hover:border-zinc-300 hover:shadow-md transition-all duration-300 group"
                    >
                        <div>
                            <h3 className="text-2xl sm:text-3xl lg:text-[48px] font-black tracking-tight leading-[1.15] text-zinc-950 dark:text-white mb-8">
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
                        </div>
                    </motion.div>

                    {/* CARD 2: INTERACTIVE CAPABILITY VISUALIZER */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white border border-zinc-200/80 p-6 rounded-3xl shadow-sm flex flex-col justify-between hover:border-zinc-300 hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex flex-col gap-2 mb-6">
                            <span className="text-xs font-bold uppercase tracking-wider text-zinc-600">Interactive Map</span>
                            <h3 className="font-extrabold text-xl lg:text-2xl tracking-tight text-zinc-900 flex items-center gap-1.5">
                                Capability Matrix <Sparkles className="w-4 h-4 lg:w-6 lg:h-6 text-[#c6f023] fill-[#c6f023]" aria-hidden="true" />
                            </h3>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                                Hover over the nodes to explore the core engineering domains I build across — from AI to mobile.
                            </p>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                            <ConnectionVisualizer />
                        </div>
                    </motion.div>

                </motion.div>

                {/* TIMELINE SECTION (rendered cleanly outside bento cards) */}
                <div className="w-full mt-24 lg:mt-20" role="region" aria-label="Professional timeline journey">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-10"
                    >
                        <div className="flex items-center gap-2">
                            <h2 className="text-zinc-900 dark:text-white font-extrabold text-xl sm:text-2xl tracking-tight uppercase">Timeline</h2>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 select-none">
                            <span>Swipe Or Drag To Scroll</span>
                            <MoveRight className="w-3.5 h-3.5 animate-pulse" aria-hidden="true" />
                        </div>
                    </motion.div>

                    {/* DRAGGABLE RULER TIMELINE */}
                    <div className="relative w-full overflow-hidden select-none">

                        <div
                            ref={scrollRef}
                            onMouseDown={handleMouseDown}
                            onMouseLeave={handleMouseLeave}
                            onMouseUp={handleMouseUp}
                            onMouseMove={handleMouseMove}
                            onKeyDown={handleKeyDown}
                            tabIndex={0}
                            aria-label="Horizontal scrollable timeline track. Focus and use left and right arrow keys to scroll."
                            className={cn(
                                "w-full overflow-x-auto py-4 cursor-grab active:cursor-grabbing flex select-none no-scrollbar rounded-xl focus-visible:ring-2 focus-visible:ring-[#c6f023]/60 focus:outline-none",
                                isDragging && "cursor-grabbing"
                            )}
                            style={{
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                                WebkitOverflowScrolling: "touch",
                            }}
                        >
                            <div className="flex flex-row pr-24 pl-8 min-w-full">
                                {timelineData.map((item, idx) => {
                                    const isLast = idx === timelineData.length - 1;
                                    return (
                                        <div
                                            key={idx}
                                            className="w-[280px] sm:w-[320px] shrink-0 flex flex-col"
                                        >
                                            {/* Ruler ticks top block */}
                                            <div className="flex justify-between items-start h-8 w-full border-t border-zinc-200/80 dark:border-zinc-800/80 pt-0 pr-[3px] select-none pointer-events-none">
                                                {renderRulerTicks(isLast)}
                                            </div>

                                            {/* Content details block */}
                                            <div className="mt-6 flex flex-col items-start pr-8 select-none">
                                                <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 tracking-wider mb-2">
                                                    {item.period}
                                                </span>

                                                <div className="flex items-center gap-1.5 mb-3">
                                                    {item.logo}
                                                    <span className="font-extrabold text-base text-zinc-900 dark:text-white tracking-tight">
                                                        {item.company}
                                                    </span>
                                                </div>

                                                <motion.div
                                                    whileHover={{ scale: 1.08, rotate: 1, y: -2 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                                    className="px-3 py-1.5 bg-[#c6f023] text-zinc-950 text-xs font-black tracking-wide border border-zinc-900 rounded-[3px] shadow-sm transform -rotate-1 select-none cursor-pointer mb-4 inline-block origin-left leading-none"
                                                >
                                                    {item.role}
                                                </motion.div>

                                                <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm font-medium leading-relaxed text-left pointer-events-none">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
