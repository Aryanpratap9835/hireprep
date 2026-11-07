"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
    Sparkles,
    Brain,
    Code2,
    MessageSquareText,
    Cpu,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    Lightbulb,
    Send,
    RotateCcw,
    Award,
    Clock,
    Layers,
    AlertCircle,
    ChevronRight,
    Check,
} from "lucide-react";
import {
    InterviewQuestion,
    EvaluationResult,
    InterviewCategory,
    InterviewDifficulty,
    TargetRole,
} from "@/data/interview-questions";

const ROLES: TargetRole[] = [
    "SDE Intern",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "System Architect",
];

const INTERVIEW_MODES: {
    id: InterviewCategory;
    title: string;
    tagline: string;
    description: string;
    icon: any;
    color: string;
    badge: string;
}[] = [
    {
        id: "CS Fundamentals",
        title: "CS Fundamentals",
        tagline: "Core Tech Concepts",
        description: "Operating Systems, DBMS & SQL, Networks, OOP, System Design & Concurrency.",
        icon: Cpu,
        color: "from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30",
        badge: "Deep Dive",
    },
    {
        id: "Behavioral",
        title: "Behavioral (STAR)",
        tagline: "Leadership & Scenarios",
        description: "STAR method scenarios, handling deadlines, conflict resolution & ownership.",
        icon: MessageSquareText,
        color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
        badge: "HR & Culture",
    },
    {
        id: "Mixed",
        title: "Mixed Full Round",
        tagline: "Complete Simulation",
        description: "Comprehensive multi-stage round combining DSA coding + CS concepts + Behavioral.",
        icon: Layers,
        color: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
        badge: "Recommended",
    },
    {
        id: "DSA",
        title: "DSA Coding",
        tagline: "Algorithms & Logic",
        description: "Curated coding problems with full in-browser editor and test case runner.",
        icon: Code2,
        color: "from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30",
        badge: "Coding Round",
    },
];

