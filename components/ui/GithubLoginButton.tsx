"use client";

import { signIn } from "next-auth/react";

export default function GithubLoginButton() {
    return (
        <button
            type="button"
            onClick={() =>
                signIn("github", {
                    callbackUrl: "/dashboard",
                })
            }
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-white/[0.10] bg-[#151b26] text-sm font-semibold text-white transition hover:border-white/[0.18] hover:bg-[#1b2330]"
        >
            {/* GitHub Logo */}
            <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.13c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.67.41.35.78 1.05.78 2.12v3.14c0 .3.21.65.79.54A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>

            <span>Continue with GitHub</span>
        </button>
    );
}