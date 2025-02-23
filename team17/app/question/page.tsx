"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { selectionsAtom, selectedColorsAtom } from "@/lib/atom";

// Tailwind CSSの標準カラーパレットを使用
const questions = [
    {
        question: "どんな雰囲気が良いか？",
        options: [
            { text: "自然", color: "rgb(34 197 94)" }, // green-500
            { text: "都市", color: "rgb(59 130 246)" }, // blue-500
            { text: "歴史的", color: "rgb(120 113 108)" }, // stone-500
        ],
    },
    {
        question: "楽しみたい体験は？",
        options: [
            { text: "景観", color: "rgb(168 85 247)" }, // purple-500
            { text: "アクティブ", color: "rgb(249 115 22)" }, // orange-500
            { text: "文化", color: "rgb(234 179 8)" }, // yellow-500
        ],
    },
    {
        question: "静か？賑やか？",
        options: [
            { text: "静か", color: "rgb(148 163 184)" }, // slate-400
            { text: "賑やか", color: "rgb(239 68 68)" }, // red-500
        ],
    },
    {
        question: "どのくらいかかる？",
        options: [
            { text: "数時間", color: "rgb(236 72 153)" }, // pink-500
            { text: "日帰り", color: "rgb(249 115 22)" }, // orange-500
            { text: "お泊り", color: "rgb(37 99 235)" }, // blue-600
        ],
    },
    {
        question: "どの季節に行く？",
        options: [
            { text: "春", color: "rgb(244 114 182)" }, // pink-400
            { text: "夏", color: "rgb(34 211 238)" }, // cyan-400
            { text: "秋", color: "rgb(180 83 9)" }, // amber-700
            { text: "冬", color: "rgb(186 230 253)" }, // sky-200
        ],
    },
];

const QuestionPage: React.FC = () => {
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [selections, setSelections] = useAtom(selectionsAtom);
    const [selectedColors, setSelectedColors] = useAtom(selectedColorsAtom);

    const handleOptionSelect = (option: { text: string; color: string }) => {
        setSelections([...selections, option.text]);
        setSelectedColors([...selectedColors, option.color]);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            router.push("/result");
        }
    };

    return (
        <div className="p-4">
            <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-xl mb-4">
                    {questions[currentQuestionIndex].question}
                </h2>
                <div className="space-y-2">
                    {questions[currentQuestionIndex].options.map(
                        (option, index) => (
                            <Button
                                key={index}
                                onClick={() => handleOptionSelect(option)}
                                className="block w-full text-white"
                                style={{ backgroundColor: option.color }}
                            >
                                {option.text}
                            </Button>
                        )
                    )}
                </div>
            </motion.div>
            <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">
                    選択したカラーパレット:
                </p>
                <div className="flex gap-2">
                    {selectedColors.map((color, index) => (
                        <div
                            key={index}
                            className="w-8 h-8 rounded-full"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionPage;
