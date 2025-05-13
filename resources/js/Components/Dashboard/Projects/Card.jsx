import React, { useState } from "react";
import { usePage } from '@inertiajs/react';
import { Inertia } from "@inertiajs/inertia";

export default function Card({ projects }) {
    const [projectList, setProjectList] = useState(projects);

    const toggleFavorite = (projectId) => {
        // Met à jour l'état local immédiatement
        const updatedProjects = projectList.map((project) =>
            project.id === projectId
                ? { ...project, is_favorite: !project.is_favorite }
                : project
        );
        setProjectList(updatedProjects);

        // Envoie la requête au backend
        Inertia.post(route("projects.toggleFavorite", projectId), {}, {
            onSuccess: (response) => {
                // Met à jour l'état local avec les données du backend
                const updatedProject = response.props.project;
                const finalProjects = projectList.map((project) =>
                    project.id === updatedProject.id ? updatedProject : project
                );
                setProjectList(finalProjects);
            },
            onError: () => {
                // Si une erreur survient, restaure l'état précédent
                setProjectList(projectList);
            },
        });
    };

    const sortedProjects = [...projectList].sort((a, b) => b.is_favorite - a.is_favorite);

    if (!projects || projects.length === 0) {
        return <p className="text-center text-white mt-4">Aucun projet trouvé.</p>;
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-[35px]">
                {sortedProjects.map((project) => (
                    <div
                        key={project.id}
                        className="flex flex-col task-cards space-y-[20px] overflow-hidden pb-[30px] bg-dark-tertiary rounded-2xl p-5 w-full max-w-md text-white relative shadow-md cursor-pointer hover:bg-hover-to-project transition duration-300 ease-in-out"
                        onClick={(e) => {
                            // Empêche le clic si la cible est dans le bouton favoris
                            if (e.target.closest(".bookmark-button")) return;
                            window.location.href = `/project/${project.id}`;
                        }}
                    >
                        {/* Bookmark icon */}
                        <div
                            className="absolute top-4 right-4 cursor-pointer z-10 bookmark-button"
                            onClick={(event) => {
                                event.stopPropagation(); // On garde ça par sécurité
                                toggleFavorite(project.id);
                            }}
                        >
                            {project.is_favorite ? (
                                <svg
                                    className="w-5 h-5 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M5 3a2 2 0 00-2 2v12l7-3 7 3V5a2 2 0 00-2-2H5z" />
                                </svg>
                            ) : (
                                <svg
                                    className="w-5 h-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 3a2 2 0 00-2 2v12l7-3 7 3V5a2 2 0 00-2-2H5z"
                                    />
                                </svg>
                            )}
                        </div>

                        {/* Le reste de la carte */}
                        <p className="text-xs text-gray-owner">{project.creator_name}</p>
                        <h3 className="text-xl font-semibold mb-2">{project.name}</h3>

                        <div className="flex">
                            {project.roles?.map((role) => (
                                <div className="bg-gray-600 rounded-full w-24 h-4 mb-4 flex items-center justify-center text-xs mr-2" key={role.id}>
                                    {role.name}
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center space-x-2 mb-4">
                            <img
                                src="https://i.pravatar.cc/24?img=12"
                                alt="avatar"
                                className="w-6 h-6 rounded-full"
                            />
                            <img
                                src="https://i.pravatar.cc/24?img=18"
                                alt="avatar"
                                className="w-6 h-6 rounded-full"
                            />
                            <div className="w-6 h-6 rounded-full bg-yellow-400 text-black text-sm font-bold flex items-center justify-center">
                                3
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white rounded-full"
                                    style={{
                                        width:
                                            project.task_ratio &&
                                                parseInt(project.task_ratio.split('/')[0]) > 0
                                                ? `${(parseInt(project.task_ratio.split('/')[0]) / parseInt(project.task_ratio.split('/')[1])) * 100}%`
                                                : '0%',
                                    }}
                                ></div>
                            </div>
                            <span className="ml-2 text-xs text-white">
                                {project.task_ratio ?? '0/0'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
