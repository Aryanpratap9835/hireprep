import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    trustHost: true,
    secret: process.env.AUTH_SECRET || process.env.Auth_SECRET || process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID || process.env.GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET || process.env.GITHUB_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = (token.id as string) || (token.sub as string);
            }
            return session;
        },
    },
    events: {
        async createUser({ user }) {
            if (user.id) {
                try {
                    await prisma.userProgress.upsert({
                        where: { userId: user.id },
                        update: {},
                        create: {
                            userId: user.id,
                            problemsSolved: 0,
                            currentStreak: 0,
                            accuracy: 0,
                            interviews: 0,
                            preparation: 0,
                        },
                    });
                } catch (error) {
                    console.error("Error creating initial user progress:", error);
                }
            }
        },
    },
});

