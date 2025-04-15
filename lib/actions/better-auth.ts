import { betterAuth } from "better-auth";
import { authOptions } from "./config";
import { Logger } from "better-auth";

export const auth = betterAuth({
    ...authOptions,
    logger: authOptions.logger as Logger,
});

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role?: string;
        } & {
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}