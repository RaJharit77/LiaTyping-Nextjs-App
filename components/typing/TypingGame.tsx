"use client";

import { TypingArea } from "./TypingArea";
import { WordsDisplay } from "./WordsDisplay";
import { TypingStats } from "./TypingStats";
import { Results } from "./Results";
import { Timer } from "./Timer";
import { useTypingGameStore } from "@/store/typingGameStore";
import { useEffect } from "react";

interface TypingGameProps {
    title: string;
    description: string;
    showStats?: boolean;
    showTimer?: boolean;
}

export function TypingGame({
    title,
    description,
    showStats = true,
    showTimer = false
}: TypingGameProps) {
    const { isCompleted, reset, mode } = useTypingGameStore();

    useEffect(() => {
        return () => reset();
    }, [reset]);

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
            </div>

            {showTimer && <Timer />}
            {showStats && <TypingStats />}

            <div className="grid gap-8 md:grid-cols-2">
                <WordsDisplay />
                <TypingArea />
            </div>

            {isCompleted && mode !== 'zen' && <Results />}
        </div>
    );
}