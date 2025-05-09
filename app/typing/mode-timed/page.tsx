"use client";

import { TypingGame } from "@/components/typing/TypingGame";
import { useTypingGameStore } from "@/store/typingGameStore";
import { useEffect } from "react";
import { generateRandomWords } from "@/src/lib/wordsGenerator";

export default function TimedModePage() {
    const { setWords, setMode, setTimeLimit } = useTypingGameStore();

    useEffect(() => {
        setMode('timed');
        setTimeLimit(60); // Valeur par défaut
        setWords(generateRandomWords(100));
    }, [setWords, setMode, setTimeLimit]);

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <TypingGame
                title="Mode Temps Limité"
                description="Tapez autant de mots que possible dans le temps imparti"
                showTimer={true}
                showTimeSelector={true}
            />
        </div>
    );
}