import { create } from "zustand";

interface TypingState {
    words: string[];
    currentWordIndex: number;
    correctChars: number;
    incorrectChars: number;
    wpm: number;
    accuracy: number;
    isCompleted: boolean;
    setWords: (words: string[]) => void;
    setCurrentWordIndex: (index: number) => void;
    setCorrectChars: (count: number) => void;
    setIncorrectChars: (count: number) => void;
    setWpm: (wpm: number) => void;
    setAccuracy: (accuracy: number) => void;
    setIsCompleted: (completed: boolean) => void;
    reset: () => void;
}

export const useTypingStore = create<TypingState>((set) => ({
    words: [
        "Le",
        "rapide",
        "renard",
        "brun",
        "saute",
        "par-dessus",
        "le",
        "chien",
        "paresseux",
        "Les",
        "cinq",
        "boxeurs",
        "jettent",
        "le",
        "défi",
        "avec",
        "vigueur",
        "et",
        "passion",
    ],
    currentWordIndex: 0,
    correctChars: 0,
    incorrectChars: 0,
    wpm: 0,
    accuracy: 0,
    isCompleted: false,
    setWords: (words) => set({ words }),
    setCurrentWordIndex: (index) => set({ currentWordIndex: index }),
    setCorrectChars: (count) => set({ correctChars: count }),
    setIncorrectChars: (count) => set({ incorrectChars: count }),
    setWpm: (wpm) => set({ wpm }),
    setAccuracy: (accuracy) => set({ accuracy }),
    setIsCompleted: (completed) => set({ isCompleted: completed }),
    reset: () =>
        set({
            currentWordIndex: 0,
            correctChars: 0,
            incorrectChars: 0,
            wpm: 0,
            accuracy: 0,
            isCompleted: false,
        }),
}));