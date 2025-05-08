"use client";

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-28">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
        </div>
    );
}