"use client";

import Link from "next/link";
import { motion } from "motion/react";
import LogoutButton from "@/components/ui/LogoutButton";

import {
    ArrowRight,
    Brain,
    Code2,
    Flame,
    Target,
    Trophy,
} from "lucide-react";

type DashboardProps = {
    progress?: {
        problemsSolved: number;
        currentStreak: number;
        accuracy: number;
        interviews: number;
        preparation: number;
    } | null;

    difficultyStats: {
        easy: number;
        medium: number;
        hard: number;
    };

    recentActivity: {
        id: string;
        title: string;
        type: string;
        date: string | null;
    }[];
};

export default function Dashboard({
    progress,
    difficultyStats,
    recentActivity,
}: DashboardProps) {
    return (
        <div className="relative min-h-screen overflow-hidden space-y-8">
            {/* -------------------------------- */}
            {/* Logout */}
            {/* -------------------------------- */}

            <LogoutButton />

            {/* -------------------------------- */}
            {/* Hero */}
            {/* -------------------------------- */}

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-background via-background to-muted p-8"
            >
                <div className="relative z-10 max-w-2xl">
                    <p className="mb-2 text-sm font-medium text-muted-foreground">
                        Welcome back 👋
                    </p>

                    <h1 className="text-4xl font-bold tracking-tight">
                        Prepare smarter.
                        <br />

                        <span className="text-muted-foreground">
                            Crack your next interview.
                        </span>
                    </h1>

                    <p className="mt-4 max-w-xl text-muted-foreground">
                        Practice coding problems, simulate interviews, and
                        track your progress with HirePrep.
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-6 w-fit"
                    >
                        <Link
                            href="/problem"
                            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
                        >
                            Continue Practice

                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </motion.div>
                </div>

                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            </motion.section>

            {/* -------------------------------- */}
            {/* Stats */}
            {/* -------------------------------- */}

            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    icon={<Code2 className="h-5 w-5" />}
                    title="Problems Solved"
                    value={String(progress?.problemsSolved ?? 0)}
                    description="of 150"
                />

                <StatCard
                    icon={<Flame className="h-5 w-5" />}
                    title="Current Streak"
                    value={String(progress?.currentStreak ?? 0)}
                    description="days"
                />

                <StatCard
                    icon={<Target className="h-5 w-5" />}
                    title="Accuracy"
                    value={`${progress?.accuracy ?? 0}%`}
                    description="overall"
                />

                <StatCard
                    icon={<Trophy className="h-5 w-5" />}
                    title="Interviews"
                    value={String(progress?.interviews ?? 0)}
                    description="completed"
                />
            </section>

            {/* -------------------------------- */}
            {/* Main Content */}
            {/* -------------------------------- */}

            <section className="grid gap-6 lg:grid-cols-3">
                {/* Your Progress */}

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-2xl border bg-card p-6 lg:col-span-2"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Your Progress
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Keep pushing forward.
                            </p>
                        </div>

                        <Brain className="h-6 w-6 text-muted-foreground" />
                    </div>

                    {/* Overall preparation */}

                    <div className="mt-6">
                        <div className="mb-2 flex justify-between text-sm">
                            <span>Overall preparation</span>

                            <span className="font-medium">
                                {progress?.preparation ?? 0}%
                            </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{
                                    width: `${Math.min(
                                        progress?.preparation ?? 0,
                                        100
                                    )}%`,
                                }}
                                transition={{ duration: 1 }}
                                className="h-full rounded-full bg-primary"
                            />
                        </div>
                    </div>

                    {/* Difficulty Statistics */}

                    <div className="mt-6 grid grid-cols-3 gap-4">
                        <ProgressItem
                            label="Easy"
                            value={String(difficultyStats.easy)}
                        />

                        <ProgressItem
                            label="Medium"
                            value={String(difficultyStats.medium)}
                        />

                        <ProgressItem
                            label="Hard"
                            value={String(difficultyStats.hard)}
                        />
                    </div>
                </motion.div>

                {/* -------------------------------- */}
                {/* Continue Learning */}
                {/* -------------------------------- */}

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-2xl border bg-card p-6"
                >
                    <h2 className="text-lg font-semibold">
                        Continue Learning
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Pick up where you left off.
                    </p>

                    <div className="mt-6 rounded-xl border bg-muted/40 p-4">
                        <p className="text-sm font-medium">
                            Maximum Subarray
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Arrays · Medium
                        </p>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-4"
                        >
                            <Link
                                href="/problem/maximum-subarray"
                                className="flex w-full items-center justify-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
                            >
                                Solve Problem

                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* -------------------------------- */}
            {/* Recent Activity */}
            {/* -------------------------------- */}

            <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl border bg-card p-6"
            >
                <div>
                    <h2 className="text-lg font-semibold">
                        Recent Activity
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Your latest practice activity.
                    </p>
                </div>

                <div className="mt-5 space-y-4">
                    {recentActivity.length === 0 ? (
                        <div className="rounded-xl border border-dashed p-6 text-center">
                            <p className="text-sm font-medium">
                                No activity yet
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Solve your first problem to see your activity
                                here.
                            </p>

                            <Link
                                href="/problem"
                                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                            >
                                Start Practicing

                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    ) : (
                        recentActivity.map((activity) => (
                            <Activity
                                key={activity.id}
                                title={activity.title}
                                type={activity.type}
                                date={activity.date}
                            />
                        ))
                    )}
                </div>
            </motion.section>
        </div>
    );
}

