"use client";

import { useState, useEffect, useRef } from "react";
import { useTypingStore } from "@/store/typingStore";
import { cn } from "@/src/lib/utils";
import { gsap } from "gsap";
import { saveTypingResult } from "@/src/lib/actions/typing";

export function TypingArea() {
    const [input, setInput] = useState("");
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
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        typedChars,
        setTypedChars,
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
        const currentWord = words[currentWordIndex];

        if (!startTime) {
            setStartTime(Date.now());
        }

        // Mise à jour en temps réel des caractères tapés
        const newTypedChars = [...typedChars];
        if (!newTypedChars[currentWordIndex]) {
            newTypedChars[currentWordIndex] = [];
        }

        // Vérification caractère par caractère
        for (let i = 0; i < value.length; i++) {
            const isCorrect = currentWord[i] === value[i];
            newTypedChars[currentWordIndex][i] = {
                char: value[i],
                correct: isCorrect
            };
        }

        setTypedChars(newTypedChars);

        if (value.endsWith(" ")) {
            // Vérification du mot complet
            const typedWord = value.trim();
            let wordCorrectChars = 0;
            let wordIncorrectChars = 0;

            for (let i = 0; i < Math.max(typedWord.length, currentWord.length); i++) {
                if (i < typedWord.length && i < currentWord.length && typedWord[i] === currentWord[i]) {
                    wordCorrectChars++;
                } else {
                    wordIncorrectChars++;
                }
            }

            setCorrectChars(correctChars + wordCorrectChars);
            setIncorrectChars(incorrectChars + wordIncorrectChars);
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
        setTypedChars([]);

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