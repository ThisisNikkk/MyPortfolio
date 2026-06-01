"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Zap, Globe, Star, Mail, Bot, Smartphone } from "lucide-react";

const offerings = [
  { text: "AI agents.", icon: Bot },
  { text: "mobile apps.", icon: Smartphone },
  { text: "websites.", icon: Globe },
];

export default function HeroComponent() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % offerings.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
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

  return (
    <div className="relative min-h-screen w-full antialiased overflow-hidden flex items-center pt-32 pb-16 md:pt-36 md:pb-24 lg:pt-10">

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
          <motion.div variants={itemVariants} className="text-xl md:text-2xl font-medium tracking-tight text-zinc-900">
            Hello, my name&apos;s{" "}
            <span className="relative inline-block px-3 py-1 bg-[#c6f023] text-zinc-950 rounded-[4px] md:rounded-[6px] transform rotate-1 shadow-sm leading-none align-middle font-black mx-1">
              Nikhil Siwan.
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-[44px] sm:text-[68px] md:text-[86px] lg:text-[100px] font-black tracking-tight leading-[1.05] text-zinc-950 text-left w-full"
          >
            I build{" "}
            <span className="inline-flex items-center justify-center align-middle w-12 h-12 md:w-20 md:h-20 rounded-full bg-[#c6f023] mx-1 md:mx-2 shadow-sm">
              <Zap className="w-6 h-6 md:w-10 md:h-10 text-zinc-950 fill-zinc-950" />
            </span>{" "}
            <span className="relative inline-block px-4 py-1 bg-[#c6f023] text-zinc-950 rounded-[4px] md:rounded-[8px] transform rotate-1 shadow-sm leading-none align-middle font-black">
              powerful
            </span>
            <br />
            <span className="relative inline-flex px-4 py-2 md:py-3 bg-zinc-100 border border-zinc-200/50 text-zinc-950 rounded-[6px] md:rounded-[12px] transform -rotate-1 shadow-sm leading-none align-middle font-black mt-2 w-fit overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="inline-flex items-center gap-2 md:gap-4 whitespace-nowrap"
                >
                  <span className="inline-flex items-center justify-center align-middle w-12 h-12 md:w-20 md:h-20 rounded-full bg-white mx-1 md:mx-2 shadow-sm border border-zinc-200 shrink-0">
                    {index === 0 && <Bot className="w-6 h-6 md:w-10 md:h-10 text-zinc-800" />}
                    {index === 1 && <Smartphone className="w-6 h-6 md:w-10 md:h-10 text-zinc-800" />}
                    {index === 2 && <Globe className="w-6 h-6 md:w-10 md:h-10 text-zinc-800" />}
                  </span>{" "}
                  {offerings[index].text}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>
        </motion.section>

        {/* HERO DETAILS & CTA BUTTONS */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-10 w-full"
        >
          {/* Row layout: Description & Social Proof */}
          <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-16 w-full">
            <p className="text-lg md:text-xl text-zinc-500 font-medium leading-relaxed max-w-2xl text-left">
              Transforming bold ideas into meticulously crafted digital experiences. I specialize in engineering future-ready AI agents, high-performance mobile apps, and scalable websites. Let’s build something powerful together.            </p>
            {/* Social Proof (Avatars and Rating) */}
            <div className="flex flex-row items-center gap-6 justify-start shrink-0">
              {/* Overlay Avatars (Client initials from old portfolio testimonials) */}
              <div className="flex -space-x-3">
                <div className="flex h-12 w-12 sm:h-8 sm:w-8 lg:h-12 lg:w-12 shrink-0 rounded-full ring-4 ring-[#f9f9fb] bg-zinc-800 items-center justify-center border border-zinc-700 shadow-sm text-white font-bold text-xs">AP</div>
                <div className="flex h-12 w-12 sm:h-8 sm:w-8 lg:h-12 lg:w-12 shrink-0 rounded-full ring-4 ring-[#f9f9fb] bg-[#c6f023] items-center justify-center border border-zinc-400 shadow-sm text-zinc-950 font-bold text-xs">GK</div>
                <div className="flex h-12 w-12 sm:h-8 sm:w-8 lg:h-12 lg:w-12 shrink-0 rounded-full ring-4 ring-[#f9f9fb] bg-zinc-200 items-center justify-center border border-zinc-350 shadow-sm text-zinc-800 font-bold text-xs">NS</div>
                <div className="flex h-12 w-12 sm:h-8 sm:w-8 lg:h-12 lg:w-12 shrink-0 rounded-full ring-4 ring-[#f9f9fb] bg-zinc-950 items-center justify-center border border-zinc-800 shadow-sm text-white font-bold text-xs">US</div>
              </div>

              {/* Rating Detail */}
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-900 font-bold text-sm">5 / 5</span>
                  <div className="flex text-yellow-500 fill-yellow-500">
                    <Star className="w-5 h-5 fill-[#c6f023] text-[#c6f023]" />
                    <Star className="w-5 h-5 fill-[#c6f023] text-[#c6f023]" />
                    <Star className="w-5 h-5 fill-[#c6f023] text-[#c6f023]" />
                    <Star className="w-5 h-5 fill-[#c6f023] text-[#c6f023]" />
                    <Star className="w-5 h-5 fill-[#c6f023] text-[#c6f023]" />
                  </div>
                </div>
                <span className="text-zinc-400 text-xs font-semibold">Recommended by clients & founders</span>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex gap-3 sm:gap-4 justify-start w-full">
            {/* Button 1: Get in Touch */}
            <a
              href="mailto:developer.nikk@gmail.com"
              className="flex-1 sm:flex-none justify-center bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm sm:text-md px-4 py-3.5 sm:px-6 sm:py-4 rounded-xl inline-flex items-center gap-2 sm:gap-3 shadow-md transition-all duration-200 group"
            >
              <Mail className="w-5 h-5 text-white" />
              Get in Touch
            </a>

            {/* Button 2: View GitHub */}
            <a
              href="https://github.com/ThisisNikkk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none justify-center bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-200/80 font-bold text-sm sm:text-md px-4 py-3.5 sm:px-6 sm:py-4 rounded-xl inline-flex items-center gap-2 sm:gap-3 shadow-sm transition-all duration-200"
            >
              <div className="w-5 h-5 rounded-full bg-[#c6f023]/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4.5 h-4.5 text-zinc-900"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-4.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-4.5.28-1.15.28-2.35 0-4.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 4.5A5.403 5.403 0 0 0 4 9c0 4.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </div>
              View GitHub
            </a>
          </motion.div>
        </motion.section>

      </main>
    </div>
  );
}


