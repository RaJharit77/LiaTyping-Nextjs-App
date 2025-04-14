"use client";

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

export default function Header() {
    const { data: session } = useSession();

    return (
        <header className="border-b">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="font-bold">
                    LiaTyping
                </Link>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                    {session ? (
                        <Link href="/dashboard">
                            <Button variant="outline">Dashboard</Button>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <Button>Se connecter</Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}