import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

import {
    run,
    PYTHON,
    JAVASCRIPT,
    TYPESCRIPT,
    CPP,
    JAVA,
} from "@judge0/judge0-js";

import type { Submission } from "@judge0/judge0-js";

import { prisma } from "@/lib/prisma";

type TestCase = {
    input: Record<string, any>;
    expectedOutput: any;
};

function getJudgeLanguage(language: string) {
    switch (language) {
        case "python":
            return PYTHON;

        case "javascript":
            return JAVASCRIPT;

        case "typescript":
            return TYPESCRIPT;

        case "cpp":
            return CPP;

        case "java":
            return JAVA;

        default:
            return null;
    }
}

/* =========================
   PYTHON
========================= */

function buildPythonCode(
    code: string,
    functionName: string,
    parameters: string[],
    input: Record<string, any>
) {
    const argumentsCode = parameters
        .map(
            (parameter) =>
                `${parameter} = ${JSON.stringify(input[parameter])}`
        )
        .join("\n");

    const functionCall = parameters.join(", ");

    return `
${code}

${argumentsCode}

result = ${functionName}(${functionCall})

print(result)
`;
}

/* =========================
   JAVASCRIPT
========================= */

function buildJavaScriptCode(
    code: string,
    functionName: string,
    parameters: string[],
    input: Record<string, any>
) {
    const argumentsCode = parameters
        .map(
            (parameter) =>
                `const ${parameter} = ${JSON.stringify(
                    input[parameter]
                )};`
        )
        .join("\n");

    const functionCall = parameters.join(", ");

    return `
${code}

${argumentsCode}

const result = ${functionName}(${functionCall});

console.log(JSON.stringify(result));
`;
}

/* =========================
   TYPESCRIPT
========================= */

function buildTypeScriptCode(
    code: string,
    functionName: string,
    parameters: string[],
    input: Record<string, any>
) {
    const argumentsCode = parameters
        .map(
            (parameter) =>
                `const ${parameter} = ${JSON.stringify(
                    input[parameter]
                )};`
        )
        .join("\n");

    const functionCall = parameters.join(", ");

    return `
${code}

${argumentsCode}

const result = ${functionName}(${functionCall});

console.log(JSON.stringify(result));
`;
}

/* =========================
   JAVA
========================= */

function serializeJavaValue(value: any): string {
    if (Array.isArray(value)) {
        return `${value.length}\n${value.join(" ")}`;
    }

    return String(value);
}

function buildJavaInput(
    parameters: string[],
    input: Record<string, any>
) {
    const parts: string[] = [];

    for (const parameter of parameters) {
        parts.push(
            serializeJavaValue(input[parameter])
        );
    }

    return parts.join("\n") + "\n";
}

/* =========================
   OUTPUT COMPARISON
========================= */

function compareOutput(
    actualOutput: string,
    expectedOutput: any
) {
    const actual = actualOutput.trim();

    try {
        const actualParsed = JSON.parse(actual);

        return (
            JSON.stringify(actualParsed) ===
            JSON.stringify(expectedOutput)
        );
    } catch {
        return (
            actual ===
            String(expectedOutput).trim()
        );
    }
}

