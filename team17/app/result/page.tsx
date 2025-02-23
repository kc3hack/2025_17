"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { X, ImageOff, MapPin } from "lucide-react";
import Image from "next/image";

import { useAtom } from "jotai";
import { selectionsAtom } from "@/lib/atom";
import EaselWatercolor from "./backImage";
import { Button } from "@/components/ui/button";
import LoadingImage from "./loadingImage";

interface Response {
    id: number;
    name: string;
    postalCode: string;
    longAddress: string;
    shortAddress: string;
    imageUrl?: string;
    description?: string;
}

export default function Home() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [selections, setSelections] = useAtom(selectionsAtom);
    const [isLoading, setIsLoading] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [response, setResponse] = useState<Response[]>([]);

    // descriptionフィールドのサンプル文章を詳細に変更
    const prompt = `
    関西の観光名所を純粋なJSON形式で4つ返してください。

    【スキーマ例】
    [
        {
            "id": 1,
            "name": "清水寺",
            "postalCode": "〒605-0862",
            "longAddress": "京都府京都市東山区清水1-294",
            "shortAddress": "京都府京都市東山区",
            "description": "清水寺は、日本の伝統的な建築様式と長い歴史を誇る寺院で、四季ごとの美しい自然景観と調和した荘厳な建造物が特徴です。境内には由緒ある仏像や文化財が数多くあり、参拝者は歴史と伝統に触れながら、精神的な安らぎを感じることができます。"
        },
        {
            ...
        }
    ]

    【テーマ】
    次の5つのキーワードに合致する関西圏内の観光名所を4つ選んでください。
    ・訪れる場所の特徴や雰囲気 : ${selections[0]}
    ・体験の種類 : ${
        selections[1] === "景観"
            ? "景色を楽しむ"
            : selections[1] === "アクティブ"
            ? "アクティブに過ごす"
            : "文化や伝統を感じる"
    }
    ・静かさ・賑やかさ : ${selections[2]}
    ・滞在時間の目安 : ${selections[3]}
    ・訪れる季節 : ${selections[4]}

    【注意事項】
    ・スキーマ例のすべての要素（id,name,postalCode,longAddress,shortAddress,description）を含めてください。
    ・出力にはコードブロックやマークダウン記法を一切含めず、プレーンなJSON文字列のみで回答してください。
    ・余計な文字列やコメントは含めず、JSONとして有効な形式で出力してください。
    ・スキーマのnameは別名ではなく正式名称(例：金閣寺は鹿苑寺、銀閣寺は慈照寺)で返してください。
    ・longAddressには住所の全体（例：「京都府京都市右京区嵯峨天龍寺芒ノ馬場町3-10」）を返してください。
    ・shortAddressにはlongAddressから都道府県、市区町村、および区まで（例：「京都府京都市右京区」）の部分のみを抽出して返してください。
    `;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch("/api/gemini", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ prompt }),
                });

                const data = await res.json();
                let parsedResponse = data.message;
                if (typeof parsedResponse === "string") {
                    parsedResponse = JSON.parse(parsedResponse);
                }

                const updatedResponse = await Promise.all(
                    parsedResponse.map(async (item: Response) => {
                        try {
                            const wikiRes = await fetch(
                                `/api/wikipedia?title=${encodeURIComponent(
                                    item.name
                                )}`
                            );
                            const wikiData = await wikiRes.json();
                            if (wikiData.imageUrl) {
                                item.imageUrl = wikiData.imageUrl;
                            }
                        } catch (error) {
                            console.error("Wikipedia API Error:", error);
                        }
                        return item;
                    })
                );

                setResponse(updatedResponse);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [selections]);

    const selectedLocation = response.find((res) => res.id === selectedId);

    return (
        <div className={`space-y-4 p-6 z-0`}>
            {isLoading && <LoadingImage />}

            <Button
                size="lg"
                className="bg-green-500 font-semibold text-lg rounded-full z-50 top-5 right-5 fixed"
                onClick={(e) => {
                    // e.preventDefault();
                    // setSelections([]);
                    window.location.href = "/question";
                }}
            >
                再診断
            </Button>

            <EaselWatercolor />
            <div
                className="space-y-3"
                style={{
                    top: "21%",
                    left: "12%",
                    right: "11%",
                    position: "absolute",
                }}
            >
                {response.map((res, index) => (
                    <motion.div
                        key={res.id}
                        layoutId={res.id.toString()}
                        onClick={() => {
                            setSelectedId(res.id);
                            setIsFirstLoad(false);
                        }}
                        style={{
                            backgroundColor: "rgb(244, 241, 231, 0.5)",
                        }}
                        className="h-22 rounded-lg cursor-pointer border-2 shadow-md"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: [0, 1.05, 1] }}
                        transition={{ delay: isFirstLoad ? 0.2 * index : 0 }}
                    >
                        <div className="flex items-center space-x-3 p-3">
                            {res.imageUrl ? (
                                <div className="relative w-12 h-12">
                                    <Image
                                        src={res.imageUrl}
                                        alt={res.name}
                                        fill
                                        className="object-cover rounded"
                                        sizes="48px"
                                    />
                                </div>
                            ) : (
                                <ImageOff className="w-12 h-12" />
                            )}
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {res.name}
                                </h3>
                                <p>{res.shortAddress}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedId && selectedLocation && (
                    <motion.div
                        className="fixed top-20 left-0 w-screen h-screen flex justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div
                            className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50"
                            onClick={() => setSelectedId(null)}
                        />

                        <motion.div
                            layoutId={selectedId.toString()}
                            className="relative w-5/6 h-2/3 bg-white rounded-lg shadow-lg z-50 overflow-y-auto"
                        >
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className=" p-6 pt-14">
                                {selectedLocation.imageUrl && (
                                    <div className="relative w-full h-48">
                                        <Image
                                            src={selectedLocation.imageUrl}
                                            alt={selectedLocation.name}
                                            fill
                                            className="object-cover rounded-lg"
                                            sizes="(max-width: 768px) 100vw, 80vw"
                                        />
                                    </div>
                                )}
                                {/* <h3 className="text-2xl font-semibold">
                                    {selectedLocation.name}
                                </h3>
                                <div>
                                    <p className="text-gray-600">
                                        {selectedLocation.postalCode}
                                    </p>
                                    <p className="text-gray-800">
                                        {selectedLocation.longAddress}
                                    </p>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                            selectedLocation.name
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-blue-500 hover:underline"
                                    >
                                        <MapPin className="w-5 h-5 mr-1" />
                                        地図で見る
                                    </a>
                                    {selectedLocation.description && (
                                        <p className="text-gray-700 pt-2">
                                            {selectedLocation.description}
                                        </p>
                                    )}
                                </div> */}
                                <motion.h3
                                    className="text-2xl font-semibold pt-3 pb-3"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: [0, 1.1, 1] }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    {selectedLocation.name}
                                </motion.h3>
                                <motion.p
                                    className="text-gray-600"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: [0, 1.1, 1] }}
                                    transition={{ duration: 0.5, delay: 0.35 }}
                                >
                                    {selectedLocation.postalCode}
                                </motion.p>
                                <motion.p
                                    className="text-gray-800"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: [0, 1.1, 1] }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                >
                                    {selectedLocation.longAddress}
                                </motion.p>
                                <motion.a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                        selectedLocation.name
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-blue-500 hover:underline"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: 1,
                                        scale: [0, 1.1, 1],
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.65,
                                    }}
                                >
                                    <MapPin className="w-5 h-5 mr-1" />
                                    地図で見る
                                </motion.a>
                                {selectedLocation.description && (
                                    <motion.p
                                        className="text-gray-700 pt-2 mt-2 border-t border-gray-300"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: 1,
                                            scale: [0, 1.1, 1],
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.8,
                                        }}
                                    >
                                        {selectedLocation.description}
                                    </motion.p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
