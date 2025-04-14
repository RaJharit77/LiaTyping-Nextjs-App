"use client";

import { useTypingStore } from "@/store/typingStore";
import { Button } from "../ui/button";
import { saveTypingResult } from "@/lib/actions/typing";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export function Results() {
    const { wpm, accuracy, isCompleted, correctChars, incorrectChars } = useTypingStore();
    const { data: session } = useSession();

    useEffect(() => {
        if (isCompleted && session?.user?.id) {
            saveTypingResult({
                wpm,
                accuracy,
                correctChars,
                incorrectChars,
                duration: 1
            });
        }
    }, [isCompleted, wpm, accuracy, correctChars, incorrectChars, session]);

    if (!isCompleted) return null;

    return (
        <div className="bg-card p-6 rounded-lg border shadow-sm space-y-4">
            <h2 className="text-2xl font-bold">Résultats</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-muted-foreground">Mots par minute</p>
                    <p className="text-3xl font-bold">{wpm}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Précision</p>
                    <p className="text-3xl font-bold">{accuracy}%</p>
                </div>
            </div>
            <Button className="w-full" onClick={() => window.location.reload()}>
                Recommencer
            </Button>
        </div>
    );
}