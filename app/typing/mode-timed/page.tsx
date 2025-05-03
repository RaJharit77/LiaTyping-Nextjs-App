"use client";

import { TypingGame } from "@/components/typing/TypingGame";
import { useTypingGameStore } from "@/store/typingGameStore";
import { useEffect } from "react";
import { generateRandomWords } from "@/lib/wordsGenerator";

export default function TimedModePage() {
    const { setWords, setMode, setTimeLimit } = useTypingGameStore();

    useEffect(() => {
        setMode('timed');
        setTimeLimit(60); 
        setWords(generateRandomWords(100)); 
    }, [setWords, setMode, setTimeLimit]);

    return (
        <div className="container mx-auto px-4 py-8">
            <TypingGame
                title="Mode Temps Limité (1 minute)"
                description="Tapez autant de mots que possible en 1 minute"
                showTimer={true}
            />
        </div>
    );
}