import OpenAI from "openai";

export const kiwi = new OpenAI({
    apiKey: process.env.KIWI_API_KEY,
    baseURL: "https://api.llm.kiwi/v1",
});