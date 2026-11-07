import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { interviewType, role, averageScore } = body as {
            interviewType: string;
            role: string;
            averageScore: number;
        };

        // Increment interview count in user progress
        await prisma.userProgress.upsert({
            where: {
                userId: session.user.id,
            },
            update: {
                interviews: {
                    increment: 1,
                },
                preparation: {
                    increment: 5,
                },
            },
            create: {
                userId: session.user.id,
                problemsSolved: 0,
                currentStreak: 1,
                accuracy: 100,
                interviews: 1,
                preparation: 5,
            },
        });

        // Record the interview log
        const record = await prisma.interview.create({
            data: {
                name: `${interviewType} Mock Interview (${role})`,
                email: session.user.email,
                userId: session.user.id,
            },
        });

        return NextResponse.json({
            success: true,
            interview: record,
        });
    } catch (error) {
        console.error("Interview Complete API Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to save interview completion" },
            { status: 500 }
        );
    }
}
