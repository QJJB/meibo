import React from "react";
import { usePage } from '@inertiajs/react';

export default function TaskItemCard({ projects }) {
    console.log("Projects reçus :", projects);

    if (!projects || projects.length === 0) {
        return <p className="text-center text-white mt-4">Aucun projet trouvé.</p>;
    }

    return (
        <>
            {projects.map((project) => (



        <div className="flex flex-col task-cards mt-[35px] mx-[15px] space-y-[20px] overflow-hidden pb-[30px] bg-dark-tertiary rounded-2xl p-5 w-full max-w-md text-white relative shadow-md">
            {/* Bookmark icon */}
            <div className="absolute top-4 right-4">
                <svg className="w-5 h-5 text-white opacity-70" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v12l7-3 7 3V5a2 2 0 00-2-2H5z" />
                </svg>
            </div>

            {/* Category / Tag */}
            <p className="text-xs text-blue-400">{project.creator_name}</p>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-2">{project.name}</h3>

            {/* Roles */}
            <div className="flex">
                {project.roles && project.roles.map(role => (
                    <div className="bg-gray-600 rounded-full w-24 h-4 mb-4 flex items-center justify-center text-xs  mr-2" key={role.id}>
                        {role.name}
                    </div>
                ))}

            </div>


            {/* Avatars + count */}
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

            {/* Progress bar */}
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


                </div>{/* Progress bar + Done Ratio */}
                <div className="flex items-center justify-between">
                    <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                        {/* Tu peux ajuster dynamiquement la largeur ici si tu veux */}
                        <div
                            className="h-full bg-white rounded-full"
                            style={{
                                width: `${
                                    project.task_ratio
                                        ? (parseInt(project.task_ratio.split('/')[0]) / parseInt(project.task_ratio.split('/')[1])) * 100
                                        : 0
                                }%`,
                            }}
                        ></div>
                    </div>
                    <span className="ml-2 text-xs text-white">
                        {project.task_ratio ?? '0/0'}
                    </span>
                </div>

            </div>
        </div>
            ))}
            </>
    );
}
