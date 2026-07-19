"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import { capabilityNodes } from "./data";

export default function CapabilityMatrix() {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    return (
        <div
            className="w-full h-full min-h-[260px] relative bg-zinc-950 rounded-2xl overflow-hidden flex items-center justify-center p-6 border border-zinc-800"
            role="region"
            aria-label="Capability Interaction Map"
        >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:16px_16px] opacity-25" />

            <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                {capabilityNodes.map((node, i) => {
                    const isActive = hoveredNode === node.id || hoveredNode === null;
                    return (
                        <motion.line
                            key={i}
                            x1="50%"
                            y1="50%"
                            x2={node.x}
                            y2={node.y}
                            stroke={isActive ? "#3f3f46" : "#18181b"}
                            strokeWidth={isActive ? "1.5" : "1"}
                            strokeDasharray={isActive ? "4 4" : "none"}
                            animate={isActive ? { strokeDashoffset: [0, -20] } : {}}
                            transition={{ repeat: Infinity, ease: "linear", duration: 1.5 }}
                        />
                    );
                })}
            </svg>

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

            {capabilityNodes.map((node) => {
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
                            <Icon className="w-5 h-5" />
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
