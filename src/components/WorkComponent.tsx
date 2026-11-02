"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { projects, Project } from "@/data/projects";
import FadeImage from "@/components/ui/FadeImage";
import { heroImagesOf, preloadImages, whenIdle } from "@/lib/preload-images";

const categories = [
    "Web Design",
    "Mobile Applications",
    "AI Projects",
];

// The gradient placeholder, parallaxed as the card crosses the viewport. Split
// out so the scroll subscription only exists for cards that actually show it:
// once a project has a mockupImage the image covers this layer completely, and
// the transform was being recomputed every frame for something invisible.
const ParallaxPlaceholder = ({ project }: { project: Project }) => {
    const layerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: layerRef,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
    // Scroll-linked motion values bypass MotionConfig, so opt out here.
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            ref={layerRef}
            style={reduceMotion ? undefined : { y }}
            className={cn("absolute -inset-[15%] bg-gradient-to-br w-[130%] h-[130%]", project.color)}
        >
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
        </motion.div>
    );
};

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 lg:mb-24"
        >
            {/* The whole card is one link: title, description and image. Before,
                only the image was clickable, so tapping the title did nothing. */}
            <Link
                href={`/projects/${project.id}`}
                // Intent to open: warm the case-study hero so it's decoded and
                // in cache before the route even renders.
                onPointerEnter={() => preloadImages(heroImagesOf(project))}
                onFocus={() => preloadImages(heroImagesOf(project))}
                onTouchStart={() => preloadImages(heroImagesOf(project))}
                className="group flex flex-col gap-4 rounded-[32px] cursor-pointer"
            >
                <div className="flex flex-col gap-2 mb-2">
                    <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight">
                        {project.title}
                    </h3>
                    <p className="w-full text-zinc-500 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                        {project.description}
                    </p>
                    {/* Touch screens never see the hover overlay, so they get a
                        plain, always-visible cue instead. */}
                    <span className="[@media(hover:hover)]:hidden mt-1 inline-flex items-center gap-1 text-sm font-bold text-zinc-900 dark:text-white">
                        View project <ArrowUpRight className="w-4 h-4" />
                    </span>
                </div>

                <div className="block relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-[32px] overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm group-hover:shadow-md transition-[box-shadow,transform] duration-300 group-active:scale-[0.99] group-active:duration-100">
                    {project.mockupImage ? (
                        // The aspect box above reserves the space, so the thumbnail
                        // can only fade in over the card's own background — never
                        // shift the layout or paint in strips.
                        <FadeImage
                            src={project.mockupImage}
                            alt={`${project.title} preview`}
                            width={1200}
                            height={655}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover z-[5]"
                        />
                    ) : (
                        <ParallaxPlaceholder project={project} />
                    )}

                    {/* Hover Overlay - kept outside the parallax layer so it stays centred while scrolling.
                        The blur is gated on hover: as a resting backdrop-filter it made the browser
                        re-read and blur the card's backdrop every scroll frame while fully transparent. */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-zinc-950/20 group-hover:backdrop-blur-sm z-10">
                        <div className="bg-white text-zinc-950 px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 ease-out shadow-xl">
                            View Project <ArrowUpRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

/**
 * The project grid. On the homepage it's a section that slides up over the
 * sticky hero; with `asPage` it's the whole /work route, so its heading is
 * the page's h1 and it clears the fixed navbar instead of casting a shadow
 * onto a hero that isn't there.
 */
export default function WorkComponent({ asPage = false }: { asPage?: boolean }) {
    const Heading = asPage ? motion.h1 : motion.h2;
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const lenis = useLenis();
    const reduceMotion = useReducedMotion();

    const filteredProjects = projects.filter(p => p.category === activeCategory);

    // Every thumbnail, across all categories, fetched and decoded once the
    // page goes idle (~200KB total). A category switch then paints its cards
    // from cache in the same frame instead of loading each one in view.
    useEffect(() => whenIdle(() => preloadImages(projects.map((p) => p.mockupImage))), []);

    // On phones the category pills scroll sideways with no scrollbar, so the
    // last one just looked cut off. Fade whichever edge has more pills past
    // it, and only that edge: no fade at the start before you've scrolled,
    // none at the end once you're there. Desktop never overflows, so no fade.
    const pillsRef = useRef<HTMLDivElement>(null);
    const [pillEdges, setPillEdges] = useState({ start: false, end: false });
    useEffect(() => {
        const el = pillsRef.current;
        if (!el) return;
        const update = () => {
            const max = el.scrollWidth - el.clientWidth;
            const start = el.scrollLeft > 2;
            const end = el.scrollLeft < max - 2;
            setPillEdges((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
        };
        update();
        el.addEventListener("scroll", update, { passive: true });
        const observer = new ResizeObserver(update);
        observer.observe(el);
        return () => {
            el.removeEventListener("scroll", update);
            observer.disconnect();
        };
    }, []);
    const pillMask =
        pillEdges.start || pillEdges.end
            ? `linear-gradient(to right, ${pillEdges.start ? "transparent 0, #000 28px" : "#000 0"}, ${pillEdges.end ? "#000 calc(100% - 40px), transparent 100%" : "#000 100%"})`
            : undefined;

    // Switching category swaps in a shorter/taller list than whatever the
    // user had scrolled through, so snap back to the top of the section —
    // otherwise a pick made near the bottom leaves the new list's cards
    // scrolled out of view.
    const handleCategoryClick = (cat: string, pill: HTMLElement) => {
        setActiveCategory(cat);
        // A pill tapped while half off-screen slides fully into view.
        const row = pillsRef.current;
        if (row && row.scrollWidth > row.clientWidth) {
            row.scrollTo({ left: pill.offsetLeft - 24, behavior: reduceMotion ? "auto" : "smooth" });
        }
        const section = document.getElementById("work");
        if (section) {
            lenis?.scrollTo(section, { offset: -32, duration: 1, immediate: !!reduceMotion });
        }
    };

    return (
        <section
            id="work"
            aria-labelledby="work-title"
            className={cn(
                "w-full text-zinc-950 dark:text-white relative z-20",
                asPage
                    ? "min-h-screen pt-32 pb-24"
                    : "py-24 shadow-[0_-30px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_-30px_60px_rgba(0,0,0,0.5)]"
            )}
        >
            {/* Background elements */}
            <div className="absolute inset-0 bg-zinc-50 dark:bg-[#09090b] -z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.15)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />

            <div className="max-w-6xl w-full mx-auto px-6 relative z-10">

                {/* Grid Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Left Sticky Sidebar */}
                    <div className="lg:col-span-4 relative">
                        {/* No material here: below lg this column isn't sticky, so it
                            never floats over content and a blur would have nothing to blur. */}
                        <div className="lg:sticky lg:top-32 flex flex-col gap-10 z-20 py-4 lg:py-0">
                            <Heading
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
                            </Heading>

                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                                ref={pillsRef}
                                style={pillMask ? { maskImage: pillMask, WebkitMaskImage: pillMask } : undefined}
                                className="flex flex-row lg:flex-col gap-2 items-start overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 no-scrollbar"
                            >
                                {categories.map((cat) => {
                                    const isActive = activeCategory === cat;
                                    return (
                                        <button
                                            key={cat}
                                            onClick={(e) => handleCategoryClick(cat, e.currentTarget)}
                                            className={cn(
                                                "px-5 py-2.5 rounded-full text-sm sm:text-base font-bold transition-[color,transform] duration-300 active:scale-95 active:duration-100 relative whitespace-nowrap",
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
                    <div className="relative lg:col-span-8 lg:pl-10 xl:pl-16 mt-8 lg:mt-0 min-h-[50vh]">
                        {/* popLayout, not wait: the new list starts the instant a pill is
                            tapped while the old one fades out on top, so quick taps
                            redirect immediately instead of queueing behind an exit. */}
                        <AnimatePresence mode="popLayout" initial={false}>
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
                                exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeOut" } }}
                                className="w-full"
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
