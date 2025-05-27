"use client";

import { useState, useEffect, useRef } from "react";
import { useTypingStore } from "@/store/typingStore";
import { cn } from "@/src/lib/utils";
import { gsap } from "gsap";
import { saveTypingResult } from "@/src/lib/actions/typing";

export function TypingArea() {
    const [input, setInput] = useState("");
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const {
        words,
        currentWordIndex,
        setCurrentWordIndex,
        correctChars,
        setCorrectChars,
        incorrectChars,
        setIncorrectChars,
        setWpm,
        setAccuracy,
        setIsCompleted,
        isCompleted,
    } = useTypingStore();

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (!isCompleted && currentWordIndex === words.length) {
            setIsCompleted(true);
            const end = Date.now();
            setEndTime(end);
            calculateResults(startTime!, end);
        }
    }, [currentWordIndex, words.length, isCompleted, startTime]);

    const calculateResults = (start: number, end: number) => {
        const minutes = (end - start) / 60000;
        const wordsTyped = currentWordIndex;
        const wpm = Math.round(wordsTyped / minutes);
        const accuracy = Math.round(
            (correctChars / (correctChars + incorrectChars)) * 100
        );

        setWpm(wpm);
        setAccuracy(accuracy);

        saveTypingResult({
            wpm,
            accuracy,
            correctChars,
            incorrectChars,
            duration: minutes,
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (!startTime) {
            setStartTime(Date.now());
        }

        if (value.endsWith(" ")) {
            const currentWord = words[currentWordIndex];
            const typedWord = value.trim();

            if (typedWord === currentWord) {
                setCorrectChars(correctChars + typedWord.length);
            } else {
                setIncorrectChars(
                    incorrectChars + Math.max(typedWord.length, currentWord.length)
                );
            }

            setCurrentWordIndex(currentWordIndex + 1);
            setInput("");
        } else {
            setInput(value);
        }
    };

    const handleRestart = () => {
        setInput("");
        setCurrentWordIndex(0);
        setCorrectChars(0);
        setIncorrectChars(0);
        setWpm(0);
        setAccuracy(0);
        setIsCompleted(false);
        setStartTime(null);
        setEndTime(null);

        gsap.fromTo(
            inputRef.current,
            { scale: 1.1 },
            { scale: 1, duration: 0.5 }
        );
    };

    return (
        <div className="space-y-4">
            <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                disabled={isCompleted}
                className={cn(
                    "w-full p-4 text-lg border rounded-lg focus:outline-none focus:ring-2",
                    isCompleted ? "bg-gray-950" : "bg-gray-900 text-white",
                )}
                placeholder={isCompleted ? "Test terminé" : "Commencez à taper..."}
            />
            {isCompleted && (
                <button
                    onClick={handleRestart}
                    className="w-full p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                    Recommencer
                </button>
            )}
        </div>
    );
}