import { Head } from "@inertiajs/react";
import { useEffect, useState, useRef } from "react";
import Nav from "../Components/Nav";
import Signature from "../Components/Signature";
import AuthModal from "../Components/AuthModal";

export default function Welcome({ auth }) {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: null, y: null }); // Position de la souris

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
        for (let i = 0; i < 70; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 0.5, // Taille réduite des particules
                dx: (Math.random() * 0.5 - 0.25), // Vitesse plus lente
                dy: (Math.random() * 0.5 - 0.25), // Vitesse plus lente
            });
        }

        // Dessine les particules
        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
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
                    const force = (100 - distance) / 100; // Force inversement proportionnelle à la distance
                    p.dx += Math.cos(angle) * force * 0.02; // Réduction de la force appliquée
                    p.dy += Math.sin(angle) * force * 0.02; // Réduction de la force appliquée
                }
                const maxSpeed = 0.5; // Vitesse maximale
                const speed = Math.sqrt(p.dx ** 2 + p.dy ** 2);
                if (speed > maxSpeed) {
                    p.dx = (p.dx / speed) * maxSpeed;
                    p.dy = (p.dy / speed) * maxSpeed;
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
    }, []);

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
        </>
    );
}
