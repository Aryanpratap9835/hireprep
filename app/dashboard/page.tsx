import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Dashboard from "@/components/dashboard/dashboard";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    // Get user's overall progress
    const progress = await prisma.userProgress.findUnique({
        where: {
            userId: session.user.id,
        },
    });

    // Get all solved problems
    const solvedProblems = await prisma.problemProgress.findMany({
        where: {
            userId: session.user.id,
            solved: true,
        },
        include: {
            problem: true,
        },
        orderBy: {
            solvedAt: "desc",
        },
    });

    // --------------------------------
    // Difficulty Statistics
    // --------------------------------

    const difficultyStats = {
        easy: 0,
        medium: 0,
        hard: 0,
    };

    for (const item of solvedProblems) {
        const difficulty = item.problem.difficulty.toLowerCase();

        if (difficulty === "easy") {
            difficultyStats.easy++;
        } else if (difficulty === "medium") {
            difficultyStats.medium++;
        } else if (difficulty === "hard") {
            difficultyStats.hard++;
        }
    }

    // --------------------------------
    // Recent Activity
    // --------------------------------

    const recentActivity = solvedProblems.slice(0, 5).map((item) => ({
        id: item.id,
        title: item.problem.title,
        type: "Problem solved",
        date: item.solvedAt?.toISOString() ?? null,
    }));

    return (
        <Dashboard
            progress={progress}
            difficultyStats={difficultyStats}
            recentActivity={recentActivity}
        />
    );
}