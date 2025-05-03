"use client";

import Link from "next/link";


export default function MobileNavLink({ href, children, onClick }: {
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="block py-2 px-3 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
            {children}
        </Link>
    );
}