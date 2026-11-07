
import OpenAI from "openai";

export const openrouter = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY || "dummy-key",
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "HirePrep AI",
    },
});


