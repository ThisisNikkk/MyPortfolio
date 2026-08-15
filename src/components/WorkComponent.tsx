"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { projects } from "@/data/projects";

const categories = [
    "Web Design",
    "Mobile Applications",
    "AI Projects",
    "Agentic Workflow",
];

const ProjectCard = ({ project }: { project: any }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // Subtle parallax effect on the image container inside the card
    const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4 mb-16 lg:mb-24 group"
        >
            <div className="flex flex-col gap-2 mb-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight">
                    {project.title}
                </h3>
                <p className="w-full text-zinc-500 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                    {project.description}
                </p>
            </div>

            <Link href={`/projects/${project.id}`} className="block relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-[32px] overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 cursor-pointer shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <motion.div
                    style={{ y }}
                    className={cn("absolute -inset-[15%] bg-gradient-to-br w-[130%] h-[130%]", project.color)}
                >
                    {/* Placeholder shown behind the image, and alone when no mockupImage exists yet */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
                </motion.div>

                {project.mockupImage && (
                    <img
                        src={project.mockupImage}
                        alt={`${project.title} preview`}
                        className="absolute inset-0 w-full h-full object-cover z-[5]"
                    />
                )}

                {/* Hover Overlay - kept outside the parallax layer so it stays centred while scrolling */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-zinc-950/20 backdrop-blur-sm z-10">
                    <div className="bg-white text-zinc-950 px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 ease-out shadow-xl">
                        View Project <ArrowUpRight className="w-4 h-4" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default function WorkComponent() {
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const lenis = useLenis();

    const filteredProjects = projects.filter(p => p.category === activeCategory);

    // Switching category swaps in a shorter/taller list than whatever the
    // user had scrolled through, so snap back to the top of the section —
    // otherwise a pick made near the bottom leaves the new list's cards
    // scrolled out of view.
    const handleCategoryClick = (cat: string) => {
        setActiveCategory(cat);
        const section = document.getElementById("work");
        if (section) {
            lenis?.scrollTo(section, { offset: -32, duration: 1 });
        }
    };

    return (
        <section
            id="work"
            aria-labelledby="work-title"
            className="w-full text-zinc-950 dark:text-white py-24 relative z-20 shadow-[0_-30px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_-30px_60px_rgba(0,0,0,0.5)]"
        >
            {/* Background elements */}
            <div className="absolute inset-0 bg-zinc-50 dark:bg-[#09090b] -z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.15)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />

            <div className="max-w-6xl w-full mx-auto px-6 relative z-10">

                {/* Grid Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Left Sticky Sidebar */}
                    <div className="lg:col-span-4 relative">
                        <div className="lg:sticky lg:top-32 flex flex-col gap-10 z-20 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-sm py-4 lg:py-0 lg:bg-transparent lg:dark:bg-transparent lg:backdrop-blur-none -mx-6 px-6 lg:mx-0 lg:px-0">
                            <motion.h2
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                id="work-title"
                                className="text-4xl sm:text-5xl lg:text-[48px] font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1]"
                            >
                                Selected{" "}
                                <span className="relative inline-block px-2 py-0.5 text-zinc-950 font-black rounded-[4px] transform rotate-1 inline-flex leading-none align-middle mx-1">
                                    <span className="relative z-10">Projects</span>
                                    <motion.span
                                        className="absolute inset-0 bg-[#c6f023] shadow-sm origin-left"
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    />
                                </span>
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                                className="flex flex-row lg:flex-col gap-2 items-start overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 no-scrollbar"
                            >
                                {categories.map((cat) => {
                                    const isActive = activeCategory === cat;
                                    return (
                                        <button
                                            key={cat}
                                            onClick={() => handleCategoryClick(cat)}
                                            className={cn(
                                                "px-5 py-2.5 rounded-full text-sm sm:text-base font-bold transition-colors duration-300 relative whitespace-nowrap",
                                                isActive
                                                    ? "text-zinc-950"
                                                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                                            )}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeCategoryBg"
                                                    className="absolute inset-0 bg-white rounded-full -z-10 shadow-sm border border-zinc-200 dark:border-zinc-800/50"
                                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                                />
                                            )}
                                            <span>{cat}</span>
                                        </button>
                                    );
                                })}
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Scrollable Content */}
                    <div className="lg:col-span-8 lg:pl-10 xl:pl-16 mt-8 lg:mt-0 min-h-[50vh]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                {filteredProjects.length > 0 ? (
                                    filteredProjects.map((project) => (
                                        <ProjectCard key={project.id} project={project} />
                                    ))
                                ) : (
                                    <div className="text-zinc-500 dark:text-zinc-400 py-10 font-medium">
                                        More projects arriving soon.
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
