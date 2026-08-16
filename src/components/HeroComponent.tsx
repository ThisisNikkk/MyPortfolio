"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Zap, Globe, Mail, Bot, Smartphone, Monitor } from "lucide-react";

const offerings = [
  { text: "AI agents.", icon: Bot },
  { text: "mobile apps.", icon: Smartphone },
  { text: "websites.", icon: Globe },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const subtitleVariants = {
  hidden: { y: 25, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 20 },
  },
};

const nameBadgeVariants = {
  hidden: { scale: 0, rotate: -10, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 1,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 220, damping: 12, delay: 0.15 },
  },
};

const headlineVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 22, delay: 0.25 },
  },
};

const zapCircleVariants = {
  hidden: { scale: 0, rotate: -45, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 240, damping: 14, delay: 0.4 },
  },
};

const powerfulBadgeVariants = {
  hidden: { scale: 0, rotate: -10, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 1,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 220, damping: 12, delay: 0.5 },
  },
};

const cycleContainerVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 140, damping: 20, delay: 0.6 },
  },
};

const descriptionVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 20, delay: 0.75 },
  },
};

const cta1Variants = {
  hidden: { y: 15, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 140, damping: 18, delay: 0.9 },
  },
};

const cta2Variants = {
  hidden: { y: 15, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 140, damping: 18, delay: 1.0 },
  },
};

// GPU-composited text cycling
const textCycleVariants = {
  initial: { y: 20, opacity: 0, scale: 0.96 },
  animate: { y: 0, opacity: 1, scale: 1 },
  exit: { y: -20, opacity: 0, scale: 0.96 },
};

const iconCycleVariants = {
  initial: { scale: 0.6, rotate: -20 },
  animate: { scale: 1, rotate: 0 },
};

