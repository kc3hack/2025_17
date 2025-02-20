"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { selectionsAtom } from "@/lib/atom";

const questions = [
    {
        question: "どんな雰囲気が良いか？",
        options: ["自然", "都市", "歴史的"],
    },
    {
        question: "楽しみたい体験は？",
        options: ["景観", "アクティブ", "文化"],
    },
    {
        question: "静か？賑やか？",
        options: ["静か", "賑やか"],
    },
    {
        question: "どのくらいかかる？",
        options: ["数時間", "日帰り", "お泊り"],
    },
    {
        question: "どの季節に行く？",
        options: ["春", "夏", "秋", "冬"],
    },
];

const QuestionPage: React.FC = () => {
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [selections, setSelections] = useAtom(selectionsAtom);

    const handleOptionSelect = (option: string) => {
        setSelections([...selections, option]);

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
                                className="block w-full"
                            >
                                {option}
                            </Button>
                        )
                    )}
                </div>
            </motion.div>

            <div className="mt-4 text-sm text-gray-500">
                現在の選択: {selections.join(", ")}
            </div>
        </div>
    );
};

export default QuestionPage;
