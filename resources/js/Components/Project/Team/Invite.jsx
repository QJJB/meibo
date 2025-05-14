import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";

export default function Invite({ projectId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inviteLink, setInviteLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function fetchInviteLink() {
        setIsLoading(true);
        Inertia.get(route("projects.invite.generate", projectId), {}, {
            onSuccess: (page) => {
                setInviteLink(page.props.invite_url); // Récupère le lien depuis les props
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
                alert("Une erreur s'est produite lors de la génération du lien.");
            },
        });
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(inviteLink).then(() => {
            alert("Lien copié dans le presse-papiers !");
        });
    }

    return (
        <>
            {/* Bouton pour ouvrir la modal */}
            <button
                onClick={() => {
                    setIsModalOpen(true);
                    fetchInviteLink(); // Récupère le lien lorsque la modal s'ouvre
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Invite a Friend
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-300">
                        <h1 className="text-2xl font-bold mb-4">Invite a Friend</h1>
                        <p className="mb-4">Voici votre lien d'invitation :</p>
                        {isLoading ? (
                            <p>Chargement...</p>
                        ) : (
                            <div className="flex items-center space-x-2 mb-4">
                                <input
                                    type="text"
                                    value={inviteLink}
                                    readOnly
                                    className="flex-1 px-2 py-1 border rounded"
                                />
                                <button
                                    onClick={copyToClipboard}
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Copy
                                </button>
                            </div>
                        )}
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}