import React, { useState } from "react";
import EditProjectForm from "./EditProjectForm";

function EditProjectButton({ project }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <>
            {/* Bouton Edit */}
            <button
                onMouseDown={openModal}
                className="today text-[20px] leading-[20px] [letter-spacing:-0.05em] font-[500] text-yellow-meibo border-2 px-[20px] py-[5px] rounded-[20px] hover:bg-yellow-meibo hover:text-dark-primary hover:cursor-pointer"
            >
                Edit
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50"
                    onMouseDown={handleBackgroundClick} // Détecte les clics en dehors de la modal
                >
                    <div className="bg-[#172227] rounded-lg p-6 w-[90%] max-w-lg max-h-[90vh] overflow-y-auto scrollbar-hide">
                        <h2 className="text-xl font-bold mb-4 text-white">Edit Project</h2>
                        <EditProjectForm project={project} onClose={closeModal} />
                    </div>
                </div>
            )}
        </>
    );
}

export default EditProjectButton;
