"use client";

import { useEffect, useState, useRef } from "react";

interface BlinkingTextProps {
    text: string;
    className?: string;
    /** How many characters to scramble during a glitch (0-1 represents percentage) */
    scrambleIntensity?: number;
    /** Minimum time between glitches in ms */
    minInterval?: number;
    /** Maximum time between glitches in ms */
    maxInterval?: number;
    /** Force animation even if user prefers reduced motion */
    forceAnimation?: boolean;
}

// ASCII-only glitch characters (consistent width in monospace fonts)
const GLITCH_CHARS = "!@#$%^&*()-_=+[]{}|;:',.<>?/`~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function getRandomChar(): string {
    return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

export function BlinkingText({
    text,
    className = "",
    scrambleIntensity = 0.05,
    minInterval = 800,
    maxInterval = 3000,
    forceAnimation = false,
}: BlinkingTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isMounted, setIsMounted] = useState(false);
    const animationRef = useRef<{ cancel: boolean }>({ cancel: false });

    // Ensure we're on the client
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Update display text when prop changes
    useEffect(() => {
        setDisplayText(text);
    }, [text]);

    // Main glitch effect
    useEffect(() => {
        if (!isMounted) return;

        // Check for reduced motion preference (skip if forceAnimation is true)
        if (!forceAnimation && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        const controller = { cancel: false };
        animationRef.current = controller;

        const chars = text.split("");
        const scrambleableIndices = chars
            .map((char, idx) => (char !== " " ? idx : -1))
            .filter((idx): idx is number => idx !== -1);

        if (scrambleableIndices.length === 0) return;

        const numToScramble = Math.max(1, Math.floor(scrambleableIndices.length * scrambleIntensity));

        const runGlitchCycle = async () => {
            while (!controller.cancel) {
                // Wait for random interval before next glitch
                const waitTime = minInterval + Math.random() * (maxInterval - minInterval);
                await new Promise(resolve => setTimeout(resolve, waitTime));

                if (controller.cancel) break;

                // Pick random characters to glitch
                const shuffled = [...scrambleableIndices].sort(() => Math.random() - 0.5);
                const indicesToGlitch = new Set(shuffled.slice(0, numToScramble));

                // Glitch burst: 3-10 rapid changes
                const burstCount = 3 + Math.floor(Math.random() * 7);

                for (let i = 0; i < burstCount && !controller.cancel; i++) {
                    const newChars = [...chars];
                    indicesToGlitch.forEach(idx => {
                        newChars[idx] = getRandomChar();
                    });
                    setDisplayText(newChars.join(""));
                    await new Promise(resolve => setTimeout(resolve, 30));
                }

                // Restore original text
                if (!controller.cancel) {
                    setDisplayText(text);
                }
            }
        };

        runGlitchCycle();

        return () => {
            controller.cancel = true;
        };
    }, [isMounted, text, scrambleIntensity, minInterval, maxInterval, forceAnimation]);

    return (
        <p className={className}>
            {/* Screen reader accessible text (hidden visually) */}
            <span className="sr-only">{text}</span>

            {/* Visual glitch text (hidden from screen readers) */}
            <span aria-hidden="true">
                {displayText.split("").map((char, index) => (
                    <span
                        key={index}
                        style={{
                            display: "inline-block",
                            minWidth: char === " " ? "0.25em" : undefined,
                        }}
                    >
                        {char}
                    </span>
                ))}
            </span>
        </p>
    );
}



