
import { prisma } from "@/lib/prisma";
import CodeEditor from "@/component/codeEditor";
import { Problem } from "@/data/problem";

export default async function ProblemDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const sol = (await prisma.problem.findUnique({
        where: {
            id: id,
        },
    })) as unknown as Problem | null;

    if (!sol) {
        return <h1>Problem not found</h1>;
    }

    return (
        <div style={{ padding: "30px" }}>
            <h1>{sol.title}</h1>

            <h2>{sol.topic}</h2>

            <p>
                <b>Difficulty:</b> {sol.difficulty}
            </p>

            <p>{sol.description}</p>

            <h2>Examples</h2>

            {sol.examples.map((example: any, index: number) => (
                <div
                    key={index}
                    style={{ marginBottom: "20px" }}
                >
                    <h3>Example {index + 1}</h3>

                    <p>
                        <b>Input:</b>
                    </p>

                    <pre>{example.input}</pre>

                    <p>
                        <b>Output:</b>
                    </p>

                    <pre>{example.output}</pre>
                </div>
            ))}

            <h2>Constraints</h2>

            <ul>
                {sol.constraints.map(
                    (constraint: string, index: number) => (
                        <li key={index}>
                            {constraint}
                        </li>
                    )
                )}
            </ul>

            <CodeEditor problem={sol} />
        </div>
    );
}

