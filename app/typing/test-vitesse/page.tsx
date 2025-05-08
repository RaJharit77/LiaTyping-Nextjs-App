"use client";

import { TypingArea } from "@/components/typing/TypingArea";
import { Words } from "@/components/typing/Words";
import { TypingStats } from "@/components/typing/TypingStats";
import { Results } from "@/components/typing/Results";
import { Suspense, useState, useEffect } from "react";
import Loading from "@/components/common/Loading";
import { useTypingStore } from "@/store/typingStore";

export default function TypingPage() {
    const { initialize, reset, isInitialized, isLoading } = useTypingStore();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const init = async () => {
            await reset();
            await initialize();
        };
        init();
    }, [initialize, reset]);

    if (!isClient || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <Loading />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-black text-white">
            <div className="container mx-auto px-4 py-4 flex-1 flex flex-col items-center justify-center max-w-5xl">
                <section className="w-full space-y-7">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold">Test de vitesse</h1>
                        <p className="text-muted-foreground mt-7">
                            Tapez les mots qui apparaissent aussi vite que possible
                        </p>
                    </div>

                    <TypingStats />

                    <div className="grid grid-cols-1 gap-7 w-full">
                        <Words />
                        <TypingArea />
                    </div>

                    <Results />
                </section>
            </div>
        </div>
    );
}