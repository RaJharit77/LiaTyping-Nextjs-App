import { create } from "zustand";

interface TypingGameState {
    words: string[];
    currentWordIndex: number;
    typedChars: string[][];
    correctChars: number;
    incorrectChars: number;
    wpm: number;
    accuracy: number;
    isCompleted: boolean;
    startTime: number | null;
    endTime: number | null;
    mode: 'classic' | 'timed' | 'zen';
    timeLimit: number | null;
    availableTimeLimits: number[];

    setWords: (words: string[]) => void;
    setTypedChars: (chars: string[][]) => void;
    setCurrentWordIndex: (index: number) => void;
    setCorrectChars: (count: number) => void;
    setIncorrectChars: (count: number) => void;
    setWpm: (wpm: number) => void;
    setAccuracy: (accuracy: number) => void;
    setIsCompleted: (completed: boolean) => void;
    setStartTime: (time: number | null) => void;
    setEndTime: (time: number | null) => void;
    setMode: (mode: 'classic' | 'timed' | 'zen') => void;
    setTimeLimit: (limit: number | null) => void;
    reset: () => void;
}

export const useTypingGameStore = create<TypingGameState>((set) => ({
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
    mode: 'classic',
    timeLimit: null,
    availableTimeLimits: [30, 60, 120, 180],

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
    setMode: (mode) => set({ mode, timeLimit: mode === 'timed' ? 60 : null }),
    setTimeLimit: (limit) => set({ timeLimit: limit }),
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
        timeLimit: null
    }),
}));