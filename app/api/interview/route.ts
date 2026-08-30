import { NextResponse } from "next/server";
import { problem } from "@/data/problem";

export async function POST(request: Request) {
    const body = await request.json();

    const { role, type, difficulty } = body;

    if (type !== "DSA") {
        return NextResponse.json({
            message: "Currently only DSA interviews are available.",
        });
    }

    const matchingProblems = problem.filter(
        (item) => item.difficulty === difficulty
    );

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
}