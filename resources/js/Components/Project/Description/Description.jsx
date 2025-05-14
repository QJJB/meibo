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
import { Inertia } from "@inertiajs/inertia";

const photoMap = {
    starfire: ppStarfire,
    beastboy: ppBeastboy,
    cyborg: ppCyborg,
    raven: ppRaven,
    kirby: ppKirby,
    robin: ppRobin,
};

const Description = ({ projects, roles, users }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // On suppose que le backend envoie projects.creator avec profile_photo
    const creator = projects.creator;
    // Récupère le nom de la photo du créateur (sans extension)
    const creatorPhotoName = creator && creator.profile_photo
        ? creator.profile_photo.split('/').pop().split('.')[0]
        : "default-avatar";
    // Utilise l'avatar custom si dispo, sinon la photo du créateur, sinon un avatar par défaut
    const creatorPhotoPath = photoMap[creatorPhotoName]
        || creator?.profile_photo
        || "/default-avatar.png";

    function handleDeleteProject(projectId) {
        setIsLoading(true);
        Inertia.delete(route("projects.destroy", projectId), {
            onSuccess: () => setIsLoading(false),
        });
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', options).toUpperCase();
        const [month, day, year] = formattedDate.split(' ');
        return (
            <>
                {month} <span className="text-[#F7D539]">{day}</span> {year}
            </>
        );
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
                                disabled={isLoading}
                            >
                                {isLoading ? "Deleting..." : "Delete"}
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
                    <div className="right flex justify-center">
                        <EditProjectButton project={projects} />
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="ml-4 hover: cursor-pointer"
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
                        <p className="flex items-center text-gray-title-secondary text-[18px] leading-[18px] font-semibold [letter-spacing:-0.05em] mr-2">
                            owner:
                        </p>
                        <div className="h-[80px] flex items-center">
                            <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
                                <img
                                    src={creatorPhotoPath}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="text-gray-title-secondary text-[22px] leading-[22px] font-medium [letter-spacing:-0.05em]">
                                {creator?.name?.toLowerCase() || "unknown"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Description;
