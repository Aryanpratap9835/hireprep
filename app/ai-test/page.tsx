"use client";

import { useState } from "react";

export default function AITestPage() {
    const [review, setReview] = useState("");
    const [loading, setLoading] = useState(false);

    const testAI = async () => {
        setLoading(true);

        try {
            const response = await fetch("/api/ai/review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    problem: `
Given an array of integers nums and an integer target,
return indices of the two numbers such that they add up to target.
          `,
                    language: "TypeScript",
                    code: `
function twoSum(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }

  return [];
}
          `,
                    testResults: [
                        {
                            input: "[2,7,11,15], target = 9",
                            passed: true,
                        },
                        {
                            input: "[3,2,4], target = 6",
                            passed: true,
                        },
                    ],
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Request failed");
            }

            setReview(data.review);
        } catch (error) {
            console.error(error);
            setReview("AI request failed. Check the terminal.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="p-10">
            <h1 className="text-2xl font-bold mb-6">
                HirePrep AI Test
            </h1>

            <button
                onClick={testAI}
                disabled={loading}
                className="rounded bg-black px-5 py-3 text-white"
            >
                {loading ? "Thinking..." : "Test AI Review"}
            </button>

            {review && (
                <div className="mt-8 whitespace-pre-wrap rounded border p-6">
                    {review}
                </div>
            )}
        </main>
    );
}