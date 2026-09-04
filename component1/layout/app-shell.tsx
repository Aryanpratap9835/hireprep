"use client";

import Sidebar from "@/component1/layout/sidebar";
import Navbar from "@/component1/layout/navbar";

export default function AppShell({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />

            <div className="flex min-w-0 flex-1 flex-col">
                <Navbar />

                <main className="flex-1 overflow-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}