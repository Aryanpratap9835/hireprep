
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { role, type, difficulty } = body;

        if (type !== "DSA") {
            return NextResponse.json({
                message: "Currently only DSA interviews are available.",
            });
        }

        const matchingProblems = await prisma.problem.findMany({
            where: {
                difficulty: difficulty,
            },
        });

        if (matchingProblems.length === 0) {
            return NextResponse.json({
                message: "No problems available for this difficulty.",
            });
        }

        const randomProblem =
            matchingProblems[
            Math.floor(Math.random() * matchingProblems.length)
            ];

        return NextResponse.json({
            role,
            type,
            problem: randomProblem,
        });
    } catch (error) {
        console.error("Interview API error:", error);

        return NextResponse.json(
            { message: "Something went wrong." },
            { status: 500 }
        );
    }
}