export default function HeroComponent() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % offerings.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full antialiased overflow-hidden flex items-center justify-center pt-32 pb-16 md:pt-36 md:pb-24 lg:pt-10 lg:pb-0 lg:sticky lg:top-0 z-10">

      {/* Main Container */}
      <main className="max-w-6xl w-full mx-auto px-6 flex flex-col gap-12 md:gap-16 items-center text-center">

        {/* HERO TITLE BLOCK */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 w-full"
        >
          {/* Subtitle */}
          <motion.div variants={subtitleVariants} className="text-lg sm:text-xl lg:text-2xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Hello, my name&apos;s{" "}
            <motion.span
              whileHover={{ scale: 1.08, rotate: -2, y: -2 }}
              whileTap={{ scale: 0.95 }}
              variants={nameBadgeVariants}
              className="relative inline-block cursor-pointer px-3 py-1 bg-[#c6f023] text-zinc-950 rounded-[4px] md:rounded-[6px] transform rotate-1 shadow-sm leading-none align-middle font-black mx-1"
            >
              Nikhil Siwan.
            </motion.span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={headlineVariants}
            className="text-[48px] sm:text-[76px] md:text-[84px] lg:text-[90px] xl:text-[112px] font-black tracking-tight leading-[1.05] text-zinc-950 w-full dark:text-white"
          >
            I build{" "}
            <motion.span
              whileHover={{ scale: 1.15, rotate: 12 }}
              whileTap={{ scale: 0.9 }}
              variants={zapCircleVariants}
              className="inline-flex items-center justify-center align-middle w-10 h-10 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full bg-[#c6f023] mx-1 md:mx-2 shadow-sm cursor-pointer"
            >
              <Zap className="w-5 h-5 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-zinc-950 fill-zinc-950" />
            </motion.span>{" "}
            <motion.span
              whileHover={{ scale: 1.08, rotate: -2, y: -2 }}
              whileTap={{ scale: 0.95 }}
              variants={powerfulBadgeVariants}
              className="relative inline-block cursor-pointer px-4 py-1 bg-[#c6f023] text-zinc-950 rounded-[4px] md:rounded-[8px] transform rotate-1 shadow-sm leading-none align-middle font-black"
            >
              powerful
            </motion.span>
            <br />
            {/* will-change:transform pre-promotes this to a GPU compositing layer */}
            <motion.span
              variants={cycleContainerVariants}
              className="relative inline-flex px-4 py-2 md:py-3 bg-zinc-100 border border-zinc-200/50 text-zinc-950 rounded-[6px] md:rounded-[12px] transform -rotate-1 shadow-sm leading-none align-middle font-black mt-4 lg:mt-6 w-fit mx-auto overflow-hidden"
              style={{ willChange: "transform" }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  variants={textCycleVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center gap-2 md:gap-4 whitespace-nowrap"
                >
                  <motion.span
                    variants={iconCycleVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.05 }}
                    className="inline-flex items-center justify-center align-middle w-10 h-10 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full bg-white mx-1 md:mx-2 shadow-sm border border-zinc-200 shrink-0"
                  >
                    {index === 0 && <Bot className="w-5 h-5 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-zinc-800" />}
                    {index === 1 && <Smartphone className="w-5 h-5 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-zinc-800" />}
                    {index === 2 && <Globe className="w-5 h-5 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-zinc-800" />}
                  </motion.span>{" "}
                  {offerings[index].text}
                </motion.span>
              </AnimatePresence>
            </motion.span>
          </motion.h1>
        </motion.section>

        {/* HERO DETAILS & CTA BUTTONS */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-10 w-full"
        >
          {/* Row layout: Description & Social Proof */}
          <div className="flex flex-col items-center justify-center gap-8 w-full">
            <motion.p
              variants={descriptionVariants}
              className="text-base sm:text-lg lg:text-xl text-zinc-500/90 dark:text-zinc-400/90 font-medium leading-relaxed max-w-2xl text-center"
            >
              Crafting digital experiences with pixel-perfect execution. I specialize at the intersection of design, engineering, and artificial intelligence.
            </motion.p>

          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 sm:gap-4 lg:gap-6 justify-center w-full">
            {/* Button 1: Get in Touch */}
            <motion.a
              href="mailto:developer.nikk@gmail.com"
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              variants={cta1Variants}
              className="flex-1 sm:flex-none justify-center bg-zinc-900 text-white font-bold text-sm sm:text-md lg:text-lg px-4 py-3.5 sm:px-6 sm:py-4 lg:px-8 lg:py-5 rounded-xl inline-flex items-center gap-2 sm:gap-3 lg:gap-4 shadow-md transition-shadow duration-200 group"
            >
              <motion.div
                variants={{ hover: { rotate: [-10, 10, -10, 10, 0] } }}
                transition={{ duration: 0.5 }}
                className="flex items-center"
              >
                <Mail className="w-5 h-5 lg:w-6 lg:h-6 text-white transition-transform duration-200 group-hover:scale-110" />
              </motion.div>
              Get in Touch
            </motion.a>

            {/* Button 2: View Portfolio */}
            <motion.a
              href="https://github.com/ThisisNikkk"
              target="_blank"
              rel="noopener noreferrer"
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              variants={cta2Variants}
              className="flex-1 sm:flex-none justify-center bg-white text-zinc-900 border border-zinc-200/80 font-bold text-sm sm:text-md lg:text-lg px-4 py-3.5 sm:px-6 sm:py-4 lg:px-6 lg:py-4 rounded-xl inline-flex items-center gap-2 sm:gap-3 lg:gap-4 shadow-sm transition-shadow duration-200 group"
            >
              <motion.div
                variants={{ hover: { rotate: 360, scale: 1.15 } }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Monitor className="w-5 h-5 lg:w-6 lg:h-6 text-black transition-transform duration-200 group-hover:scale-110" />
              </motion.div>
              See My Portfolio
            </motion.a>
          </div>
        </motion.section>

      </main>
    </div>
  );
}
