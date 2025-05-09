"use client";

import { TypingGame } from "@/components/typing/TypingGame";
import { useTypingGameStore } from "@/store/typingGameStore";
import { useEffect } from "react";
import { generateRandomWords } from "@/lib/wordsGenerator";

export default function ZenModePage() {
    const { setWords, setMode } = useTypingGameStore();

    useEffect(() => {
        setMode('zen');
        setWords(generateRandomWords(200));
    }, [setWords, setMode]);

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <TypingGame
                title="Mode Zen"
                description="Tapez sans pression, aucun score ne sera enregistré"
                showStats={false}
            />
        </div>
    );
}