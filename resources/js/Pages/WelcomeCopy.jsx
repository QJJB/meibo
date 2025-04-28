import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Nav from "../Components/WelcomeCopy/Nav"
import Signature from "../Components/WelcomeCopy/Signature";
import AuthModal from "../Components/WelcomeCopy/AuthModal";

export default function Welcome({ auth }) {
    useEffect(() => {
        const setSVH = () => {
            document.documentElement.style.setProperty(
                "--svh",
                `${window.innerHeight / 100}px`
            );
        };
        setSVH();
        window.addEventListener("resize", setSVH);
        return () => {
            window.removeEventListener("resize", setSVH);
        };
    }, []);

    const [modalAuth, setModalAuth] = useState(false);
    const toggleAuthModal = () => setModalAuth((prev) => !prev);

    const [navButton, setNavButton] = useState("");
    const handleNavButton = (value) => setNavButton(value);

    return (
        <>
            <Head title="WelcomeCopy" />
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
        </>
    );
}
