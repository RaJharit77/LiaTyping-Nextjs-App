export default function Footer() {
    return (
        <footer className="border-t py-6 bg-black text-white">
            <div className="container text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} LiaTyping - created by {"RaJharit77"} - Tous droits réservés
            </div>
        </footer>
    );
}