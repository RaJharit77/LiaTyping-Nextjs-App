"use client";

import { useTypingStore } from "@/store/typingStore";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function Words() {
    const { words, currentWordIndex, typedChars, isCompleted } = useTypingStore();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            gsap.from(containerRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.5,
            });
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className="p-6 bg-black rounded-xl border border-gray-100 shadow-lg"
        >
            <div className="flex flex-wrap gap-2 justify-center">
                {words.map((word, wordIndex) => (
                    <div 
                        key={wordIndex}
                        className={cn(
                            "text-lg",
                            wordIndex < currentWordIndex ? "text-green-400" :
                            wordIndex === currentWordIndex ? "text-blue-400" :
                            "text-gray-500",
                            isCompleted && wordIndex >= currentWordIndex ? "text-gray-600" : ""
                        )}
                    >
                        {word.split("").map((char, charIndex) => {
                            const typedChar = typedChars[wordIndex]?.[charIndex];
                            const isCurrent = wordIndex === currentWordIndex;
                            const isTyped = typedChar !== undefined;
                            const isCorrect = typedChar?.correct;

                            return (
                                <span
                                    key={charIndex}
                                    className={cn(
                                        isCurrent && isTyped && "underline",
                                        isTyped && (isCorrect ? "text-green-400" : "text-red-400"),
                                        !isTyped && isCurrent && "text-blue-400"
                                    )}
                                >
                                    {char}
                                </span>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}