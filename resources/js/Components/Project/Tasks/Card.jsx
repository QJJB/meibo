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
        setIsLoading(true);
        Inertia.delete(route("projects.tasks.destroy", { task: taskId, project: projectId }), {
            onSuccess: () => {
                setIsLoading(false);
                setIsModalOpen(false);
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
                                className={`px-4 py-2 rounded text-white ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                                    }`}
                                disabled={isLoading}
                            >
                                {isLoading ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Tâche */}
            <div className="group relative w-full cursor-pointer">
                {/* Card content */}
                <div className="bg-dark-tertiary rounded-t-[8px] p-[12px] z-10">
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
                        <div className="right flex items-center gap-2">
                            <div className="hand w-5 h-5 flex justify-center">
                                <img src={handSVG} alt="Hand icon" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Delete slide down */}
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="overflow-hidden transition-[max-height] duration-300 ease-in-out max-h-0 group-hover:max-h-16 rounded-b-[8px] cursor-pointer"
                >
                    <div className="bg-red-600 h-8 flex items-center justify-center">
                        <svg
                            width="18"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-white"
                        >
                            <path
                                d="M16 5L15.1327 17.1425C15.0579 18.1891 14.187 19 13.1378 19H4.86224C3.81296 19 2.94208 18.1891 2.86732 17.1425L2 5M7 9V15M11 9V15M12 5V2C12 1.44772 11.5523 1 11 1H7C6.44772 1 6 1.44772 6 2V5M1 5H17"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;