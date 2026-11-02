"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
    animate,
    motion,
    useMotionValue,
    useReducedMotion,
    useTransform,
    type PanInfo,
} from "framer-motion";
import { useLenis } from "lenis/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * A screenshot you can tap to look at properly.
 *
 * The enlarged image grows out of the exact spot the thumbnail occupies
 * (the thumbnail hides meanwhile, so it reads as the same object moving)
 * and returns there on close. While open it can be dragged vertically
 * 1:1 with the finger; the backdrop thins and the image shrinks slightly
 * the further it travels, and on release the gesture's momentum decides
 * whether it's dismissed or springs back.
 *
 * Every animation is a spring on a live motion value, so any of them can
 * be interrupted by the next input and continues from where the image is
 * on screen, carrying the finger's velocity across the hand-off.
 * ------------------------------------------------------------------ */

// Opening/closing: nothing was thrown, so no overshoot.
const ZOOM = { type: "spring" as const, bounce: 0, duration: 0.42 };
// Snapping back after a drag release did carry momentum: a little give.
const SETTLE = { type: "spring" as const, bounce: 0.18, duration: 0.4 };

// Apple's scroll-deceleration projection (Designing Fluid Interfaces):
// where a flick released at `velocity` px/s would come to rest.
const project = (velocity: number, decelerationRate = 0.998) =>
    ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);

const DISMISS_DISTANCE = 140;
const PADDING = 24;

interface Box {
    left: number;
    top: number;
    width: number;
    height: number;
}

/** The largest box with the image's aspect that fits the viewport, centred. */
function fitToViewport(width: number, height: number): Box {
    const maxW = window.innerWidth - PADDING * 2;
    const maxH = window.innerHeight - PADDING * 2 - 48; // room for the close button
    const scale = Math.min(maxW / width, maxH / height, 1.6);
    const w = width * scale;
    const h = height * scale;
    return { left: (window.innerWidth - w) / 2, top: (window.innerHeight - h) / 2 + 12, width: w, height: h };
}

interface LightboxProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    originRef: React.RefObject<HTMLElement | null>;
    onClosed: () => void;
}

