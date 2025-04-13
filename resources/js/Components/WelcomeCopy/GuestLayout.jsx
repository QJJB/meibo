import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <>
            <div className="modal-login z-20 w-xl p-5 rounded-2xl bg-[#15181E] mb-3">
                <button className="text-3xl font-medium mr-1.5">login</button>
                <button
                    className="text-3xl font-medium text-[#46484C] mb-3 cursor-pointer"
                    onClick={(e) => {
                        handleNavButton("register");
                    }}
                >
                    register
                </button>
                {children}
            </div>
            <a
                href="#"
                className="z-20 text-sm mb-3 font-semibold tracking-tight text-[#868688] hover:text-white cursor-pointer"
            >
                forgot my password / already registered
            </a>
        </>
    );
}
