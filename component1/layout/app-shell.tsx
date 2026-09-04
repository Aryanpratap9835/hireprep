"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import Sidebar from "@/component1/layout/sidebar";
import Navbar from "@/component1/layout/navbar";
import AmbientBackground from "@/component1/effect/ambient-background";
import CursorGlow from "@/component1/effect/cursor-glow";

export default function AppShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    // Close the mobile drawer whenever the route changes.
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    return (
        <div className="relative flex min-h-screen">
            {/* Ambient depth layers (behind everything) */}
            <AmbientBackground />
            <CursorGlow />

            {/* Desktop sidebar (static) */}
            <div className="relative z-20 hidden lg:block">
                <Sidebar />
            </div>

            {/* Mobile sidebar (drawer) */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
                            aria-hidden="true"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 320, damping: 34 }}
                            className="fixed inset-y-0 left-0 z-50 lg:hidden"
                        >
                            <Sidebar onNavigate={() => setMobileOpen(false)} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main column */}
            <div className="relative z-10 flex min-w-0 flex-1 flex-col">
                <Navbar onMenuClick={() => setMobileOpen(true)} />

                <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
