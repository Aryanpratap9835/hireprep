"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Search,
    SlidersHorizontal,
    Code2,
    ArrowUpRight,
    CheckCircle2,
} from "lucide-react";

type Problem = {
    id: string;
    title: string;
    topic: string;
    difficulty: string;
};

export default function ProblemList({
    problems,
}: {
    problems: Problem[];
}) {
    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("All");
    const [topic, setTopic] = useState("All");

    const topics = useMemo(() => {
        return ["All", ...Array.from(new Set(problems.map((p) => p.topic)))];
    }, [problems]);

    const filteredProblems = useMemo(() => {
        return problems.filter((problem) => {
            const matchesSearch =
                problem.title.toLowerCase().includes(search.toLowerCase()) ||
                problem.topic.toLowerCase().includes(search.toLowerCase());

            const matchesDifficulty =
                difficulty === "All" || problem.difficulty === difficulty;

            const matchesTopic =
                topic === "All" || problem.topic === topic;

            return matchesSearch && matchesDifficulty && matchesTopic;
        });
    }, [problems, search, difficulty, topic]);

    return (
        <div className="relative min-h-full">
            {/* Background glow */}
            <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
                >
                    <div>
                        <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                            <Code2 className="h-4 w-4" />
                            <span>Practice</span>
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight">
                            Coding Problems
                        </h1>

                        <p className="mt-2 max-w-xl text-muted-foreground">
                            Sharpen your problem-solving skills with curated interview
                            questions.
                        </p>
                    </div>

                    <div className="rounded-xl border bg-card px-4 py-3">
                        <p className="text-xs text-muted-foreground">
                            Available problems
                        </p>
                        <p className="mt-1 text-2xl font-bold">
                            {problems.length}
                        </p>
                    </div>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-2xl border bg-card/80 p-4 shadow-sm backdrop-blur"
                >
                    <div className="flex flex-col gap-3 lg:flex-row">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search problems..."
                                className="h-11 w-full rounded-xl border bg-background pl-10 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        {/* Difficulty */}
                        <div className="relative">
                            <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="h-11 w-full appearance-none rounded-xl border bg-background pl-10 pr-10 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 lg:w-44"
                            >
                                <option value="All">All Difficulty</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>

                        {/* Topic */}
                        <select
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 lg:w-44"
                        >
                            {topics.map((item) => (
                                <option key={item} value={item}>
                                    {item === "All" ? "All Topics" : item}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-3 text-xs text-muted-foreground">
                        Showing {filteredProblems.length} of {problems.length} problems
                    </div>
                </motion.div>

                {/* Problems */}
                <AnimatePresence mode="popLayout">
                    {filteredProblems.length > 0 ? (
                        <motion.div
                            layout
                            className="grid gap-4"
                        >
                            {filteredProblems.map((problem, index) => (
                                <motion.div
                                    key={problem.id}
                                    layout
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.03,
                                    }}
                                >
                                    <Link
                                        href={`/problem/${problem.id}`}
                                        className="group block"
                                    >
                                        <div className="relative overflow-hidden rounded-2xl border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                                            {/* Hover glow */}
                                            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

                                            <div className="relative flex items-center justify-between gap-4">
                                                <div className="flex min-w-0 items-center gap-4">
                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-primary/10">
                                                        <Code2 className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <h2 className="truncate text-base font-semibold transition-colors group-hover:text-primary">
                                                            {problem.title}
                                                        </h2>

                                                        <div className="mt-2 flex flex-wrap items-center gap-2">
                                                            <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                                                                {problem.topic}
                                                            </span>

                                                            <DifficultyBadge
                                                                difficulty={problem.difficulty}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="rounded-2xl border border-dashed bg-card p-12 text-center"
                        >
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                                <Search className="h-5 w-5 text-muted-foreground" />
                            </div>

                            <h2 className="mt-4 font-semibold">
                                No problems found
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Try changing your search or filters.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Small footer */}
                <div className="flex items-center justify-center gap-2 pb-4 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Practice consistently. Improve every day.</span>
                </div>
            </div>
        </div>
    );
}

function DifficultyBadge({
    difficulty,
}: {
    difficulty: string;
}) {
    const styles = {
        Easy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        Medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        Hard: "bg-red-500/10 text-red-600 dark:text-red-400",
    };

    const style =
        styles[difficulty as keyof typeof styles] ??
        "bg-muted text-muted-foreground";

    return (
        <span className={`rounded-md px-2 py-1 text-xs font-medium ${style}`}>
            {difficulty}
        </span>
    );
}