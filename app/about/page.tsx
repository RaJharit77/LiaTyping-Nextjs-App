"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

function SpaceParticles() {
    const particlesRef = useRef<THREE.Points>(null);

    useFrame((state, delta) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.x += delta * 0.05;
            particlesRef.current.rotation.y += delta * 0.03;
        }
    });

    const count = 1000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
    }

    return (
        <points ref={particlesRef}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                attach="material"
                size={0.03}
                sizeAttenuation
                color="#3b82f6"
                transparent
                opacity={0.8}
            />
        </points>
    );
}

export default function AboutPage() {
    const titleRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out",
            });

            gsap.from(contentRef.current, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="fixed inset-0 z-0">
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <SpaceParticles />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
                </Canvas>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-20">
                <div ref={titleRef} className="text-center mb-16 pt-4 pb-8">
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-2 leading-tight">
                        À propos de LiaTyping
                    </h1>
                    <p className="text-xl text-blue-200/80 mt-4">Maîtrisez l'art de la dactylographie</p>
                </div>

                <div ref={contentRef} className="mb-20 max-w-6xl mx-auto space-y-12">
                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10"
                    >
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1 space-y-6">
                                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400">
                                    Votre compagnon de dactylographie
                                </h2>
                                <div className="space-y-4 text-white/90">
                                    <p>
                                        LiaTyping révolutionne l'apprentissage de la dactylographie avec une approche moderne et des outils performants. Notre plateforme s'adapte à votre niveau pour vous faire progresser rapidement.
                                    </p>
                                    <p>
                                        Que vous soyez étudiant, professionnel ou simplement curieux, découvrez une nouvelle façon d'améliorer votre productivité au clavier.
                                    </p>
                                </div>
                            </div>
                            <div className="flex-1 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl p-6 border border-white/10">
                                <h3 className="text-xl font-semibold mb-4">Notre philosophie</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-300 text-xl">✓</span>
                                        <span>Apprentissage progressif et personnalisé</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-300 text-xl">✓</span>
                                        <span>Interface intuitive et sans distraction</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-300 text-xl">✓</span>
                                        <span>Suivi précis de votre progression</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-16"
                    >
                        <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            Ce qui nous différencie
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Tests intelligents",
                                    desc: "Des exercices adaptatifs qui évoluent avec votre niveau",
                                    icon: "⏱️"
                                },
                                {
                                    title: "Analyses détaillées",
                                    desc: "Statistiques complètes pour identifier vos points faibles",
                                    icon: "📊"
                                },
                                {
                                    title: "Environnement optimal",
                                    desc: "Interface épurée conçue pour la concentration",
                                    icon: "🎯"
                                },
                                {
                                    title: "Multiples modes",
                                    desc: "Classique, contre-la-montre, entraînement ciblé",
                                    icon: "🔄"
                                },
                                {
                                    title: "Suivi historique",
                                    desc: "Visualisez vos progrès sur le long terme",
                                    icon: "📈"
                                },
                                {
                                    title: "Accessible à tous",
                                    desc: "Du débutant à l'expert, chacun y trouve son compte",
                                    icon: "👥"
                                }
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -5 }}
                                    className="bg-white/5 hover:bg-white/10 transition-all p-6 rounded-xl border border-white/10"
                                >
                                    <div className="text-3xl mb-3">{feature.icon}</div>
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-white/80">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-20"
                    >
                        <h2 className="text-3xl font-bold mb-8 text-center text-white">
                            Ils ont amélioré leur dactylographie
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                {
                                    quote: "De 45 à 80 WPM en 3 mois grâce à LiaTyping !",
                                    author: "Émilie, étudiante"
                                },
                                {
                                    quote: "Enfin une appli qui rend l'entraînement agréable et motivant.",
                                    author: "Thomas, développeur"
                                },
                                {
                                    quote: "Mon équipe a gagné en productivité depuis qu'on utilise LiaTyping.",
                                    author: "Sarah, chef de projet"
                                },
                                {
                                    quote: "L'analyse des fautes m'a permis de corriger mes mauvaises habitudes.",
                                    author: "Marc, rédacteur"
                                }
                            ].map((testimonial, index) => (
                                <div 
                                    key={index}
                                    className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 p-6 rounded-2xl border border-white/10"
                                >
                                    <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
                                    <p className="text-blue-300 font-medium">— {testimonial.author}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                </div>
            </div>
        </div>
    );
}