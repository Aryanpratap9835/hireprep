import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const progress = await prisma.userProgress.upsert({
        where: {
            userId: session.user.id,
        },
        update: {},
        create: {
            userId: session.user.id,
        },
    });

    return NextResponse.json(progress);
}