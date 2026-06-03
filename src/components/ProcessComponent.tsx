"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Goal, Blocks, Code2, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";

// Card Visualizers
const Card1Visualizer = () => {
    return (
        <div className="flex-1 flex flex-col justify-center gap-3 p-4 bg-white/40 dark:bg-zinc-950/40 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm relative overflow-hidden group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-colors duration-300">
            {/* Mock Search Bar */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 text-xs text-zinc-400 dark:text-zinc-500 mb-1">
                <Search className="w-3.5 h-3.5 text-black dark:text-[#c6f023]" />
                <span className="truncate">Searching user pain points...</span>
            </div>

            {/* Bullet Points with checkmarks */}
            <div className="space-y-2">
                {[
                    { text: "Mapping behavior & friction", done: true },
                    { text: "Defining core objectives", done: true },
                    { text: "Tech feasibility analysis", done: true }
                ].map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + idx * 0.1, duration: 0.4 }}
                        className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                        <span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#c6f023]/25 dark:bg-[#c6f023]/10 flex items-center justify-center text-zinc-800 dark:text-[#c6f023] font-bold text-[10px]">
                            ✓
                        </span>
                        <span className="truncate">{item.text}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const Card2Visualizer = () => {
    const stack = [
        { name: "Next.js" },
        { name: "React Native" },
        { name: "AI Agents" },
        { name: "Tailwind" },
        { name: "Framer Motion" }
    ];
    return (
        <div className="flex flex-wrap gap-2 pt-2">
            {stack.map((item, idx) => (
                <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/50 backdrop-blur-sm shadow-sm flex items-center gap-1.5 cursor-default hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c6f023]" />
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-none">{item.name}</span>
                </motion.div>
            ))}
        </div>
    );
};

const Card3Visualizer = () => {
    const steps = ["Plan", "Build", "Test", "Ship"];
    return (
        <div className="w-full bg-white/40 dark:bg-zinc-950/40 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 p-4 flex flex-col gap-2 mt-2 overflow-hidden relative">
            {/* Steps & Connector Lines Row */}
            <div className="flex items-center justify-between w-full relative z-10">
                {steps.map((step, idx) => (
                    <React.Fragment key={idx}>
                        <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 flex items-center justify-center text-xs font-bold text-zinc-500 dark:text-zinc-400 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-white transition-all duration-300 z-10 shrink-0">
                            {idx + 1}
                        </div>
                        {idx < steps.length - 1 && (
                            <div className="flex-1 h-0.5 bg-zinc-200 dark:bg-zinc-800/80 relative z-0">
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-[#c6f023] origin-left"
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + idx * 0.15, duration: 0.6 }}
                                    style={{ width: "100%" }}
                                />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Labels Row */}
            <div className="flex justify-between w-full relative z-10">
                {steps.map((step, idx) => (
                    <React.Fragment key={idx}>
                        <span className="text-[10px] sm:text-xs font-bold text-zinc-500 dark:text-zinc-400 w-8 text-center shrink-0">
                            {step}
                        </span>
                        {idx < steps.length - 1 && <div className="flex-1" />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

const Card4Visualizer = () => {
    return (
        <div className="w-full flex items-center justify-between gap-4 mt-2 p-4 bg-white/40 dark:bg-zinc-950/40 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50">
            {/* Left side: Lighthouse score circle */}
            <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-zinc-200 dark:text-zinc-800"
                        fill="transparent"
                    />
                    <motion.circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="#c6f023"
                        strokeWidth="3"
                        fill="transparent"
                        strokeDasharray={126}
                        initial={{ strokeDashoffset: 126 }}
                        whileInView={{ strokeDashoffset: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                    />
                </svg>
                <div className="absolute flex flex-col items-center">
                    <span className="text-[10px] font-black text-zinc-950 dark:text-white leading-none">100</span>
                    <span className="text-[5px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">Perf</span>
                </div>
            </div>

            {/* Right side: Speed statistics list */}
            <div className="flex-1 space-y-1">
                {[
                    { name: "FPS Rate", val: "120 fps", highlight: true },
                    { name: "LCP Speed", val: "0.8s", highlight: false },
                ].map((stat, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-zinc-400 dark:text-zinc-500">{stat.name}</span>
                        <span className={cn(stat.highlight ? "text-[#c6f023]" : "text-zinc-800 dark:text-zinc-200")}>
                            {stat.val}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Card5Visualizer = () => {
    return (
        <div className="w-full bg-zinc-950 rounded-2xl border border-zinc-800 p-4 mt-2 font-mono text-[9px] text-zinc-400 shadow-lg relative overflow-hidden text-left">
            <div className="flex items-center gap-1.5 pb-1.5 border-b border-zinc-900 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
                <span className="text-zinc-600 font-bold ml-1 text-[8px]">deploy.sh</span>
            </div>
            <div className="space-y-0.5">
                <p className="text-zinc-500">$ npm run deploy</p>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-emerald-400 truncate"
                >
                    ✔ Optimizations done
                </motion.p>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="text-emerald-400 truncate"
                >
                    ✔ Docs generated
                </motion.p>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 }}
                    className="text-[#c6f023] truncate"
                >
                    ✔ Deployed successfully
                </motion.p>
            </div>
        </div>
    );
};

const processSteps = [
    {
        id: 1,
        title: "Understand the problem first",
        description: "Before writing a single line of code, I dig deep into what you're actually trying to solve — your users, your goals, and where things are breaking down.",
        icon: Search,
        span: "lg:col-span-7",
        visual: Card1Visualizer
    },
    {
        id: 2,
        title: "Define scope & pick stack",
        description: "I map out what needs to be built and choose the right tools — whether that's React Native for mobile, Next.js for web, or an AI agent system — so we move fast without cutting corners.",
        icon: Goal,
        span: "lg:col-span-5",
        visual: Card2Visualizer
    },
    {
        id: 3,
        title: "Build iteratively, ship early",
        description: "I break the work into focused cycles. You see real, working software quickly — not mockups that never become reality. Each iteration gets tested and refined based on actual feedback.",
        icon: Blocks,
        span: "lg:col-span-4",
        visual: Card3Visualizer
    },
    {
        id: 4,
        title: "Engineer for performance",
        description: "Clean architecture, smooth animations, zero lag. I write code that doesn't just work today — it holds up as your product and user base grows.",
        icon: Code2,
        span: "lg:col-span-4",
        visual: Card4Visualizer
    },
    {
        id: 5,
        title: "Hand off & stay available",
        description: "You get clean, well-documented code and a smooth handoff. I don't disappear — if something comes up post-launch, I'm there to fix it fast.",
        icon: LineChart,
        span: "lg:col-span-4",
        visual: Card5Visualizer
    }
];

export default function ProcessComponent() {
    return (
        <section
            id="process"
            className="w-full text-zinc-950 dark:text-white py-24 relative z-20 overflow-clip"
        >
            {/* Background elements */}
            <div className="absolute inset-0 bg-zinc-50 dark:bg-[#09090b] -z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.15)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />

            <div className="max-w-6xl w-full mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full mb-16 text-left"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#c6f023] ring-4 ring-[#c6f023]/25" aria-hidden="true" />
                        <span className="text-xs font-black tracking-[0.2em] uppercase text-zinc-400">
                            02 / MY PROCESS
                        </span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1] max-w-2xl">
                        From the first call to production-ready code
                    </h2>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
                    {processSteps.map((step, index) => {
                        const Icon = step.icon;
                        const Visualizer = step.visual;

                        return (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className={cn(
                                    "relative overflow-hidden rounded-[28px] border border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/30 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between group hover:border-zinc-300 dark:hover:border-zinc-700/80 hover:shadow-md dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300",
                                    step.span
                                )}
                            >
                                {/* Background Hover Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent dark:from-zinc-800/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                {/* Step Label */}
                                <div className="absolute top-6 right-8 text-xs font-bold text-black dark:text-white select-none">
                                    STEP 0{step.id}
                                </div>

                                {step.id === 1 ? (
                                    <div className="flex flex-col sm:flex-row gap-6 items-stretch justify-between h-full w-full">
                                        <div className="flex-1 flex flex-col gap-4 justify-between text-left">
                                            <div className="flex flex-col gap-4">
                                                {/* Icon Container */}
                                                <div className="w-10 h-10 rounded-xl bg-black dark:bg-[#c6f023] text-white dark:text-zinc-950 flex items-center justify-center border border-transparent transition-all duration-300 group-hover:scale-105 self-start">
                                                    <Icon className="w-5 h-5" strokeWidth={2} />
                                                </div>

                                                {/* Text Section */}
                                                <div>
                                                    <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
                                                        {step.title}
                                                    </h3>
                                                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                                                        {step.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center min-w-[240px] sm:pt-6">
                                            <Visualizer />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-4 text-left w-full h-full justify-between">
                                        <div className="flex flex-col gap-4">
                                            {/* Icon Container */}
                                            <div className="w-10 h-10 rounded-xl bg-black dark:bg-[#c6f023] text-white dark:text-zinc-950 flex items-center justify-center border border-transparent transition-all duration-300 group-hover:scale-105 self-start">
                                                <Icon className="w-5 h-5" strokeWidth={2} />
                                            </div>

                                            {/* Text Section */}
                                            <div>
                                                <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
                                                    {step.title}
                                                </h3>
                                                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Interactive Visualizer */}
                                        <div className="mt-4 w-full">
                                            <Visualizer />
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
