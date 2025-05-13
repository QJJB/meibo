import React, { useState } from "react";
import arrowSVG from '../../../../assets/arrow.svg';
import EditProjectButton from '../EditProjectButton';
import ppStarfire from "../../../../assets/pp/starfire.png";
import ppBeastboy from "../../../../assets/pp/beastboy.png";
import ppCyborg from "../../../../assets/pp/cyborg.png";
import ppRaven from "../../../../assets/pp/raven.png";
import ppKirby from "../../../../assets/pp/kirby.jpg";
import ppRobin from "../../../../assets/pp/robin.png";
import binSVG from "../../../../assets/bin.svg";
import { usePage } from '@inertiajs/react';
import { Inertia } from "@inertiajs/inertia";

const Description = ({ projects, roles, users }) => {
    const { auth } = usePage().props; // Récupère les données utilisateur
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const profilePhotoName = auth.user?.profile_photo
        ? auth.user.profile_photo.split('/').pop() // Récupère la dernière partie de l'URL
        : "default-avatar";

    const photoMap = {
        starfire: ppStarfire,
        beastboy: ppBeastboy,
        cyborg: ppCyborg,
        raven: ppRaven,
        kirby: ppKirby,
        robin: ppRobin,
    };

    const profilePhotoPath = photoMap[profilePhotoName] || "/default-avatar.png";

    function handleDeleteProject(projectId) {
        setIsLoading(true); // Active l'animation de chargement
        Inertia.delete(route("projects.destroy", projectId), {
            onSuccess: () => {
                setIsLoading(false); // Désactive le chargement
            },
        });
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', options).toUpperCase();

        // Séparer le jour du reste de la date
        const [month, day, year] = formattedDate.split(' ');
        return (
            <>
                {month} <span className="text-[#F7D539]">{day}</span> {year}
            </>
        );
    }

    function showAdmin() {
        const admins = users.filter(user =>
            user.roles.some(role => role.name === "admin")
        );

        if (admins.length > 0) {
            return admins.map(admin => (
                <div key={admin.id} className="flex align-center mb-2">
                    <div className="w-5 h-5 rounded-full overflow-hidden mr-[10px]">
                        <img
                            src={profilePhotoPath}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <p className="text-gray-title-secondary text-[22px] leading-[22px] font-medium [letter-spacing:-0.05em]">
                        {admin.name.toLowerCase()}
                    </p>
                </div>
            ));
        } else {
            return <p>No admin found</p>;
        }
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
                            Are you sure you want to delete this project? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeleteProject(projects.id)}
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

            {/* Contenu principal */}
            <div className="project bg-dark-secondary rounded-[20px] px-[30px] py-[30px]">
                <div className="head flex justify-between pb-4">
                    <div className="left flex gap-5 items-center">
                        <h2 className="text-white-title text-[30px] leading-[30px] font-semibold [letter-spacing:-0.05em]">
                            Project
                        </h2>
                        <div className="separator w-[3px] h-[33px] bg-header-separation rounded-[3px]"></div>
                        <p className="text-gray-title-secondary text-[23px] leading-[23px] font-semibold [letter-spacing:-0.05em]">
                            {projects.name}
                        </p>
                    </div>
                    <div className="right">
                        <EditProjectButton project={projects} />
                        <button
                            onClick={() => setIsModalOpen(true)} // Ouvre la modal
                            className="ml-4 p-2 hover: cursor-pointer"
                            title="Delete Project"
                        >
                            <img src={binSVG} alt="Delete" className="w-6 h-6" />
                        </button>
                    </div>
                </div>
                <div className="head flex justify-between mb-6">
                    <div className="left flex gap-6">
                        <div>
                            <h2 className="text-[#46484C] text-[35px] leading-[30px] font-semibold [letter-spacing:-0.05em]">
                                {formatDate(projects.start_date)}
                            </h2>
                            <p className="text-gray-title-secondary text-[18px] leading-[23px] font-semibold [letter-spacing:-0.05em]">
                                start date
                            </p>
                        </div>
                        <div className="arrow h-[30px] w-[30px]">
                            <img src={arrowSVG} alt="arrow" className="h-full w-full" />
                        </div>
                        <div>
                            <h2 className="text-[#46484C] text-[35px] leading-[30px] font-semibold [letter-spacing:-0.05em]">
                                {formatDate(projects.end_date)}
                            </h2>
                            <p className="text-gray-title-secondary text-[18px] leading-[23px] font-semibold [letter-spacing:-0.05em]">
                                end date
                            </p>
                        </div>
                    </div>
                </div>
                <div className="head flex justify-between">
                    <p className="text-gray-title-secondary text-[18px] leading-[23px] font-semibold [letter-spacing:-0.05em] w-sm">
                        {projects.description}
                    </p>
                    <div className="owner flex overflow-auto scrollbar-hide">
                        <p className="flex text-gray-title-secondary text-[18px] leading-[18px] font-semibold [letter-spacing:-0.05em] mr-2">
                            owner:
                        </p>
                        <div className="h-[80px]">{showAdmin()}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Description;