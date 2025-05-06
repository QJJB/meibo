import React from "react";
import { Link, usePage } from "@inertiajs/react";
import NavLink from "./NavLink";
import disconnectSVG from "../../assets/disconnect.svg";
import ppKirby from '../../assets/pp/kirby.jpg'

const NavBarVertical = () => {
    const { url } = usePage();
    const currentPath = url ? new URL(url, window.location.href).pathname : "/";

    // Fonction pour vérifier si l'élément est actif
    const isActive = (path) => currentPath === path;
    const hoverBg = "w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-tertiary";

    return (
        <div className="w-16 h-[calc(100vh-100px)] bg-dark-primary mt-[50px] mb-[50px] pl-9 pr-9 flex flex-col justify-between items-center">
            {/* ICONES DE NAVIGATION */}
            <div className="flex flex-col items-center space-y-6">
                <div className={`${hoverBg}`}>
                    <NavLink href="/dashboard">
                        <svg
                            className={`w-5 h-5 ${isActive("/dashboard")
                                ? "stroke-white-icon"
                                : "stroke-gray-icon"
                                }`}
                            width="22"
                            height="20"
                            viewBox="0 0 22 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1.26086 10L3.43478 8M3.43478 8L11.0435 1L18.6522 8M3.43478 8V18C3.43478 18.5523 3.92142 19 4.52173 19H7.7826M18.6522 8L20.8261 10M18.6522 8V18C18.6522 18.5523 18.1655 19 17.5652 19H14.3043M7.7826 19C8.38291 19 8.86956 18.5523 8.86956 18V14C8.86956 13.4477 9.35621 13 9.95652 13H12.1304C12.7307 13 13.2174 13.4477 13.2174 14V18C13.2174 18.5523 13.704 19 14.3043 19M7.7826 19H14.3043"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </NavLink>
                </div>


                {/* <div className={`${hoverBg}`}>
                    <NavLink href="/calendar">
                        <svg
                            className={`w-[18px] h-[18px] ${isActive("/calendar")
                                ? "stroke-white-icon"
                                : "stroke-gray-icon"
                                }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6 5V1M14 5V1M5 9H15M3 19H17C18.1046 19 19 18.1046 19 17V5C19 3.89543 18.1046 3 17 3H3C1.89543 3 1 3.89543 1 5V17C1 18.1046 1.89543 19 3 19Z"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </NavLink>
                </div> */}

                <div className={`${hoverBg}`}>
                    <NavLink href="/projects">
                        <svg
                            className={`w-6 h-6 ${isActive("/projects")
                                ? "stroke-white-icon"
                                : "stroke-gray-icon"
                                }`}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 7V15C8 16.1046 8.89543 17 10 17H16M8 7V5C8 3.89543 8.89543 3 10 3H14.5858C14.851 3 15.1054 3.10536 15.2929 3.29289L19.7071 7.70711C19.8946 7.89464 20 8.149 20 8.41421V15C20 16.1046 19.1046 17 18 17H16M8 7H6C4.89543 7 4 7.89543 4 9V19C4 20.1046 4.89543 21 6 21H14C15.1046 21 16 20.1046 16 19V17"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </NavLink>
                </div>

            </div>

            {/* ICONES DU BAS PARAMS, NOTIFS, PROFILE */}
            <div className="flex flex-col items-center space-y-6">
                {/* <div className={`${hoverBg}`}>
                    <NavLink href="/settings">
                        <svg
                            className={`w-6 h-6 ${isActive("/settings")
                                ? "stroke-white-icon"
                                : "stroke-gray-icon"
                                }`}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z"
                                strokeWidth="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                strokeWidth="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </NavLink>
                </div> */}

                {/* <div className={`${hoverBg}`}>
                    <NavLink href="/notifications">
                        <svg
                            className={`w-6 h-6 ${isActive("/notifications")
                                ? "stroke-red-600"
                                : "stroke-red-600"
                                }`}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </NavLink>
                </div> */}


                <NavLink href="/profile">
                    <div
                        className={`w-7 h-7 rounded-full overflow-hidden hover:scale-110 transition-all duration-200`}
                    >
                        <img
                            src={ppKirby}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </NavLink>

                <div className={`${hoverBg}`}>
                    <NavLink href={route("logout")} method="post">
                        <div
                            className={`w-5 h-5 rounded-full overflow-hidden`}
                        >
                            <img
                                src={disconnectSVG}
                                alt="Logout"
                            />
                        </div>
                    </NavLink>
                </div>

            </div>
        </div>
    );
};

export default NavBarVertical;
