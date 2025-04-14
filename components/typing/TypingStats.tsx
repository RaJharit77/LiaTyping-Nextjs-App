"use client";

import { useTypingStore } from "@/store/typingStore";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function TypingStats() {
    const { wpm, accuracy, correctChars, incorrectChars, isCompleted } =
        useTypingStore();
    const { data: session } = useSession();
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (statsRef.current) {
            gsap.from(statsRef.current.children, {
                opacity: 0,
                y: 20,
                stagger: 0.1,
                duration: 0.5,
            });
        }
    }, []);

    return (
        <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
            <div className="bg-card p-4 rounded-lg border shadow-sm">
                <h3 className="text-sm font-medium text-muted-foreground">Mots/min</h3>
                <p className="text-2xl font-bold">{wpm}</p>
            </div>
            <div className="bg-card p-4 rounded-lg border shadow-sm">
                <h3 className="text-sm font-medium text-muted-foreground">Précision</h3>
                <p className="text-2xl font-bold">{accuracy}%</p>
            </div>
            <div className="bg-card p-4 rounded-lg border shadow-sm">
                <h3 className="text-sm font-medium text-muted-foreground">Correct</h3>
                <p className="text-2xl font-bold">{correctChars}</p>
            </div>
            <div className="bg-card p-4 rounded-lg border shadow-sm">
                <h3 className="text-sm font-medium text-muted-foreground">Erreurs</h3>
                <p className="text-2xl font-bold">{incorrectChars}</p>
            </div>
        </div>
    );
}