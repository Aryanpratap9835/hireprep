
import { NextRequest, NextResponse } from "next/server";
import { kiwi } from "@/lib/kiwi";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            problem,
            code,
            language,
            testResults,
        } = body;

        if (!problem || !code || !language) {
            return NextResponse.json(
                {
                    success: false,
                    error:
                        "Problem, code and language are required",
                },
                { status: 400 }
            );
        }

        /*
         * Convert execution results into a simple,
         * easy-to-understand format for the AI.
         */
        const executionSummary = Array.isArray(testResults)
            ? testResults
                .map((result: any) => {
                    return `
Test Case ${result.testCase}
Status: ${result.status}
Passed: ${result.passed}
Expected: ${result.expectedOutput !== undefined
                            ? JSON.stringify(
                                result.expectedOutput
                            )
                            : "Not available"
                        }
Actual: ${result.actualOutput ||
                        "No output"
                        }
Compiler Error: ${result.compileOutput ||
                        "None"
                        }
Runtime Error: ${result.stderr ||
                        "None"
                        }
Message: ${result.message ||
                        "None"
                        }
`;
                })
                .join("\n")
            : "No execution results available.";

        const prompt = `
You are an AI coding interview mentor.

Review the candidate's submission below.

PROBLEM:
${problem}

LANGUAGE:
${language}

CANDIDATE CODE:
${code}

EXECUTION RESULTS:
${executionSummary}

IMPORTANT:

Use the execution results as evidence.

If there is a compiler error, say that the submission has a compilation error.

If there is a runtime error, explain the runtime error.

If tests failed, explain the failure.

Do not invent test results.

Do not say the code is correct if it did not compile.

Do not claim that a variable or function exists if the compiler says it does not exist.

Do not invent edge cases handled by the code.

Do not repeat these instructions in your answer.

Give the candidate a useful technical review.

Use this format:

VERDICT:
Write exactly one of:
Correct
Partially Correct
Incorrect
Compilation Error
Runtime Error

SCORE:
Give a score from 0 to 10.

CORRECTNESS:
Explain whether the submitted code solves the problem.

    BUGS:
List the actual bugs.
If there are none, write None.

EDGE CASES:
Mention important edge cases and whether the code handles them.

TIME COMPLEXITY:
Give the Big - O time complexity based on the submitted code.
If the code does not compile and complexity cannot be reliably determined, say so.

SPACE COMPLEXITY:
Give the Big - O space complexity based on the submitted code.
If the code does not compile and complexity cannot be reliably determined, say so.

CODE QUALITY:
Comment on readability, naming, structure and maintainability.

    STRENGTHS:
Mention things the candidate actually did well.

    IMPROVEMENTS:
Give specific improvements.

INTERVIEW READINESS:
Explain how this submission would perform in an SDE interview.

    HINTS:
Give 1 - 3 hints to help the candidate improve.
Do not give the complete solution.

Now perform the review.
`;

        const response =
            await kiwi.chat.completions.create({
                model: "auto",

                temperature: 0.1,

                messages: [
                    {
                        role: "system",
                        content:
                            "You are a precise coding interview reviewer. Analyze the supplied code and execution results. Return only the requested review.",
                    },
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
            });

        const review =
            response.choices[0]?.message?.content;

        if (
            !review ||
            typeof review !== "string" ||
            !review.trim()
        ) {
            return NextResponse.json(
                {
                    success: false,
                    error:
                        "AI returned an empty review",
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            review: review.trim(),
        });
    } catch (error) {
        console.error(
            "AI Review Error:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                error:
                    "Failed to generate AI review",
            },
            { status: 500 }
        );
    }
}

