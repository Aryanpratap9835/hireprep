"use client";

import { signIn } from "next-auth/react";

export default function LoginButton() {
    return (
        <button
            type="button"
            onClick={() =>
                signIn("google", {
                    callbackUrl: "/dashboard",
                })
            }
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-white/[0.10] bg-white text-sm font-semibold text-[#202124] shadow-sm transition hover:bg-gray-100"
        >
            {/* Google Logo */}
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path
                    fill="#4285F4"
                    d="M21.35 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.23a4.47 4.47 0 0 1-1.94 2.93v2.43h3.14c1.84-1.69 2.92-4.18 2.92-7.39Z"
                />

                <path
                    fill="#34A853"
                    d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.43c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.29v2.51A9.75 9.75 0 0 0 12 21.5Z"
                />

                <path
                    fill="#FBBC05"
                    d="M6.54 13.6A5.86 5.86 0 0 1 6.23 12c0-.56.1-1.1.31-1.6V7.89H3.29A9.5 9.5 0 0 0 2.25 12c0 1.53.37 2.98 1.04 4.11l3.25-2.51Z"
                />

                <path
                    fill="#EA4335"
                    d="M12 6.38c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.47 14.63 2.5 12 2.5a9.75 9.75 0 0 0-8.71 5.39l3.25 2.51C7.31 8.1 9.46 6.38 12 6.38Z"
                />
            </svg>

            <span>Continue with Google</span>
        </button>
    );
}