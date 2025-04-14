"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const registerSchema = z.object({
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
});

// Schéma de validation pour la connexion
const loginSchema = z.object({
    email: z.string().email("Email invalide"),
    password: z.string().min(1, "Le mot de passe est requis"),
});

export async function registerUser(data: z.infer<typeof registerSchema>) {
    try {
        // Validation des données
        const validatedData = registerSchema.parse(data);

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await db.user.findUnique({
            where: { email: validatedData.email },
        });

        if (existingUser) {
            throw new Error("Un utilisateur avec cet email existe déjà");
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(validatedData.password, 10);

        // Créer l'utilisateur
        const user = await db.user.create({
            data: {
                email: validatedData.email,
                password: hashedPassword,
                name: validatedData.name,
            },
        });

        return { success: true, user };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, error: error.errors };
        }

        if (error instanceof Error) {
            return { success: false, error: error.message };
        }

        return { success: false, error: "Une erreur inconnue est survenue" };
    }
}

export async function loginUser(data: z.infer<typeof loginSchema>) {
    try {
        // Validation des données
        const validatedData = loginSchema.parse(data);

        // Tentative de connexion avec NextAuth
        const result = await signIn("credentials", {
            email: validatedData.email,
            password: validatedData.password,
            redirect: false,
        });

        if (result?.error) {
            throw new Error(result.error);
        }

        return { success: true };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, error: error.errors };
        }

        // Removed AuthError-specific handling as it is not a valid type

        if (error instanceof Error) {
            return { success: false, error: error.message };
        }

        return { success: false, error: "Une erreur inconnue est survenue" };
    }
}

export async function logoutUser() {
    await signOut();
    redirect("/login");
}