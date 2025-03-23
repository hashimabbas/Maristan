"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Particles } from "../../components/ui/magicui/particles";
import { TextAnimate } from "../../components/ui/magicui/text-animate";

export function HeroSectiion() {
    const { resolvedTheme, setTheme } = useTheme();
    const [color, setColor] = useState("#000000"); // TRUE Default color (Light Mode)

    useEffect(() => {
        // Function to determine the correct color
        const calculateColor = () => {
            if (resolvedTheme === "dark") {
                return "#ffffff";
            } else {
                return "#000000";
            }
        };

        // Check if resolvedTheme is available AND if we are on the client
        if (typeof window !== 'undefined') {
            if (resolvedTheme) {
                const newColor = calculateColor(); // Use the function
                setColor(newColor);
            } else {
                // Set a default theme AND initial color (important!)
                setTheme("light"); // or "dark" - your PREFERRED default

                // Set the initial color based on the DEFAULT theme you chose
                setColor("#000000"); // Corresponding color for Light Mode DEFAULT
            }
        }
    }, [resolvedTheme, setTheme]);

    return (
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border  bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <span className="pointer-events-none z-10 whitespace-pre-wrap text-center text-8xl font-semibold leading-none">
                <img src="/logo-removebg.png" alt="logo" />
                {/* <TextAnimate animation="blurInUp" by="character" once>
                    Maristan
                </TextAnimate> */}

            </span>
            <Particles
                className="absolute inset-0 z-0"
                quantity={100}
                ease={80}
                color={color}
                refresh
            />
        </div>
    );
}
