"use server";

import { z } from "zod";
import { db } from"@/src/lib/db";
import { getAuthSession } from "@/src/lib/auth";
import { revalidatePath } from "next/cache";

const resultSchema = z.object({
    wpm: z.number().min(0),
    accuracy: z.number().min(0).max(100),
    correctChars: z.number().min(0),
    incorrectChars: z.number().min(0),
    duration: z.number().min(0),
});

export async function saveTypingResult(data: z.infer<typeof resultSchema>) {
    try {
        const session = await getAuthSession();
        if (!session?.user?.id) return;

        const validatedData = resultSchema.parse(data);

        await db.typingResult.create({
            data: {
                userId: session.user.id,
                wpm: validatedData.wpm,
                accuracy: validatedData.accuracy,
                correctChars: validatedData.correctChars,
                incorrectChars: validatedData.incorrectChars,
                duration: validatedData.duration,
            },
        });

        revalidatePath("/dashboard");
    } catch (error) {
        console.error("Error saving typing result:", error);
        throw new Error("Failed to save typing result");
    }
}

export async function getRecentResults(userId: string) {
    try {
        return await db.typingResult.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            take: 10,
        });
    } catch (error) {
        console.error("Error fetching typing results:", error);
        throw new Error("Failed to fetch typing results");
    }
}