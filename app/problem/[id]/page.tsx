import { problem } from "@/data/problem";
import CodeEditor from "@/component/codeEditor";

export default async function ProblemDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const sol = problem.find(
        (p) => p.id === id
    );

    if (!sol) {
        return <h1>Problem not found</h1>;
    }

    return (
        <div style={{ padding: "30px" }}>

            {/* Problem Title */}
            <h1>{sol.title}</h1>

            {/* Topic */}
            <h2>{sol.topic}</h2>

            {/* Difficulty */}
            <p>
                <b>Difficulty:</b>{" "}
                {sol.difficulty}
            </p>

            {/* Description */}
            <p>{sol.description}</p>

            {/* Examples */}
            <h2>Examples</h2>

            {sol.examples.map(
                (example, index) => (
                    <div
                        key={index}
                        style={{
                            marginBottom:
                                "20px",
                        }}
                    >
                        <h3>
                            Example{" "}
                            {index + 1}
                        </h3>

                        <p>
                            <b>Input:</b>
                        </p>

                        <pre>
                            {example.input}
                        </pre>

                        <p>
                            <b>Output:</b>
                        </p>

                        <pre>
                            {example.output}
                        </pre>
                    </div>
                )
            )}

            {/* Constraints */}
            <h2>Constraints</h2>

            <ul>
                {sol.constraints.map(
                    (constraint, index) => (
                        <li key={index}>
                            {constraint}
                        </li>
                    )
                )}
            </ul>

            {/* Code Editor */}
            <CodeEditor
                testCases={
                    sol.testCases ?? []
                }
                functionName={
                    sol.functionName
                }
                parameters={
                    sol.parameters ?? []
                }
            />

        </div>
    );
}