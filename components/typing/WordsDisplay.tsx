"use client";

import { useTypingGameStore } from "@/store/typingGameStore";
import { cn } from "@/lib/utils";

export function WordsDisplay() {
    const { words, currentWordIndex, typedChars, isCompleted } = useTypingGameStore();

    return (
        <div className="p-6 bg-card rounded-lg shadow-md border">
            <div className="flex flex-wrap gap-2">
                {words.map((word, wordIndex) => (
                    <div
                        key={wordIndex}
                        className={cn(
                            "text-lg",
                            wordIndex < currentWordIndex ? "text-green-500" :
                                wordIndex === currentWordIndex ? "text-blue-500" :
                                    "text-muted-foreground",
                            isCompleted && wordIndex >= currentWordIndex ? "text-gray-400" : ""
                        )}
                    >
                        {word.split("").map((char, charIndex) => {
                            const typedChar = typedChars[wordIndex]?.[charIndex];
                            const isCurrent = wordIndex === currentWordIndex;
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
                ))}
            </div>
        </div>
    );
}