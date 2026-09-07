import { PrismaClient } from "@/generated/client/client";
import { PrismaPg } from "@prisma/adapter-pg";

function getDatabaseUrl(): string | undefined {
    const url = process.env.DATABASE_URL;
    if (!url) return undefined;
    if (url.startsWith("prisma+postgres://")) {
        try {
            const parsed = new URL(url);
            const apiKey = parsed.searchParams.get("api_key");
            if (apiKey) {
                const decoded = JSON.parse(Buffer.from(apiKey, "base64").toString("utf-8"));
                if (decoded.databaseUrl) return decoded.databaseUrl;
            }
        } catch {
            return url;
        }
    }
    return url;
}

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

const createPrismaClient = () => {
    const adapter = new PrismaPg({
        connectionString: getDatabaseUrl(),
    });
    return new PrismaClient({ adapter });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
