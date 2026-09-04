
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { problem } from "./data/problem";

function getDatabaseUrl(): string | undefined {
    const url = process.env.DATABASE_URL;

    if (!url) {
        return undefined;
    }

    // Prisma Postgres Accelerate URL
    if (url.startsWith("prisma+postgres://")) {
        try {
            const parsed = new URL(url);
            const apiKey = parsed.searchParams.get("api_key");

            if (apiKey) {
                const decoded = JSON.parse(
                    Buffer.from(apiKey, "base64").toString("utf-8")
                );

                if (decoded.databaseUrl) {
                    return decoded.databaseUrl;
                }
            }
        } catch (error) {
            console.error("Could not decode Prisma Postgres URL:", error);
        }
    }

    return url;
}

const databaseUrl = getDatabaseUrl();

if (!databaseUrl) {
    throw new Error("DATABASE_URL is missing in .env");
}

const adapter = new PrismaPg({
    connectionString: databaseUrl,
});

const prisma = new PrismaClient({
    adapter,
});

async function main() {
    console.log("🌱 Starting database seed...\n");

    for (const currentProblem of problem) {
        await prisma.problem.upsert({
            where: {
                id: currentProblem.id,
            },

            update: {
                title: currentProblem.title,
                topic: currentProblem.topic,
                difficulty: currentProblem.difficulty,
                description: currentProblem.description,
                functionName: currentProblem.functionName,
                parameters: currentProblem.parameters,
                execution: currentProblem.execution,
                examples: currentProblem.examples,
                constraints: currentProblem.constraints,

                // Public test cases
                testCases: currentProblem.testCases,

                // Hidden test cases
                hiddenTestCases: currentProblem.hiddenTestCases,
            },

            create: {
                id: currentProblem.id,
                title: currentProblem.title,
                topic: currentProblem.topic,
                difficulty: currentProblem.difficulty,
                description: currentProblem.description,
                functionName: currentProblem.functionName,
                parameters: currentProblem.parameters,
                execution: currentProblem.execution,
                examples: currentProblem.examples,
                constraints: currentProblem.constraints,

                // Public test cases
                testCases: currentProblem.testCases,

                // Hidden test cases
                hiddenTestCases: currentProblem.hiddenTestCases,
            },
        });

        console.log(
            `✅ Seeded: ${currentProblem.title} (${currentProblem.difficulty})`
        );

        console.log(
            `   Public tests: ${Array.isArray(currentProblem.testCases)
                ? currentProblem.testCases.length
                : 0
            }`
        );

        console.log(
            `   Hidden tests: ${Array.isArray(currentProblem.hiddenTestCases)
                ? currentProblem.hiddenTestCases.length
                : 0
            }\n`
        );
    }

    console.log("🎉 Database seed completed successfully!");
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

