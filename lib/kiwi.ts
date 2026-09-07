import OpenAI from "openai";

export function getKiwiClient() {
    const apiKey = process.env.KIWI_API_KEY;

    if (!apiKey) {
        throw new Error("KIWI_API_KEY is not configured");
    }

    return new OpenAI({
        apiKey,
        baseURL: "https://api.llm.kiwi/v1",
    });
}
