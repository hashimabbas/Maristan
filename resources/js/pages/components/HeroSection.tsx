"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function HeroSectiion() {
    const { resolvedTheme, setTheme } = useTheme();
    const [color, setColor] = useState("#000000"); // TRUE Default color (Light Mode)

    useEffect(() => {
        const calculateColor = () => {
            return resolvedTheme === "dark" ? "#ffffff" : "#000000";
        };

        if (typeof window !== 'undefined') {
            if (resolvedTheme) {
                setColor(calculateColor());
            } else {
                setTheme("light");
                setColor("#000000");
            }
        }
    }, [resolvedTheme, setTheme]);

    return (
        <div
            className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            style={{
                //backgroundImage: `url('/images/medical.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <span className="pointer-events-none z-10 whitespace-pre-wrap text-center text-6xl font-semibold leading-none">
                <img src="/logo-removebg.png" alt="logo" />
                {/* <TextAnimate animation="blurInUp" by="character" once>
                    Maristan
                </TextAnimate> */}
            </span>
        </div>
    );
}
