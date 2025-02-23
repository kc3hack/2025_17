"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { selectionsAtom, selectedColorsAtom } from "@/lib/atom";
import Image from "next/image";
import QuestionDisplay from "./questionComponent";

// Tailwind CSSの標準カラーパレットを使用
const questions = [
    {
        question: "どんな雰囲気が良いか？",
        options: [
            { text: "自然", color: "#228B22", imagePath: "/paint/nature.png" },
            { text: "都市", color: "#34495E", imagePath: "/paint/city.png" },
            {
                text: "歴史的",
                color: "#A67B5B",
                imagePath: "/paint/history.png",
            },
        ],
    },
    {
        question: "楽しみたい体験は？",
        options: [
            { text: "景観", color: "#87CEEB", imagePath: "/paint/view.png" },
            {
                text: "アクティブ",
                color: "#E74C3C",
                imagePath: "/paint/active.png",
            },
            { text: "文化", color: "#8E44AD", imagePath: "/paint/culture.png" },
        ],
    },
    {
        question: "静か？賑やか？",
        options: [
            { text: "静か", color: "#95A5A6", imagePath: "/paint/quiet.png" },
            { text: "賑やか", color: "#E91E63", imagePath: "/paint/busy.png" },
        ],
    },
    {
        question: "どのくらいかかる？",
        options: [
            {
                text: "数時間",
                color: "#E3D4FF",
                imagePath: "/paint/few_hours.png",
            },
            {
                text: "日帰り",
                color: "#D4A017",
                imagePath: "/paint/one_day.png",
            },
            {
                text: "お泊り",
                color: "#1A237E",
                imagePath: "/paint/many_days.png",
            },
        ],
    },
    {
        question: "どの季節に行く？",
        options: [
            { text: "春", color: "#f1b4c8", imagePath: "/paint/spring.png" },
            { text: "夏", color: "#00b16b", imagePath: "/paint/summer.png" },
            { text: "秋", color: "#f58220", imagePath: "/paint/fall.png" },
            { text: "冬", color: "#bcd6e4", imagePath: "/paint/winter.png" },
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
            <div
                className="fixed top-0 left-0 w-screen h-screen -z-50"
                // style={{ background: "#c3d825" }} // ここで壁紙を決められる
            />

            <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
            >
                <QuestionDisplay
                    question={questions[currentQuestionIndex].question}
                />
                {/* <h2 className="text-xl mb-4">
                    {questions[currentQuestionIndex].question}
                </h2> */}

                <div className="relative top-0 gap-5 flex justify-center">
                    {/* {questions[currentQuestionIndex].options.map(
                        (option, index) => (
                            <Button
                                key={index}
                                onClick={() => handleOptionSelect(option)}
                                className="text-white"
                                style={{ backgroundColor: option.color }}
                            >
                                {option.text}
                            </Button>
                        )
                    )} */}
                    {questions[currentQuestionIndex].options.map(
                        (option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(option)}
                                className=""
                            >
                                <Image
                                    src={option.imagePath}
                                    alt={""}
                                    width={75}
                                    height={100}
                                />
                            </button>
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
                priority
                height={400}
                width={1500}
                className="fixed -bottom-48 -left-20 -z-10"
            />
        </div>
    );
};

export default QuestionPage;
