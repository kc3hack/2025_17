"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

export default function Home() {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const items = [
        { id: 1, title: "カード 1", color: "bg-blue-500" },
        { id: 2, title: "カード 2", color: "bg-green-500" },
        { id: 3, title: "カード 3", color: "bg-purple-500" },
        { id: 4, title: "カード 4", color: "bg-red-500" },
    ];

    return (
        <div className="space-y-4 p-6">
            <div className="space-y-4">
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        layoutId={item.id.toString()}
                        onClick={() => setSelectedId(item.id)}
                        className={`${item.color} h-24 rounded-lg cursor-pointer`}
                        whileHover={{ scale: 1.05 }}
                    />
                ))}
            </div>

            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        className="fixed top-20 left-0 w-screen h-screen flex justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* 背景オーバーレイ */}
                        <div
                            className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50"
                            onClick={() => setSelectedId(null)}
                        ></div>

                        {/* モーダル本体 */}
                        <motion.div
                            layoutId={selectedId.toString()}
                            className="relative w-5/6 h-3/4 bg-white rounded-lg p-6 shadow-lg z-50"
                        >
                            <h3 className="text-xl font-semibold">
                                {
                                    items.find((item) => item.id === selectedId)
                                        ?.title
                                }
                            </h3>
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
