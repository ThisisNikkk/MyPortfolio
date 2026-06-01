"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Zap, Globe, Star, Mail, Bot, Smartphone, Monitor } from "lucide-react";

const offerings = [
  { text: "AI agents.", icon: Bot },
  { text: "mobile apps.", icon: Smartphone },
  { text: "websites.", icon: Globe },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const secondContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, delayChildren: 0.45 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

const avatarContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const avatarVariants = {
  hidden: { scale: 0, y: 10, opacity: 0 },
  visible: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 15 },
  },
};

const starContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const starVariants = {
  hidden: { scale: 0, rotate: -25, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 200, damping: 12 },
  },
};

// GPU-composited text cycling — no filter:blur() (causes texture uploads & forced reflow)
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
    <div className="relative min-h-screen w-full antialiased overflow-hidden flex items-center pt-32 pb-16 md:pt-36 md:pb-24 lg:pt-10 lg:pb-0">

      {/* Main Container */}
      <main className="max-w-6xl w-full mx-auto px-6 flex flex-col gap-12 md:gap-16 items-start">

        {/* HERO TITLE BLOCK */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start text-left gap-6 w-full"
        >
          {/* Subtitle */}
          <motion.div variants={itemVariants} className="text-xl md:text-xl font-medium tracking-tight text-zinc-900">
            Hello, my name&apos;s{" "}
            <motion.span
              whileHover={{ scale: 1.08, rotate: -2, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="relative inline-block cursor-pointer px-3 py-1 bg-[#c6f023] text-zinc-950 rounded-[4px] md:rounded-[6px] transform rotate-1 shadow-sm leading-none align-middle font-black mx-1"
            >
              Nikhil Siwan.
            </motion.span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-[44px] sm:text-[68px] md:text-[86px] lg:text-[90px] font-black tracking-tight leading-[1.05] text-zinc-950 text-left w-full"
          >
            I build{" "}
            <motion.span
              whileHover={{ scale: 1.15, rotate: 12 }}
              whileTap={{ scale: 0.9 }}
              className="inline-flex items-center justify-center align-middle w-12 h-12 md:w-20 md:h-20 rounded-full bg-[#c6f023] mx-1 md:mx-2 shadow-sm cursor-pointer"
            >
              {/* Infinite rAF animation removed — was blocking main thread constantly */}
              <Zap className="w-6 h-6 md:w-10 md:h-10 text-zinc-950 fill-zinc-950" />
            </motion.span>{" "}
            <motion.span
              whileHover={{ scale: 1.08, rotate: -2, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="relative inline-block cursor-pointer px-4 py-1 bg-[#c6f023] text-zinc-950 rounded-[4px] md:rounded-[8px] transform rotate-1 shadow-sm leading-none align-middle font-black"
            >
              powerful
            </motion.span>
            <br />
            {/* will-change:transform pre-promotes this to a GPU compositing layer */}
            <span
              className="relative inline-flex px-4 py-2 md:py-3 bg-zinc-100 border border-zinc-200/50 text-zinc-950 rounded-[6px] md:rounded-[12px] transform -rotate-1 shadow-sm leading-none align-middle font-black mt-2 w-fit overflow-hidden"
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
                    className="inline-flex items-center justify-center align-middle w-12 h-12 md:w-20 md:h-20 rounded-full bg-white mx-1 md:mx-2 shadow-sm border border-zinc-200 shrink-0"
                  >
                    {index === 0 && <Bot className="w-6 h-6 md:w-10 md:h-10 text-zinc-800" />}
                    {index === 1 && <Smartphone className="w-6 h-6 md:w-10 md:h-10 text-zinc-800" />}
                    {index === 2 && <Globe className="w-6 h-6 md:w-10 md:h-10 text-zinc-800" />}
                  </motion.span>{" "}
                  {offerings[index].text}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>
        </motion.section>

        {/* HERO DETAILS & CTA BUTTONS */}
        <motion.section
          variants={secondContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-10 w-full"
        >
          {/* Row layout: Description & Social Proof */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-16 w-full">
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-lg text-zinc-500 font-medium leading-relaxed max-w-2xl text-left"
            >
              Transforming bold ideas into meticulously crafted digital experiences. I specialize in engineering future-ready AI agents, high-performance mobile apps, and scalable websites. Let&apos;s build something powerful together.
            </motion.p>

            {/* Social Proof (Avatars and Rating) */}
            <motion.div
              variants={itemVariants}
              className="flex flex-row items-center gap-6 justify-start shrink-0"
            >
              {/* Overlay Avatars */}
              <motion.div variants={avatarContainerVariants} className="flex -space-x-3">
                <motion.div
                  variants={avatarVariants}
                  whileHover={{ y: -8, scale: 1.15, zIndex: 10 }}
                  className="flex h-12 w-12 sm:h-8 sm:w-8 lg:h-12 lg:w-12 shrink-0 rounded-full ring-4 ring-[#f9f9fb] bg-zinc-800 items-center justify-center border border-zinc-700 shadow-sm text-white font-bold text-xs cursor-pointer select-none"
                >
                  AP
                </motion.div>
                <motion.div
                  variants={avatarVariants}
                  whileHover={{ y: -8, scale: 1.15, zIndex: 10 }}
                  className="flex h-12 w-12 sm:h-8 sm:w-8 lg:h-12 lg:w-12 shrink-0 rounded-full ring-4 ring-[#f9f9fb] bg-[#c6f023] items-center justify-center border border-zinc-400 shadow-sm text-zinc-950 font-bold text-xs cursor-pointer select-none"
                >
                  GK
                </motion.div>
                <motion.div
                  variants={avatarVariants}
                  whileHover={{ y: -8, scale: 1.15, zIndex: 10 }}
                  className="flex h-12 w-12 sm:h-8 sm:w-8 lg:h-12 lg:w-12 shrink-0 rounded-full ring-4 ring-[#f9f9fb] bg-zinc-200 items-center justify-center border border-zinc-300 shadow-sm text-zinc-800 font-bold text-xs cursor-pointer select-none"
                >
                  NS
                </motion.div>
                <motion.div
                  variants={avatarVariants}
                  whileHover={{ y: -8, scale: 1.15, zIndex: 10 }}
                  className="flex h-12 w-12 sm:h-8 sm:w-8 lg:h-12 lg:w-12 shrink-0 rounded-full ring-4 ring-[#f9f9fb] bg-zinc-950 items-center justify-center border border-zinc-800 shadow-sm text-white font-bold text-xs cursor-pointer select-none"
                >
                  US
                </motion.div>
              </motion.div>

              {/* Rating Detail */}
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-900 font-bold text-sm">5 / 5</span>
                  <motion.div variants={starContainerVariants} className="flex text-yellow-500 fill-yellow-500">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <motion.div key={i} variants={starVariants} whileHover={{ scale: 1.3, rotate: 15 }} className="cursor-pointer">
                        <Star className="w-5 h-5 fill-[#c6f023] text-[#c6f023]" />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
                <span className="text-zinc-400 text-xs font-semibold">Recommended by clients &amp; founders</span>
              </div>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex gap-3 sm:gap-4 lg:gap-8 justify-start w-full">
            {/* Button 1: Get in Touch */}
            <motion.a
              href="mailto:developer.nikk@gmail.com"
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
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
          </motion.div>
        </motion.section>

      </main>
    </div>
  );
}
