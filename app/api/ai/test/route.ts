import { NextResponse } from "next/server";
import { kiwi } from "@/lib/kiwi";

export async function GET() {
    try {
        const response = await kiwi.chat.completions.create({
            model: "auto",
            messages: [
                {
                    role: "user",
                    content: "Reply with exactly: Kiwi connection successful",
                },
            ],
        });

        const message = response.choices[0]?.message?.content;

        return NextResponse.json({
            success: true,
            message,
        });
    } catch (error) {
        console.error("Kiwi test error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Kiwi connection failed",
            },
            { status: 500 }
        );
    }
}