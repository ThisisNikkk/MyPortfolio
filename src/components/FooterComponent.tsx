"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// Pixel art character definitions (7xN grids)
const CHAR_MAP: Record<string, number[][]> = {
    'N': [
        [1, 0, 0, 0, 1],
        [1, 1, 0, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 0, 1]
    ],
    'i': [
        [0, 1, 0],
        [0, 0, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ],
    'k': [
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 0, 0],
        [1, 0, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 0, 1]
    ],
    'h': [
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 1, 1, 0],
        [1, 1, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1]
    ],
    'l': [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
    ],
    'S': [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0]
    ],
    'w': [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0]
    ],
    'a': [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 1],
        [0, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 1]
    ],
    'n': [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 0, 1, 1, 0],
        [1, 1, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1]
    ],
    ' ': [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
};

const TEXT_TO_RENDER = "Nikhil Siwan";

// Build 2D pixel grid representing the text
const charGrids = TEXT_TO_RENDER.split("").map(c => CHAR_MAP[c] || CHAR_MAP[' ']);
const textHeight = 7;
const textCols = charGrids.reduce((sum, g) => sum + g[0].length, 0) + charGrids.length - 1;

const textGrid: number[][] = Array(textHeight).fill(null).map(() => Array(textCols).fill(0));

let colOffset = 0;
charGrids.forEach((grid) => {
    const charWidth = grid[0].length;
    for (let r = 0; r < textHeight; r++) {
        for (let c = 0; c < charWidth; c++) {
            textGrid[r][colOffset + c] = grid[r][c];
        }
    }
    colOffset += charWidth + 1; // 1 column spacing between letters
});

export default function FooterComponent() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 160 });

    // Responsive Grid calculation
    useEffect(() => {
        if (!containerRef.current) return;
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                setDimensions({ width, height });
            }
        });
        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    // Compute dynamic cell size based on container width to prevent overflow
    const padding = 32; // 16px padding on each side
    const computedCellSize = Math.floor((dimensions.width - padding) / textCols);
    const cellSize = Math.min(18, Math.max(5, computedCellSize));

    const gridCols = Math.max(textCols, Math.floor(dimensions.width / cellSize));
    const gridRows = Math.max(textHeight, Math.floor(dimensions.height / cellSize));

    // Center text within calculated grid
    const startCol = Math.floor((gridCols - textCols) / 2);
    const startRow = Math.floor((gridRows - textHeight) / 2);

    // Generate coordinate array of active cells (memoized to prevent re-runs)
    const activeCells = React.useMemo(() => {
        const cells: { x: number; y: number; col: number }[] = [];
        for (let r = 0; r < textHeight; r++) {
            for (let c = 0; c < textCols; c++) {
                if (textGrid[r][c] === 1) {
                    cells.push({
                        x: (startCol + c) * cellSize,
                        y: (startRow + r) * cellSize,
                        col: c,
                    });
                }
            }
        }
        return cells;
    }, [cellSize, startCol, startRow]);

    const links = [
        { name: "Resume", href: "#", target: "_blank" },
        { name: "Linkedin", href: "https://linkedin.com/in/nikhilsiwan", target: "_blank" },
        { name: "Behance", href: "https://behance.net/nikhilsiwan", target: "_blank" },
    ];

    return (
        <footer className="w-full bg-zinc-50 dark:bg-[#09090b] text-zinc-950 dark:text-white pt-16 pb-12 border-t border-zinc-200/60 dark:border-zinc-800/80 relative overflow-hidden select-none transition-colors duration-300 z-50">
            {/* Background Subtle Radial Gradient matching the site dotted background */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.15)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />

            {/* Embedded styles for hardware-accelerated breathing animation */}
            <style>{`
                @keyframes breathe-dark {
                    0%, 100% {
                        fill: #27272a;
                    }
                    50% {
                        fill: #c6f023;
                    }
                }
                @keyframes breathe-light {
                    0%, 100% {
                        fill: #e4e4e7;
                    }
                    50% {
                        fill: #18181b;
                    }
                }
                .breathe-cell {
                    animation: breathe-light 4s ease-in-out infinite;
                }
                .dark .breathe-cell {
                    animation: breathe-dark 4s ease-in-out infinite;
                }
            `}</style>

            <div className="max-w-6xl w-full mx-auto px-6 flex flex-col gap-16">

                {/* Top Info Layout */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 w-full">
                    {/* Brand/Contact Block */}
                    <div className="flex flex-col gap-6 max-w-xl">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-zinc-900 dark:text-white">
                            Designed & <span className="relative inline-block px-2 py-0.5 text-zinc-950 font-black rounded-[4px] transform -rotate-2 inline-flex leading-none align-middle mx-1"><span className="relative z-10">Coded</span><span className="absolute inset-0 bg-[#c6f023] shadow-sm origin-left" /></span>
                        </h2>

                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                                Get in touch
                            </span>
                            <a
                                href="mailto:developer.nikk@gmail.com"
                                className="group text-base sm:text-lg md:text-xl font-bold tracking-tight text-zinc-800 hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white flex items-center gap-1.5 w-fit transition-colors duration-200"
                            >
                                <span>developer.nikk@gmail.com</span>
                                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                            </a>
                        </div>
                    </div>

                    {/* Social Links List */}
                    <div className="flex flex-col gap-3 min-w-[200px] w-full md:w-auto mt-2 md:mt-0">
                        {links.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.href}
                                target={link.target}
                                rel="noopener noreferrer"
                                className="flex justify-between items-center gap-12 group border-b border-zinc-100 hover:border-zinc-200 dark:border-zinc-900 dark:hover:border-zinc-800 pb-2.5 py-1.5 transition-all duration-200 cursor-pointer"
                            >
                                <span className="text-sm sm:text-base font-bold text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors duration-200">
                                    {link.name}
                                </span>
                                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Large Centered Pixel-Art Title Grid */}
                <div
                    ref={containerRef}
                    className="w-full h-28 sm:h-36 md:h-52 border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl overflow-hidden relative bg-zinc-50/40 dark:bg-zinc-950/20 shadow-inner flex items-center justify-center"
                >
                    <svg className="w-full h-full pointer-events-auto">
                        <defs>
                            {/* Pattern for grid lines */}
                            <pattern id="footer-grid-pattern" width={cellSize} height={cellSize} patternUnits="userSpaceOnUse">
                                <path
                                    d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="0.8"
                                    className="text-zinc-200/70 dark:text-zinc-900/60"
                                />
                            </pattern>
                        </defs>

                        {/* SVG Rects for text cells (renders behind the grid lines overlay) */}
                        {activeCells.map((cell, idx) => {
                            const cellGap = cellSize >= 12 ? 2 : 1;
                            const cellOffset = cellGap / 2;
                            return (
                                <rect
                                    key={idx}
                                    x={cell.x + cellOffset}
                                    y={cell.y + cellOffset}
                                    width={cellSize - cellGap}
                                    height={cellSize - cellGap}
                                    rx={cellSize >= 12 ? 2 : 1}
                                    className="breathe-cell"
                                    style={{
                                        animationDelay: `${cell.col * 0.03}s`
                                    }}
                                />
                            );
                        })}

                        {/* Grid overlay to draw fine lines separating every cell */}
                        <rect
                            width="100%"
                            height="100%"
                            fill="url(#footer-grid-pattern)"
                            className="pointer-events-none"
                        />
                    </svg>
                </div>

            </div>
        </footer>
    );
}
