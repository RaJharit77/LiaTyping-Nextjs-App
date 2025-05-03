"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function CustomDropdown({ mobile = false }: { mobile?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`relative ${mobile ? 'w-full mb-4' : ''}`} ref={dropdownRef}>
            <Button
                variant="outline"
                onClick={toggleDropdown}
                className={`flex items-center justify-between gap-2 ${mobile ? 'w-full' : ''}`}
                size="default"
            >
                <span>Modes de jeu</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </Button>

            {isOpen && (
                <div className={`
                    absolute ${mobile ? 'static mt-2 w-full' : 'right-0 mt-2 w-64'} 
                    bg-background rounded-md shadow-lg border z-50
                `}>
                    <div className="py-1">
                        <GameModeLink 
                            href="/typing?mode=random" 
                            title="Mode Mots Aléatoires"
                            description="Une série de mots choisis aléatoirement"
                            onClick={() => setIsOpen(false)}
                        />
                        <GameModeLink 
                            href="/typing?mode=zen" 
                            title="Mode Zen"
                            description="Tapez sans pression, aucun score"
                            onClick={() => setIsOpen(false)}
                        />
                        <GameModeLink 
                            href="/typing?mode=classic" 
                            title="Mode Classique"
                            description="Tapez le texte jusqu'à la fin"
                            onClick={() => setIsOpen(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

function GameModeLink({ href, title, description, onClick }: { 
    href: string; 
    title: string; 
    description: string;
    onClick: () => void;
}) {
    return (
        <Link
            href={href}
            className="block px-4 py-3 hover:bg-accent transition-colors cursor-pointer"
            onClick={onClick}
        >
            <div className="space-y-1">
                <h4 className="font-semibold text-left">{title}</h4>
                <p className="text-sm text-muted-foreground text-left">{description}</p>
            </div>
        </Link>
    );
}