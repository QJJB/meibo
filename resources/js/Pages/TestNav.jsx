import NavLink from '@/Components/NavLink';
import { usePage } from '@inertiajs/react';

export default function TestNav() {
    const { url } = usePage();
    const current = url;

    return (
        <div className="p-10 bg-gray-900 min-h-screen text-white">
            <h1 className="text-2xl mb-6">Test des liens avec la propriété active</h1>

            {/* Lien vers /dashboard */}
            <NavLink 
                href="/dashboard" 
                active={current === '/dashboard'}
                className="no-underline hover:underline"
            >
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke={current === '/dashboard' ? 'white' : 'gray'}
                >
                    <path
                        d="M1.26086 10L3.43478 8M3.43478 8L11.0435 1L18.6522 8M3.43478 8V18C3.43478 18.5523 3.92142 19 4.52173 19H7.7826M18.6522 8L20.8261 10M18.6522 8V18C18.6522 18.5523 18.1655 19 17.5652 19H14.3043M7.7826 19C8.38291 19 8.86956 18.5523 8.86956 18V14C8.86956 13.4477 9.35621 13 9.95652 13H12.1304C12.7307 13 13.2174 13.4477 13.2174 14V18C13.2174 18.5523 13.704 19 14.3043 19M7.7826 19H14.3043"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </NavLink>

            {/* Lien vers /testnav */}
            <NavLink 
                href="/testnav" 
                active={current === '/testnav'}
                className="no-underline hover:underline"
            >
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke={current === '/testnav' ? 'white' : 'gray'}
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
    );
}