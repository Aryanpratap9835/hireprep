"use client";

import { motion } from "motion/react";
import {
    ArrowRight,
    Brain,
    Code2,
    Flame,
    Target,
    Trophy,
} from "lucide-react";

export default function Dashboard() {
    return (
        <div className="relative min-h-screen overflow-hidden space-y-8">
            {/* Hero */}
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
                        Practice coding problems, simulate interviews, and track your
                        progress with HirePrep.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-6 flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
                    >
                        Continue Practice
                        <ArrowRight className="h-4 w-4" />
                    </motion.button>
                </div>

                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            </motion.section>

            {/* Stats */}
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    icon={<Code2 className="h-5 w-5" />}
                    title="Problems Solved"
                    value="24"
                    description="of 150"
                />

                <StatCard
                    icon={<Flame className="h-5 w-5" />}
                    title="Current Streak"
                    value="7"
                    description="days"
                />

                <StatCard
                    icon={<Target className="h-5 w-5" />}
                    title="Accuracy"
                    value="82%"
                    description="overall"
                />

                <StatCard
                    icon={<Trophy className="h-5 w-5" />}
                    title="Interviews"
                    value="5"
                    description="completed"
                />
            </section>

            {/* Main Content */}
            <section className="grid gap-6 lg:grid-cols-3">
                {/* Progress */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-2xl border bg-card p-6 lg:col-span-2"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">Your Progress</h2>

                            <p className="text-sm text-muted-foreground">
                                Keep pushing forward.
                            </p>
                        </div>

                        <Brain className="h-6 w-6 text-muted-foreground" />
                    </div>

                    <div className="mt-6">
                        <div className="mb-2 flex justify-between text-sm">
                            <span>Overall preparation</span>

                            <span className="font-medium">68%</span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "68%" }}
                                transition={{ duration: 1 }}
                                className="h-full rounded-full bg-primary"
                            />
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-4">
                        <ProgressItem label="Easy" value="18" />
                        <ProgressItem label="Medium" value="5" />
                        <ProgressItem label="Hard" value="1" />
                    </div>
                </motion.div>

                {/* Continue Learning */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-2xl border bg-card p-6"
                >
                    <h2 className="text-lg font-semibold">Continue Learning</h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Pick up where you left off.
                    </p>

                    <div className="mt-6 rounded-xl border bg-muted/40 p-4">
                        <p className="text-sm font-medium">Maximum Subarray</p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Arrays · Medium
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
                        >
                            Solve Problem
                            <ArrowRight className="h-4 w-4" />
                        </motion.button>
                    </div>
                </motion.div>
            </section>

            {/* Recent Activity */}
            <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl border bg-card p-6"
            >
                <h2 className="text-lg font-semibold">Recent Activity</h2>

                <div className="mt-5 space-y-4">
                    <Activity
                        title="Two Sum"
                        type="Problem solved"
                    />

                    <Activity
                        title="Mock Interview #5"
                        type="Interview completed"
                    />

                    <Activity
                        title="Best Time to Buy and Sell Stock"
                        type="Problem solved"
                    />
                </div>
            </motion.section>
        </div>
    );
}

/* ----------------------------- */
/* Stat Card                     */
/* ----------------------------- */

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

/* ----------------------------- */
/* Progress Item                 */
/* ----------------------------- */

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

/* ----------------------------- */
/* Activity                      */
/* ----------------------------- */

function Activity({
    title,
    type,
}: {
    title: string;
    type: string;
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
                Recently
            </span>
        </motion.div>
    );
}
