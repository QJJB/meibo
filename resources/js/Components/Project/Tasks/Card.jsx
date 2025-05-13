import React, { useState } from "react";
import ppKirby from '../../../../assets/pp/kirby.jpg';
import handSVG from '../../../../assets/hand.svg';
import binSVG from "../../../../assets/bin.svg";
import dayjs from "dayjs";
import { Inertia } from "@inertiajs/inertia";

function Card({ task, projectId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function handleDeleteTask(taskId, projectId) {
        setIsLoading(true); // Active l'état de chargement
        Inertia.delete(route("projects.tasks.destroy", { task: taskId, project: projectId }), {
            onSuccess: () => {
                setIsLoading(false); // Désactive l'état de chargement
                setIsModalOpen(false); // Ferme la modal
            },
        });
    }

    return (
        <>
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-300">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Confirm Deletion
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this task? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeleteTask(task.id, projectId)}
                                className={`px-4 py-2 rounded text-white ${
                                    isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                                }`}
                                disabled={isLoading} // Désactive le bouton si isLoading est true
                            >
                                {isLoading ? "Deleting..." : "Delete"} {/* Change le texte en fonction de isLoading */}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Tâche */}
            <div className="task cursor-grab bg-dark-tertiary rounded-[8px] py-[10px] px-[12px]">
                <div className="head flex justify-between items-center mb-[5px]">
                    <div className="left flex items-center gap-[10px]">
                        <h4 className="text-[18px] leading-[18px] font-semibold [letter-spacing:-0.05em]">
                            {task.title}
                        </h4>
                        <div className="role">front</div>
                    </div>
                    <div className="right flex items-center">
                        <p className="[letter-spacing:-0.05em]">
                            {dayjs(task.due_date).format('MMM D').toLowerCase()}
                        </p>
                    </div>
                </div>
                <div className="body min-h-[57px]">
                    <p className="text-[15px] leading-[16px] text-yellow-meibo mb-[25px] [letter-spacing:-0.05em] line-clamp-2">
                        {task.description}
                    </p>
                </div>
                <div className="foot flex justify-between items-center">
                    <div className="profile w-5 h-5 rounded-full overflow-hidden">
                        <img
                            src={ppKirby}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="right">
                        <button
                            onClick={() => setIsModalOpen(true)} // Ouvre la modal
                            className="ml-4 p-2 hover: cursor-pointer"
                            title="Delete Task"
                        >
                            <img src={binSVG} alt="Delete" className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="hand w-5 h-5 flex justify-center">
                        <img src={handSVG} alt="Hand icon" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;