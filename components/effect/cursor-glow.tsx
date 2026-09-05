"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient cursor light.
 *
 * A large, blurred radial light that smoothly trails the pointer and sits
 * BEHIND all UI. Implemented with a single rAF loop that writes to
 * `transform` only (GPU-friendly) — it never triggers React re-renders,
 * never blocks pointer events, and never interferes with text selection.
 */
export default function CursorGlow() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const el = ref.current;
        if (!el) return;

        // Start centered so the light is present before first move.
        let targetX = window.innerWidth / 2;
        let targetY = window.innerHeight / 2;
        let currentX = targetX;
        let currentY = targetY;

        let frame = 0;

        const handleMove = (event: MouseEvent) => {
            targetX = event.clientX;
            targetY = event.clientY;
        };

        const render = () => {
            // Smooth lerp toward the pointer for a soft, floating feel.
            currentX += (targetX - currentX) * 0.12;
            currentY += (targetY - currentY) * 0.12;

            el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

            frame = requestAnimationFrame(render);
        };

        if (reduceMotion) {
            // No trailing animation — just anchor the light to the pointer.
            const staticMove = (event: MouseEvent) => {
                el.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
            };
            window.addEventListener("mousemove", staticMove, { passive: true });
            return () => window.removeEventListener("mousemove", staticMove);
        }

        window.addEventListener("mousemove", handleMove, { passive: true });
        frame = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <div
            aria-hidden="true"
            ref={ref}
            className="ambient-glow pointer-events-none fixed left-0 top-0 z-0 h-[36rem] w-[36rem] rounded-full opacity-70 blur-[80px] will-change-transform"
        />
    );
}
