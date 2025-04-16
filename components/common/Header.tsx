"use client";

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
    const { data: session } = useSession();

    return (
        <header className="border-b sticky">
            <div className="container flex h-20 items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/img/logo.png"
                        alt="LiaTyping Logo"
                        width={60}
                        height={60}
                        className="rounded-full"
                    />
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500
                        hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-red-400
                        transition-all duration-300 hover:text-shadow-neon hover-neon">
                        LiaTyping
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    <nav className="flex items-center gap-6">
                        <Link href="/" className="font-medium hover:text-blue-500 transition-colors">
                            Accueil
                        </Link>
                        <Link href="/typing" className="font-medium hover:text-purple-500 transition-colors">
                            Typing
                        </Link>
                        <Link href="/about" className="font-medium hover:text-red-500 transition-colors">
                            À propos
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4 ml-4">
                        <ModeToggle />
                        {session ? (
                            <Link href="/dashboard">
                                <Button variant="outline" className="bg-transparent">
                                    Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/auth/login">
                                <Button className="bg-gradient-to-r from-blue-500 to-red-500 text-white
                                hover:shadow-neon hover:shadow-[0_0_10px_#3b82f6,0_0_20px_#ef4444] transition-all duration-300">
                                    Se connecter
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}