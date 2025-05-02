// resources/js/components/TaskList.jsx
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/tasks') // Assure-toi que cette route retourne les tâches
            .then(response => {
                setTasks(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError("Erreur lors du chargement des tâches");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Chargement des tâches...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Liste des tâches</h2>
            {tasks.length === 0 ? (
                <p>Aucune tâche trouvée.</p>
            ) : (
                <ul>
                    {tasks.map(task => (
                        <li key={task.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
                            <h3>{task.title}</h3>
                            <p><strong>Description:</strong> {task.description}</p>
                            <p><strong>Date limite:</strong> {task.due_date}</p>
                            <p><strong>Priorité:</strong> {task.priority}</p>
                            <p><strong>Statut:</strong> {task.status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TaskList;

if (document.getElementById('task-list')) {
    ReactDOM.render(<TaskList />, document.getElementById('task-list'));
}
