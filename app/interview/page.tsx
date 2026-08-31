
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InterviewPage() {
    const router = useRouter();
    const [role, setRole] = useState("SDE Intern");
    const [type, setType] = useState("DSA");
    const [difficulty, setDifficulty] = useState("Medium");
    const [problem, setProblem] = useState<any>(null);
    async function generateInterview() {
        console.log("BUTTON CLICKED");

        try {
            const response = await fetch("/api/interview", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    role,
                    type,
                    difficulty,
                }),
            });

            console.log("FETCH FINISHED");
            console.log("STATUS:", response.status);

            const data = await response.json();

            console.log("API DATA:", data);
            setProblem(data.problem);
            router.push(`/problem/${data.problem.id}`);

        } catch (error) {
            console.error("ERROR:", error);
        }
    }
    return (
        <main className="min-h-screen px-6 py-16">
            <div className="mx-auto max-w-2xl">

                <h1 className="text-4xl font-bold">
                    Set Up Your Interview
                </h1>

                <p className="mt-3 text-gray-600">
                    Tell HirePrep what kind of interview you want to practice.
                </p>

                <div className="mt-10 space-y-6">

                    {/* Target Role */}
                    <div>
                        <label className="block font-medium">
                            Target Role
                        </label>

                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="mt-2 w-full rounded-lg border p-3"
                        >
                            <option>SDE Intern</option>
                            <option>Frontend Developer</option>
                            <option>Backend Developer</option>
                            <option>Full Stack Developer</option>
                        </select>
                    </div>

                    {/* Interview Type */}
                    <div>
                        <label className="block font-medium">
                            Interview Type
                        </label>

                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="mt-2 w-full rounded-lg border p-3"
                        >
                            <option>DSA</option>
                            <option>CS Fundamentals</option>
                            <option>Behavioral</option>
                            <option>Mixed</option>
                        </select>
                    </div>

                    {/* Difficulty */}
                    <div>
                        <label className="block font-medium">
                            Difficulty
                        </label>

                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            className="mt-2 w-full rounded-lg border p-3"
                        >
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>

                    {/* Generate Button */}
                    <button
                        onClick={generateInterview}
                        className="w-full rounded-lg bg-black px-6 py-3 text-white"
                    >
                        Generate Interview
                    </button>

                    {/* Generated Question */}
                    {problem && (
                        <div className="mt-8 rounded-lg border p-6">
                            <h2 className="text-xl font-bold">
                                {problem.title}
                            </h2>

                            <p className="mt-2">
                                Topic: {problem.topic}
                            </p>

                            <p className="mt-1">
                                Difficulty: {problem.difficulty}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

