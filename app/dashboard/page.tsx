import { getRecentResults } from "@/lib/actions/typing";
import { auth } from "@/lib/auth";
import { TypingChart } from "@/components/typing/TypingChart";
import { TypingHistory } from "@/components/typing/TypingHistory";

export default async function DashboardPage({ request }: { request: Request }) {
    const session = await auth.handler(request).then(res => res.json());
    if (!session?.user?.id) return null;

    const results = await getRecentResults(session.user.id);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Tableau de bord</h1>

            <div className="grid gap-8 md:grid-cols-2">
                <TypingChart results={results} />
                <TypingHistory results={results} />
            </div>
        </div>
    );
}