export default function InterviewPage() {
    const router = useRouter();

    // Setup state
    const [role, setRole] = useState<TargetRole>("SDE Intern");
    const [type, setType] = useState<InterviewCategory>("CS Fundamentals");
    const [difficulty, setDifficulty] = useState<InterviewDifficulty>("Medium");
    const [questionCount, setQuestionCount] = useState<number>(3);
    const [isGenerating, setIsGenerating] = useState(false);

    // Active session state
    const [isInSession, setIsInSession] = useState(false);
    const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [evaluations, setEvaluations] = useState<Record<string, EvaluationResult>>({});
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [showHints, setShowHints] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [dsaProblem, setDsaProblem] = useState<any>(null);

    // 1. Generate & Launch Interview
    async function startInterview() {
        setIsGenerating(true);
        try {
            const res = await fetch("/api/interview", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    role,
                    type,
                    difficulty,
                    count: questionCount,
                }),
            });

            const data = await res.json();

            if (data.mode === "DSA" && data.problem?.id) {
                router.push(`/problem/${data.problem.id}`);
                return;
            }

            if (data.questions && data.questions.length > 0) {
                setQuestions(data.questions);
                setDsaProblem(data.dsaProblem || null);
                setCurrentIndex(0);
                setAnswers({});
                setEvaluations({});
                setIsInSession(true);
                setIsCompleted(false);
            }
        } catch (error) {
            console.error("Failed to generate interview:", error);
        } finally {
            setIsGenerating(false);
        }
    }

    // 2. Submit Answer for AI Evaluation
    async function evaluateCurrentAnswer() {
        const currentQ = questions[currentIndex];
        const currentAns = answers[currentQ.id];

        if (!currentAns || !currentAns.trim()) return;

        setIsEvaluating(true);
        try {
            const res = await fetch("/api/interview/evaluate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    question: currentQ,
                    answer: currentAns,
                    role,
                    difficulty,
                }),
            });

            const data = await res.json();
            if (data.success && data.evaluation) {
                setEvaluations((prev) => ({
                    ...prev,
                    [currentQ.id]: data.evaluation,
                }));
            }
        } catch (err) {
            console.error("Evaluation error:", err);
        } finally {
            setIsEvaluating(false);
        }
    }

    // 3. Complete Interview and Log Stats
    async function finishInterview() {
        setIsCompleted(true);
        const evalValues = Object.values(evaluations);
        const avgScore =
            evalValues.length > 0
                ? evalValues.reduce((acc, curr) => acc + (curr.score || 0), 0) / evalValues.length
                : 7.5;

        try {
            await fetch("/api/interview/complete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    interviewType: type,
                    role,
                    averageScore: Math.round(avgScore * 10) / 10,
                }),
            });
        } catch (err) {
            console.error("Complete save error:", err);
        }
    }

    const currentQuestion = questions[currentIndex];
    const currentAnswer = currentQuestion ? answers[currentQuestion.id] || "" : "";
    const currentEvaluation = currentQuestion ? evaluations[currentQuestion.id] : undefined;

    return (
        <div className="mx-auto max-w-5xl space-y-8 pb-16">
            {!isInSession ? (
                /* -------------------------------------------------------------
                   CONFIGURATION & SETUP SCREEN
                -------------------------------------------------------------- */
                <div className="space-y-8">
                    {/* Header */}
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            <Sparkles className="h-3.5 w-3.5" />
                            AI Mock Interview Engine
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Set Up Your Interview
                        </h1>
                        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                            Simulate real engineering interview rounds with dynamic AI questions, real-time evaluation, and in-depth performance rubrics.
                        </p>
                    </div>

                    {/* Step 1: Target Role */}
                    <div className="space-y-3">
                        <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                            1. Select Target Role
                        </label>
                        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
                            {ROLES.map((r) => {
                                const selected = role === r;
                                return (
                                    <button
                                        key={r}
                                        type="button"
                                        onClick={() => setRole(r)}
                                        className={`rounded-xl border p-3 text-left text-xs font-medium transition-all ${
                                            selected
                                                ? "border-primary bg-primary/15 text-primary shadow-[0_0_20px_-8px_var(--primary)]"
                                                : "border-glass-border bg-card/40 text-muted-foreground hover:border-glass-border/80 hover:text-foreground"
                                        }`}
                                    >
                                        {r}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Step 2: Interview Type Cards */}
                    <div className="space-y-3">
                        <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                            2. Choose Interview Format
                        </label>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {INTERVIEW_MODES.map((mode) => {
                                const selected = type === mode.id;
                                const Icon = mode.icon;
                                return (
                                    <div
                                        key={mode.id}
                                        onClick={() => setType(mode.id)}
                                        className={`group relative cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                                            selected
                                                ? "border-primary bg-primary/10 shadow-[0_0_24px_-10px_var(--primary)]"
                                                : "border-glass-border bg-card/40 hover:border-glass-border/80 hover:bg-card/70"
                                        }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div
                                                className={`flex h-11 w-11 items-center justify-center rounded-xl border bg-gradient-to-br ${mode.color}`}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <span
                                                className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${
                                                    selected
                                                        ? "border-primary/40 bg-primary/20 text-primary"
                                                        : "border-glass-border bg-muted/40 text-muted-foreground"
                                                }`}
                                            >
                                                {mode.badge}
                                            </span>
                                        </div>
                                        <h3 className="mt-4 text-base font-bold text-foreground">
                                            {mode.title}
                                        </h3>
                                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                                            {mode.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Step 3: Difficulty & Count */}
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-3">
                            <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                3. Difficulty Level
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {(["Easy", "Medium", "Hard"] as InterviewDifficulty[]).map((d) => {
                                    const selected = difficulty === d;
                                    return (
                                        <button
                                            key={d}
                                            type="button"
                                            onClick={() => setDifficulty(d)}
                                            className={`rounded-xl border py-2.5 text-center text-xs font-semibold transition-all ${
                                                selected
                                                    ? "border-primary bg-primary/15 text-primary shadow-[0_0_15px_-6px_var(--primary)]"
                                                    : "border-glass-border bg-card/40 text-muted-foreground hover:text-foreground"
                                            }`}
                                        >
                                            {d}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {type !== "DSA" && (
                            <div className="space-y-3">
                                <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                    4. Number of Questions
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[1, 3, 5].map((count) => {
                                        const selected = questionCount === count;
                                        return (
                                            <button
                                                key={count}
                                                type="button"
                                                onClick={() => setQuestionCount(count)}
                                                className={`rounded-xl border py-2.5 text-center text-xs font-semibold transition-all ${
                                                    selected
                                                        ? "border-primary bg-primary/15 text-primary shadow-[0_0_15px_-6px_var(--primary)]"
                                                        : "border-glass-border bg-card/40 text-muted-foreground hover:text-foreground"
                                                }`}
                                            >
                                                {count} {count === 1 ? "Question" : "Questions"}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Start Button */}
                    <div className="pt-2">
                        <button
                            type="button"
                            onClick={startInterview}
                            disabled={isGenerating}
                            className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-primary to-[oklch(0.55_0.22_270)] py-4 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-10px_var(--primary)] transition-all hover:opacity-95 disabled:opacity-50"
                        >
                            {isGenerating ? (
                                <>
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                                    <span>Generating {type} Interview...</span>
                                </>
                            ) : (
                                <>
                                    <Sparkles className="h-4 w-4" />
                                    <span>Start {type} Mock Interview</span>
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            ) : isCompleted ? (
                /* -------------------------------------------------------------
                   FINAL INTERVIEW SCORECARD
                -------------------------------------------------------------- */
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                >
                    <div className="rounded-3xl border border-glass-border bg-card/60 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary ring-1 ring-primary/30">
                            <Award className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">
                            Interview Completed!
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            You completed the <span className="font-semibold text-foreground">{type}</span> round for{" "}
                            <span className="font-semibold text-foreground">{role}</span> ({difficulty}).
                        </p>

                        {/* Overall Metrics */}
                        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                            <div className="rounded-2xl border border-glass-border bg-white/[0.02] p-4 text-center">
                                <p className="text-xs text-muted-foreground uppercase">Questions Answered</p>
                                <p className="mt-1 text-2xl font-bold text-foreground">
                                    {Object.keys(evaluations).length} / {questions.length}
                                </p>
                            </div>
                            <div className="rounded-2xl border border-glass-border bg-white/[0.02] p-4 text-center">
                                <p className="text-xs text-muted-foreground uppercase">Average Score</p>
                                <p className="mt-1 text-2xl font-bold text-primary">
                                    {Object.values(evaluations).length > 0
                                        ? (
                                              Object.values(evaluations).reduce((a, c) => a + (c.score || 0), 0) /
                                              Object.values(evaluations).length
                                          ).toFixed(1)
                                        : "N/A"}{" "}
                                    <span className="text-sm font-normal text-muted-foreground">/ 10</span>
                                </p>
                            </div>
                            <div className="col-span-2 rounded-2xl border border-glass-border bg-white/[0.02] p-4 text-center sm:col-span-1">
                                <p className="text-xs text-muted-foreground uppercase">Hiring Verdict</p>
                                <p className="mt-1 text-lg font-bold text-emerald-400">
                                    {Object.values(evaluations).some((e) => e.score >= 8) ? "Hire" : "Leaning Hire"}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsInSession(false);
                                    setIsCompleted(false);
                                }}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 sm:w-auto"
                            >
                                <RotateCcw className="h-4 w-4" />
                                Start Another Interview
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push("/dashboard")}
                                className="flex w-full items-center justify-center gap-2 rounded-xl border border-glass-border bg-card/60 px-6 py-3 text-sm font-medium text-foreground transition hover:bg-card sm:w-auto"
                            >
                                Return to Dashboard
                            </button>
                        </div>
                    </div>
                </motion.div>
            ) : (
                /* -------------------------------------------------------------
                   ACTIVE INTERVIEW SESSION RUNNER
                -------------------------------------------------------------- */
                <div className="space-y-6">
                    {/* Progress Header */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-glass-border pb-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                                    {type}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    • {role} ({difficulty})
                                </span>
                            </div>
                            <h2 className="mt-1 text-xl font-bold tracking-tight text-foreground">
                                Question {currentIndex + 1} of {questions.length}
                            </h2>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    if (confirm("Are you sure you want to end this interview session?")) {
                                        setIsInSession(false);
                                    }
                                }}
                                className="rounded-lg border border-glass-border bg-card/40 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                            >
                                Quit Session
                            </button>
                        </div>
                    </div>

                    {/* Question Card */}
                    <div className="rounded-2xl border border-glass-border bg-card/50 p-6 shadow-xl backdrop-blur-md space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="rounded-md bg-muted/60 px-2.5 py-1 text-xs font-semibold text-primary">
                                {currentQuestion?.category} • {currentQuestion?.subtopic}
                            </span>
                            <span className="text-xs text-muted-foreground">{currentQuestion?.difficulty}</span>
                        </div>

                        <h3 className="text-lg font-semibold text-foreground leading-snug">
                            {currentQuestion?.question}
                        </h3>

                        {currentQuestion?.context && (
                            <p className="text-xs text-muted-foreground italic">
                                Context: {currentQuestion.context}
                            </p>
                        )}

                        {/* Hints Toggle */}
                        {currentQuestion?.hints && currentQuestion.hints.length > 0 && (
                            <div className="pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowHints(!showHints)}
                                    className="flex items-center gap-1.5 text-xs font-medium text-amber-400/90 hover:text-amber-300"
                                >
                                    <Lightbulb className="h-3.5 w-3.5" />
                                    {showHints ? "Hide Interviewer Hints" : "Show Interviewer Hints"}
                                </button>
                                {showHints && (
                                    <div className="mt-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-300 space-y-1">
                                        {currentQuestion.hints.map((hint, idx) => (
                                            <p key={idx}>💡 {hint}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Answer Input Area */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Your Response / Solution Explanation
                            </label>
                            <span className="text-xs text-muted-foreground">
                                {currentAnswer.length} characters • {currentAnswer.trim().split(/\s+/).filter(Boolean).length} words
                            </span>
                        </div>

                        <textarea
                            rows={8}
                            value={currentAnswer}
                            onChange={(e) =>
                                setAnswers((prev) => ({
                                    ...prev,
                                    [currentQuestion.id]: e.target.value,
                                }))
                            }
                            placeholder={
                                currentQuestion.type === "BEHAVIORAL"
                                    ? "Structure your answer using the STAR format:\n- Situation: Describe the context and challenge\n- Task: What was your specific responsibility?\n- Action: What concrete technical or interpersonal actions did you take?\n- Result: What was the measurable outcome and key learning?"
                                    : "Provide your comprehensive technical answer. Explain definitions, mechanics, architectural trade-offs, and concrete examples..."
                            }
                            className="w-full rounded-2xl border border-glass-border bg-card/60 p-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-1 focus:ring-primary font-sans leading-relaxed"
                        />

                        {/* Evaluate Button */}
                        <div className="flex items-center justify-between gap-3 pt-1">
                            <button
                                type="button"
                                onClick={evaluateCurrentAnswer}
                                disabled={isEvaluating || !currentAnswer.trim()}
                                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-[oklch(0.55_0.22_270)] px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-md transition disabled:opacity-40"
                            >
                                {isEvaluating ? (
                                    <>
                                        <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                                        <span>AI is Reviewing Your Answer...</span>
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="h-3.5 w-3.5" />
                                        <span>{currentEvaluation ? "Re-evaluate Answer" : "Submit Answer to AI"}</span>
                                    </>
                                )}
                            </button>

                            {/* DSA Link if problem attached */}
                            {currentQuestion.dsaProblemId && (
                                <button
                                    type="button"
                                    onClick={() => window.open(`/problem/${currentQuestion.dsaProblemId}`, "_blank")}
                                    className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                                >
                                    <Code2 className="h-3.5 w-3.5" />
                                    Open in Code Editor ↗
                                </button>
                            )}
                        </div>
                    </div>

                    {/* AI Evaluation Card */}
                    <AnimatePresence>
                        {currentEvaluation && (
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="rounded-2xl border border-primary/30 bg-primary/5 p-6 shadow-xl space-y-5"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary/15 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary font-bold text-lg">
                                            {currentEvaluation.score}
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase font-semibold">
                                                AI Evaluation Score
                                            </p>
                                            <p className="text-sm font-bold text-foreground">
                                                Verdict:{" "}
                                                <span
                                                    className={
                                                        currentEvaluation.score >= 8
                                                            ? "text-emerald-400"
                                                            : currentEvaluation.score >= 6
                                                            ? "text-amber-400"
                                                            : "text-rose-400"
                                                    }
                                                >
                                                    {currentEvaluation.verdict}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                        OpenRouter AI Evaluator
                                    </span>
                                </div>

                                {/* Analysis */}
                                <div>
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Interviewer Review
                                    </h4>
                                    <p className="mt-1.5 text-sm text-foreground leading-relaxed">
                                        {currentEvaluation.analysis}
                                    </p>
                                </div>

                                {/* STAR Breakdown (Behavioral) */}
                                {currentEvaluation.starBreakdown && (
                                    <div className="rounded-xl border border-glass-border bg-card/60 p-4 space-y-2">
                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-primary">
                                            STAR Framework Breakdown
                                        </h4>
                                        <div className="grid gap-2 sm:grid-cols-2 text-xs">
                                            <div>
                                                <span className="font-bold text-foreground">Situation:</span>{" "}
                                                <span className="text-muted-foreground">{currentEvaluation.starBreakdown.situation}</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-foreground">Task:</span>{" "}
                                                <span className="text-muted-foreground">{currentEvaluation.starBreakdown.task}</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-foreground">Action:</span>{" "}
                                                <span className="text-muted-foreground">{currentEvaluation.starBreakdown.action}</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-foreground">Result:</span>{" "}
                                                <span className="text-muted-foreground">{currentEvaluation.starBreakdown.result}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Strengths & Missing Points */}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {currentEvaluation.strengths && currentEvaluation.strengths.length > 0 && (
                                        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                                            <h5 className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase">
                                                <CheckCircle2 className="h-3.5 w-3.5" /> What You Did Well
                                            </h5>
                                            <ul className="mt-2 space-y-1 text-xs text-muted-foreground list-disc list-inside">
                                                {currentEvaluation.strengths.map((s, i) => (
                                                    <li key={i}>{s}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {currentEvaluation.missingPoints && currentEvaluation.missingPoints.length > 0 && (
                                        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                                            <h5 className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase">
                                                <AlertCircle className="h-3.5 w-3.5" /> Gaps & Key Concepts Missed
                                            </h5>
                                            <ul className="mt-2 space-y-1 text-xs text-muted-foreground list-disc list-inside">
                                                {currentEvaluation.missingPoints.map((m, i) => (
                                                    <li key={i}>{m}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* Ideal Model Answer */}
                                {currentEvaluation.idealAnswer && (
                                    <div className="rounded-xl border border-glass-border bg-card/60 p-4 space-y-1.5">
                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            Recommended Model Answer
                                        </h4>
                                        <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                                            {currentEvaluation.idealAnswer}
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Bottom Navigation */}
                    <div className="flex items-center justify-between border-t border-glass-border pt-4">
                        <button
                            type="button"
                            disabled={currentIndex === 0}
                            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                            className="flex items-center gap-1.5 rounded-xl border border-glass-border px-4 py-2.5 text-xs font-medium text-muted-foreground transition hover:text-foreground disabled:opacity-30"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" /> Previous Question
                        </button>

                        {currentIndex < questions.length - 1 ? (
                            <button
                                type="button"
                                onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                                className="flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90"
                            >
                                Next Question <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={finishInterview}
                                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg transition hover:opacity-95"
                            >
                                <Check className="h-3.5 w-3.5" /> Complete Interview
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
