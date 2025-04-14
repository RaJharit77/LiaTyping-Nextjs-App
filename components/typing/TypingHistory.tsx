"use client";

export function TypingHistory({ results }: { results: any[] }) {
    return (
        <div className="bg-card p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Historique</h2>
            <div className="space-y-4">
                {results.map((result, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                        <div className="flex justify-between">
                            <span className="font-medium">{result.wpm} MPM</span>
                            <span className="text-muted-foreground">
                                {new Date(result.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                            <span>Précision: {result.accuracy}%</span>
                            <span>Correct: {result.correctChars}</span>
                            <span>Erreurs: {result.incorrectChars}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}