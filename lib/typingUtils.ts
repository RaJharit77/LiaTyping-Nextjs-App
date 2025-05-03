export function calculateWPM(wordsTyped: number, minutes: number): number {
    return Math.round(wordsTyped / minutes);
}

export function calculateAccuracy(correctChars: number, incorrectChars: number): number {
    const total = correctChars + incorrectChars;
    return total > 0 ? Math.round((correctChars / total) * 100) : 0;
}