"use client";

import {
    animate,
    useMotionValue,
    useTransform,
    motion,
} from "motion/react";
import { useEffect } from "react";

/**
 * Count-up number for statistics. Animates from 0 to `value` once on mount
 * using a single motion value (no per-frame React state).
 */
export default function AnimatedCounter({
    value,
    duration = 1.1,
    prefix = "",
    suffix = "",
    decimals = 0,
}: {
    value: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
}) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) =>
        `${prefix}${latest.toFixed(decimals)}${suffix}`
    );

    useEffect(() => {
        const reduceMotion =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reduceMotion) {
            count.set(value);
            return;
        }

        const controls = animate(count, value, {
            duration,
            ease: [0.22, 1, 0.36, 1],
        });
        return () => controls.stop();
    }, [count, value, duration]);

    return <motion.span>{rounded}</motion.span>;
}
