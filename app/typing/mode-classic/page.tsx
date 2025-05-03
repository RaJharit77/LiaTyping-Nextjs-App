"use client";

import { TypingGame } from "@/components/typing/TypingGame";
import { useTypingGameStore } from "@/store/typingGameStore";
import { useEffect } from "react";
import { generateRandomWords } from "@/lib/wordsGenerator";

export default function ClassicModePage() {
    const { setWords, setMode } = useTypingGameStore();

    useEffect(() => {
        setMode('classic');
        setWords(generateRandomWords(50));
    }, [setWords, setMode]);

    return (
        <div className="container mx-auto px-4 py-8">
            <TypingGame
                title="Mode Classique"
                description="Tapez le texte jusqu'à la fin sans limite de temps"
            />
        </div>
    );
}