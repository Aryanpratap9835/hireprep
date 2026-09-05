"use client";

import { cn } from "cn";
import { useRef, type ReactNode } from "react";

/**
 * Premium layered card.
 *
 * - Glass/surface styling with a hairline highlight + depth shadow.
 * - Optional pointer-tracked spotlight that follows the cursor across the
 *   card surface (pure CSS custom-property writes on mousemove — no React
 *   state, GPU-friendly).
 * - Optional hover elevation (translateY) via the `.elevate` utility.
 */
export default function GlowCard({
    children,
    className,
    spotlight = true,
    elevate = true,
    as: Tag = "div",
}: {
    children: ReactNode;
    className?: string;
    spotlight?: boolean;
    elevate?: boolean;
    as?: "div" | "article" | "section";
}) {
    const ref = useRef<HTMLDivElement>(null);

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!spotlight) return;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    return (
        <Tag
            ref={ref as never}
            onMouseMove={handleMove}
            className={cn(
                "surface-card group/glow relative overflow-hidden rounded-2xl",
                elevate && "elevate hover:border-primary/25",
                className
            )}
        >
            {spotlight && (
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/glow:opacity-100"
                    style={{
                        background:
                            "radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), oklch(0.62 0.185 255 / 14%), transparent 70%)",
                    }}
                />
            )}
            <div className="relative z-10 h-full">{children}</div>
        </Tag>
    );
}
