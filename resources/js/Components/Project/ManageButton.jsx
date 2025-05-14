import React, { useState } from "react";
import ManageForm from "./ManageForm"; // garde-le si tu en as besoin dans EditProjectForm

function ManageButton({ projects, users, roles }) {
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
            {/* Bouton Edit */}
            <button
                onMouseDown={openModal}
                className="today text-[20px] leading-[20px] [letter-spacing:-0.05em] font-[500] text-yellow-meibo border-2 px-[20px] py-[5px] rounded-[20px] hover:bg-yellow-meibo hover:text-dark-primary hover:cursor-pointer hover:border-yellow-meibo"
            >
                Edit
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex items-center justify-center"
                    onMouseDown={handleBackgroundClick}
                >
                    <div className="bg-[#172227] rounded-lg p-6 w-[90%] max-w-lg max-h-[90vh] overflow-y-auto scrollbar-hide">
                        <h2 className="text-xl font-bold mb-4 text-white">Edit team</h2>
                        <ManageForm projects={projects} onClose={closeModal} users={users} roles={roles}/>
                    </div>
                </div>
            )}
        </>
    );
}

export default ManageButton;
