"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
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

      <section className="relative z-10 h-screen flex flex-col items-center justify-center text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-6">
          <div className="space-y-4">
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
      </section>

      <div className="container mx-auto px-4 py-16 space-y-24">

        <section className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Pourquoi améliorer sa vitesse de frappe ?</h2>
            <p className="text-lg text-muted-foreground">
              Une bonne vitesse de frappe augmente votre productivité, réduit la fatigue et vous permet 
              de mieux vous concentrer sur le contenu plutôt que sur le processus d'écriture.
            </p>
          </div>
          <div className="md:w-1/2 bg-muted/50 p-8 rounded-xl border">
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-primary">+40%</div>
              <p className="text-muted-foreground">Productivité moyenne gagnée</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Les statistiques clés</h2>
            <ul className="space-y-3 text-lg text-muted-foreground">
              <li>• Frappe moyenne : 40 mots/minute</li>
              <li>• Bon niveau : 65 mots/minute</li>
              <li>• Expert : 100+ mots/minute</li>
              <li>• Précision idéale : 98%+</li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <div className="bg-muted/50 p-6 rounded-xl border h-full flex items-center justify-center">
              <div className="w-full max-w-md">
                <div className="h-4 bg-primary rounded-full mb-2" style={{width: "40%"}}></div>
                <div className="h-4 bg-blue-400 rounded-full mb-2" style={{width: "65%"}}></div>
                <div className="h-4 bg-purple-500 rounded-full" style={{width: "100%"}}></div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-8">Nos conseils pour progresser</h2>
          <div className="grid md:grid-cols-3 gap-8 w-full">
            <div className="bg-muted/50 p-6 rounded-xl border space-y-3">
              <div className="text-4xl">👆</div>
              <h3 className="text-xl font-semibold">Position des mains</h3>
              <p className="text-muted-foreground">
                Utilisez la position de base "ASDF - JKL;" et revenez-y après chaque frappe.
              </p>
            </div>
            <div className="bg-muted/50 p-6 rounded-xl border space-y-3">
              <div className="text-4xl">👀</div>
              <h3 className="text-xl font-semibold">Regardez l'écran</h3>
              <p className="text-muted-foreground">
                Ne regardez pas votre clavier pour développer votre mémoire musculaire.
              </p>
            </div>
            <div className="bg-muted/50 p-6 rounded-xl border space-y-3">
              <div className="text-4xl">⏱️</div>
              <h3 className="text-xl font-semibold">Pratique régulière</h3>
              <p className="text-muted-foreground">
                15 minutes par jour valent mieux qu'une longue session hebdomadaire.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}