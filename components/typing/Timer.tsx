"use client";

import { useEffect, useState } from "react";
import { useTypingGameStore } from "@/store/typingGameStore";

export function Timer() {
    const { timeLimit, isCompleted, setIsCompleted, startTime } = useTypingGameStore();
    const [timeLeft, setTimeLeft] = useState(timeLimit);

    useEffect(() => {
        setTimeLeft(timeLimit);
    }, [timeLimit]);

    useEffect(() => {
        if (!timeLimit || isCompleted || !startTime) return;

        const interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const remaining = Math.max(0, (timeLimit || 0) - elapsed);

            setTimeLeft(remaining);

            if (remaining <= 0) {
                setIsCompleted(true);
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLimit, isCompleted, setIsCompleted, startTime]);

    if (!timeLimit) return null;

    return (
        <div className="text-center mb-4">
            <div className="text-4xl font-bold">
                {Math.floor((timeLeft ?? 0) / 60)}:{((timeLeft ?? 0) % 60).toString().padStart(2, '0')}
            </div>
            <p className="text-muted-foreground">Temps restant</p>
        </div>
    );
}