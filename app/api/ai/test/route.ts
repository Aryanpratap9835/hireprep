
import { NextResponse } from "next/server";
import { openrouter } from "@/lib/openrouter";

export async function GET() {
    try {
        const response =
            await openrouter.chat.completions.create({
                model: "qwen/qwen3-coder:free",
                messages: [
                    {
                        role: "user",
                        content:
                            "Reply with exactly: OpenRouter connection successful",
                    },
                ],
            });

        const message =
            response.choices[0]?.message?.content;

        return NextResponse.json({
            success: true,
            message,
        });

    } catch (error) {
        console.error(
            "OpenRouter test error:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                error: "OpenRouter connection failed",
            },
            { status: 500 }
        );
    }
}

