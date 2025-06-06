"use client";

import Image from "next/image";
import { FaUser } from "react-icons/fa";

interface AvatarProps {
    src?: string | null;
    className?: string;
    size?: "sm" | "md" | "lg";
}

export function Avatar({ src, className = "", size = "md" }: AvatarProps) {
    const sizeClasses = {
        sm: "h-6 w-6",
        md: "h-8 w-8",
        lg: "h-10 w-10",
    };

    const isValidUrl = src && (src.startsWith('http') || src.startsWith('/'));

    return (
        <div className={`relative rounded-full overflow-hidden ${sizeClasses[size]} ${className}`}>
            {isValidUrl ? (
                <Image
                    src={src}
                    alt="User avatar"
                    fill
                    className="object-cover"
                    unoptimized={src.startsWith('http')}
                />
            ) : (
                <div className="bg-gray-200 dark:bg-gray-700 h-full w-full flex items-center justify-center">
                    <FaUser className="text-gray-600 dark:text-gray-300" />
                </div>
            )}
        </div>
    );
}