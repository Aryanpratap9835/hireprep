"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-accent"
        >
            Logout
        </button>
    );
}