"use client";

import { TypingArea } from "@/components/typing/TypingArea";
import { Words } from "@/components/typing/Words";
import { TypingStats } from "@/components/typing/TypingStats";
import { Results } from "@/components/typing/Results";
import { Suspense } from "react";
import Loading from "@/components/common/Loading";

export default function TypingPage() {
    return (
        <section className="space-y-8">
            <h1 className="text-4xl font-bold text-center">Test de vitesse</h1>
            <p className="text-center text-muted-foreground">
                Tapez les mots qui apparaissent aussi vite que possible
            </p>

            <Suspense fallback={<Loading />}>
                <TypingStats />
            </Suspense>

            <div className="grid gap-8 md:grid-cols-2">
                <Words />
                <TypingArea />
            </div>

            <Results />
        </section>
    );
}