"use client";

import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <SWRConfig
                value={{
                    fetcher: (resource, init) =>
                        fetch(resource, init).then((res) => res.json()),
                    shouldRetryOnError: false,
                }}
            >
                {children}
            </SWRConfig>
        </SessionProvider>
    );
}