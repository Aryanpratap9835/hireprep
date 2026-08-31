import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();

    const { code, language } = body;

    console.log("CODE:", code);
    console.log("LANGUAGE:", language);

    return NextResponse.json({
        success: true,
        output: `Received ${language} code successfully`,
    });
}