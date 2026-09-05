import Link from "next/link";
import LoginButton from "@/components/ui/LoginButton";
import GithubLoginButton from "@/components/ui/GithubLoginButton";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";

export default function LoginPage() {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050912] px-6 text-white">
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-[-280px] h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[140px]" />

                <div className="absolute bottom-[-200px] right-[-150px] h-[450px] w-[450px] rounded-full bg-cyan-500/5 blur-[120px]" />
            </div>

            {/* Back */}
            <Link
                href="/"
                className="absolute left-6 top-6 flex items-center gap-2 text-sm text-slate-500 transition hover:text-white"
            >
                <ArrowLeft size={16} />
                Back to home
            </Link>

            <div className="relative w-full max-w-[430px]">
                {/* Logo */}
                <div className="mb-8 flex justify-center">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 text-lg font-bold shadow-lg shadow-blue-500/20">
                            &gt;_
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold tracking-tight">
                                HirePrep
                            </span>

                            <span className="rounded-md border border-blue-400/20 bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-bold text-blue-400">
                                AI
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Card */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#0b121e]/95 p-8 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-10">
                    {/* Heading */}
                    <div className="text-center">
                        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-500/10 text-blue-400">
                            <Sparkles size={21} />
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight">
                            Welcome to HirePrep
                        </h1>

                        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">
                            Sign in to continue your interview preparation.
                        </p>
                    </div>

                    {/* OAuth */}
                    <div className="mt-8 space-y-3">
                        <LoginButton />

                        <GithubLoginButton />
                    </div>

                    {/* Divider */}
                    <div className="my-7 flex items-center gap-4">
                        <div className="h-px flex-1 bg-white/[0.07]" />

                        <span className="text-[10px] font-medium tracking-wider text-slate-600">
                            SECURE SIGN IN
                        </span>

                        <div className="h-px flex-1 bg-white/[0.07]" />
                    </div>

                    {/* Benefits */}
                    <div className="space-y-3">
                        <Benefit>
                            Track your coding problems and progress
                        </Benefit>

                        <Benefit>
                            Get AI-powered hints and code reviews
                        </Benefit>

                        <Benefit>
                            Prepare with realistic mock interviews
                        </Benefit>
                    </div>
                </div>

                <p className="mt-6 text-center text-xs text-slate-600">
                    By continuing, you agree to use HirePrep for interview
                    preparation.
                </p>
            </div>
        </main>
    );
}

function Benefit({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-3 text-sm text-slate-400">
            <CheckCircle2
                size={16}
                className="shrink-0 text-blue-400"
            />

            <span>{children}</span>
        </div>
    );
}