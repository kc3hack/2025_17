import React from "react";
import { motion } from "framer-motion";

const QuestionDisplay = ({ question }: { question: string }) => {
    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full max-w-2xl mx-auto p-6"
        >
            <div className="relative">
                {/* 装飾的な背景要素 */}
                <div className="absolute -top-3 -left-3 w-16 h-16 bg-purple-100 rounded-full opacity-50" />
                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-blue-100 rounded-full opacity-50" />

                {/* メインの質問表示エリア */}
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-200 rounded-full" />
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-green-200 rounded-full" />

                    {/* 質問テキスト */}
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="inline-block"
                        >
                            {question}
                        </motion.span>
                    </h2>

                    {/* 装飾的な下線 */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                            delay: 0.5,
                            duration: 0.6,
                            ease: "easeOut",
                        }}
                        className="w-24 h-1 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full mx-auto"
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default QuestionDisplay;
