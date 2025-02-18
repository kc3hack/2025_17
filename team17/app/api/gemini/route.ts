import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// APIキーの設定
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json();

        // テキストモデルの初期化
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // プロンプトの実行
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        return NextResponse.json({ message: text });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { error: "Failed to process the request" },
            { status: 500 }
        );
    }
}
