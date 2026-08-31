import { problem } from "@/data/problem";
import Link from "next/link";

export default function ProblemPage() {
    return (
        <div>
            <h1>Problems</h1>

            {problem.map((p) => (
                <div key={p.id}>
                    <p>ID: {p.id}</p>

                    <Link href={`/problem/${p.id}`}>
                        <h2>{p.title}</h2>
                    </Link>

                    <p>{p.topic}</p>
                    <p>{p.difficulty}</p>
                </div>
            ))}
        </div>
    );
}