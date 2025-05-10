"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import GameModeLink from "./components/GameModeLink";
import MobileGameModeLink from "./components/MobileGameModeLink";
import MobileNavLink from "./components/MobileNavLink";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { FaUser } from "react-icons/fa";

export default function Header() {
    const { data: session } = useSession();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMobileMenuOpen(false);
                setOpenSubMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleSubMenu = (menu: string) => {
        setOpenSubMenu(openSubMenu === menu ? null : menu);
    };

    return (
        <header className="sticky bg-black top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="container flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 group">
                    <Image
                        src="/img/logo.png"
                        alt="LiaTyping Logo"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500
                        hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-red-400
                        transition-all duration-300 hover:text-shadow-neon hover-neon">
                        LiaTyping
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/" className="font-medium px-3 py-2 rounded-md transition-all duration-300
                    hover:text-blue-500 hover:shadow-[0_0_10px_#3b82f6]">
                        Accueil
                    </Link>

                    <div className="relative group">
                        <button
                            onClick={() => toggleSubMenu('typing')}
                            className="font-medium px-3 py-2 rounded-md transition-all duration-300
                hover:text-purple-500 hover:shadow-[0_0_10px_#a855f7] flex items-center gap-1"
                        >
                            Typing
                            <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                        </button>
                        <div className="absolute hidden group-hover:block pt-2 w-64">
                            <div className="bg-white dark:bg-black border rounded-lg shadow-lg p-2 space-y-1">
                                <GameModeLink href="/typing/test-vitesse" title="Test de vitesse" />
                                <GameModeLink href="/typing/mode-classic" title="Classique" />
                                <GameModeLink href="/typing/mode-timed" title="Temps limité" />
                                <GameModeLink href="/typing/mode-zen" title="Zen" />
                            </div>
                        </div>
                    </div>

                    <Link href="/about" className="font-medium px-3 py-2 rounded-md transition-all duration-300
                    hover:text-red-500 hover:shadow-[0_0_10px_#ef4444]">
                        À propos
                    </Link>
                </nav>

                <div className="hidden md:flex items-center gap-2">
                    {session ? (
                        <Link href="/dashboard">
                            <Button variant="outline" size="default">
                                Dashboard
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/auth/login">
                            <Button size="default" className="bg-gradient-to-r from-blue-500 to-red-500 text-white hover:shadow-neon hover:shadow-[0_0_10px_#3b82f6,0_0_20px_#ef4444] transition-all duration-300 flex items-center gap-2 text-center">
                                <FaUser />
                                <span>Se connecter</span>
                            </Button>
                        </Link>
                    )}
                </div>

                <button
                    className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {mobileMenuOpen && (
                <div
                    ref={menuRef}
                    className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-black border-b shadow-lg animate-in fade-in-50"
                >
                    <div className="container px-4 py-3 space-y-4">
                        <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>
                            Accueil
                        </MobileNavLink>

                        <div>
                            <button
                                onClick={() => toggleSubMenu('typing')}
                                className="w-full flex justify-between items-center py-2 px-3 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <span>Typing</span>
                                <ChevronDown className={`h-4 w-4 transition-transform ${openSubMenu === 'typing' ? 'rotate-180' : ''}`} />
                            </button>

                            {openSubMenu === 'typing' && (
                                <div className="pl-4 mt-1 space-y-2">
                                    <MobileGameModeLink href="/typing/test-vitesse" onClick={() => setMobileMenuOpen(false)}>
                                        Test de Vitesse
                                    </MobileGameModeLink>
                                    <MobileGameModeLink href="/typing/mode-classic" onClick={() => setMobileMenuOpen(false)}>
                                        Mode Classique
                                    </MobileGameModeLink>
                                    <MobileGameModeLink href="/typing/mode-timed" onClick={() => setMobileMenuOpen(false)}>
                                        Temps limité (1 min)
                                    </MobileGameModeLink>
                                    <MobileGameModeLink href="/typing/mode-zen" onClick={() => setMobileMenuOpen(false)}>
                                        Mode Zen
                                    </MobileGameModeLink>
                                </div>
                            )}
                        </div>

                        <MobileNavLink href="/about" onClick={() => setMobileMenuOpen(false)}>
                            À propos
                        </MobileNavLink>

                        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                            {session ? (
                                <Link href="/dashboard" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="outline" className="w-full">
                                        Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <Link href="/auth/login" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full bg-gradient-to-r from-blue-500 to-red-500 text-white hover:shadow-neon hover:shadow-[0_0_10px_#3b82f6,0_0_20px_#ef4444] transition-all duration-300 flex items-center gap-2 text-center">
                                        <FaUser />
                                        <span>Se connecter</span>
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}