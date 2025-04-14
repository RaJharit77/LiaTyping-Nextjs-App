"use client";

import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { AuthProvider } from "better-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <SessionProvider>
                <SWRConfig
                    value={{
                        fetcher: (resource, init) =>
                            fetch(resource, init).then((res) => res.json()),
                    }}
                >
                    {children}
                </SWRConfig>
            </SessionProvider>
        </AuthProvider>
    );
}