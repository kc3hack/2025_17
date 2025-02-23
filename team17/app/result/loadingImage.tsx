import Image from "next/image";
import React, { useEffect, useState } from "react";

const LoadingImage: React.FC = () => {
    const [rotation, setRotation] = useState(0);
    const [clockwise, setClockwise] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setRotation((prevRotation) => {
                // const newRotation = clockwise
                //     ? prevRotation + 20
                //     : prevRotation - 20;
                // if (Math.abs(newRotation) % 360 === 0) {
                //     setClockwise(!clockwise);
                // }
                const newRotation = prevRotation + 5;
                return newRotation;
            });
        }, 20);

        return () => clearInterval(interval);
    }, [clockwise]);

    return (
        <Image
            height={640}
            width={640}
            src={"/painter.png"}
            style={{ transform: `rotate(${rotation}deg)` }}
            className="top-72 fixed transform -translate-x-1/2"
            alt={""}
        />
    );
};

export default LoadingImage;
