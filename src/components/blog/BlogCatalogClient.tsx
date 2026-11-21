"use client";

import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Flame,
  Play,
  ArrowRight,
  Activity,
  Smartphone,
  Cpu,
  Search,
  X,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogPost, blogCategories } from "@/data/blog";
import { EASE } from "@/components/ui/editorial";

interface BlogCatalogClientProps {
  initialPosts: BlogPost[];
}

const POSTS_PER_PAGE = 5;

export default function BlogCatalogClient({ initialPosts }: BlogCatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const lenis = useLenis();
  const reduceMotion = useReducedMotion();
  const blogTopRef = useRef<HTMLDivElement>(null);

  // Filter articles by category and search keyword
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  // Bento Slots for the current active page (exactly up to 5 posts)
  const slot1 = currentPosts[0]; // Hero Tall Card (Left)
  const slot2 = currentPosts[1]; // Signature Lime Card (Center Top)
  const slot3 = currentPosts[2]; // Media / Curve Card (Center Bottom)
  const slot4 = currentPosts[3]; // Focus Card (Right Top)
  const slot5 = currentPosts[4]; // Dedicated 5th Blog Post Card (Right Bottom)

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smoothly scroll to the top using the site's Lenis instance without locking or stalling
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 0.8,
        immediate: !!reduceMotion,
        force: true,
      });
    } else if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setCurrentPage(1);
    if (lenis) {
      lenis.scrollTo(0, { duration: 0.8, immediate: !!reduceMotion, force: true });
    } else if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }
  };

  return (
    <main ref={blogTopRef} className="min-h-screen relative overflow-x-clip text-zinc-950 dark:text-white pt-24 pb-20">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">

        {/* TOP BAR / NAVIGATION */}
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
              Portfolio Home
            </Link>
          </motion.div>

          {initialPosts[0] && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <Link
                href={`/blog/${initialPosts[0].slug}`}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 bg-white dark:bg-zinc-900 text-xs font-extrabold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white shadow-sm transition-all group"
              >
                Read Featured Essay <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          )}
        </div>

        {/* HERO TITLE ROW */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 block mb-2">
              Writing & Engineering Notes
            </span>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-zinc-950 dark:text-white leading-[0.9]">
              Blog<span className="text-[#c6f023]">.</span>
            </h1>
          </div>

          <p className="max-w-md text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
            Architectural teardowns, real-world experiments, and engineering essays on AI agents, mobile apps, and Next.js.
          </p>
        </div>

        {/* SEARCH BAR & CATEGORY FILTER PILLS */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-zinc-200/70 dark:border-zinc-800/70">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {blogCategories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 whitespace-nowrap active:scale-95",
                    isActive
                      ? "bg-[#c6f023] text-zinc-950 shadow-sm"
                      : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search essays, tags, stack..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-9 py-2.5 rounded-full text-xs font-semibold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#c6f023] focus:ring-1 focus:ring-[#c6f023] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* EMPTY STATE (WHEN NO ARTICLES MATCH SEARCH / FILTER)                     */}
        {/* ========================================================================= */}
        {filteredPosts.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center justify-center rounded-[36px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 mb-20">
            <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 mb-4">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-zinc-900 dark:text-white mb-2">
              No Articles Found
            </h3>
            <p className="text-sm text-zinc-500 max-w-sm mb-6">
              No essays match &ldquo;{searchQuery || selectedCategory}&rdquo;. Try adjusting your search query or category filters.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c6f023] text-zinc-950 text-xs font-black uppercase tracking-wider hover:brightness-105 transition-all shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SOPHISTICATED BENTO EDITORIAL GRID (EXACTLY 5 ARTICLES AT A TIME)         */}
        {/* ========================================================================= */}
        {filteredPosts.length > 0 && (
          <section aria-label="Featured Bento Grid" className="mb-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={`page-${currentPage}-${selectedCategory}-${searchQuery}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: EASE }}
                className={cn(
                  "grid gap-6 items-stretch",
                  currentPosts.length >= 4 && "grid-cols-1 lg:grid-cols-12",
                  currentPosts.length === 3 && "grid-cols-1 lg:grid-cols-12",
                  currentPosts.length === 2 && "grid-cols-1 lg:grid-cols-12",
                  currentPosts.length === 1 && "grid-cols-1 max-w-2xl mx-auto"
                )}
              >

                {/* ------------------------------------------------------------- */}
                {/* 1. LEFT COLUMN: TALL HERO CARD (Slot 1)                       */}
                {/* ------------------------------------------------------------- */}
                {slot1 && (
                  <motion.div
                    key={`slot1-${slot1.slug}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className={cn(
                      "flex flex-col",
                      currentPosts.length >= 4 && "lg:col-span-4",
                      currentPosts.length === 3 && "lg:col-span-5",
                      currentPosts.length === 2 && "lg:col-span-6",
                      currentPosts.length === 1 && "w-full"
                    )}
                  >
                    <Link
                      href={`/blog/${slot1.slug}`}
                      className="group relative flex flex-col h-full rounded-[36px] overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:border-zinc-400 dark:hover:border-zinc-700 transition-[box-shadow,border-color,transform] duration-300"
                    >
                      {/* Visual Top Showcase: Dynamic Vector Cover or Editorial Blueprint */}
                      <div className="relative w-full flex-1 min-h-[360px] bg-zinc-950 overflow-hidden flex flex-col justify-between">
                        {slot1.coverImage ? (
                          <>
                            <Image
                              src={slot1.coverImage}
                              alt={slot1.title}
                              fill
                              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                              priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-950/30 pointer-events-none" />
                          </>
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-mono text-[#c6f023] font-bold">
                                {`${slot1.category.toUpperCase()} // ARCHITECTURE`}
                              </span>
                              <span className="text-[10px] font-mono text-zinc-500">
                                {slot1.readTime}
                              </span>
                            </div>
                            <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-300">
                              <span className="text-[#c6f023] font-bold">&gt; </span>
                              Linearizability • Quorum Consensus • Network Partitions
                            </div>
                            <div className="text-[10px] font-mono text-zinc-500">
                              STATUS: REVIEWED &amp; VERIFIED
                            </div>
                          </div>
                        )}

                        {/* Top Status Header */}
                        <div className="relative z-10 p-6 flex items-center justify-between">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-300 backdrop-blur-md shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-[#c6f023] animate-pulse" />
                            {slot1.category} • {slot1.readTime}
                          </div>

                          <div className="w-9 h-9 rounded-full bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-[#c6f023] backdrop-blur-md shadow-sm group-hover:scale-105 transition-transform">
                            <Flame className="w-4 h-4 fill-[#c6f023]" />
                          </div>
                        </div>

                        {/* Bottom Indicator */}
                        <div className="relative z-10 p-6 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                          <span className="px-2.5 py-1 rounded-md bg-zinc-900/80 border border-zinc-800/80 text-[10px] text-zinc-300 backdrop-blur-sm">
                            {slot1.badge || slot1.category}
                          </span>
                          <span className="text-zinc-200 font-bold group-hover:text-[#c6f023] transition-colors flex items-center gap-1 drop-shadow">
                            Read Case Study <ArrowUpRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>

                      {/* Bottom Text Shelf (Directly meets the upper visual with 0 gap) */}
                      <div className="p-7 sm:p-8 bg-white dark:bg-zinc-900 flex flex-col gap-3 rounded-b-[36px] border-t border-zinc-100 dark:border-zinc-800 shrink-0">
                        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          <span>Category . {slot1.category}</span>
                          <span>|</span>
                          <span>{slot1.date}</span>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug text-zinc-900 dark:text-white group-hover:text-black dark:group-hover:text-[#c6f023] transition-colors duration-200">
                          {slot1.title}
                        </h2>

                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                          {slot1.description}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* 2. CENTER COLUMN: LIME ACCENT CARD + MEDIA ARCHITECTURE CARD   */}
                {/* ------------------------------------------------------------- */}
                {(slot2 || slot3) && (
                  <div className={cn(
                    "flex flex-col gap-6",
                    currentPosts.length >= 4 && "lg:col-span-5",
                    currentPosts.length === 3 && "lg:col-span-7",
                    currentPosts.length === 2 && "lg:col-span-6"
                  )}>

                    {/* LIME ACCENT EDITORIAL CARD (Slot 2) */}
                    {slot2 && (
                      <motion.div
                        key={`slot2-${slot2.slug}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
                        className="flex-1"
                      >
                        <Link
                          href={`/blog/${slot2.slug}`}
                          className="group flex flex-col justify-between h-full p-8 sm:p-9 rounded-[36px] bg-[#c6f023] text-zinc-950 shadow-sm hover:shadow-2xl transition-[box-shadow,transform] duration-300 relative overflow-hidden min-h-[280px]"
                        >
                          <div>
                            {/* Top Header Row */}
                            <div className="flex items-center justify-between mb-5">
                              <span className="text-xs font-black uppercase tracking-widest text-zinc-950/80">
                                Category . {slot2.category}
                              </span>
                              <div className="w-10 h-10 rounded-full bg-zinc-950 text-white flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-300 shadow-md">
                                <ArrowUpRight className="w-5 h-5 text-[#c6f023]" />
                              </div>
                            </div>

                            {/* Main Bold Headline */}
                            <h2
                              className={cn(
                                "font-black tracking-[-0.04em] text-zinc-950",
                                !slot3
                                  ? "text-4xl sm:text-5xl lg:text-[54px] xl:text-[62px] 2xl:text-[68px] leading-[0.98] mb-6 sm:mb-8"
                                  : "text-2xl sm:text-3xl leading-[1.1] mb-4"
                              )}
                            >
                              {slot2.title}
                            </h2>

                            {/* Summary */}
                            <p
                              className={cn(
                                "text-zinc-900 font-bold leading-relaxed",
                                !slot3
                                  ? "text-base sm:text-lg lg:text-xl max-w-2xl leading-normal"
                                  : "text-sm font-semibold line-clamp-3"
                              )}
                            >
                              {slot2.description}
                            </p>
                          </div>

                          {/* Single Article Footer: Date, Read Time & Action */}
                          <div className="mt-8 pt-6 border-t border-zinc-950/15 flex items-center justify-between text-xs font-black uppercase tracking-wider text-zinc-950">
                            <span>{slot2.date} • {slot2.readTime}</span>
                            <span className="inline-flex items-center gap-1.5 group-hover:underline">
                              Read Article <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    )}

                    {/* MEDIA / SPRING PHYSICS ARCHITECTURE CARD (Slot 3) */}
                    {slot3 && (
                      <motion.div
                        key={`slot3-${slot3.slug}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: EASE, delay: 0.16 }}
                      >
                        <Link
                          href={`/blog/${slot3.slug}`}
                          className="group relative block p-7 sm:p-8 rounded-[36px] bg-zinc-950 text-white border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-2xl transition-[box-shadow,border-color] duration-300 overflow-hidden"
                        >
                          {/* Subtle dot matrix background */}
                          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                          <div className="relative z-10 flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#c6f023]">
                              <Activity className="w-3.5 h-3.5" />
                              <span>Category . {slot3.category}</span>
                              <span>•</span>
                              <span>{slot3.readTime}</span>
                            </div>

                            <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 text-[#c6f023] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                              <Play className="w-4 h-4 fill-[#c6f023] ml-0.5" />
                            </div>
                          </div>

                          {/* Spring Physics Curve Illustration */}
                          <div className="relative z-10 my-3 h-14 w-full flex items-center">
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 300 60" fill="none">
                              <path
                                d="M0 50 Q40 50 70 10 T140 45 T210 25 T260 30 H300"
                                stroke="#c6f023"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                className="transition-all duration-500 group-hover:stroke-white"
                              />
                              <circle cx="70" cy="10" r="4" fill="#c6f023" />
                              <line x1="0" y1="30" x2="300" y2="30" stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" strokeWidth="1" />
                            </svg>
                          </div>

                          <div className="relative z-10 mt-2">
                            <h3 className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-[#c6f023] transition-colors leading-snug">
                              {slot3.title}
                            </h3>
                            <p className="mt-2 text-xs text-zinc-400 line-clamp-2">
                              {slot3.description}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* 3. RIGHT COLUMN: 2 FOCUS CARDS (Slots 4 & 5)                  */}
                {/* ------------------------------------------------------------- */}
                {(slot4 || slot5) && (
                  <div className="lg:col-span-3 flex flex-col gap-6">

                    {/* FOCUS CARD 1 (Slot 4: React Native / Focus) */}
                    {slot4 && (
                      <motion.div
                        key={`slot4-${slot4.slug}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: EASE, delay: 0.12 }}
                        className="flex-1"
                      >
                        <Link
                          href={`/blog/${slot4.slug}`}
                          className="group relative flex flex-col justify-between h-full min-h-[300px] rounded-[36px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:border-zinc-400 dark:hover:border-zinc-700 transition-[box-shadow,border-color] duration-300 p-7"
                        >
                          <div>
                            {/* Top Category Header */}
                            <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-6">
                              <span>Category . {slot4.category}</span>
                              <span className="px-2.5 py-0.5 rounded-full bg-[#c6f023] text-zinc-950 font-black text-[10px]">
                                {slot4.badge || "Hot"}
                              </span>
                            </div>

                            {/* Schematic Graphic */}
                            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-between mb-6">
                              <div className="flex items-center gap-2">
                                <Smartphone className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                                <div className="flex flex-col">
                                  <span className="text-[11px] font-bold text-zinc-900 dark:text-white">Expo Router</span>
                                  <span className="text-[10px] text-zinc-400">Native UI Thread</span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 font-bold text-zinc-900 dark:text-zinc-200">
                                60 FPS
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-black tracking-tight text-zinc-950 dark:text-white leading-snug group-hover:text-black dark:group-hover:text-[#c6f023] transition-colors duration-200">
                              {slot4.title}
                            </h3>
                          </div>

                          <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                            <span className="text-xs text-zinc-400">{slot4.readTime}</span>
                            <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-white group-hover:text-[#c6f023]">
                              Read <ArrowUpRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    )}

                    {/* FOCUS CARD 2 (Slot 5: Second Primary Green Bento Card) */}
                    {slot5 && (
                      <motion.div
                        key={`slot5-${slot5.slug}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
                        className="flex-1"
                      >
                        <Link
                          href={`/blog/${slot5.slug}`}
                          className="group relative flex flex-col justify-between h-full min-h-[300px] rounded-[36px] bg-[#c6f023] text-zinc-950 shadow-sm hover:shadow-2xl transition-[box-shadow,transform] duration-300 p-7 overflow-hidden"
                        >
                          <div>
                            {/* Top Category Header & Arrow Button */}
                            <div className="flex items-center justify-between mb-5">
                              <span className="text-xs font-black uppercase tracking-widest text-zinc-950/80">
                                Category . {slot5.category}
                              </span>
                              <div className="w-9 h-9 rounded-full bg-zinc-950 text-white flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-300 shadow-md">
                                <ArrowUpRight className="w-4 h-4 text-[#c6f023]" />
                              </div>
                            </div>

                            {/* Schematic Graphic: Protocol Stream Node (High contrast dark pill on neon lime) */}
                            <div className="p-4 rounded-2xl bg-zinc-950 text-white flex items-center justify-between mb-5 shadow-sm">
                              <div className="flex items-center gap-2.5">
                                <Cpu className="w-4 h-4 text-[#c6f023]" />
                                <div className="flex flex-col">
                                  <span className="text-[11px] font-bold text-white">JSON-RPC 2.0</span>
                                  <span className="text-[10px] text-zinc-400">SSE Streamable</span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#c6f023] font-bold text-zinc-950">
                                Active
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-black tracking-tight text-zinc-950 leading-snug">
                              {slot5.title}
                            </h3>
                          </div>

                          {/* Footer Row */}
                          <div className="mt-6 pt-4 border-t border-zinc-950/15 flex items-center justify-between text-xs font-black uppercase tracking-wider text-zinc-950">
                            <span>{slot5.readTime}</span>
                            <span className="inline-flex items-center gap-1.5 group-hover:underline">
                              Read Article <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    )}

                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </section>
        )}

        {/* ========================================================================= */}
        {/* PAGINATION CONTROLS (5 ARTICLES PER PAGE)                                */}
        {/* ========================================================================= */}
        {filteredPosts.length > 0 && totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <div className="text-xs font-mono text-zinc-500">
              Showing {(currentPage - 1) * POSTS_PER_PAGE + 1}–{Math.min(currentPage * POSTS_PER_PAGE, filteredPosts.length)} of {filteredPosts.length} Articles
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 disabled:opacity-30 disabled:pointer-events-none hover:border-zinc-400 dark:hover:border-zinc-600 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={cn(
                      "w-8 h-8 rounded-full text-xs font-black transition-all flex items-center justify-center active:scale-95",
                      currentPage === page
                        ? "bg-[#c6f023] text-zinc-950 font-black shadow-sm"
                        : "text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    )}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 disabled:opacity-30 disabled:pointer-events-none hover:border-zinc-400 dark:hover:border-zinc-600 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                Next <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
