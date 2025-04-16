"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <Image
          src="/img/homes.jpg"
          alt="Background clavier mécanique"
          fill
          priority
          quality={100}
          className="object-cover opacity-30"
          style={{ willChange: 'transform' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
        <div className="max-w-2xl mx-auto px-2 space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight">Bienvenue sur LiaTyping</h1>
            <p className="text-xl text-muted-foreground">
              Améliorez votre vitesse de frappe avec notre outil moderne
            </p>
          </div>

          <div className="pt-4">
            <Link href="/typing">
              <Button
                size="default"
                className="text-lg font-bold bg-gradient-to-r from-blue-500 to-red-500 text-white
                          hover:from-blue-400 hover:to-red-400 hover:shadow-neon transition-all duration-300
                          hover:shadow-[0_0_15px_#3b82f6,0_0_30px_#ef4444] rounded-xl px-8 py-6"
              >
                Commencer le test
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}