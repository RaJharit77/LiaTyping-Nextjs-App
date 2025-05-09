"use client";

import { useTypingGameStore } from "@/store/typingGameStore";
import { cn } from "@/src/lib/utils";
import { useState, useEffect } from "react";

export function WordsDisplay() {
    const { words, currentWordIndex, typedChars, isCompleted, mode } = useTypingGameStore();
    const [showAllWords, setShowAllWords] = useState(false);

    useEffect(() => {
        setShowAllWords(false);
    }, [currentWordIndex]);

    const displayWords = mode === 'zen' && !showAllWords 
        ? words.slice(currentWordIndex, currentWordIndex + 5)
        : words;

    return (
        <div className="p-6 bg-card rounded-lg shadow-md border">
            <div className="flex flex-wrap gap-2">
                {displayWords.map((word, wordIndex) => {
                    const absoluteIndex = mode === 'zen' && !showAllWords 
                        ? currentWordIndex + wordIndex 
                        : wordIndex;
                    
                    return (
                        <div
                            key={absoluteIndex}
                            className={cn(
                                "text-lg",
                                absoluteIndex < currentWordIndex ? "text-green-500" :
                                absoluteIndex === currentWordIndex ? "text-blue-500" :
                                "text-muted-foreground",
                                isCompleted && absoluteIndex >= currentWordIndex ? "text-gray-400" : ""
                            )}
                        >
                            {word.split("").map((char, charIndex) => {
                                const typedChar = typedChars[absoluteIndex]?.[charIndex];
                                const isCurrent = absoluteIndex === currentWordIndex;
                                const isTyped = typedChar !== undefined;
                                const isCorrect = typedChar === char;
                                return (
                                    <span
                                        key={charIndex}
                                        className={cn(
                                            isCurrent && isTyped && "underline",
                                            isTyped && (isCorrect ? "text-green-500" : "text-red-500"),
                                            !isTyped && isCurrent && "text-blue-500"
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

            {mode === 'zen' && !showAllWords && words.length > 5 && (
                <button
                    onClick={() => setShowAllWords(true)}
                    className="mt-4 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                    Voir plus de mots ({words.length - 5} restants)
                </button>
            )}
        </div>
    );
}