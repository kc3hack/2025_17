"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { selectionsAtom, selectedColorsAtom } from "@/lib/atom";
import Image from "next/image";

// Tailwind CSSの標準カラーパレットを使用
const questions = [
    {
        question: "どんな雰囲気が良いか？",
        options: [
            { text: "自然", color: "#228B22" }, // green-500
            { text: "都市", color: "#34495E" }, // blue-500
            { text: "歴史的", color: "#A67B5B" }, // stone-500
        ],
    },
    {
        question: "楽しみたい体験は？",
        options: [
            { text: "景観", color: "#87CEEB" }, // purple-500
            { text: "アクティブ", color: "#E74C3C" }, // orange-500
            { text: "文化", color: "#8E44AD" }, // yellow-500
        ],
    },
    {
        question: "静か？賑やか？",
        options: [
            { text: "静か", color: "#95A5A6" }, // slate-400
            { text: "賑やか", color: "#E91E63" }, // red-500
        ],
    },
    {
        question: "どのくらいかかる？",
        options: [
            { text: "数時間", color: "#E3D4FF" }, // pink-500
            { text: "日帰り", color: "#D4A017" }, // orange-500
            { text: "お泊り", color: "#1A237E" }, // blue-600
        ],
    },
    {
        question: "どの季節に行く？",
        options: [
            { text: "春", color: "#f1b4c8" }, // pink-400
            { text: "夏", color: "#00b16b" }, // cyan-400
            { text: "秋", color: "#f58220" }, // amber-700
            { text: "冬", color: "#bcd6e4" }, // sky-200
        ],
    },
];

const getLighterColor = (color: string): string => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const newR = Math.min(255, Math.floor(r + (255 - r) * 0.55));
    const newG = Math.min(255, Math.floor(g + (255 - g) * 0.55));
    const newB = Math.min(255, Math.floor(b + (255 - b) * 0.55));

    const toHex = (n: number) => n.toString(16).padStart(2, "0");

    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
};

const colorPos = [
    { x: 197, y: 60 },
    { x: 188, y: 109 },
    { x: 143, y: 143 },
    { x: 84, y: 150 },
    { x: 39, y: 118 },
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
                <Image
                    src={"/palette_noColor.png"}
                    alt={""}
                    height={230}
                    width={230}
                    className="absolute bottom-[15px] right-[15px]"
                />
                {/* <div className="relative h-32 w-full"> */}
                {selectedColors.map((color, index) => (
                    <div
                        key={index}
                        className={`absolute w-7 h-7 rounded-full shadow-md`}
                        style={{
                            backgroundColor: color,
                            bottom: `${colorPos[index].y}px`,
                            right: `${colorPos[index].x}px`,
                        }}
                    >
                        <div
                            className="relative w-1 h-3 rotate-45 top-[2px] left-[6px] rounded-full "
                            style={{ backgroundColor: getLighterColor(color) }}
                        />
                    </div>
                ))}
                {/* </div> */}
            </div>

            <Image
                src={"/question_ozisan.gif"}
                alt={""}
                height={400}
                width={400}
                className="fixed -bottom-44 -left-20"
            />
        </div>
    );
};

export default QuestionPage;
