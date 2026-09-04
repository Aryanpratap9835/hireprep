"use client";

import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import { forwardRef } from "react";

/**
 * Motion primitives for consistent, tasteful entrance + staggered reveals.
 *
 *   <RevealGroup>            // orchestrates staggered children on mount
 *     <RevealItem>...        // fades/rises in as part of the sequence
 *     <RevealItem>...
 *   </RevealGroup>
 *
 *   <Reveal>...              // one-off entrance for a standalone element
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const groupVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.07,
            delayChildren: 0.05,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: EASE },
    },
};

type DivMotionProps = HTMLMotionProps<"div">;

export const RevealGroup = forwardRef<HTMLDivElement, DivMotionProps>(
    function RevealGroup({ children, ...props }, ref) {
        return (
            <motion.div
                ref={ref}
                initial="hidden"
                animate="visible"
                variants={groupVariants}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

export const RevealItem = forwardRef<HTMLDivElement, DivMotionProps>(
    function RevealItem({ children, ...props }, ref) {
        return (
            <motion.div ref={ref} variants={itemVariants} {...props}>
                {children}
            </motion.div>
        );
    }
);

/** Standalone entrance (not part of a RevealGroup sequence). */
export const Reveal = forwardRef<
    HTMLDivElement,
    DivMotionProps & { delay?: number }
>(function Reveal({ children, delay = 0, ...props }, ref) {
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay }}
            {...props}
        >
            {children}
        </motion.div>
    );
});
