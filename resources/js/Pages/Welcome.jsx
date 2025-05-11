import { Head } from "@inertiajs/react";
import { useEffect, useState, useRef } from "react";
import Nav from "../Components/Welcome/Nav";
import Signature from "../Components/Welcome/Signature";
import AuthModal from "../Components/Welcome/AuthModal";

export default function Welcome({ auth }) {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: null, y: null }); // Position de la souris
    const [showLines, setShowLines] = useState(false); // État pour activer/désactiver les lignes

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const particles = [];

        // Ajuste la taille du canvas pour couvrir toute la page
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Gestionnaire de mouvement de la souris
        const handleMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };
        window.addEventListener("mousemove", handleMouseMove);

        // Crée des particules
        for (let i = 0; i < 250; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 0.5, // Taille réduite des particules
                dx: (Math.random() * 0.1 - 0.20), // Vitesse initiale légèrement augmentée
                dy: (Math.random() * 0.1 - 0.20), // Vitesse initiale légèrement augmentée
            });
        }

        // Dessine les particules
        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, index) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = "#ffffff";
                ctx.fill();
                ctx.closePath();

                // Mise à jour de la position
                p.x += p.dx;
                p.y += p.dy;

                // Rebondir sur les bords
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

                // Interaction avec la souris
                const distance = Math.sqrt(
                    (p.x - mouse.current.x) ** 2 + (p.y - mouse.current.y) ** 2
                );
                if (distance < 100) {
                    const angle = Math.atan2(p.y - mouse.current.y, p.x - mouse.current.x);
                    const force = (200 - distance) / 200; // Force inversement proportionnelle à la distance
                    p.dx += Math.cos(angle) * force * 0.10; // Force légèrement augmentée
                    p.dy += Math.sin(angle) * force * 0.10; // Force légèrement augmentée
                }

                // Limiter la vitesse des particules
                const maxSpeed = 0.10; // Vitesse maximale légèrement augmentée
                const speed = Math.sqrt(p.dx ** 2 + p.dy ** 2);
                if (speed > maxSpeed) {
                    p.dx = (p.dx / speed) * maxSpeed;
                    p.dy = (p.dy / speed) * maxSpeed;
                }

                // Dessine des lignes entre les particules proches si activé
                if (showLines) {
                    for (let j = index + 1; j < particles.length; j++) {
                        const p2 = particles[j];
                        const dist = Math.sqrt(
                            (p.x - p2.x) ** 2 + (p.y - p2.y) ** 2
                        );
                        if (dist < 100) { // Distance maximale pour dessiner une ligne
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 100})`; // Opacité basée sur la distance
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                            ctx.closePath();
                        }
                    }
                }
            });
        };

        // Animation
        const animate = () => {
            drawParticles();
            requestAnimationFrame(animate);
        };

        animate();

        // Nettoyage
        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animate);
        };
    }, [showLines]); // Ajout de showLines comme dépendance pour réagir aux changements

    const [modalAuth, setModalAuth] = useState(false);
    const toggleAuthModal = () => setModalAuth((prev) => !prev);

    const [navButton, setNavButton] = useState("");
    const handleNavButton = (value) => setNavButton(value);

    return (
        <>
            <Head title="WelcomeCopy" />

            {/* Canvas pour les particules couvrant toute la page */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 w-full h-full z-0"
            ></canvas>

            {/* Contenu principal */}
            <div className="relative z-10">
                <div className="hero min-h-[calc(var(--svh,1svh)*90)] flex flex-col justify-between px-10">
                    <Nav
                        auth={auth}
                        toggleAuthModal={toggleAuthModal}
                        handleNavButton={handleNavButton}
                    />
                    <Signature />
                </div>
                {modalAuth && (
                    <AuthModal
                        key={navButton}
                        toggleAuthModal={toggleAuthModal}
                        handleNavButton={handleNavButton}
                        navButton={navButton}
                    />
                )}
            </div>
            {/* Bouton pour activer/désactiver les lignes */}
            <div className="absolute bottom-5 left-5 flex items-center space-x-2">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={showLines}
                        onChange={() => setShowLines((prev) => !prev)}
                        className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-[#B5B5B8] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-300 rounded-full peer peer-checked:bg-gray-600 transition duration-300"></div>
                    <div className="w-4 h-4 bg-black rounded-full absolute left-0.5 top-0.5 peer-checked:translate-x-4 transition-transform duration-300"></div>
                </label>
            </div>
        </>
    );
}
