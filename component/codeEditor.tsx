"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Problem } from "@/data/problem";

type Result = {
    testCase: number;
    input?: any;
    expectedOutput?: any;
    actualOutput: string;
    passed: boolean;
    status: string;
    stderr: string;
    compileOutput: string;
    message: string;
};

type CodeEditorProps = {
    problem: Problem;
};

export default function CodeEditor({
    problem,
}: CodeEditorProps) {
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("typescript");

    const [results, setResults] = useState<Result[]>([]);
    const [verdict, setVerdict] = useState("");
    const [passedCount, setPassedCount] = useState(0);
    const [totalTests, setTotalTests] = useState(0);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [mode, setMode] = useState<"run" | "submit" | "">("");

    const handleExecute = async (
        executionMode: "run" | "submit"
    ) => {
        if (!code.trim()) {
            setError("Please write some code first.");
            return;
        }

        setLoading(true);
        setMode(executionMode);

        setError("");
        setResults([]);
        setVerdict("");
        setPassedCount(0);
        setTotalTests(0);

        try {
            const response = await fetch("/api/run", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code,
                    language,

                    // Public tests
                    testCases: problem.testCases,

                    problemId: problem.id,

                    functionName: problem.functionName,
                    parameters: problem.parameters,

                    mode: executionMode,
                }),
            });

            const data = await response.json();

            console.log("API RESPONSE:", data);

            if (!response.ok || !data.success) {
                throw new Error(
                    data.error || "Execution failed"
                );
            }

            if (!Array.isArray(data.results)) {
                throw new Error(
                    "API did not return results array"
                );
            }

            setResults(data.results);
            setVerdict(data.verdict || "");
            setPassedCount(data.passedCount || 0);
            setTotalTests(data.totalTests || 0);

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
            setMode("");
        }
    };

    const handleLanguageChange = (
        newLanguage: string
    ) => {
        setLanguage(newLanguage);

        setResults([]);
        setVerdict("");
        setPassedCount(0);
        setTotalTests(0);
        setError("");
    };

    return (
        <div style={{ marginTop: "30px" }}>

            {/* Controls */}
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
                    disabled={loading}
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

                {/* RUN */}
                <button
                    onClick={() =>
                        handleExecute("run")
                    }
                    disabled={loading}
                >
                    {loading && mode === "run"
                        ? "Running..."
                        : "Run"}
                </button>

                {/* SUBMIT */}
                <button
                    onClick={() =>
                        handleExecute("submit")
                    }
                    disabled={loading}
                >
                    {loading && mode === "submit"
                        ? "Submitting..."
                        : "Submit"}
                </button>
            </div>

            {/* Monaco Editor */}
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

                    scrollBeyondLastLine: false,

                    padding: {
                        top: 10,
                    },
                }}
            />

            {/* Error */}
            {error && (
                <div
                    style={{
                        marginTop: "20px",
                        padding: "15px",
                        border: "1px solid #ef4444",
                        borderRadius: "8px",
                    }}
                >
                    <h3>Execution Error</h3>

                    <pre>
                        {error}
                    </pre>
                </div>
            )}

            {/* Verdict */}
            {verdict && (
                <div
                    style={{
                        marginTop: "25px",
                        padding: "20px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                    }}
                >
                    <h2>
                        {verdict}
                    </h2>

                    <p>
                        Passed:{" "}
                        <b>
                            {passedCount}
                        </b>{" "}
                        /{" "}
                        <b>
                            {totalTests}
                        </b>
                    </p>
                </div>
            )}

            {/* Test Cases */}
            <div style={{ marginTop: "30px" }}>
                <h2>
                    {mode === "submit"
                        ? "Submission Results"
                        : "Test Cases"}
                </h2>

                {results.length === 0 &&
                    !loading &&
                    !error && (
                        <p>
                            Run or submit your code
                            to see the results.
                        </p>
                    )}

                {results.map(
                    (result, index) => (
                        <div
                            key={index}
                            style={{
                                marginTop: "15px",
                                padding: "15px",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                            }}
                        >
                            <h3>
                                Test Case{" "}
                                {result.testCase}
                            </h3>

                            {/* 
                              Hidden test cases don't send
                              input/expectedOutput from API.
                            */}
                            {result.input !==
                                undefined && (
                                    <>
                                        <p>
                                            <b>
                                                Input:
                                            </b>
                                        </p>

                                        <pre>
                                            {JSON.stringify(
                                                result.input,
                                                null,
                                                2
                                            )}
                                        </pre>
                                    </>
                                )}

                            {result.expectedOutput !==
                                undefined && (
                                    <>
                                        <p>
                                            <b>
                                                Expected:
                                            </b>
                                        </p>

                                        <pre>
                                            {JSON.stringify(
                                                result.expectedOutput
                                            )}
                                        </pre>
                                    </>
                                )}

                            <p>
                                <b>
                                    Actual:
                                </b>
                            </p>

                            <pre>
                                {result.actualOutput ||
                                    "No output"}
                            </pre>

                            <p>
                                <b>
                                    Status:
                                </b>{" "}
                                {result.status}
                            </p>

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

                            {result.message && (
                                <div>
                                    <p>
                                        <b>
                                            Message:
                                        </b>
                                    </p>

                                    <pre>
                                        {result.message}
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

