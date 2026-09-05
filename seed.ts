import { prisma } from "./lib/prisma";
import { problem as problems } from "./data/problem";


async function main() {
    console.log(`Starting seed...`);
    console.log(`Problems found in dataset: ${problems.length}`);

    for (const problem of problems) {
        await prisma.problem.upsert({
            where: {
                id: problem.id,
            },

            update: {
                title: problem.title,
                difficulty: problem.difficulty,
                topic: problem.topic,
                constraints: problem.constraints,
                description: problem.description,
                examples: problem.examples,
                execution: problem.execution,
                functionName: problem.functionName,
                hiddenTestCases: problem.hiddenTestCases,
                parameters: problem.parameters,
                testCases: problem.testCases,
            },

            create: {
                id: problem.id,
                title: problem.title,
                difficulty: problem.difficulty,
                topic: problem.topic,
                constraints: problem.constraints,
                description: problem.description,
                examples: problem.examples,
                execution: problem.execution,
                functionName: problem.functionName,
                hiddenTestCases: problem.hiddenTestCases,
                parameters: problem.parameters,
                testCases: problem.testCases,
            },
        });
    }

    const count = await prisma.problem.count();

    console.log(`✅ Problems in database: ${count}`);
}

main()
    .catch((error) => {
        console.error("❌ Seed failed:");
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });