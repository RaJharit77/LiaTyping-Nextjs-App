'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current?.appendChild(renderer.domElement);

        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 1500;

        const posArray = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0xffffff,
            transparent: true,
            opacity: 0.8
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        camera.position.z = 3;

        const animate = () => {
            requestAnimationFrame(animate);

            particlesMesh.rotation.x += 0.0005;
            particlesMesh.rotation.y += 0.0005;

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} className="fixed inset-0 -z-10" />;
}