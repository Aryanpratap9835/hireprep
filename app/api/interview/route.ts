import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
    getQuestionsForInterview,
    InterviewCategory,
    InterviewDifficulty,
    TargetRole,
} from "@/data/interview-questions";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            role = "SDE Intern",
            type = "DSA",
            difficulty = "Medium",
            count = 3,
        } = body as {
            role: TargetRole;
            type: InterviewCategory;
            difficulty: InterviewDifficulty;
            count?: number;
        };

        // Handle DSA interview
        if (type === "DSA") {
            const matchingProblems = await prisma.problem.findMany({
                where: {
                    difficulty: difficulty,
                },
            });

            const problemsList = matchingProblems.length > 0 ? matchingProblems : await prisma.problem.findMany();

            if (problemsList.length === 0) {
                return NextResponse.json(
                    { message: "No coding problems available in database." },
                    { status: 404 }
                );
            }

            const randomProblem = problemsList[Math.floor(Math.random() * problemsList.length)];

            return NextResponse.json({
                success: true,
                role,
                type,
                difficulty,
                problem: randomProblem,
                mode: "DSA",
            });
        }

        // Handle CS Fundamentals, Behavioral, or Mixed interview
        const questions = getQuestionsForInterview({
            type,
            role,
            difficulty,
            count: Number(count) || 3,
        });

        // Also fetch a fallback DSA problem if Mixed
        let dsaProblem = null;
        if (type === "Mixed") {
            const dsaList = await prisma.problem.findMany({
                where: { difficulty },
            });
            dsaProblem = dsaList.length > 0 ? dsaList[Math.floor(Math.random() * dsaList.length)] : null;
        }

        return NextResponse.json({
            success: true,
            role,
            type,
            difficulty,
            questions,
            dsaProblem,
            mode: "INTERACTIVE",
        });
    } catch (error) {
        console.error("Interview API error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to generate interview session." },
            { status: 500 }
        );
    }
}
