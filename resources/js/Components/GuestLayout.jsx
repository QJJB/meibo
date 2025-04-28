import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <>
            <div className="modal-login z-20 w-xl p-5 rounded-2xl bg-[#15181E] mb-3">
                {children}
            </div>
        </>
    );
}
