import React from "react";
import { usePage } from '@inertiajs/react';
import NavLink from './NavLink';

const NavBarVertical = () => {
    const { url } = usePage();
    const currentPath = url ? new URL(url, window.location.href).pathname : '/';

    return (
        <div className="w-16 bg-dark-primary p-4 flex flex-col items-center space-y-6">
            <NavLink href="/dashboard">
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.26086 10L3.43478 8M3.43478 8L11.0435 1L18.6522 8M3.43478 8V18C3.43478 18.5523 3.92142 19 4.52173 19H7.7826M18.6522 8L20.8261 10M18.6522 8V18C18.6522 18.5523 18.1655 19 17.5652 19H14.3043M7.7826 19C8.38291 19 8.86956 18.5523 8.86956 18V14C8.86956 13.4477 9.35621 13 9.95652 13H12.1304C12.7307 13 13.2174 13.4477 13.2174 14V18C13.2174 18.5523 13.704 19 14.3043 19M7.7826 19H14.3043" stroke="#64646C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </NavLink>

            <NavLink href="/calendar">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 5V1M14 5V1M5 9H15M3 19H17C18.1046 19 19 18.1046 19 17V5C19 3.89543 18.1046 3 17 3H3C1.89543 3 1 3.89543 1 5V17C1 18.1046 1.89543 19 3 19Z" stroke="#64646C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </NavLink>

            <NavLink href="/projects">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 7V15C8 16.1046 8.89543 17 10 17H16M8 7V5C8 3.89543 8.89543 3 10 3H14.5858C14.851 3 15.1054 3.10536 15.2929 3.29289L19.7071 7.70711C19.8946 7.89464 20 8.149 20 8.41421V15C20 16.1046 19.1046 17 18 17H16M8 7H6C4.89543 7 4 7.89543 4 9V19C4 20.1046 4.89543 21 6 21H14C15.1046 21 16 20.1046 16 19V17" stroke="#64646C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </NavLink>
        </div>
    );
};

export default NavBarVertical;