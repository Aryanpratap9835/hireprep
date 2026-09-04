
import { prisma } from "@/lib/prisma";
import ProblemList from "./problem-list";

export default async function ProblemPage() {
    const problems = await prisma.problem.findMany();

    return (
        <ProblemList
            problems={problems.map((problem) => ({
                id: problem.id,
                title: problem.title,
                topic: problem.topic,
                difficulty: problem.difficulty,
            }))}
        />
    );
}

