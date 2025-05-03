"use client";

import Link from "next/link";

export default function GameModeLink({ href, title }: { href: string; title: string }) {
    return (
        <Link
            href={href}
            className="block px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
            <div className="font-medium">{title}</div>
        </Link>
    );
}