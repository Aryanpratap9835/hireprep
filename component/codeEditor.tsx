"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react"
export default function CodeEditor() {
    const [code, setCode] = useState("Write your code")
    const [language, setLanguage] = useState("typescript")
    const handleRun = async () => {
        try {
            const response = await fetch("/api/run", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code,
                    language,
                }),
            });

            const result = await response.json();

            console.log("RUN RESULT:", result);
        } catch (error) {
            console.error("RUN ERROR:", error);
        }
    };
    return (
        <div>
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
            >
                <option value="typescript">TypeScript</option>
                <option value="javascript">Javascript</option>
                <option value="python">Python</option>

            </select>
            <button onClick={handleRun}>
                Run</button>
            <Editor
                height="500px"
                defaultLanguage="typescript"
                value={code}
                onChange={(value) => setCode(value || "")}
                theme="vs-dark"
            />
        </div>
    );
}