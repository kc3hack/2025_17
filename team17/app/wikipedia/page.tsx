"use client";
import React, { useState } from "react";

const WikiImageFetcher: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!searchTerm.trim()) {
            setError("検索語を入力してください");
            return;
        }

        setLoading(true);
        setError("");
        setImageUrl("");

        try {
            const response = await fetch(
                `/api/wikipedia?title=${encodeURIComponent(searchTerm)}`
            );
            const data = await response.json();

            if (response.ok) {
                setImageUrl(data.imageUrl);
            } else {
                setError(data.error || "画像の取得に失敗しました");
            }
        } catch (err) {
            setError("画像の取得に失敗しました");
            console.error("Error fetching wiki image:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="場所を入力（例：清水寺、東京タワー）"
                        className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                        disabled={loading}
                    >
                        画像を取得
                    </button>
                </div>
            </form>

            {loading && <p>読み込み中...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {imageUrl && (
                <div className="mt-4">
                    <img
                        src={imageUrl}
                        alt={searchTerm}
                        className="max-w-full h-auto rounded shadow-lg"
                        width={500}
                        height={300}
                    />
                </div>
            )}
        </div>
    );
};

export default WikiImageFetcher;
