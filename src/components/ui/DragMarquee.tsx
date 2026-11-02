"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * An endless strip you can grab.
 *
 * It drifts on its own, eases to a stop under the mouse, and can be dragged
 * 1:1 with the finger. Let go mid-flick and it keeps the flick's velocity,
 * then decays back to its cruising speed the way a scroll view decelerates
 * (Apple's ~0.998-per-ms rate, i.e. a ~500ms time constant), so a throw
 * reads as a throw instead of snapping back to the default pace.
 *
 * The children must already be the list rendered twice back to back: the
 * strip wraps by exactly half its width, so the seam never shows.
 * ------------------------------------------------------------------ */

// Velocity settles toward its target with this time constant (ms). Matches
// a 0.998/ms deceleration: -1 / ln(0.998) ≈ 500.
const SETTLE_MS = 500;
// Horizontal travel before a press counts as a drag, so a vertical page
// scroll or a plain tap never nudges the strip.
const DRAG_THRESHOLD = 6;

interface DragMarqueeProps {
    children: React.ReactNode;
    /** Seconds for the strip to travel half its width at cruising speed. */
    duration?: number;
    className?: string;
}

export default function DragMarquee({ children, duration = 45, className }: DragMarqueeProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const reduceMotion = useReducedMotion();

    const half = useRef(0);
    const velocity = useRef(0); // px/s, negative = leftwards
    const hovering = useRef(false);
    const drag = useRef<{
        id: number;
        startX: number;
        lastX: number;
        active: boolean;
        samples: { t: number; x: number }[];
    } | null>(null);

    // Measure one copy of the list (half the track). Re-measured on resize,
    // since tile sizes follow the viewport.
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const measure = () => {
            half.current = track.scrollWidth / 2;
        };
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(track);
        return () => observer.disconnect();
    }, []);

    // Keep x inside (-half, 0] so the two copies always cover the strip.
    const wrap = (value: number) => {
        const h = half.current;
        if (h <= 0) return value;
        return ((value % h) - h) % h;
    };

    useAnimationFrame((_, delta) => {
        if (drag.current?.active) return;
        const h = half.current;
        if (h <= 0) return;
        const cruise = reduceMotion || hovering.current ? 0 : -h / duration;
        // Ease the current velocity toward the cruise speed: a flick decays,
        // a hover glides to a stop, leaving the hover glides back up.
        velocity.current += (cruise - velocity.current) * (1 - Math.exp(-delta / SETTLE_MS));
        x.set(wrap(x.get() + (velocity.current * delta) / 1000));
    });

    const onPointerDown = (e: React.PointerEvent) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        drag.current = {
            id: e.pointerId,
            startX: e.clientX,
            lastX: e.clientX,
            active: false,
            samples: [{ t: e.timeStamp, x: e.clientX }],
        };
    };

    const onPointerMove = (e: React.PointerEvent) => {
        const d = drag.current;
        if (!d || d.id !== e.pointerId) return;
        if (!d.active) {
            if (Math.abs(e.clientX - d.startX) < DRAG_THRESHOLD) return;
            d.active = true;
            d.lastX = e.clientX;
            // Keep tracking when the pointer leaves the strip. Capture can be
            // refused (the pointer was already released); the drag should
            // still work, just without capture.
            try {
                (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            } catch {}
        }
        // 1:1 with the finger, from wherever the strip was when grabbed.
        x.set(wrap(x.get() + (e.clientX - d.lastX)));
        d.lastX = e.clientX;
        d.samples.push({ t: e.timeStamp, x: e.clientX });
        if (d.samples.length > 6) d.samples.shift();
    };

    const endDrag = (e: React.PointerEvent) => {
        const d = drag.current;
        drag.current = null;
        if (!d || !d.active) return;
        // Release velocity from the last ~100ms of movement.
        const recent = d.samples.filter((s) => e.timeStamp - s.t < 100);
        if (recent.length >= 2) {
            const first = recent[0];
            const last = recent[recent.length - 1];
            const dt = Math.max(1, last.t - first.t);
            velocity.current = ((last.x - first.x) / dt) * 1000;
        } else {
            velocity.current = 0;
        }
    };

    return (
        <div
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerEnter={(e) => {
                if (e.pointerType === "mouse") hovering.current = true;
            }}
            onPointerLeave={(e) => {
                if (e.pointerType === "mouse") hovering.current = false;
            }}
            onDragStart={(e) => e.preventDefault()}
            // pan-y: vertical page scrolling stays native; we only take
            // horizontal drags.
            className="touch-pan-y select-none cursor-grab active:cursor-grabbing"
        >
            <motion.div ref={trackRef} style={{ x }} className={cn("will-change-transform", className)}>
                {children}
            </motion.div>
        </div>
    );
}
