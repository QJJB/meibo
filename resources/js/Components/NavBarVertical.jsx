import React from "react";
import { Link } from '@inertiajs/react';
import NavLink from './NavLink'; // Assurez-vous d'importer le composant NavLink

function NavBarVertical() {
    return (
        <nav className="navbar-vertical flex flex-col items-center space-y-6 py-4">
            {/* Lien vers /dashboard */}
            <NavLink href="/dashboard" active={window.location.pathname === '/dashboard'}>
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1.26086 10L3.43478 8M3.43478 8L11.0435 1L18.6522 8M3.43478 8V18C3.43478 18.5523 3.92142 19 4.52173 19H7.7826M18.6522 8L20.8261 10M18.6522 8V18C18.6522 18.5523 18.1655 19 17.5652 19H14.3043M7.7826 19C8.38291 19 8.86956 18.5523 8.86956 18V14C8.86956 13.4477 9.35621 13 9.95652 13H12.1304C12.7307 13 13.2174 13.4477 13.2174 14V18C13.2174 18.5523 13.704 19 14.3043 19M7.7826 19H14.3043"
                        stroke="#64646C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    />
                </svg>
            </NavLink>

            {/* Lien vers /calendar */}
            <NavLink href="/calendar" active={window.location.pathname === '/calendar'}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6 5V1M14 5V1M5 9H15M3 19H17C18.1046 19 19 18.1046 19 17V5C19 3.89543 18.1046 3 17 3H3C1.89543 3 1 3.89543 1 5V17C1 18.1046 1.89543 19 3 19Z"
                        stroke="#64646C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    />
                </svg>
            </NavLink>

            {/* Lien vers /projects */}
            <NavLink href="/projects" active={window.location.pathname === '/projects'}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6 5V1M14 5V1M5 9H15M3 19H17C18.1046 19 19 18.1046 19 17V5C19 3.89543 18.1046 3 17 3H3C1.89543 3 1 3.89543 1 5V17C1 18.1046 1.89543 19 3 19Z"
                        stroke="#64646C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    />
                </svg>
            </NavLink>
        </nav>
    );
}

export default NavBarVertical;