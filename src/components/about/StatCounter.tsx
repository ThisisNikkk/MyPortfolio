"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

interface StatCounterProps {
    value: number;
    suffix?: string;
    duration?: number;
}

export default function StatCounter({ value, suffix = "", duration = 1.4 }: StatCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const controls = animate(0, value, {
            duration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (latest) => setDisplay(Math.round(latest)),
        });
        return () => controls.stop();
    }, [inView, value, duration]);

    return (
        <span ref={ref}>
            {display}
            {suffix}
        </span>
    );
}
