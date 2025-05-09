"use client";

import { useTypingGameStore } from "@/store/typingGameStore";
import { Button } from "../ui/button";

export function TimeSelector() {
    const { timeLimit, setTimeLimit, availableTimeLimits, isCompleted } = useTypingGameStore();

    if (isCompleted) return null;

    return (
        <div className="flex flex-wrap gap-2 justify-center mb-4">
            {availableTimeLimits.map((time) => (
                <Button
                    key={time}
                    variant={timeLimit === time ? "default" : "outline"}
                    onClick={() => setTimeLimit(time)}
                >
                    {time} secondes
                </Button>
            ))}
        </div>
    );
}