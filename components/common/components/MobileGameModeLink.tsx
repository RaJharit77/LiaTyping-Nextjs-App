"use client";

import Link from "next/link";

export default function MobileGameModeLink({ href, children, onClick }: {
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="block py-2 px-3 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
        >
            {children}
        </Link>
    );
}