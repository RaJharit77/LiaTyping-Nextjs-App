"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";
import AuthError  from "next-auth";

const registerSchema = z.object({
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
});

const loginSchema = z.object({
    email: z.string().email("Email invalide"),
    password: z.string().min(1, "Le mot de passe est requis"),
});

export async function registerUser(data: z.infer<typeof registerSchema>) {
    try {
        const validatedData = registerSchema.parse(data);

        const existingUser = await db.user.findUnique({
            where: { email: validatedData.email },
        });

        if (existingUser) {
            throw new Error("Un utilisateur avec cet email existe déjà");
        }

        const hashedPassword = await bcrypt.hash(validatedData.password, 10);

        await db.user.create({
            data: {
                email: validatedData.email,
                password: hashedPassword,
                name: validatedData.name,
            },
        });

        return { success: true };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, error: error.errors };
        }
        return {
            success: false,
            error: error instanceof Error ? error.message : "Une erreur inconnue est survenue"
        };
    }
}

export async function loginUser(
    data: z.infer<typeof loginSchema>,
    redirectTo?: string
) {
    try {
        const validatedData = loginSchema.parse(data);

        await signIn("credentials", {
            email: validatedData.email,
            password: validatedData.password,
            redirectTo: redirectTo || "/dashboard",
        });

        return { success: true };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, error: error.errors };
        }

        if (error instanceof AuthError) {
            return {
                success: false,
                error: "Identifiants invalides"
            };
        }

        return {
            success: false,
            error: error instanceof Error ? error.message : "Une erreur inconnue est survenue"
        };
    }
}

export async function logoutUser() {
    await signOut({ callbackUrl: "/login" });
}