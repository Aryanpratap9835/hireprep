import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const problems = await prisma.problem.findMany();

        return Response.json(problems);
    } catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to fetch problems" },
            { status: 500 }
        );
    }
}
