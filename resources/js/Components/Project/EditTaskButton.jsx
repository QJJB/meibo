import React, { useState } from "react";
import editSVG from "../../../assets/edit.svg";
import EditTaskForm from "./EditTaskForm";

export default function EditTaskButton({ task, users, roles, onSuccess }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    openModal();
                }}
                onPointerDown={e => e.stopPropagation()}
                onKeyDown={e => {
                    if (e.key === " " || e.key === "Enter") {
                        e.preventDefault();
                        e.stopPropagation();
                        openModal();
                    }
                }}
                className="p-2 rounded hover:bg-gray-200"
                title="Edit Task"
                tabIndex={0}
            >
                <img src={editSVG} alt="Edit" className="w-6 h-6 pointer-events-none" />
            </button>

            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50"
                    onMouseDown={handleBackgroundClick}
                    onKeyDown={e => e.stopPropagation()} // Ajoute ceci
                    tabIndex={-1} // Pour que la div puisse recevoir les événements clavier
                >
                    <div
                        className="bg-[#172227] rounded-lg p-6 w-[90%] max-w-lg max-h-[90vh] overflow-y-auto scrollbar-hide"
                        onPointerDown={e => e.stopPropagation()}
                        onClick={e => e.stopPropagation()}
                        onDragStart={e => e.stopPropagation()}
                        onDragOver={e => e.stopPropagation()}
                        onDrop={e => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-bold mb-4 text-white">Edit Task</h2>
                        <EditTaskForm
                            task={task}
                            users={users}
                            roles={roles}
                            onClose={closeModal}
                            onSuccess={onSuccess}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
