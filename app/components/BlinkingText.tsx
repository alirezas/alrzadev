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
}: BlinkingTextProps) {
    const [displayChars, setDisplayChars] = useState<string[]>(() => text.split(""));
    const [glitchingIndices, setGlitchingIndices] = useState<Set<number>>(new Set());
    const [isClient, setIsClient] = useState(false);
    const originalChars = useRef<string[]>(text.split(""));
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Update original chars when text changes
    useEffect(() => {
        originalChars.current = text.split("");
        setDisplayChars(text.split(""));
    }, [text]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Random glitch burst effect
    useEffect(() => {
        if (!isClient) return;

        const chars = originalChars.current;

        // Get scrambleable indices (skip spaces)
        const scrambleableIndices = chars
            .map((char, idx) => (char !== " " ? idx : -1))
            .filter(idx => idx !== -1);

        if (scrambleableIndices.length === 0) return;

        const numToScramble = Math.max(1, Math.floor(scrambleableIndices.length * scrambleIntensity));

        const triggerGlitch = () => {
            // Pick random indices for this glitch burst
            const shuffled = [...scrambleableIndices].sort(() => Math.random() - 0.5);
            const indicesToGlitch = new Set(shuffled.slice(0, numToScramble));

            setGlitchingIndices(indicesToGlitch);

            // Glitch duration: very fast burst (100-300ms)
            const glitchDuration = 100 + Math.random() * 200;

            // Number of character rotations during the glitch
            const rotations = Math.floor(glitchDuration / 30);
            let rotationCount = 0;

            // Fast character rotation during glitch
            const rotationInterval = setInterval(() => {
                rotationCount++;

                setDisplayChars(prev => {
                    const newChars = [...prev];
                    indicesToGlitch.forEach(idx => {
                        newChars[idx] = getRandomChar();
                    });
                    return newChars;
                });

                if (rotationCount >= rotations) {
                    clearInterval(rotationInterval);

                    // Restore original characters
                    setDisplayChars([...chars]);
                    setGlitchingIndices(new Set());

                    // Schedule next glitch at random interval
                    const nextDelay = minInterval + Math.random() * (maxInterval - minInterval);
                    timeoutRef.current = setTimeout(triggerGlitch, nextDelay);
                }
            }, 30);
        };

        // Start first glitch after a random delay
        const initialDelay = Math.random() * 1000;
        timeoutRef.current = setTimeout(triggerGlitch, initialDelay);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [isClient, scrambleIntensity, minInterval, maxInterval]);

    return (
        <p className={className}>
            {displayChars.map((char, index) => {
                const isGlitching = glitchingIndices.has(index);

                return (
                    <span
                        key={index}
                        style={{
                            display: "inline-block",
                            minWidth: char === " " ? "0.25em" : undefined,
                        }}
                    >
                        {char}
                    </span>
                );
            })}
        </p>
    );
}
