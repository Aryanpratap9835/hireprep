"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import {
    LayoutDashboard,
    Code2,
    Sparkles,
    Terminal,
    Zap,
} from "lucide-react";

const navigationItems = [
    {
        name: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
    },
    {
        name: "Problems",
        href: "/problem",
        icon: Code2,
    },
    {
        name: "AI Interview",
        href: "/interview",
        icon: Sparkles,
    },
];

export default function Sidebar({
    onNavigate,
}: {
    onNavigate?: () => void;
}) {
    const pathname = usePathname();

    return (
        <aside className="glass flex h-full min-h-screen w-72 flex-col border-r border-glass-border">
            {/* Logo / Brand Header */}
            <div className="flex h-16 items-center gap-3 border-b border-glass-border px-6">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.5_0.2_270)] text-primary-foreground shadow-[0_8px_20px_-8px_var(--primary)]">
                    <Terminal className="h-5 w-5" />
                    <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
                </div>
                <div className="flex items-center">
                    <span className="text-lg font-bold tracking-tight text-foreground">
                        HirePrep
                    </span>
                    <span className="ml-2 rounded-md bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary ring-1 ring-inset ring-primary/25">
                        AI
                    </span>
                </div>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 space-y-1 p-4">
                <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Menu
                </div>

                {navigationItems.map((item) => {
                    const isActive =
                        item.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onNavigate}
                            aria-current={isActive ? "page" : undefined}
                            className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/60 ${
                                isActive
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                            }`}
                        >
                            {isActive && (
                                <motion.span
                                    layoutId="sidebar-active"
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 34,
                                    }}
                                    className="absolute inset-0 -z-10 rounded-xl border border-primary/25 bg-primary/12 shadow-[0_8px_24px_-16px_var(--primary)]"
                                />
                            )}
                            <Icon
                                className={`h-4 w-4 transition-colors ${
                                    isActive
                                        ? "text-primary"
                                        : "text-muted-foreground group-hover:text-foreground"
                                }`}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Quick Info */}
            <div className="border-t border-glass-border p-4">
                <div className="surface-card rounded-2xl p-4">
                    <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 text-primary">
                            <Zap className="h-3.5 w-3.5" />
                        </span>
                        <p className="text-sm font-semibold text-foreground">
                            Interview Prep Mode
                        </p>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        Practice coding & mock interviews with AI-driven feedback.
                    </p>
                </div>
            </div>
        </aside>
    );
}
