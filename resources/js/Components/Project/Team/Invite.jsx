import React, { useState } from "react";

export default function Invite({ projectId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inviteLink, setInviteLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function fetchInviteLink() {
        setIsLoading(true);
        try {
            const response = await fetch(route("projects.invite.generate", projectId), {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Accept": "application/json",
                },
            });
            const data = await response.json();
            setInviteLink(data.invite_url || "");
        } catch (e) {
            alert("Une erreur s'est produite lors de la génération du lien.");
        }
        setIsLoading(false);
    }

    function copyToClipboard() {
        if (!inviteLink) return;
        navigator.clipboard.writeText(inviteLink).then(() => {
        });
    }

    return (
        <>
            <button
                onClick={() => {
                    setIsModalOpen(true);
                    fetchInviteLink();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Invite a Friend
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-300">
                        <h1 className="text-2xl font-bold mb-4 text-[#222D3C]">Invite a Friend</h1>
                        <p className="mb-4 text-[#606A78]">Voici votre lien d'invitation :</p>
                        {isLoading ? (
                            <p>Chargement...</p>
                        ) : (
                            <div className="flex items-center space-x-2 mb-4">
                                <input
                                    type="text"
                                    value={inviteLink}
                                    readOnly
                                    className="flex-1 px-2 py-1 border rounded"
                                    onFocus={e => e.target.select()}
                                />
                                <button
                                    onClick={copyToClipboard}
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Copier
                                </button>
                            </div>
                        )}
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
