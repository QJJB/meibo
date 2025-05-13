import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        console.log("Résolution de la page :", name);
        console.log(`[Inertia] Résolution du composant : ${name}`);

        const pages = import.meta.glob('./Pages/**/*.jsx');
        console.log('[Inertia] Pages disponibles :', Object.keys(pages));

        return resolvePageComponent(`./Pages/${name}.jsx`, pages);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});