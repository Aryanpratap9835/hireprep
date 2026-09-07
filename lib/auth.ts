import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const authSecret =
    process.env.AUTH_SECRET ??
    process.env.NEXTAUTH_SECRET ??
    (process.env.NODE_ENV !== "production"
        ? "hireprep-preview-development-secret-change-in-production"
        : undefined);

export const { handlers, auth, signIn, signOut } = NextAuth({
    secret: authSecret,
    adapter: PrismaAdapter(prisma),

    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],

    events: {
        async createUser({ user }) {
            if (user.id) {
                await prisma.userProgress.create({
                    data: {
                        userId: user.id,
                        problemsSolved: 0,
                        currentStreak: 0,
                        accuracy: 0,
                        interviews: 0,
                        preparation: 0,
                    },
                });
            }
        },
    },
});
