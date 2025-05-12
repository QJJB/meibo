import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import CreateTaskForm from "./CreateTaskForm";

function CreateTaskButton({ projectId, users }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleCreateTask = (taskData) => {
    // Ajoutez l'ID du projet aux données de la tâche
    const data = { ...taskData, project_id: projectId };

    // Envoyez une requête au backend pour créer la tâche
    Inertia.post(route("projects.tasks.store"), data, {
      onSuccess: () => {
        closeModal(); // Fermez la modal après la création
      },
      onError: (errors) => {
        console.error(errors); // Gérez les erreurs si nécessaire
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-[200px] h-full">
      <button
        onClick={openModal}
        className="text-[20px] leading-[20px] [letter-spacing:-0.05em] font-[500] text-yellow-meibo border-2 px-[20px] py-[5px] rounded-[20px] hover:bg-yellow-meibo hover:text-dark-primary hover:cursor-pointer"
      >
        New Task
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50"
          onClick={handleBackgroundClick}
        >
          <div className="bg-[#172227] rounded-lg p-6 w-[90%] max-w-lg max-h-[90vh] overflow-y-auto scrollbar-hide">
            <h2 className="text-xl font-bold mb-4 text-white">Create a new task</h2>
            <CreateTaskForm
              projectId={projectId}
              users={users}
              onSuccess={closeModal} // Ferme la modal après succès
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateTaskButton;
