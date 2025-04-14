import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { GitHubButton } from "@/components/auth/GitHubButton";

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Connexion</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <LoginForm />
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Ou continuer avec
                            </span>
                        </div>
                    </div>
                    <GitHubButton />
                    <div className="mt-4 text-center text-sm">
                        Pas encore de compte?{" "}
                        <Link href="/register" className="underline">
                            S'inscrire
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}