/* =========================
   POST
========================= */

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // DEBUG
        console.log("RUN BODY:", body);

        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Unauthorized",
                },
                { status: 401 }
            );
        }

        const {
            code,
            language,
            testCases,
            problemId,
            functionName,
            parameters,
            mode = "run",
        } = body;

        /* =========================
           BASIC VALIDATION
        ========================= */

        if (!code || typeof code !== "string") {
            return NextResponse.json(
                {
                    success: false,
                    error: "No code provided",
                },
                { status: 400 }
            );
        }

        if (!language || typeof language !== "string") {
            return NextResponse.json(
                {
                    success: false,
                    error: "Language is required",
                },
                { status: 400 }
            );
        }

        if (!problemId || typeof problemId !== "string") {
            return NextResponse.json(
                {
                    success: false,
                    error: "Problem ID is required",
                },
                { status: 400 }
            );
        }

        if (!functionName) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Function name is required",
                },
                { status: 400 }
            );
        }

        if (!Array.isArray(parameters)) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Parameters must be an array",
                },
                { status: 400 }
            );
        }

        if (
            mode !== "run" &&
            mode !== "submit"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid mode",
                },
                { status: 400 }
            );
        }

        /* =========================
           FIND PROBLEM ON SERVER
        ========================= */

        const selectedProblem =
            await prisma.problem.findUnique({
                where: {
                    id: problemId,
                },
            });

        if (!selectedProblem) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Problem not found",
                },
                { status: 404 }
            );
        }

        /* =========================
           JUDGE0 LANGUAGE
        ========================= */

        const judgeLanguage =
            getJudgeLanguage(language);

        if (!judgeLanguage) {
            return NextResponse.json(
                {
                    success: false,
                    error:
                        "Unsupported language: " +
                        language,
                },
                { status: 400 }
            );
        }

        /* =========================
           SELECT TEST CASES
        ========================= */

        let selectedTestCases: TestCase[];

        if (mode === "submit") {
            selectedTestCases =
                (selectedProblem.hiddenTestCases as unknown as TestCase[]) ||
                [];
        } else {
            if (!Array.isArray(testCases)) {
                return NextResponse.json(
                    {
                        success: false,
                        error:
                            "Test cases are required",
                    },
                    { status: 400 }
                );
            }

            selectedTestCases = testCases;
        }

        /* =========================
           RUN TEST CASES
        ========================= */

        const results = [];

        for (
            let i = 0;
            i < selectedTestCases.length;
            i++
        ) {
            const testCase =
                selectedTestCases[i];

            const input =
                testCase.input;

            const expectedOutput =
                testCase.expectedOutput;

            let sourceCode = "";

            let stdin = "";

            /* =========================
               BUILD CODE
            ========================= */

            if (language === "python") {
                sourceCode =
                    buildPythonCode(
                        code,
                        functionName,
                        parameters,
                        input
                    );
            }

            else if (
                language === "javascript"
            ) {
                sourceCode =
                    buildJavaScriptCode(
                        code,
                        functionName,
                        parameters,
                        input
                    );
            }

            else if (
                language === "typescript"
            ) {
                sourceCode =
                    buildTypeScriptCode(
                        code,
                        functionName,
                        parameters,
                        input
                    );
            }

            /* =========================
               C++
            ========================= */

            else if (language === "cpp") {
                function cppValue(
                    value: any
                ): string {
                    if (Array.isArray(value)) {
                        return `{${value.join(", ")}}`;
                    }

                    if (
                        typeof value === "string"
                    ) {
                        return `"${value.replace(
                            /"/g,
                            '\\"'
                        )}"`;
                    }

                    if (
                        typeof value === "boolean"
                    ) {
                        return value
                            ? "true"
                            : "false";
                    }

                    return String(value);
                }

                const declarations =
                    parameters
                        .map(
                            (
                                parameter: string
                            ) => {
                                const value =
                                    input[
                                    parameter
                                    ];

                                if (
                                    Array.isArray(
                                        value
                                    )
                                ) {
                                    return `vector<int> ${parameter} = ${cppValue(
                                        value
                                    )};`;
                                }

                                return `int ${parameter} = ${cppValue(
                                    value
                                )};`;
                            }
                        )
                        .join("\n    ");

                const functionArguments =
                    parameters.join(", ");

                sourceCode = `
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <map>
#include <set>
#include <queue>
#include <stack>
#include <cmath>
#include <climits>

using namespace std;

${code}

int main() {
    Solution solution;

    ${declarations}

    auto result = solution.${functionName}(${functionArguments});

    cout << result << endl;

    return 0;
}
`;

                stdin = "";
            }

            /* =========================
               JAVA
            ========================= */

            else if (language === "java") {
                sourceCode = code;

                stdin =
                    buildJavaInput(
                        parameters,
                        input
                    );
            }

            /* =========================
               JUDGE0
            ========================= */

            const judgeResult =
                (await run({
                    source_code: sourceCode,
                    language: judgeLanguage,

                    ...(stdin
                        ? { stdin }
                        : {}),
                })) as Submission;

            const actualOutput =
                judgeResult.stdout?.trim() ?? "";

            /* =========================
               COMPARE OUTPUT
            ========================= */

            const passed =
                !judgeResult.compile_output &&
                !judgeResult.stderr &&
                compareOutput(
                    actualOutput,
                    expectedOutput
                );

            /* =========================
               STATUS
            ========================= */

            let status =
                "WRONG ANSWER";

            if (
                judgeResult.compile_output
            ) {
                status =
                    "COMPILATION ERROR";
            }

            else if (
                judgeResult.stderr
            ) {
                status =
                    "RUNTIME ERROR";
            }

            else if (passed) {
                status =
                    "ACCEPTED";
            }

            /* =========================
               RESULT
            ========================= */

            results.push({
                testCase: i + 1,

                input:
                    mode === "run"
                        ? input
                        : undefined,

                expectedOutput:
                    mode === "run"
                        ? expectedOutput
                        : undefined,

                actualOutput,

                passed,

                status,

                stderr:
                    judgeResult.stderr ?? "",

                compileOutput:
                    judgeResult.compile_output ??
                    "",

                message:
                    judgeResult.message ?? "",
            });

            /* =========================
               STOP ON FIRST FAILURE
            ========================= */

            if (
                mode === "submit" &&
                !passed
            ) {
                break;
            }
        }

        /* =========================
           FINAL VERDICT
        ========================= */

        const passedCount =
            results.filter(
                (result) =>
                    result.passed
            ).length;

        const totalTests =
            selectedTestCases.length;

        const allPassed =
            passedCount === totalTests;

        /* =========================
           UPDATE USER PROGRESS
        ========================= */

        if (
            mode === "submit" &&
            allPassed
        ) {
            console.log(
                "SUBMIT PASSED:",
                {
                    userId:
                        session.user.id,
                    problemId,
                }
            );

            const existingProgress =
                await prisma.problemProgress.findUnique(
                    {
                        where: {
                            userId_problemId: {
                                userId:
                                    session.user.id,
                                problemId,
                            },
                        },
                    }
                );

            console.log(
                "EXISTING PROGRESS:",
                existingProgress
            );

            if (
                !existingProgress?.solved
            ) {
                await prisma.problemProgress.upsert(
                    {
                        where: {
                            userId_problemId: {
                                userId:
                                    session.user.id,
                                problemId,
                            },
                        },

                        update: {
                            solved: true,

                            attempts: {
                                increment: 1,
                            },

                            solvedAt:
                                new Date(),
                        },

                        create: {
                            userId:
                                session.user.id,

                            problemId,

                            solved: true,

                            attempts: 1,

                            solvedAt:
                                new Date(),
                        },
                    }
                );

                console.log(
                    "PROBLEM PROGRESS UPDATED"
                );

                await prisma.userProgress.update(
                    {
                        where: {
                            userId:
                                session.user.id,
                        },

                        data: {
                            problemsSolved: {
                                increment: 1,
                            },
                        },
                    }
                );

                console.log(
                    "PROBLEMS SOLVED INCREMENTED"
                );
            } else {
                console.log(
                    "PROBLEM ALREADY SOLVED"
                );
            }
        }

        return NextResponse.json({
            success: true,

            mode,

            verdict:
                allPassed
                    ? "ACCEPTED"
                    : "FAILED",

            passedCount,

            totalTests,

            results,
        });
    }

    catch (error) {
        console.error(
            "RUN ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,

                error:
                    error instanceof Error
                        ? error.message
                        : String(error),
            },
            {
                status: 500,
            }
        );
    }
}