"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Bot, Cpu, MoveRight, Layers, Sparkles, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom high-fidelity brand SVGs for timeline with screen reader titles
const AmazonLogo = () => (
    <svg className="w-5 h-5 text-zinc-950 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <title>Amazon Logo</title>
        <path d="M18.57 15.32c-.82.63-2.14 1.05-3.32 1.05-1.82 0-3.41-.86-3.41-3.23 0-2.68 2.05-3.23 4.86-3.23.45 0 .91.05 1.36.09v-.36c0-1.09-.59-1.68-1.95-1.68-1.18 0-2.45.41-3.27.91l-.55-1.32c1.09-.68 2.86-1.14 4.41-1.14 2.5 0 3.73 1.23 3.73 3.59v4.27c0 1.09.41 1.64.82 2.14h-1.86c-.23-.32-.36-.95-.41-1.14zm-1.36-4.05c-.41-.05-.86-.09-1.27-.09-1.55 0-2.5.32-2.5 1.64 0 .91.68 1.41 1.73 1.41 1.23 0 1.95-.64 2.05-1.73v-1.23zm3.14 7.32c-3.14 2.18-8.23 2.91-12.05 2.18-2.82-.55-5.32-1.91-7.14-3.95l1.18-1.09c1.55 1.73 3.68 2.91 6.09 3.36 3.23.59 7.55 0 10.36-1.77l1.56 1.27zm-11.82-3c.18-.32.41-.64.59-.91l.82 1.09c-.32.32-.68.64-1.05.91l-.36-1.09z" />
    </svg>
);

const DesignboatLogo = () => (
    <svg className="w-5 h-5 text-zinc-950 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <title>Designboat Logo</title>
        <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm6 14.3l-6 3.7-6-3.7V8.7l6-3.7 6 3.7v8.6z" />
        <path d="M12 7l4 2.5v5L12 17l-4-2.5v-5L12 7z" />
    </svg>
);

const CommerceIQLogo = () => (
    <span className="font-sans font-black text-[11px] tracking-tighter text-zinc-950 select-none bg-zinc-100 px-1 py-0.5 rounded leading-none shrink-0 border border-zinc-200" aria-hidden="true">
        IQ
    </span>
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
        period: "2015 - 2018",
        company: "Amazon",
        role: "Team Lead",
        logo: <AmazonLogo />,
        description: "Led development of core front-end customer experiences. Managed high-performance UI optimization frameworks.",
    },
    {
        period: "2019",
        company: "Designboat",
        role: "Design Trainee",
        logo: <DesignboatLogo />,
        description: "Immersed in design systems, vector grids, interface heuristics, and rapid digital prototyping methodologies.",
    },
    {
        period: "2019 - 2022",
        company: "CommerceIQ",
        role: "Product Designer",
        logo: <CommerceIQLogo />,
        description: "Owned design end-to-end for core supply chain SaaS platforms. Translated dense data tables into elegant dashboard UI.",
    },
    {
        period: "2022 - 2025",
        company: "CommerceIQ",
        role: "Sr. Product Designer",
        logo: <CommerceIQLogo />,
        description: "Spearheaded advanced interactive flows, mobile strategy, and design systems for enterprise SaaS solutions.",
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
                className="w-[1.5px] h-6 bg-zinc-800 -mt-[1px] shrink-0 origin-top"
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
                    className="w-[1px] h-3 bg-zinc-200/80 shrink-0 origin-top"
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
                    className="w-[1.5px] h-6 bg-zinc-800 -mt-[1px] shrink-0 origin-top"
                />
            );
        }
        return ticks;
    };

    return (
        <section
            id="about"
            aria-labelledby="about-title"
            className="w-full text-zinc-950 py-16 md:py-24 relative overflow-hidden"
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
                            <h3 className="text-2xl sm:text-3xl lg:text-[48px] font-black tracking-tight leading-[1.15] text-zinc-950 mb-8">
                                I bridge the gap between creative visual architecture and advanced engineering to build tools that{" "}
                                <span className="relative inline-block px-2.5 py-1 text-zinc-950 font-black rounded-[4px] transform rotate-1 inline-flex leading-none align-middle mx-1">
                                    <span className="relative z-10">feel alive.</span>
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
                                    As an engineer and interactive designer, I specialize in building highly responsive digital systems.
                                    Whether shaping fast web apps, native mobile platforms, or orchestrating autonomous AI agent chains,
                                    my focus is on rendering perfect, low-latency interfaces that prioritize usability.
                                </p>
                                <p>
                                    My philosophy balances typographic clarity, dynamic motion, and minimal decoration.
                                    Every component is optimized for performance and crafted with consistent design tokens,
                                    proving that code structure and visual design are deeply interconnected.
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
                            <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                                Hover over the satellite nodes to visualize connections and active processing channels.
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
                            <h2 className="text-zinc-900 font-extrabold text-xl sm:text-2xl tracking-tight uppercase">Timeline</h2>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 select-none">
                            <span>Swipe Or Drag To Scroll</span>
                            <MoveRight className="w-3.5 h-3.5 animate-pulse" aria-hidden="true" />
                        </div>
                    </motion.div>

                    {/* DRAGGABLE RULER TIMELINE */}
                    <div className="relative w-full overflow-hidden select-none">
                        {/* Fades for scroll boundaries */}
                        <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
                        <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

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
                                            <div className="flex justify-between items-start h-8 w-full border-t border-zinc-200/80 pt-0 pr-[3px] select-none pointer-events-none">
                                                {renderRulerTicks(isLast)}
                                            </div>

                                            {/* Content details block */}
                                            <div className="mt-6 flex flex-col items-start pr-8 select-none">
                                                <span className="text-xs font-bold text-zinc-500 tracking-wider mb-2">
                                                    {item.period}
                                                </span>

                                                <div className="flex items-center gap-1.5 mb-3">
                                                    {item.logo}
                                                    <span className="font-extrabold text-base text-zinc-900 tracking-tight">
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

                                                <p className="text-zinc-600 text-xs sm:text-sm font-medium leading-relaxed text-left pointer-events-none">
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