function Lightbox({ src, alt, width, height, originRef, onClosed }: LightboxProps) {
    const reduceMotion = useReducedMotion();
    const lenis = useLenis();
    const closeButton = useRef<HTMLButtonElement>(null);
    const closing = useRef(false);
    const finished = useRef(false);
    const fallback = useRef<number | undefined>(undefined);
    const [isClosing, setIsClosing] = useState(false);
    const [box] = useState(() => fitToViewport(width, height));

    // Unmount exactly once, whether the return animation completes or the
    // fallback timer gets there first.
    const finish = () => {
        if (finished.current) return;
        finished.current = true;
        window.clearTimeout(fallback.current);
        onClosed();
    };
    useEffect(() => () => window.clearTimeout(fallback.current), []);

    // x/y: position offset from the centred box. zoom: size relative to it.
    // pull: how far the current drag has travelled. fade: backdrop presence.
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const zoom = useMotionValue(1);
    const pull = useMotionValue(0);
    const fade = useMotionValue(0);

    const scale = useTransform(() => zoom.get() * (1 - (Math.min(pull.get(), 400) / 400) * 0.14));
    const backdrop = useTransform(() => fade.get() * (1 - (Math.min(pull.get(), 480) / 480) * 0.75));

    // The transform that puts the enlarged image exactly over the thumbnail.
    const originTransform = () => {
        const r = originRef.current?.getBoundingClientRect();
        if (!r || r.width === 0) return null;
        return {
            x: r.left + r.width / 2 - (box.left + box.width / 2),
            y: r.top + r.height / 2 - (box.top + box.height / 2),
            zoom: r.width / box.width,
        };
    };

    // Open: start sitting on the thumbnail, then spring to the centre.
    useLayoutEffect(() => {
        lenis?.stop();
        const origin = reduceMotion ? null : originTransform();
        if (origin) {
            x.set(origin.x);
            y.set(origin.y);
            zoom.set(origin.zoom);
            animate(x, 0, ZOOM);
            animate(y, 0, ZOOM);
            animate(zoom, 1, ZOOM);
            animate(fade, 1, ZOOM);
        } else {
            animate(fade, 1, { duration: 0.2 });
        }
        closeButton.current?.focus({ preventScroll: true });
        return () => {
            lenis?.start();
        };
        // Runs once per open; the motion values are stable.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const close = (velocityY = 0) => {
        if (closing.current) return;
        closing.current = true;
        // The viewer stops taking input for the ~0.4s it takes to go home, and
        // a timer guarantees it unmounts even if the animation never reports
        // completion (e.g. the tab is hidden mid-close). Without both, an
        // invisible overlay could be left sitting over the page.
        setIsClosing(true);
        fallback.current = window.setTimeout(finish, 900);
        const origin = reduceMotion ? null : originTransform();
        if (!origin) {
            animate(fade, 0, { duration: 0.18, onComplete: finish });
            return;
        }
        // Return to the thumbnail from wherever the image is right now,
        // keeping the release velocity so there's no seam after a flick.
        animate(pull, 0, ZOOM);
        animate(fade, 0, ZOOM);
        animate(x, origin.x, ZOOM);
        animate(zoom, origin.zoom, ZOOM);
        animate(y, origin.y, { ...ZOOM, velocity: velocityY, onComplete: finish });
    };

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onDrag = (_: unknown, info: PanInfo) => {
        pull.set(Math.abs(info.offset.y));
    };

    const onDragEnd = (_: unknown, info: PanInfo) => {
        // Judge by where the flick is heading, not where the finger lifted.
        const projected = info.offset.y + project(info.velocity.y);
        if (Math.abs(projected) > DISMISS_DISTANCE) {
            close(info.velocity.y);
        } else {
            animate(y, 0, { ...SETTLE, velocity: info.velocity.y });
            animate(pull, 0, SETTLE);
        }
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            // touch-none + overscroll-contain: the page underneath must not
            // scroll while a finger is on the viewer.
            className={cn("fixed inset-0 z-[60] touch-none overscroll-contain", isClosing && "pointer-events-none")}
        >
            <motion.div
                style={{ opacity: backdrop }}
                onClick={() => close()}
                className="absolute inset-0 bg-zinc-950/90"
            />

            <motion.img
                src={src}
                alt={alt}
                width={width}
                height={height}
                draggable={false}
                drag={isClosing ? false : "y"}
                dragMomentum={false}
                onDrag={onDrag}
                onDragEnd={onDragEnd}
                onTap={() => close()}
                style={{
                    x,
                    y,
                    scale,
                    left: box.left,
                    top: box.top,
                    width: box.width,
                    height: box.height,
                }}
                className="absolute select-none cursor-grab active:cursor-grabbing will-change-transform object-contain"
            />

            <motion.button
                ref={closeButton}
                type="button"
                onClick={() => close()}
                aria-label="Close"
                style={{ opacity: fade }}
                className="absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 active:scale-90 transition-[background-color,transform] duration-100"
            >
                <X className="w-5 h-5" />
            </motion.button>
        </div>
    );
}

interface ZoomableImageProps {
    src: string;
    alt: string;
    /** Intrinsic size: reserves layout space and sizes the enlarged view. */
    width: number;
    height: number;
    /** Classes for the thumbnail <img>. */
    className?: string;
    /** Classes for the button wrapping the thumbnail. */
    frameClassName?: string;
    imgRef?: React.Ref<HTMLImageElement>;
    onError?: React.ReactEventHandler<HTMLImageElement>;
    fetchPriority?: "high" | "low" | "auto";
}

export default function ZoomableImage({
    src,
    alt,
    width,
    height,
    className,
    frameClassName,
    imgRef,
    onError,
    fetchPriority = "auto",
}: ZoomableImageProps) {
    const frameRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    const wasOpen = useRef(false);

    // Hand keyboard focus back to the thumbnail once it's visible again — it
    // can't take focus while still `visibility: hidden` in the same tick.
    useEffect(() => {
        if (wasOpen.current && !open) frameRef.current?.focus({ preventScroll: true });
        wasOpen.current = open;
    }, [open]);

    const handleClosed = () => setOpen(false);

    return (
        <>
            <button
                ref={frameRef}
                type="button"
                onClick={() => setOpen(true)}
                aria-label={`View larger: ${alt}`}
                // Hidden (not removed) while enlarged, so the layout keeps its
                // shape and the enlarged copy reads as this image moving.
                style={{ visibility: open ? "hidden" : undefined }}
                className={cn("block cursor-zoom-in active:scale-[0.99] transition-transform duration-100", frameClassName)}
            >
                {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimised WebP */}
                <img
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    loading="eager"
                    fetchPriority={fetchPriority}
                    onError={onError}
                    className={className}
                />
            </button>
            {open &&
                createPortal(
                    <Lightbox
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        originRef={frameRef}
                        onClosed={handleClosed}
                    />,
                    document.body
                )}
        </>
    );
}
