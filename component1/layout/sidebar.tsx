"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Code2, Sparkles, Terminal } from "lucide-react";

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

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="flex w-64 flex-col border-r bg-card/50 backdrop-blur-sm">
            {/* Logo / Brand Header */}
            <div className="flex h-16 items-center gap-3 border-b px-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                    <Terminal className="h-5 w-5" />
                </div>
                <div className="flex items-center">
                    <span className="font-bold text-foreground text-lg tracking-tight">HirePrep</span>
                    <span className="ml-2 rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">AI</span>
                </div>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 space-y-1.5 p-4">
                <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                        >
                            <Icon className={`h-4 w-4 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Quick Info */}
            <div className="border-t p-4">
                <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs font-medium text-foreground">Interview Prep Mode</p>
                    <p className="mt-1 text-xs text-muted-foreground">Practice coding & mock interviews with AI feedback.</p>
                </div>
            </div>
        </aside>
    );
}
