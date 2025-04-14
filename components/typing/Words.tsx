"use client";

import { useTypingStore } from "@/store/typingStore";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function Words() {
    const { words, currentWordIndex, isCompleted } = useTypingStore();
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
            className="p-6 bg-card rounded-lg shadow-md border"
        >
            <h2 className="text-xl font-semibold mb-4">Texte à taper</h2>
            <div className="flex flex-wrap gap-2">
                {words.map((word, index) => (
                    <span
                        key={index}
                        className={cn(
                            "text-lg",
                            index < currentWordIndex
                                ? "text-green-500"
                                : index === currentWordIndex
                                    ? "text-blue-500 underline"
                                    : "text-muted-foreground",
                            isCompleted && index >= currentWordIndex
                                ? "text-gray-400"
                                : ""
                        )}
                    >
                        {word}
                    </span>
                ))}
            </div>
        </div>
    );
}