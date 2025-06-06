"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut, User } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface DropdownMenuProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

export function DropdownMenu({ trigger, children, className = "" }: DropdownMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 focus:outline-none"
            >
                {trigger}
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-black border rounded-md shadow-lg py-1 z-50">
                    {children}
                </div>
            )}
        </div>
    );
}

export function DropdownMenuItem({
    children,
    onClick,
    href,
    icon: Icon,
    className = "",
}: {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    icon?: React.ComponentType<{ className?: string }>;
    className?: string;
}) {
    const content = (
        <div className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            {children}
        </div>
    );

    if (href) {
        return (
            <Link href={href} className={className}>
                {content}
            </Link>
        );
    }

    return (
        <div onClick={onClick} className={className}>
            {content}
        </div>
    );
}