
import { NextResponse } from "next/server";

import {
    run,
    PYTHON,
    JAVASCRIPT,
    TYPESCRIPT,
    CPP,
    JAVA,
} from "@judge0/judge0-js";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            code,
            language,
            testCases,
            functionName,
            parameters,
        } = body;

        // =========================
        // VALIDATION
        // =========================

        if (!code) {
            return NextResponse.json(
                {
                    success: false,
                    error: "No code provided",
                },
                { status: 400 }
            );
        }

        if (!Array.isArray(testCases)) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Test cases must be an array",
                },
                { status: 400 }
            );
        }

        // Function-based languages
        if (
            language === "python" ||
            language === "javascript" ||
            language === "typescript"
        ) {
            if (!functionName) {
                return NextResponse.json(
                    {
                        success: false,
                        error: "Function name is missing",
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
        }

        // =========================
        // JUDGE0 LANGUAGE
        // =========================

        let judgeLanguage;

        switch (language) {
            case "python":
                judgeLanguage = PYTHON;
                break;

            case "javascript":
                judgeLanguage = JAVASCRIPT;
                break;

            case "typescript":
                judgeLanguage = TYPESCRIPT;
                break;

            case "cpp":
                judgeLanguage = CPP;
                break;

            case "java":
                judgeLanguage = JAVA;
                break;

            default:
                return NextResponse.json(
                    {
                        success: false,
                        error: "Unsupported language: " + language,
                    },
                    { status: 400 }
                );
        }

        // =========================
        // RESULTS
        // =========================

        const results = [];

        // =========================
        // RUN EACH TEST CASE
        // =========================

        for (let i = 0; i < testCases.length; i++) {
            const testCase = testCases[i];

            const input = testCase.input;

            const expectedOutput = String(
                testCase.expectedOutput
            ).trim();

            let sourceCode = "";
            let stdin = "";

            // ==================================================
            // PYTHON
            // ==================================================

            if (language === "python") {
                const argumentsCode = parameters
                    .map(
                        (parameter: string) =>
                            `${parameter} = ${JSON.stringify(
                                input[parameter]
                            )
                            } `
                    )
                    .join("\n");

                const functionCall =
                    parameters.join(", ");

                sourceCode = `
${code}

${argumentsCode}

result = ${functionName} (${functionCall})

print(result)
`;
            }

            // ==================================================
            // JAVASCRIPT
            // ==================================================

            else if (language === "javascript") {
                const argumentsCode = parameters
                    .map(
                        (parameter: string) =>
                            `const ${parameter} = ${JSON.stringify(
                                input[parameter]
                            )}; `
                    )
                    .join("\n");

                const functionCall =
                    parameters.join(", ");

                sourceCode = `
${code}

${argumentsCode}

const result = ${functionName}(${functionCall});

console.log(JSON.stringify(result));
`;
            }

            // ==================================================
            // TYPESCRIPT
            // ==================================================

            else if (language === "typescript") {
                const argumentsCode = parameters
                    .map(
                        (parameter: string) =>
                            `const ${parameter} = ${JSON.stringify(
                                input[parameter]
                            )}; `
                    )
                    .join("\n");

                const functionCall =
                    parameters.join(", ");

                sourceCode = `
${code}

${argumentsCode}

const result = ${functionName}(${functionCall});

console.log(JSON.stringify(result));
`;
            }

            // ==================================================
            // C++
            // ==================================================

            else if (language === "cpp") {
                sourceCode = code;

                const nums = input.nums;
                const target = input.target;

                if (!Array.isArray(nums)) {
                    throw new Error(
                        "C++ Two Sum expects input.nums to be an array"
                    );
                }

                stdin =
                    `${nums.length} \n` +
                    `${nums.join(" ")} \n` +
                    `${target} \n`;
            }

            // ==================================================
            // JAVA
            // ==================================================

            else if (language === "java") {
                sourceCode = code;

                const nums = input.nums;
                const target = input.target;

                if (!Array.isArray(nums)) {
                    throw new Error(
                        "Java Two Sum expects input.nums to be an array"
                    );
                }

                stdin =
                    `${nums.length} \n` +
                    `${nums.join(" ")} \n` +
                    `${target} \n`;
            }

            // =========================
            // DEBUG
            // =========================

            console.log(
                `RUNNING TEST CASE ${i + 1} `
            );

            console.log(
                "LANGUAGE:",
                language
            );

            console.log(
                "SOURCE CODE:",
                sourceCode
            );

            console.log(
                "STDIN:",
                stdin
            );

            // =========================
            // JUDGE0
            // =========================

            const result = await run({
                source_code: sourceCode,
                language: judgeLanguage,

                ...(stdin
                    ? { stdin }
                    : {}),
            });

            const judgeResult: any = result;

            console.log(
                "JUDGE0 RESULT:",
                judgeResult
            );

            // =========================
            // OUTPUT
            // =========================

            const actualOutput =
                judgeResult.stdout?.trim() ?? "";

            // =========================
            // COMPARE OUTPUT
            // =========================

            let passed = false;

            try {
                const actualParsed =
                    JSON.parse(actualOutput);

                const expectedParsed =
                    JSON.parse(expectedOutput);

                passed =
                    JSON.stringify(actualParsed) ===
                    JSON.stringify(expectedParsed);
            } catch {
                passed =
                    actualOutput.trim() ===
                    expectedOutput.trim();
            }

            // =========================
            // STATUS
            // =========================

            let status = "WRONG ANSWER";

            if (judgeResult.compile_output) {
                status = "COMPILATION ERROR";
            } else if (judgeResult.stderr) {
                status = "RUNTIME ERROR";
            } else if (passed) {
                status = "ACCEPTED";
            }

            // =========================
            // SAVE RESULT
            // =========================

            results.push({
                testCase: i + 1,

                input,

                expectedOutput,

                actualOutput,

                passed,

                status,

                stderr:
                    judgeResult.stderr ?? "",

                compileOutput:
                    judgeResult.compile_output ?? "",

                message:
                    judgeResult.message ?? "",
            });
        }

        // =========================
        // RESPONSE
        // =========================

        return NextResponse.json({
            success: true,
            results,
        });

    } catch (error) {
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

