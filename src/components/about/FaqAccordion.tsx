"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { faqs } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Single-column FAQ accordion.
 *
 * Deliberately one stack rather than two columns: side-by-side columns have to
 * either share a height (so expanding one grows the other) or run at different
 * heights (so their dividers stop lining up). One column has neither problem —
 * an open answer only ever pushes the rows beneath it.
 *
 * Constrained to a 3xl measure inside the page's 5xl shell so the answers stay
 * a comfortable reading length rather than running the full width.
 *
 * One answer open at a time, so the section keeps a predictable height.
 *
 * Spacing note: the answer gets its gap from the row's own padding, never from
 * a negative margin. The animating wrapper is overflow-hidden — which makes it
 * a block formatting context — so a negative margin inside would lift the first
 * line above the clip edge and shear it off.
 */
export default function FaqAccordion() {
    const [openQuestion, setOpenQuestion] = useState<string | null>(null);

    return (
        <div className="mt-16 max-w-3xl mx-auto border-t border-zinc-200 dark:border-zinc-800">
            {faqs.map((faq, i) => {
                const isOpen = openQuestion === faq.question;
                const id = `faq-answer-${i}`;

                return (
                    <motion.div
                        key={faq.question}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
                        className="border-b border-zinc-200 dark:border-zinc-800"
                    >
                        <button
                            type="button"
                            onClick={() =>
                                setOpenQuestion(isOpen ? null : faq.question)
                            }
                            aria-expanded={isOpen}
                            aria-controls={id}
                            className="w-full flex items-center gap-5 sm:gap-7 py-6 text-left cursor-pointer group"
                        >
                            <span
                                aria-hidden
                                className={cn(
                                    "text-xs font-black tabular-nums tracking-wider transition-colors duration-300",
                                    isOpen
                                        ? "text-[#c6f023]"
                                        : "text-zinc-400 dark:text-zinc-600"
                                )}
                            >
                                {String(i + 1).padStart(2, "0")}
                            </span>

                            <span className="flex-1 text-lg sm:text-xl font-extrabold tracking-tight leading-snug text-zinc-900 dark:text-white">
                                {faq.question}
                            </span>

                            {/* A plus turned 45° reads as a close affordance
                                without swapping the icon mid-animation. */}
                            <span
                                aria-hidden
                                className={cn(
                                    "shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300",
                                    isOpen
                                        ? "bg-[#c6f023] border-[#c6f023] text-zinc-950 rotate-45"
                                        : "border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 group-hover:border-zinc-900 dark:group-hover:border-white group-hover:text-zinc-900 dark:group-hover:text-white"
                                )}
                            >
                                <Plus className="w-4 h-4" />
                            </span>
                        </button>

                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    id={id}
                                    key="answer"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.35, ease: EASE }}
                                    className="overflow-hidden"
                                >
                                    <p className="pb-7 pl-9 sm:pl-11 pr-12 text-base font-normal leading-[1.6] tracking-[-0.16px] text-zinc-500 dark:text-zinc-400">
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );
}
