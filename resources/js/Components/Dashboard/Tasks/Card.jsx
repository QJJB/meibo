// resources/js/Pages/TaskCard.jsx

function Card({ tasks, projects }) {
    if (!tasks || tasks.length === 0) {
        return <p className="text-center text-white mt-4">Aucune tâche trouvée.</p>;
    }

    const getPriorityLabel = (priority) => {
        switch (priority) {
            case 1: return 'Low priority';
            case 2: return 'Medium priority';
            case 3: return 'High priority';
            default: return 'Unknown priority';
        }
    };

    // Création d'une map pour accéder rapidement aux projets par ID
    const projectMap = Object.fromEntries(projects.map(p => [p.id, p]));

    return (
        <>
            {tasks.map((task) => {
                const project = projectMap[task.project_id];

                return (
                    <div
                        key={task.id}
                        className="task-card bg bg-dark-tertiary [width:calc(100%-30px)] mx-auto rounded-[20px] hover:w-full"
                    >
                        {/* Header de la tâche */}
                        <div className="task-card-header flex flex-row items-center justify-between mt-[22px] mx-[15px] w-[calc(100%-30px)]">
                            <div className="task-card-title flex flex-row space-x-[14px] items-center">
                                <div className="w-7 h-7 rounded-full overflow-hidden">
                                    <img
                                        src="/storage/avatars/mushu-avatar.png"
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-yellow-meibo font-semibold text-[20px] [letter-spacing:-0.05em]">
                                    {project ? project.name : 'Projet inconnu'}
                                </h3>
                            </div>
                            <div className="task-card-date flex flex-row space-x-[10px] items-center">
                                <p className="text-yellow-meibo font-light text-[17px] [letter-spacing:-0.05em]">
                                    {task.due_date ? task.due_date.slice(0, 10) : 'Pas de date'}
                                </p>
                                <svg
                                    className="w-6 h-6 stroke-yellow-meibo transition-transform"
                                    width="26"
                                    height="24"
                                    viewBox="0 0 26 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11.9495 4C11.9495 2.89543 12.9168 2 14.11 2C15.3033 2 16.2706 2.89543 16.2706 4V5C16.2706 5.55228 16.7542 6 17.3508 6H20.5917C21.1883 6 21.6719 6.44772 21.6719 7V10C21.6719 10.5523 21.1883 11 20.5917 11H19.5114C18.3182 11 17.3508 11.8954 17.3508 13C17.3508 14.1046 18.3182 15 19.5114 15H20.5917C21.1883 15 21.6719 15.4477 21.6719 16V19C21.6719 19.5523 21.1883 20 20.5917 20H17.3508C16.7542 20 16.2706 19.5523 16.2706 19V18C16.2706 16.8954 15.3033 16 14.11 16C12.9168 16 11.9495 16.8954 11.9495 18V19C11.9495 19.5523 11.4658 20 10.8692 20H7.62837C7.03175 20 6.54809 19.5523 6.54809 19V16C6.54809 15.4477 6.06443 15 5.46782 15H4.38754C3.1943 15 2.22699 14.1046 2.22699 13C2.22699 11.8954 3.1943 11 4.38754 11H5.46782C6.06443 11 6.54809 10.5523 6.54809 10V7C6.54809 6.44772 7.03175 6 7.62837 6H10.8692C11.4658 6 11.9495 5.55228 11.9495 5V4Z"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Contenu de la tâche */}
                        <div className="task-card-container flex items-center justify-between bg-yellow-meibo [width:calc(100%-30px)] pl-[19px] pt-[19px] p-[19px] mx-[15px] rounded-[20px] mb-[15px] mt-[15px]">
                            <div className="task-card-description flex flex-col w-[224px] space-y-[8px]">
                                <p className="text-dark-primary text-[17px] font-semibold [letter-spacing:-0.05em] leading-[21px]">
                                    {task.title}
                                </p>
                                <p className="text-dark-primary text-[15px] font-normal [letter-spacing:-0.03em]">
                                    {task.description}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default Card;