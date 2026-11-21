"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import {
  ArrowLeft,
  ArrowUp,
  Calendar,
  Clock,
  Check,
  Copy,
  Tag,
  ArrowRight,
  Activity,
  Terminal,
  Flame,
  Smartphone,
  Cpu,
  Layers,
} from "lucide-react";
import { BlogPost, blogPosts } from "@/data/blog";
import { EASE } from "@/components/ui/editorial";
import { cn } from "@/lib/utils";

interface BlogPostClientProps {
  post: BlogPost;
}

// ---------------------------------------------------------------------------
// SVG SOCIAL ICONS (Strict vector rendering)
// ---------------------------------------------------------------------------
function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25.7-.73 1.28-1.39 1.63-.48.26-1.07.39-1.69.39-1.29 0-2.8-.76-4.52-2.48-1.72-1.72-2.48-3.23-2.48-4.52 0-.62.13-1.21.39-1.69.35-.66.93-1.14 1.63-1.39.22-.08.47-.08.68 0 .22.08.4.23.53.43l1.1 1.64c.14.21.19.46.14.71-.05.25-.19.47-.39.62l-.46.35c.29.56.73 1.09 1.29 1.65.56.56 1.09 1 1.65 1.29l.35-.46c.15-.2.37-.34.62-.39.25-.05.5 0 .71.14l1.64 1.1c.2.13.35.31.43.53.08.21.08.46 0 .68z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// CATEGORY ARCHITECTURE BLUEPRINTS (Pure Code & SVG Telemetry HUDs)
// ---------------------------------------------------------------------------
export function HeroArchitectureBlueprint({ post }: { post: BlogPost }) {
  if (post.slug === "cap-theorem-explained" || post.category === "Engineering") {
    return (
      <div className="w-full flex flex-col justify-between h-full min-h-[300px] sm:min-h-[340px] text-zinc-100">
        {/* Top Status Header */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-[#c6f023] animate-pulse" />
            CONSENSUS_ENGINE // QUORUM_SPLIT_SIMULATOR
          </div>
          <span className="text-[11px] font-mono font-bold text-[#c6f023] px-2.5 py-1 rounded bg-[#c6f023]/10 border border-[#c6f023]/30">
            NETWORK_SPLIT: ACTIVE
          </span>
        </div>

        {/* Center: Interactive Node Split Schematic */}
        <div className="my-auto py-4 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-[11px]">
          {/* Node 1 & 2: Majority Quorum */}
          <div className="sm:col-span-2 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-200 font-bold">
                <Cpu className="w-3.5 h-3.5 text-[#c6f023]" /> Majority Quorum (N1, N2)
              </span>
              <span className="text-[10px] text-[#c6f023] font-bold">CP Mode: Available</span>
            </div>
            <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px]">
              <span className="text-zinc-400">Write(x = 1)</span>
              <span className="text-[#c6f023] font-bold">Quorum Achieved (2/3)</span>
              <span className="text-zinc-500 text-[10px]">ts: 1</span>
            </div>
            <div className="pt-2 border-t border-zinc-800/80 text-[10px] text-zinc-500 flex justify-between">
              <span>Linearizable state: x = 1</span>
              <span className="text-zinc-300 font-bold">Active Leader</span>
            </div>
          </div>

          {/* Node 3: Isolated Minority */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between gap-3 relative">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-300 font-bold">
                <Activity className="w-3.5 h-3.5 text-[#c6f023]" /> Isolated (N3)
              </span>
              <span className="text-[10px] text-zinc-400 font-bold">Split-Brain Safe</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400 flex flex-col gap-1">
              <span className="text-zinc-300 font-mono text-[10px]">Read(x) in CP -&gt; REFUSED</span>
              <span className="text-zinc-500 text-[10px]">No Quorum (1/3)</span>
            </div>
            <div className="pt-2 border-t border-zinc-800/80 text-[10px] text-zinc-500 flex justify-between">
              <span>Stale Read Rejected</span>
              <span className="text-[#c6f023] font-bold">Linearizable</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#c6f023]" /> W + R &gt; RF (Gilbert &amp; Lynch Linearizability)
          </span>
          <span>THEOREM: PARTITION_UNAVOIDABLE</span>
        </div>
      </div>
    );
  }

  if (post.category === "AI Agents") {
    return (
      <div className="w-full flex flex-col justify-between h-full min-h-[300px] sm:min-h-[340px] text-zinc-100">
        {/* Top Status Header */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-[#c6f023] animate-pulse" />
            VAPI_WEBRTC_PIPELINE // 24kHz_PCM
          </div>
          <span className="text-[11px] font-mono font-bold text-[#c6f023] px-2.5 py-1 rounded bg-[#c6f023]/10 border border-[#c6f023]/30">
            642ms RTT
          </span>
        </div>

        {/* Center: Waveform & Speech Telemetry HUD */}
        <div className="my-auto py-5 flex flex-col gap-4">
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col gap-3">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#c6f023]" />
                Duplex Speech Spectrogram
              </span>
              <span className="text-zinc-500 font-mono text-[10px]">Buffer: 18ms</span>
            </div>

            {/* Frequency Spectrum Bars */}
            <div className="flex items-center justify-between gap-1 sm:gap-2 h-14 px-1">
              {[25, 45, 80, 50, 95, 60, 35, 75, 90, 40, 100, 65, 30, 85, 55, 70, 95, 45, 60, 30, 75, 50, 85, 60].map(
                (h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}%` }}
                    className={cn(
                      "flex-1 rounded-full transition-all duration-300 max-w-[8px]",
                      i % 4 === 0
                        ? "bg-[#c6f023]"
                        : i % 2 === 0
                          ? "bg-zinc-400"
                          : "bg-zinc-700"
                    )}
                  />
                )
              )}
            </div>
          </div>

          {/* Live Telemetry Log */}
          <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 font-mono text-[11px] flex flex-col gap-2">
            <div className="flex items-center justify-between text-zinc-300">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#c6f023]" />
                dispatchTool(&quot;evaluateRubric&quot;, &#123; clarity: 94, depth: 91 &#125;)
              </span>
              <span className="text-[#c6f023] font-bold">200 OK</span>
            </div>
            <div className="text-[10px] text-zinc-500 flex items-center justify-between pt-1 border-t border-zinc-800/80">
              <span>Model: gpt-4o-realtime (168 tok/s)</span>
              <span>Audio Synthesis: 0-lag stream</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-[#c6f023]" /> Zero Audio Drift
          </span>
          <span>SYSTEM_HEALTH: 100% NOMINAL</span>
        </div>
      </div>
    );
  }

  if (post.category === "Next.js") {
    return (
      <div className="w-full flex flex-col justify-between h-full min-h-[300px] sm:min-h-[340px] text-zinc-100">
        {/* Top Status Header */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-[#c6f023] animate-pulse" />
            DUAL_SURFACE_ROUTER // MCP_EDGE_DISPATCH
          </div>
          <span className="text-[11px] font-mono font-bold text-[#c6f023] px-2.5 py-1 rounded bg-[#c6f023]/10 border border-[#c6f023]/30">
            Accept: text/markdown
          </span>
        </div>

        {/* Center: Dual-Surface Architecture Diagram */}
        <div className="my-auto py-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-mono text-[11px]">
          {/* Surface A: Human UI */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-200 font-bold">
                <Layers className="w-3.5 h-3.5 text-zinc-400" /> Human Surface
              </span>
              <span className="text-[10px] text-zinc-500">text/html</span>
            </div>
            <p className="text-zinc-400 text-[10px] leading-relaxed">
              SSR React Server Components, Tailwind CSS styling, Framer Motion springs, and client hydration.
            </p>
            <div className="pt-2 border-t border-zinc-800/80 text-[10px] text-zinc-500 flex justify-between">
              <span>Hydration: 24kb</span>
              <span className="text-zinc-300 font-bold">60fps DOM</span>
            </div>
          </div>

          {/* Surface B: AI Agent Surface */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-[#c6f023]/40 flex flex-col justify-between gap-3 relative">
            <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#c6f023]" />
            <div className="flex items-center justify-between text-zinc-400">
              <span className="flex items-center gap-1.5 text-[#c6f023] font-bold">
                <Cpu className="w-3.5 h-3.5 text-[#c6f023]" /> Machine Surface
              </span>
              <span className="text-[10px] text-[#c6f023]">text/markdown</span>
            </div>
            <p className="text-zinc-300 text-[10px] leading-relaxed">
              Clean structured Markdown rewrite via Next.js middleware + JSON-RPC 2.0 MCP SSE tool stream.
            </p>
            <div className="pt-2 border-t border-zinc-800/80 text-[10px] text-zinc-500 flex justify-between">
              <span>Overhead: 0 bytes JS</span>
              <span className="text-[#c6f023] font-bold">Streamable</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#c6f023]" /> curl -H &quot;Accept: text/markdown&quot;
          </span>
          <span>ZERO_HEADLESS_BROWSER_PENALTY</span>
        </div>
      </div>
    );
  }

  if (post.category === "React Native") {
    return (
      <div className="w-full flex flex-col justify-between h-full min-h-[300px] sm:min-h-[340px] text-zinc-100">
        {/* Top Status Header */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-[#c6f023] animate-pulse" />
            NEW_ARCHITECTURE // OP_SQLITE_JSI
          </div>
          <span className="text-[11px] font-mono font-bold text-[#c6f023] px-2.5 py-1 rounded bg-[#c6f023]/10 border border-[#c6f023]/30">
            UI_THREAD: 60.0 FPS
          </span>
        </div>

        {/* Center: Thread Architecture Schematics */}
        <div className="my-auto py-5 flex flex-col gap-3 font-mono text-[11px]">
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-6 h-6 text-[#c6f023]" />
              <div className="flex flex-col">
                <span className="font-bold text-zinc-200">Reanimated 3 Gesture Engine</span>
                <span className="text-[10px] text-zinc-400">Direct UI Thread Memory Execution</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded bg-zinc-800 text-[10px] font-bold text-zinc-200">
              16.6ms Budget
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-2 text-zinc-300">
              <Terminal className="w-3.5 h-3.5 text-[#c6f023]" />
              db.executeSync(&quot;INSERT INTO incidents...&quot;)
            </span>
            <span className="text-[#c6f023] font-bold">0.14ms JSI</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>OFFLINE_FIRST_LOG: HEALTHY</span>
          <span>QUEUE: 0 PENDING CONFLICTS</span>
        </div>
      </div>
    );
  }

  // Engineering / Spring Physics Default
  return (
    <div className="w-full flex flex-col justify-between h-full min-h-[300px] sm:min-h-[340px] text-zinc-100">
      {/* Top Status Header */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-[#c6f023] animate-pulse" />
          SPRING_PHYSICS // CRITICALLY_DAMPED
        </div>
        <span className="text-[11px] font-mono font-bold text-[#c6f023] px-2.5 py-1 rounded bg-[#c6f023]/10 border border-[#c6f023]/30">
          DECAY: 0.998/ms
        </span>
      </div>

      {/* Center: Spring Oscillation Curve SVG */}
      <div className="my-auto py-5 flex flex-col gap-3">
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 relative overflow-hidden flex flex-col gap-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
            <span>Displacement x(t) vs Time (ms)</span>
            <span className="text-[#c6f023] font-bold">Overshoot: 0.0%</span>
          </div>

          <div className="w-full h-20 flex items-center">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 70" fill="none">
              {/* Dashed Resting Baseline */}
              <line
                x1="0"
                y1="40"
                x2="400"
                y2="40"
                stroke="rgba(255,255,255,0.15)"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              {/* Critically Damped Deceleration Curve */}
              <path
                d="M 0,65 C 50,65 70,12 120,28 C 170,44 220,38 280,40 L 400,40"
                stroke="#c6f023"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Target Marker */}
              <circle cx="120" cy="28" r="4" fill="#c6f023" />
              <circle cx="280" cy="40" r="4" fill="#c6f023" />
            </svg>
          </div>
        </div>

        {/* Telemetry Numbers */}
        <div className="grid grid-cols-3 gap-2 font-mono text-[10px] text-zinc-400">
          <div className="p-2 rounded-xl bg-zinc-900/70 border border-zinc-800 text-center">
            <span className="block text-zinc-500">STIFFNESS</span>
            <span className="font-bold text-zinc-200">420</span>
          </div>
          <div className="p-2 rounded-xl bg-zinc-900/70 border border-zinc-800 text-center">
            <span className="block text-zinc-500">DAMPING</span>
            <span className="font-bold text-zinc-200">34</span>
          </div>
          <div className="p-2 rounded-xl bg-zinc-900/70 border border-zinc-800 text-center">
            <span className="block text-zinc-500">VELOCITY</span>
            <span className="font-bold text-[#c6f023]">1,450 px/s</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
        <span>SETTLE_TIME: 320ms</span>
        <span>NATURAL_INERTIA_PRESERVED</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FORMATTED ARTICLE CONTENT RENDERER
// ---------------------------------------------------------------------------
type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "ordered-list"; items: string[] }
  | { type: "unordered-list"; items: string[] }
  | { type: "code"; language: string; code: string }
  | { type: "table"; headers: string[]; rows: string[][] };

function parseMarkdownBlocks(content: string): ContentBlock[] {
  const lines = content.split(/\r?\n/);
  const blocks: ContentBlock[] = [];
  let currentParagraph: string[] = [];
  let currentList: { type: "ordered" | "unordered"; items: string[] } | null = null;

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ").trim();
      if (text) {
        blocks.push({ type: "paragraph", text });
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList && currentList.items.length > 0) {
      blocks.push({
        type: currentList.type === "ordered" ? "ordered-list" : "unordered-list",
        items: currentList.items,
      });
      currentList = null;
    }
  };

  let i = 0;
  while (i < lines.length) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // 1. Check for fenced code block: ```language
    if (trimmed.startsWith("```")) {
      flushParagraph();
      flushList();
      const language = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      // skip the closing ```
      if (i < lines.length && lines[i].trim().startsWith("```")) {
        i++;
      }
      blocks.push({
        type: "code",
        language: language || "text",
        code: codeLines.join("\n"),
      });
      continue;
    }

    // 2. Check for markdown table: starts and ends with |
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      flushParagraph();
      flushList();
      const tableLines: string[] = [];
      while (
        i < lines.length &&
        lines[i].trim().startsWith("|") &&
        lines[i].trim().endsWith("|")
      ) {
        tableLines.push(lines[i].trim());
        i++;
      }
      if (tableLines.length >= 2) {
        const headers = tableLines[0]
          .split("|")
          .map((c) => c.trim())
          .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);

        const rows: string[][] = [];
        for (let r = 2; r < tableLines.length; r++) {
          const cells = tableLines[r]
            .split("|")
            .map((c) => c.trim())
            .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
          rows.push(cells);
        }
        blocks.push({ type: "table", headers, rows });
        continue;
      }
    }

    // 3. Blank line -> flush
    if (!trimmed) {
      flushParagraph();
      flushList();
      i++;
      continue;
    }

    // 4. Heading: ### Heading or ## Heading or # Heading
    const headingMatch = trimmed.match(/^#{1,4}\s+(.*)/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", text: headingMatch[1].trim() });
      i++;
      continue;
    }

    // 5. Numbered list item: 1. ... or 2. ...
    const orderedMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (orderedMatch) {
      flushParagraph();
      if (!currentList || currentList.type !== "ordered") {
        flushList();
        currentList = { type: "ordered", items: [] };
      }
      currentList.items.push(orderedMatch[2].trim());
      i++;
      continue;
    }

    // 6. Unordered bullet item: - ... or * ...
    const unorderedMatch = trimmed.match(/^[-*]\s+(.*)/);
    if (unorderedMatch) {
      flushParagraph();
      if (!currentList || currentList.type !== "unordered") {
        flushList();
        currentList = { type: "unordered", items: [] };
      }
      currentList.items.push(unorderedMatch[1].trim());
      i++;
      continue;
    }

    // 7. Continuation text
    if (currentList && currentList.items.length > 0) {
      currentList.items[currentList.items.length - 1] += " " + trimmed;
    } else {
      currentParagraph.push(trimmed);
    }
    i++;
  }

  flushParagraph();
  flushList();

  return blocks;
}

function BoxyCodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="my-6 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-100 overflow-hidden shadow-sm font-mono text-xs">
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          </div>
          <span className="ml-2 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
            {language}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-[#c6f023]" />
              <span className="text-[#c6f023]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <pre className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-[13px] leading-relaxed text-zinc-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function BoxyTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800/80 border-b border-zinc-200 dark:border-zinc-800 font-mono text-[11px] uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              {headers.map((h, idx) => (
                <th key={idx} className="py-3 px-4 sm:px-5 font-bold">
                  {renderInlineFormatting(h)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/80 text-zinc-800 dark:text-zinc-200">
            {rows.map((row, rIdx) => (
              <tr
                key={rIdx}
                className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
              >
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="py-3.5 px-4 sm:px-5">
                    {renderInlineFormatting(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FormattedArticleContent({ content }: { content?: string }) {
  if (!content) return null;

  const blocks = parseMarkdownBlocks(content);

  return (
    <div className="space-y-6 text-base sm:text-lg leading-[1.8] text-zinc-700 dark:text-zinc-300 font-normal">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <div key={index} className="pt-8 pb-2 flex items-center gap-3">
                <span className="w-1.5 h-6 rounded-full bg-[#c6f023] shrink-0" />
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
                  {block.text}
                </h2>
              </div>
            );

          case "code":
            return (
              <BoxyCodeBlock
                key={index}
                language={block.language}
                code={block.code}
              />
            );

          case "table":
            return (
              <BoxyTable
                key={index}
                headers={block.headers}
                rows={block.rows}
              />
            );

          case "ordered-list":
            return (
              <div
                key={index}
                className="my-5 p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-3.5 shadow-sm"
              >
                {block.items.map((item, iIdx) => (
                  <div key={iIdx} className="flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded-md bg-[#c6f023] text-zinc-950 font-mono text-xs font-black shrink-0 mt-0.5">
                      0{iIdx + 1}
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
                      {renderInlineFormatting(item)}
                    </span>
                  </div>
                ))}
              </div>
            );

          case "unordered-list":
            return (
              <div
                key={index}
                className="my-5 p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-sm"
              >
                {block.items.map((item, iIdx) => (
                  <div key={iIdx} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#c6f023] shrink-0 mt-2" />
                    <span className="text-sm sm:text-base font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed">
                      {renderInlineFormatting(item)}
                    </span>
                  </div>
                ))}
              </div>
            );

          case "paragraph":
            return (
              <p key={index} className="leading-relaxed">
                {renderInlineFormatting(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}

// Helper to style inline backticks `code`, bold **text**, italic *text*, and [links](url)
function renderInlineFormatting(text: string): React.ReactNode {
  const pattern = /(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  const parts = text.split(pattern);

  return parts.map((part, i) => {
    // 1. Markdown link: [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const isExternal = linkMatch[2].startsWith("http");
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-zinc-950 dark:text-white font-semibold underline decoration-[#c6f023] underline-offset-4 hover:text-[#719105] dark:hover:text-[#c6f023] transition-colors"
        >
          {linkMatch[1]}
        </a>
      );
    }

    // 2. Inline code: `code`
    if (part.startsWith("`") && part.endsWith("`")) {
      const code = part.slice(1, -1);
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 font-mono text-[0.88em] text-[#719105] dark:text-[#c6f023]"
        >
          {code}
        </code>
      );
    }

    // 3. Bold: **text**
    if (part.startsWith("**") && part.endsWith("**")) {
      const strong = part.slice(2, -2);
      return (
        <strong key={i} className="font-extrabold text-zinc-950 dark:text-white">
          {strong}
        </strong>
      );
    }

    // 4. Italic: *text*
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      const em = part.slice(1, -1);
      return (
        <em key={i} className="italic text-zinc-800 dark:text-zinc-200">
          {em}
        </em>
      );
    }

    return part;
  });
}

// ---------------------------------------------------------------------------
// MAIN BLOG POST CLIENT COMPONENT
// ---------------------------------------------------------------------------
export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [copied, setCopied] = useState(false);

  // Find next & previous posts
  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  const lenis = useLenis();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 0.9 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const postUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/blog/${post.slug}`
      : `https://nikhilsiwan.vercel.app/blog/${post.slug}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard error
    }
  };

  const shareTwitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    postUrl
  )}&text=${encodeURIComponent(post.title)}`;

  const shareLinkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    postUrl
  )}`;

  const shareWhatsAppUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${post.title} — ${postUrl}`
  )}`;

  return (
    <article className="min-h-screen relative overflow-x-clip text-zinc-950 dark:text-white pt-28 pb-16">
      <div className="max-w-4xl w-full mx-auto px-6">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to all articles
          </Link>
        </motion.div>

        {/* ----------------------------------------------------------------- */}
        {/* 1. WIDESCREEN BOXY HERO WINDOW (Cover Image if available)          */}
        {/* ----------------------------------------------------------------- */}
        {post.coverImage && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="mb-8"
          >
            <div className="relative w-full rounded-3xl bg-black border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm aspect-[16/9] min-h-[300px] sm:min-h-[400px]">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                quality={95}
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-contain object-center"
                priority
              />
            </div>

            {/* Subtitle Caption Underneath */}
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400 font-mono text-center sm:text-left">
              {post.slug === "building-prepai-voice-ai-interviews-nextjs-vapi"
                ? "Duplex WebRTC voice architecture and interaction pipeline."
                : `${post.category} architecture and telemetry blueprint.`}
            </p>
          </motion.div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* 2. CATEGORY & METADATA HEADER ROW                                 */}
        {/* ----------------------------------------------------------------- */}
        <header className="pb-8 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <span className="px-3.5 py-1.5 rounded-full bg-zinc-950 text-[#c6f023] font-mono text-xs font-black uppercase tracking-wider border border-zinc-800 shadow-sm">
              {post.category}
            </span>

            <div className="flex items-center gap-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400 font-mono uppercase tracking-wider">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-zinc-900 dark:text-white">
            {post.title}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            {post.description}
          </p>

          {/* Mobile Share Bar (Visible only below lg) */}
          <div className="mt-6 pt-5 border-t border-dashed border-zinc-200 dark:border-zinc-800 flex lg:hidden items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Share Article:
            </span>
            <div className="flex items-center gap-2">
              <a
                href={shareTwitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X"
                className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 flex items-center justify-center hover:border-[#c6f023] transition-colors"
              >
                <TwitterIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={shareLinkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 flex items-center justify-center hover:border-[#c6f023] transition-colors"
              >
                <LinkedInIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={shareWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on WhatsApp"
                className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 flex items-center justify-center hover:border-[#c6f023] transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={handleCopyLink}
                aria-label="Copy link"
                className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 flex items-center justify-center hover:border-[#c6f023] transition-colors"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-zinc-950 dark:text-[#c6f023]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* ----------------------------------------------------------------- */}
        {/* 3. MAIN ARTICLE LAYOUT WITH LEFT STICKY SHARE RAIL                */}
        {/* ----------------------------------------------------------------- */}
        <div className="relative flex items-start gap-12 py-10">
          {/* Desktop Left Sticky Social Rail */}
          <aside className="hidden lg:flex sticky top-36 flex-col items-center gap-3 w-10 shrink-0">
            <a
              href={shareTwitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on X"
              aria-label="Share on X"
              className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-[#c6f023] flex items-center justify-center transition-all shadow-sm group"
            >
              <TwitterIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>

            <a
              href={shareLinkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on LinkedIn"
              aria-label="Share on LinkedIn"
              className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-[#c6f023] flex items-center justify-center transition-all shadow-sm group"
            >
              <LinkedInIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>

            <a
              href={shareWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on WhatsApp"
              aria-label="Share on WhatsApp"
              className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-[#c6f023] flex items-center justify-center transition-all shadow-sm group"
            >
              <WhatsAppIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>

            <button
              type="button"
              onClick={handleCopyLink}
              title="Copy Article Link"
              aria-label="Copy Article Link"
              className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-[#c6f023] flex items-center justify-center transition-all shadow-sm group"
            >
              {copied ? (
                <Check className="w-4 h-4 text-zinc-950 dark:text-[#c6f023]" />
              ) : (
                <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
              )}
            </button>
          </aside>

          {/* Article Main Column */}
          <div className="flex-1 min-w-0">
            {/* ------------------------------------------------------------- */}
            {/* 4. BOXY KEY ARCHITECTURE TAKEAWAYS CHECKLIST CARD (Reference) */}
            {/* ------------------------------------------------------------- */}
            {post.takeaways && post.takeaways.length > 0 && (
              <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
                  <div className="w-6 h-6 rounded-lg bg-[#c6f023] text-zinc-950 flex items-center justify-center font-black">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-zinc-900 dark:text-white">
                    Key Architecture Takeaways
                  </h3>
                </div>

                <ul className="space-y-3.5">
                  {post.takeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-3.5">
                      <span className="w-5 h-5 rounded-full bg-[#c6f023] text-zinc-950 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-zinc-800 dark:text-zinc-200 leading-snug">
                        {takeaway}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* 5. ARTICLE BODY CONTENT                                       */}
            {/* ------------------------------------------------------------- */}
            <FormattedArticleContent content={post.content} />

            {/* ------------------------------------------------------------- */}
            {/* 6. TAGS ROW                                                   */}
            {/* ------------------------------------------------------------- */}
            <div className="mt-12 pt-8 pb-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mr-2 flex items-center gap-1.5 font-mono">
                <Tag className="w-3.5 h-3.5" /> Tags:
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* ------------------------------------------------------------- */}
            {/* 7. PREV / NEXT ARTICLE BENTO CARDS                            */}
            {/* ------------------------------------------------------------- */}
            {(prevPost || nextPost) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-8 border-t border-zinc-200 dark:border-zinc-800">
                {prevPost ? (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="group p-6 sm:p-7 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-zinc-400 dark:hover:border-zinc-700 flex flex-col justify-between transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 mb-2 flex items-center gap-1.5 transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                        Previous Article
                      </span>
                      <h4 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white group-hover:text-black dark:group-hover:text-[#c6f023] line-clamp-2 transition-colors">
                        {prevPost.title}
                      </h4>
                    </div>
                    <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 font-semibold font-mono">
                      <span>{prevPost.category}</span>
                      <span>{prevPost.readTime}</span>
                    </div>
                  </Link>
                ) : (
                  <div className="hidden sm:block" />
                )}

                {nextPost ? (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="group p-6 sm:p-7 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-zinc-400 dark:hover:border-zinc-700 flex flex-col justify-between text-right transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 mb-2 flex items-center justify-end gap-1.5 transition-colors">
                        Next Article
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                      <h4 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white group-hover:text-black dark:group-hover:text-[#c6f023] line-clamp-2 transition-colors">
                        {nextPost.title}
                      </h4>
                    </div>
                    <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 font-semibold font-mono">
                      <span>{nextPost.readTime}</span>
                      <span>{nextPost.category}</span>
                    </div>
                  </Link>
                ) : (
                  <div className="hidden sm:block" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            transition={{ duration: 0.2 }}
            aria-label="Back to top"
            title="Back to top"
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 w-11 h-11 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-[#c6f023] shadow-lg hover:shadow-xl flex items-center justify-center transition-colors group active:scale-95"
          >
            <ArrowUp className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5 text-zinc-900 dark:text-white group-hover:text-[#c6f023]" />
          </motion.button>
        )}
      </AnimatePresence>
    </article>
  );
}
