"use client";

import { usePathname } from "next/navigation";
import { Bell, Menu, Terminal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";


const TITLES: Record<string, string> = {
    "/": "Dashboard",
    "/problem": "Coding Problems",
    "/interview": "AI Interview",
};

function resolveTitle(pathname: string) {
    if (pathname.startsWith("/problem/")) return "Problem";
    return TITLES[pathname] ?? "Interview Preparation";
}

export default function Navbar({
    onMenuClick,
}: {
    onMenuClick?: () => void;
}) {
    const pathname = usePathname();

    return (
        <header className="glass sticky top-0 z-30 flex h-16 items-center justify-between border-b border-glass-border px-4 sm:px-6">
            <div className="flex items-center gap-3">
                {/* Mobile menu + brand */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onMenuClick}
                    className="lg:hidden"
                    aria-label="Open navigation menu"
                >
                    <Menu className="h-5 w-5" />
                </Button>

                <div className="flex items-center gap-2 lg:hidden">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[oklch(0.5_0.2_270)] text-primary-foreground">
                        <Terminal className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-bold tracking-tight">HirePrep</span>
                </div>

                {/* Page context (desktop) */}
                <div className="hidden lg:block">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                        Workspace
                    </p>
                    <h1 className="text-sm font-semibold text-foreground">
                        {resolveTitle(pathname)}
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Notifications"
                    className="relative"
                >
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_1px_var(--primary)]" />
                </Button>

                <Avatar className="ring-1 ring-glass-border">
                    <AvatarFallback className="bg-gradient-to-br from-primary/25 to-primary/5 text-sm font-semibold text-foreground">
                        U
                    </AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
}
