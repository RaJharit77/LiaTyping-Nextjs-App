"use client";

import { useTypingStore } from "@/store/typingStore";
import { cn } from "@/src/lib/utils";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Loading from "@/components/common/Loading";

export function Words() {
    const { words, currentWordIndex, typedChars, isCompleted, isInitialized, isLoading } = useTypingStore();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && containerRef.current && isInitialized) {
            gsap.from(containerRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.7,
            });
        }
    }, [isMounted, isInitialized]);

    if (!isMounted || isLoading || !isInitialized) {
        return (
            <div className="p-6 bg-black rounded-xl border border-gray-100 shadow-lg min-h-[200px] flex items-center justify-center">
                <Loading />
            </div>
        );
    }

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