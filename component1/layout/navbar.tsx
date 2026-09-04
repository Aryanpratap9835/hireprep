"use client";

import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-background px-6">
            <div>
                <h1 className="text-sm font-medium text-muted-foreground">
                    Interview Preparation
                </h1>
            </div>

            <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                </Button>

                <Avatar>
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
}