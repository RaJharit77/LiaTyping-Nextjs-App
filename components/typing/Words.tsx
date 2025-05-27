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
                {words.map((word, wordIndex) => {
                    const currentTypedWord = typedChars[wordIndex] || [];
                    const hasError = currentTypedWord.some((char, idx) => 
                        idx < word.length && (!char || !char.correct)
                    );
                    const isWordFullyTyped = currentTypedWord.length >= word.length;
                    const isWordCorrect = isWordFullyTyped && !hasError;

                    return (
                        <div 
                            key={wordIndex}
                            className={cn(
                                "text-lg relative pb-1",
                                {
                                    'text-green-400': wordIndex < currentWordIndex || isWordCorrect,
                                    'text-blue-400': wordIndex === currentWordIndex && !hasError && !isWordFullyTyped,
                                    'text-red-400': wordIndex === currentWordIndex && hasError,
                                    'text-gray-500': wordIndex > currentWordIndex,
                                    'border-b-2 border-red-500': wordIndex === currentWordIndex && hasError,
                                }
                            )}
                        >
                            {word.split("").map((char, charIndex) => {
                                const typedChar = currentTypedWord[charIndex];
                                const isCurrentWord = wordIndex === currentWordIndex;
                                const isCharTyped = typedChar !== undefined;
                                const isCharCorrect = typedChar?.correct;

                                let charColor = '';
                                if (wordIndex < currentWordIndex || isWordCorrect) {
                                    charColor = 'text-green-400';
                                } else if (isCurrentWord) {
                                    charColor = isCharTyped 
                                        ? (isCharCorrect ? 'text-green-400' : 'text-red-400') 
                                        : 'text-blue-400';
                                } else {
                                    charColor = 'text-gray-500';
                                }

                                return (
                                    <span
                                        key={charIndex}
                                        className={cn(
                                            {
                                                'underline': isCurrentWord && isCharTyped,
                                            },
                                            charColor
                                        )}
                                    >
                                        {char}
                                    </span>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}