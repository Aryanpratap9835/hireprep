"use client";

import { cn } from "cn";
import { motion } from "motion/react";

/**
 * Animated progress bar. Fills from 0 to `value`% on mount with a smooth
 * ease and a subtle gradient sheen.
 */
export default function AnimatedProgress({
    value,
    className,
    trackClassName,
}: {
    value: number;
    className?: string;
    trackClassName?: string;
}) {
    const clamped = Math.max(0, Math.min(100, value));

    return (
        <div
            role="progressbar"
            aria-valuenow={clamped}
            aria-valuemin={0}
            aria-valuemax={100}
            className={cn(
                "h-2 w-full overflow-hidden rounded-full bg-muted/70",
                trackClassName
            )}
        >
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${clamped}%` }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                    "h-full rounded-full bg-gradient-to-r from-primary/80 to-primary shadow-[0_0_12px_-2px_var(--primary)]",
                    className
                )}
            />
        </div>
    );
}
