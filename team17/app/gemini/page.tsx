"use client";
import { useState } from "react";

export default function Home() {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/gemini", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await res.json();
            setResponse(data.message);
        } catch (error) {
            console.error("Error:", error);
            setResponse("エラーが発生しました。");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Gemini AI Demo</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows={4}
                    placeholder="プロンプトを入力してください"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    {loading ? "生成中..." : "生成する"}
                </button>
            </form>

            {response && (
                <div className="mt-4 p-4 border border-gray-300 rounded">
                    <h2 className="font-bold mb-2">応答:</h2>
                    <p className="whitespace-pre-wrap">{response}</p>
                </div>
            )}
        </main>
    );
}
