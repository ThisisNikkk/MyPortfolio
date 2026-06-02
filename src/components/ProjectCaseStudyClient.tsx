"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Project, projects } from "@/data/projects";

interface ClientProps {
  project: Project;
  children: React.ReactNode;
}

export default function ProjectCaseStudyClient({ project, children }: ClientProps) {
  // Find next project for the footer teaser
  const nextProjectIndex = (projects.findIndex((p) => p.id === project.id) + 1) % projects.length;
  const nextProject = projects[nextProjectIndex];

  return (
    <div className="w-full text-zinc-950 dark:text-white pb-32 relative">
      {/* Background Dots */}
      <div className="absolute inset-0 bg-zinc-50 dark:bg-[#09090b] -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.15)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />

      <div className="max-w-4xl w-full mx-auto px-6 pt-32 relative z-10">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors duration-200 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Work
          </Link>
        </motion.div>

        {/* Hero Section Header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs md:text-sm font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block mb-3"
          >
            {project.category}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6"
          >
            <span className="relative inline-block px-4 py-1.5 text-zinc-950 font-black rounded-[8px] transform rotate-1 inline-flex leading-none align-middle">
              <span className="relative z-10">{project.title}</span>
              <motion.span
                className="absolute inset-0 bg-[#c6f023] shadow-sm origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-zinc-600 dark:text-zinc-400 text-lg md:text-2xl leading-relaxed max-w-2xl font-medium"
          >
            {project.description}
          </motion.p>
        </div>

        {/* Dynamic mockup visualization card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mb-20 md:mb-28"
        >
          {children}
        </motion.div>

        {/* Case Study Details Sections */}
        {project.caseStudy && (
          <div className="space-y-16 md:space-y-24">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="border-t border-zinc-200 dark:border-zinc-800 pt-8"
            >
              <h2 className="text-zinc-400 dark:text-zinc-500 text-xs md:text-sm font-black uppercase tracking-widest mb-6">
                Overview
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 text-lg md:text-xl leading-relaxed font-medium">
                {project.caseStudy.overview}
              </p>
            </motion.div>

            {project.caseStudy.sections.map((sec, secIdx) => (
              <motion.div
                key={sec.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="border-t border-zinc-200 dark:border-zinc-800 pt-12 md:pt-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12"
              >
                {/* Left side: Section Title */}
                <div className="md:col-span-4">
                  <h3 className="text-3xl md:text-[38px] font-black tracking-tight leading-none">
                    <span className="relative inline-block px-3 py-1 text-zinc-950 font-black rounded-[4px] transform rotate-1 inline-flex leading-none align-middle">
                      <span className="relative z-10">{sec.title}</span>
                      <motion.span
                        className="absolute inset-0 bg-[#c6f023] shadow-sm origin-left"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </span>
                  </h3>
                </div>

                {/* Right side: Detailed paragraphs & points */}
                <div className="md:col-span-8 space-y-8">
                  <p className="text-zinc-600 dark:text-zinc-400 text-lg font-medium leading-relaxed">
                    {sec.description}
                  </p>

                  <div className="space-y-6">
                    {sec.points.map((pt, ptIdx) => (
                      <div key={pt.title} className="group/item">
                        <h4 className="text-base md:text-lg font-black text-zinc-900 dark:text-white mb-2 tracking-tight group-hover/item:text-[#c6f023] transition-colors duration-200">
                          {pt.title}
                        </h4>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
                          {pt.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Footer Teaser Card to Next Project */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 md:mt-48 pt-12 border-t border-zinc-200 dark:border-zinc-800"
        >
          <span className="text-xs font-black uppercase text-zinc-400 dark:text-zinc-500 tracking-widest block mb-4">
            Next Project
          </span>
          <Link
            href={`/projects/${nextProject.id}`}
            className="group block bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800/80 p-8 md:p-12 rounded-[32px] border border-zinc-200 dark:border-zinc-800/60 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 block mb-2 uppercase">
                  {nextProject.category}
                </span>
                <h4 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight group-hover:text-[#c6f023] transition-colors duration-300">
                  {nextProject.title}
                </h4>
              </div>
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white dark:bg-zinc-950 flex items-center justify-center text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800/80 group-hover:bg-[#c6f023] group-hover:text-zinc-950 group-hover:border-[#c6f023] transition-all duration-300 shadow-inner">
                <ArrowRight className="w-6 h-6 transform group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
