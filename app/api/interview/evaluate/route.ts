import { NextRequest, NextResponse } from "next/server";
import { openrouter } from "@/lib/openrouter";
import { InterviewQuestion } from "@/data/interview-questions";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { question, answer, role, difficulty } = body as {
            question: InterviewQuestion;
            answer: string;
            role?: string;
            difficulty?: string;
        };

        if (!question || !answer || !answer.trim()) {
            return NextResponse.json(
                { success: false, error: "Question and candidate answer are required" },
                { status: 400 }
            );
        }

        const isBehavioral = question.type === "BEHAVIORAL";

        const systemPrompt = `You are a senior technical interviewer at a top tech company evaluating a candidate for a ${role || "Software Engineering"} role (Difficulty: ${difficulty || "Medium"}).
Analyze the candidate's answer to the given question thoroughly, objectively, and constructively.

Return ONLY a valid JSON object matching this schema with NO markdown ticks or prefix:
{
  "score": <number between 0 and 10, e.g. 8.5>,
  "verdict": <one of "Strong Hire" | "Hire" | "Leaning Hire" | "Needs Improvement" | "Unsatisfactory">,
  "analysis": "<detailed paragraph evaluating the candidate's answer>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "missingPoints": ["<missing or under-explained key point 1>", "<missing point 2>"],
  ${
      isBehavioral
          ? `"starBreakdown": {
    "situation": "<evaluation of how well they established context/situation>",
    "task": "<evaluation of their defined responsibility/goal>",
    "action": "<evaluation of specific personal actions taken>",
    "result": "<evaluation of quantifiable outcome and learning>"
  },`
          : ""
  }
  "idealAnswer": "<a comprehensive, impressive model answer to this question>",
  "actionableTips": ["<specific tip 1 to score higher in an interview>", "<specific tip 2>"]
}`;

        const userPrompt = `QUESTION:
Title: ${question.title}
Category: ${question.category} (${question.subtopic})
Question Text: ${question.question}
Expected Core Concepts:
${question.expectedPoints.map((p, i) => `${i + 1}. ${p}`).join("\n")}

CANDIDATE'S SUBMITTED ANSWER:
"""
${answer.trim()}
"""

Evaluate this answer now. Provide an accurate score (0-10) and comprehensive feedback.`;

        let reviewText = "";

        // Try Minimax free model first, with fallback
        const models = [
            "minimax/minimax-m3:free",
            "liquid/lfm-2.5-2.6b:free",
            "google/gemma-4-26b-a4b-it:free",
            "auto",
        ];

        let lastError = null;
        for (const model of models) {
            try {
                const response = await openrouter.chat.completions.create({
                    model,
                    temperature: 0.2,
                    response_format: { type: "json_object" },
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: userPrompt },
                    ],
                });

                reviewText = response.choices[0]?.message?.content || "";
                if (reviewText.trim()) break;
            } catch (err) {
                lastError = err;
                console.warn(`Model ${model} failed, trying next fallback:`, err);
            }
        }

        if (!reviewText) {
            console.error("All AI evaluation models failed:", lastError);
            // Fallback deterministic evaluation if API is unreachable
            const wordCount = answer.trim().split(/\s+/).length;
            const fallbackScore = Math.min(Math.max(Math.round((wordCount / 40) * 10) / 2, 4), 8.5);

            return NextResponse.json({
                success: true,
                evaluation: {
                    score: fallbackScore,
                    verdict: fallbackScore >= 7 ? "Hire" : "Needs Improvement",
                    analysis: `You provided a ${wordCount}-word response covering key fundamentals of ${question.title}. For a stronger impression in interviews, structure your response methodically with concrete technical details and real-world examples.`,
                    strengths: [
                        "Addressed the core question topic directly.",
                        "Demonstrated familiarity with " + question.category,
                    ],
                    missingPoints: question.expectedPoints.slice(0, 2),
                    idealAnswer: question.sampleAnswerFramework + " " + question.expectedPoints.join(" "),
                    actionableTips: [
                        "Structure your answer with clear definitions followed by trade-offs.",
                        "Mention edge cases and production considerations.",
                    ],
                },
            });
        }

        // Parse JSON response safely
        let evaluation;
        try {
            // Remove potential markdown fences if present
            const cleanJson = reviewText.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/, "").trim();
            evaluation = JSON.parse(cleanJson);
        } catch (jsonErr) {
            console.error("Failed to parse AI JSON:", reviewText);
            evaluation = {
                score: 7,
                verdict: "Hire",
                analysis: reviewText,
                strengths: ["Clear explanation of technical concepts"],
                missingPoints: question.expectedPoints.slice(0, 2),
                idealAnswer: question.expectedPoints.join("\n"),
                actionableTips: ["Review the expected points above for a more complete answer."],
            };
        }

        return NextResponse.json({
            success: true,
            evaluation,
        });
    } catch (error) {
        console.error("Evaluation API Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to evaluate answer" },
            { status: 500 }
        );
    }
}
