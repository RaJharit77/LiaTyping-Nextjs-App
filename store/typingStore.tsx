import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CharState {
    char: string;
    correct: boolean;
}

interface TypingState {
    words: string[];
    currentWordIndex: number;
    typedChars: CharState[][];
    correctChars: number;
    incorrectChars: number;
    wpm: number;
    accuracy: number;
    isCompleted: boolean;
    startTime: number | null;
    endTime: number | null;
    setWords: (words: string[]) => void;
    setTypedChars: (chars: CharState[][]) => void;
    setCurrentWordIndex: (index: number) => void;
    setCorrectChars: (count: number) => void;
    setIncorrectChars: (count: number) => void;
    setWpm: (wpm: number) => void;
    setAccuracy: (accuracy: number) => void;
    setIsCompleted: (completed: boolean) => void;
    setStartTime: (time: number | null) => void;
    setEndTime: (time: number | null) => void;
    reset: () => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    isInitialized: boolean;
    initialize: () => Promise<void>;
}

export const useTypingStore = create<TypingState>()(
    persist(
        (set) => ({
            words: [],
            currentWordIndex: 0,
            typedChars: [],
            correctChars: 0,
            incorrectChars: 0,
            wpm: 0,
            accuracy: 0,
            isCompleted: false,
            startTime: null,
            endTime: null,
            isLoading: true,
            isInitialized: false,
            setIsLoading: (isLoading) => set({ isLoading }),
            initialize: async () => {
                set({ isLoading: true });
                await new Promise(resolve => setTimeout(resolve, 300));
                set({ 
                    words: [
                        "Le", "rapide", "renard", "brun", "saute", "par-dessus",
                        "le", "chien", "paresseux", "Les", "cinq", "boxeurs"
                    ],
                    isInitialized: true,
                    isLoading: false,
                });
            },
            setWords: (words) => set({ words }),
            setTypedChars: (typedChars) => set({ typedChars }),
            setCurrentWordIndex: (index) => set({ currentWordIndex: index }),
            setCorrectChars: (count) => set({ correctChars: count }),
            setIncorrectChars: (count) => set({ incorrectChars: count }),
            setWpm: (wpm) => set({ wpm }),
            setAccuracy: (accuracy) => set({ accuracy }),
            setIsCompleted: (completed) => set({ isCompleted: completed }),
            setStartTime: (time) => set({ startTime: time }),
            setEndTime: (time) => set({ endTime: time }),
            reset: () => set({
                currentWordIndex: 0,
                typedChars: [],
                correctChars: 0,
                incorrectChars: 0,
                wpm: 0,
                accuracy: 0,
                isCompleted: false,
                startTime: null,
                endTime: null,
                isLoading: true,
                isInitialized: false,
            }),
        }),
        {
            name: "typing-storage",
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({ 
                words: state.words,
                isInitialized: state.isInitialized,
            }),
        }
    )
);