/* ================================= */
/* Stat Card                         */
/* ================================= */

function StatCard({
    icon,
    title,
    value,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    value: string;
    description: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
                y: -4,
            }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border bg-card p-5 transition-shadow hover:shadow-md"
        >
            <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                    {title}
                </span>

                <span className="text-muted-foreground">
                    {icon}
                </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold">
                    {value}
                </span>

                <span className="text-sm text-muted-foreground">
                    {description}
                </span>
            </div>
        </motion.div>
    );
}

/* ================================= */
/* Progress Item                     */
/* ================================= */

function ProgressItem({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-xl bg-muted/50 p-4"
        >
            <p className="text-sm text-muted-foreground">
                {label}
            </p>

            <p className="mt-1 text-xl font-semibold">
                {value}
            </p>
        </motion.div>
    );
}

/* ================================= */
/* Activity                          */
/* ================================= */

function Activity({
    title,
    type,
    date,
}: {
    title: string;
    type: string;
    date: string | null;
}) {
    return (
        <motion.div
            whileHover={{ x: 4 }}
            className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
        >
            <div>
                <p className="text-sm font-medium">
                    {title}
                </p>

                <p className="text-xs text-muted-foreground">
                    {type}
                </p>
            </div>

            <span className="text-xs text-muted-foreground">
                {formatRelativeTime(date)}
            </span>
        </motion.div>
    );
}

/* ================================= */
/* Relative Time                     */
/* ================================= */

function formatRelativeTime(date: string | null) {
    if (!date) {
        return "Recently";
    }

    const now = new Date();
    const activityDate = new Date(date);

    const diffMs = now.getTime() - activityDate.getTime();

    const diffMinutes = Math.floor(
        diffMs / (1000 * 60)
    );

    const diffHours = Math.floor(
        diffMs / (1000 * 60 * 60)
    );

    const diffDays = Math.floor(
        diffMs / (1000 * 60 * 60 * 24)
    );

    if (diffMinutes < 1) {
        return "Just now";
    }

    if (diffMinutes < 60) {
        return `${diffMinutes}m ago`;
    }

    if (diffHours < 24) {
        return `${diffHours}h ago`;
    }

    if (diffDays < 7) {
        return `${diffDays}d ago`;
    }

    return activityDate.toLocaleDateString();
}