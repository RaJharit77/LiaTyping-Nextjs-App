"use client";

import { useTypingStore } from "@/store/typingStore";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Loading from "@/components/common/Loading";

export function TypingStats() {
    const { wpm, accuracy, correctChars, incorrectChars, isCompleted, isInitialized } =
        useTypingStore();
    const { data: session } = useSession();
    const statsRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && statsRef.current && isInitialized) {
            gsap.from(statsRef.current.children, {
                opacity: 0,
                y: 20,
                stagger: 0.1,
                duration: 0.5,
            });
        }
    }, [isMounted, isInitialized]);

    if (!isMounted || !isInitialized) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-card p-4 rounded-lg border shadow-sm h-[84px] flex items-center justify-center">
                        <Loading />
                    </div>
                ))}
            </div>
        );
    }

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