"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export function TypingChart({ results }: { results: any[] }) {
    return (
        <div className="bg-card p-6 rounded-lg border shadow-sm h-80">
            <h2 className="text-xl font-semibold mb-4">Progression</h2>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={results}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="createdAt" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="wpm"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="accuracy" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}