"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";

type TestCase = {
    input: any;
    expectedOutput: string;
};

type Result = {
    testCase: number;
    input: any;
    expectedOutput: string;
    actualOutput: string;
    passed: boolean;
    status: string;
    stderr: string;
    compileOutput: string;
    message: string;
};

type CodeEditorProps = {
    testCases: TestCase[];
    functioName?: string;
    functionName?: string;
    parameters?: string[];
};

export default function CodeEditor({
    testCases,
    functioName,
    functionName,
    parameters = [],
}: CodeEditorProps) {
    const actualFunctionName =
        functionName ?? functioName ?? "";

    const [code, setCode] = useState("");

    const [language, setLanguage] =
        useState("typescript");

    const [results, setResults] =
        useState<Result[]>([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    // =========================
    // RUN CODE
    // =========================

    const handleRun = async () => {
        setLoading(true);
        setError("");
        setResults([]);

        try {
            const response = await fetch(
                "/api/run",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        code,
                        language,
                        testCases,
                        functionName:
                            actualFunctionName,
                        parameters,
                    }),
                }
            );

            const data =
                await response.json();

            console.log(
                "API RESPONSE:",
                data
            );

            if (
                !response.ok ||
                !data.success
            ) {
                throw new Error(
                    data.error ||
                    "Execution failed"
                );
            }

            if (
                !Array.isArray(
                    data.results
                )
            ) {
                throw new Error(
                    "API did not return results array"
                );
            }

            setResults(data.results);
        } catch (error) {
            console.error(
                "Execution failed:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : String(error)
            );
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // LANGUAGE CHANGE
    // =========================

    const handleLanguageChange = (
        newLanguage: string
    ) => {
        setLanguage(newLanguage);

        // Clear old output because
        // the language changed.
        setResults([]);
        setError("");
    };

    return (
        <div
            style={{
                marginTop: "30px",
            }}
        >
            {/* ========================= */}
            {/* LANGUAGE + RUN */}
            {/* ========================= */}

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "15px",
                }}
            >
                <select
                    value={language}
                    onChange={(e) =>
                        handleLanguageChange(
                            e.target.value
                        )
                    }
                >
                    <option value="typescript">
                        TypeScript
                    </option>

                    <option value="javascript">
                        JavaScript
                    </option>

                    <option value="python">
                        Python
                    </option>

                    <option value="cpp">
                        C++
                    </option>

                    <option value="java">
                        Java
                    </option>
                </select>

                <button
                    onClick={handleRun}
                    disabled={loading}
                >
                    {loading
                        ? "Running..."
                        : "Run"}
                </button>
            </div>

            {/* ========================= */}
            {/* MONACO */}
            {/* ========================= */}

            <Editor
                height="500px"
                language={language}
                value={code}
                onChange={(value) =>
                    setCode(value || "")
                }
                theme="vs-dark"
                options={{
                    minimap: {
                        enabled: false,
                    },

                    fontSize: 16,

                    automaticLayout: true,

                    scrollBeyondLastLine:
                        false,

                    padding: {
                        top: 10,
                    },
                }}
            />

            {/* ========================= */}
            {/* TEST CASES */}
            {/* ========================= */}

            <div
                style={{
                    marginTop: "25px",
                }}
            >
                <h2>Test Cases</h2>

                {testCases.map(
                    (testCase, index) => (
                        <div
                            key={index}
                            style={{
                                marginTop:
                                    "15px",
                                padding: "15px",
                                border:
                                    "1px solid #ddd",
                                borderRadius:
                                    "8px",
                            }}
                        >
                            <h3>
                                Test Case{" "}
                                {index + 1}
                            </h3>

                            <p>
                                <b>
                                    Input:
                                </b>
                            </p>

                            <pre>
                                {typeof testCase.input ===
                                    "object"
                                    ? JSON.stringify(
                                        testCase.input,
                                        null,
                                        2
                                    )
                                    : String(
                                        testCase.input
                                    )}
                            </pre>

                            <p>
                                <b>
                                    Expected:
                                </b>
                            </p>

                            <pre>
                                {
                                    testCase.expectedOutput
                                }
                            </pre>
                        </div>
                    )
                )}
            </div>

            {/* ========================= */}
            {/* ERROR */}
            {/* ========================= */}

            {error && (
                <div
                    style={{
                        marginTop: "20px",
                        padding: "15px",
                        border:
                            "1px solid #ef4444",
                        borderRadius: "8px",
                    }}
                >
                    <h3>
                        Execution Error
                    </h3>

                    <pre>
                        {error}
                    </pre>
                </div>
            )}

            {/* ========================= */}
            {/* RESULTS */}
            {/* ========================= */}

            <div
                style={{
                    marginTop: "30px",
                }}
            >
                <h2>
                    Execution Results
                </h2>

                {results.length === 0 &&
                    !loading &&
                    !error && (
                        <p>
                            Run your code to
                            see the results.
                        </p>
                    )}

                {results.map(
                    (
                        result,
                        index
                    ) => (
                        <div
                            key={index}
                            style={{
                                marginTop:
                                    "15px",

                                padding:
                                    "15px",

                                border:
                                    "1px solid #ddd",

                                borderRadius:
                                    "8px",
                            }}
                        >
                            <h3>
                                Test Case{" "}
                                {result.testCase}
                            </h3>

                            <p>
                                <b>
                                    Input:
                                </b>
                            </p>

                            <pre>
                                {typeof result.input ===
                                    "object"
                                    ? JSON.stringify(
                                        result.input,
                                        null,
                                        2
                                    )
                                    : String(
                                        result.input
                                    )}
                            </pre>

                            <p>
                                <b>
                                    Expected:
                                </b>
                            </p>

                            <pre>
                                {
                                    result.expectedOutput
                                }
                            </pre>

                            <p>
                                <b>
                                    Actual:
                                </b>
                            </p>

                            <pre>
                                {result.actualOutput ||
                                    "No output"}
                            </pre>

                            {/* STATUS */}

                            <p>
                                <b>
                                    Status:
                                </b>{" "}
                                {result.status}
                            </p>

                            {/* PASS / FAIL */}

                            <p
                                style={{
                                    fontWeight:
                                        "bold",
                                }}
                            >
                                {result.passed
                                    ? "✓ Passed"
                                    : "✗ Failed"}
                            </p>

                            {/* STDERR */}

                            {result.stderr && (
                                <div>
                                    <p>
                                        <b>
                                            Runtime Error:
                                        </b>
                                    </p>

                                    <pre>
                                        {
                                            result.stderr
                                        }
                                    </pre>
                                </div>
                            )}

                            {/* COMPILER ERROR */}

                            {result.compileOutput && (
                                <div>
                                    <p>
                                        <b>
                                            Compilation Error:
                                        </b>
                                    </p>

                                    <pre>
                                        {
                                            result.compileOutput
                                        }
                                    </pre>
                                </div>
                            )}

                            {/* MESSAGE */}

                            {result.message && (
                                <div>
                                    <p>
                                        <b>
                                            Message:
                                        </b>
                                    </p>

                                    <pre>
                                        {
                                            result.message
                                        }
                                    </pre>
                                </div>
                            )}
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

