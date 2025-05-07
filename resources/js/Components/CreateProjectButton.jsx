import React, { useState } from "react";
import CreateProjectForm from "./CreateProjectForm"; // Assurez-vous que ce composant existe

function CreateProjectButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <button
        onClick={openModal}
        className="bg-yellow-meibo text-dark-primary font-semibold text-[20px] rounded-[20px] px-6 py-3 hover:cursor-pointer"
      >
        New Project
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50"
          onClick={handleBackgroundClick}
        >
          <div className="bg-[#172227] rounded-lg p-6 w-[90%] max-w-lg">
            <h2 className="text-xl font-bold mb-4 text-white">Create a new project</h2>
            <CreateProjectForm />
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateProjectButton;
