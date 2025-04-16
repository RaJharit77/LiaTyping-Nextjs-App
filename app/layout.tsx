import { Poppins } from "next/font/google";
import "@/style/globals.css";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Providers } from "./provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "LiaTyping App",
  description: "LiaTyping - Améliorez votre vitesse de frappe avec LiaTyping",
  keywords: "LiaTyping, vitesse de frappe, dactylographie, test de vitesse de frappe, jeu de dactylographie",
  icons: {
    icon: "/asset/favicon.png",
  },
  type: "image/svg+xml",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={poppins.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster position="top-center" />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}