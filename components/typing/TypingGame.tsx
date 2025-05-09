"use client";

import { TypingArea } from "./TypingArea";
import { WordsDisplay } from "./WordsDisplay";
import { TypingStats } from "./TypingStats";
import { Results } from "./Results";
import { Timer } from "./Timer";
import { TimeSelector } from "./TimeSelector";
import { useTypingGameStore } from "@/store/typingGameStore";
import { useEffect } from "react";
import { cn } from "@/src/lib/utils";

interface TypingGameProps {
    title: string;
    description: string;
    showStats?: boolean;
    showTimer?: boolean;
    showTimeSelector?: boolean;
}

export function TypingGame({
    title,
    description,
    showStats = true,
    showTimer = false,
    showTimeSelector = false
}: TypingGameProps) {
    const { isCompleted, reset, mode } = useTypingGameStore();

    useEffect(() => {
        return () => reset();
    }, [reset]);

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center">
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
            </div>

            {showTimeSelector && <TimeSelector />}
            {showTimer && <Timer />}
            {showStats && <TypingStats />}

            <div className="flex flex-col gap-6">
                <div className={cn(
                    "bg-card p-6 rounded-lg border shadow-sm",
                    mode === 'zen' ? "min-h-[150px]" : ""
                )}>
                    <WordsDisplay />
                </div>

                <div className="bg-card p-6 rounded-lg border shadow-sm">
                    <TypingArea />
                </div>
            </div>

            {isCompleted && mode !== 'zen' && <Results />}
        </div>
    );
}