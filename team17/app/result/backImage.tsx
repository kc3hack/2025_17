import { selectedColorsAtom } from "@/lib/atom";
import { useAtom } from "jotai";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

const EaselWatercolor = () => {
    const [selectedColors] = useAtom(selectedColorsAtom);

    const position = [
        { x: 5, y: 20 },
        { x: 95, y: 20 },
        { x: 0, y: 170 },
        { x: 100, y: 170 },
        { x: 50, y: 95 },
    ];

    return (
        <div className="w-full max-w-md mx-auto absolute -z-10 top-0 left-0 right-0 bottom-0">
            {/* イーゼルの背景画像 */}
            <Image src="/canvas.png" alt="easel" width={500} height={500} />

            {/* 水彩効果のコンテナ - キャンバスの位置に合わせて配置 */}
            <div
                className="absolute"
                style={{
                    // これらの値は実際のイーゼル画像に合わせて調整が必要です
                    top: "15.4%", // キャンバスの上端位置
                    left: "10%", // キャンバスの左端位置
                    width: "81%", // キャンバスの幅
                    height: "49.5%", // キャンバスの高さ
                    // overflow: "hidden",
                }}
            >
                {/* 水彩効果 */}
                {selectedColors.map((color, index) => (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.45 }}
                        transition={{ delay: index, duration: 1 }}
                        key={index}
                        className="absolute rounded-full"
                        style={{
                            backgroundColor: color,
                            width: "50%",
                            height: "50%",
                            filter: "blur(30px)",
                            transform: `translate(
                                ${position[index].x}%,
                                ${position[index].y}%
                            )`,
                            mixBlendMode: "multiply",
                            willChange: "filter, transform",
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default EaselWatercolor;
