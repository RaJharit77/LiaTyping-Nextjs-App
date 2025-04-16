"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons";

export function GitHubButton() {
    return (
        <Button
            variant="outline"
            onClick={() => signIn("github")}
            className="w-full"
        >
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Continuer avec GitHub
        </Button>
    );
}