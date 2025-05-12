"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: 'Débutant', wpm: 40, fill: '#3b82f6' },
  { name: 'Intermédiaire', wpm: 65, fill: '#6366f1' },
  { name: 'Avancé', wpm: 100, fill: '#8b5cf6' },
  { name: 'Expert', wpm: 120, fill: '#a855f7' },
];

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
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Bienvenue sur LiaTyping</h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Améliorez votre vitesse de frappe avec notre outil moderne
            </p>
          </div>

          <div className="pt-4">
            <Link href="/typing">
              <Button
                size="default"
                className="text-lg font-bold bg-gradient-to-r from-blue-500 to-red-500 text-white
                          hover:from-blue-400 hover:to-red-400 hover:shadow-neon transition-all duration-300
                          hover:shadow-[0_0_15px_#3b82f6,0_0_30px_#ef4444] rounded-xl px-6 sm:px-8 py-4 sm:py-6 cursor-pointer"
              >
                Commencer le test
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 space-y-24">

        <section className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Pourquoi améliorer sa vitesse de frappe ?</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Une bonne vitesse de frappe augmente votre productivité, réduit la fatigue et vous permet 
              de mieux vous concentrer sur le contenu plutôt que sur le processus d'écriture.
            </p>
          </div>
          <div className="lg:w-1/2 w-full bg-muted/50 p-6 sm:p-8 rounded-xl border">
            <div className="text-center space-y-2">
              <div className="text-4xl sm:text-5xl font-bold text-primary">+40%</div>
              <p className="text-muted-foreground">Productivité moyenne gagnée</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Les statistiques clés</h2>
            <ul className="space-y-3 text-base sm:text-lg text-muted-foreground">
              <li>• Frappe moyenne : 40 mots/minute</li>
              <li>• Bon niveau : 65 mots/minute</li>
              <li>• Expert : 100+ mots/minute</li>
              <li>• Précision idéale : 98%+</li>
            </ul>
          </div>
          <div className="lg:w-1/2 w-full h-64 sm:h-80">
            <div className="bg-muted/50 p-4 sm:p-6 rounded-xl border h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9ca3af" 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    label={{ value: 'Mots/min', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }}
                    itemStyle={{ color: '#f3f4f6' }}
                  />
                  <Bar 
                    dataKey="wpm" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  >
                    {data.map((entry, index) => (
                      <rect key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Nos conseils pour progresser</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {[
              {
                emoji: "👆",
                title: "Position des mains",
                desc: "Utilisez la position de base 'ASDF - JKL;' et revenez-y après chaque frappe."
              },
              {
                emoji: "👀",
                title: "Regardez l'écran",
                desc: "Ne regardez pas votre clavier pour développer votre mémoire musculaire."
              },
              {
                emoji: "⏱️",
                title: "Pratique régulière",
                desc: "15 minutes par jour valent mieux qu'une longue session hebdomadaire."
              },
              {
                emoji: "🎯",
                title: "Précision d'abord",
                desc: "Priorisez la précision avant d'augmenter votre vitesse."
              },
              {
                emoji: "🧘",
                title: "Posture correcte",
                desc: "Maintenez une posture ergonomique pour éviter les tensions."
              },
              {
                emoji: "📊",
                title: "Suivez vos progrès",
                desc: "Analysez vos statistiques pour identifier les points à améliorer."
              }
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-muted/50 hover:bg-muted/70 transition-all p-6 rounded-xl border space-y-3"
              >
                <div className="text-4xl">{tip.emoji}</div>
                <h3 className="text-xl font-semibold">{tip.title}</h3>
                <p className="text-muted-foreground">{tip.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}