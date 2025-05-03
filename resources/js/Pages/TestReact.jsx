// resources/js/Pages/TestReact.jsx
import React from 'react';
import { usePage } from '@inertiajs/react';

export default function TestReact() {
    const { tasks } = usePage().props;

    return (
        <div>
            <h2>Liste des tâches</h2>
            {tasks.length === 0 ? (
                <p>Aucune tâche trouvée.</p>
            ) : (
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>
                            <strong>{task.title}</strong><br />
                            {task.description}<br />
                            <em>{task.due_date}</em>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
