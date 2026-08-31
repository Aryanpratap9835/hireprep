import { problem } from "@/data/problem"
import CodeEditor from "@/component/codeEditor"
export default async function ProblemDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const sol = problem.find((p) => p.id === id);
    if (!sol) {
        return (
            <h1>LOL Problem not founded</h1>
        )
    };
    return (
        <div>
            <h1>{sol.title}</h1>
            <h2>{sol.topic}</h2>
            <p>{sol.difficulty}</p>
            <p>{sol.description}</p>
            <h2>Examples</h2>
            {sol.examples.map((example, index) => (
                <div key={index}>
                    <h3>Example {index + 1}</h3>

                    <p><b>Input:</b></p>
                    <p>{example.input}</p>

                    <p><b>Output:</b></p>
                    <p>{example.output}</p>
                </div>
            ))}
            <h2>Constraints</h2>
            <ul>
                {sol.constraints.map((constraints, index) => (
                    <li key={index}>{constraints}</li>
                ))}
            </ul>
            <CodeEditor />
        </div>

    )
};