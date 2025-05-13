import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import ppStarfire from "../../../../assets/pp/starfire.png";
import ppBeastboy from "../../../../assets/pp/beastboy.png";
import ppCyborg from "../../../../assets/pp/cyborg.png";
import ppRaven from "../../../../assets/pp/raven.png";
import ppKirby from "../../../../assets/pp/kirby.jpg";
import ppRobin from "../../../../assets/pp/robin.png";

export default function UpdateProfilePhotoForm({ className, currentPhoto }) {
    const { data, setData, post, processing, errors } = useForm({
        default_photo: null, // Ajout pour les photos par défaut
    });

    const [preview, setPreview] = useState(currentPhoto || "/default-avatar.png");

    // Correspondance entre les noms et les chemins des photos
    const photoMap = {
        starfire: ppStarfire,
        beastboy: ppBeastboy,
        cyborg: ppCyborg,
        raven: ppRaven,
        kirby: ppKirby,
        robin: ppRobin,
    };

    // Met à jour l'aperçu lorsque currentPhoto change
    useEffect(() => {
        setPreview(photoMap[currentPhoto] || "/default-avatar.png");
    }, [currentPhoto]);

    const handleDefaultPhotoChange = (photoName) => {
        setData("default_photo", photoName); // Enregistre uniquement le nom
        setPreview(photoMap[photoName]); // Met à jour l'aperçu
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("profile.updatePhoto"), {
            onSuccess: () => {
                // Optionnel : rafraîchir la page ou afficher un message de succès
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Profile Photo
                </label>

                {/* Aperçu de la photo */}
                <div className="mt-2">
                    <img
                        src={preview} // Affiche l'aperçu ou la photo actuelle
                        alt="Profile Preview"
                        className="w-24 h-24 rounded-full object-cover border border-gray-300"
                    />
                </div>
            </div>

            {/* Choix des photos par défaut */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Choose a Default Photo
                </label>
                <div className="mt-2 grid grid-cols-4 gap-4">
                    {Object.keys(photoMap).map((photoName, index) => (
                        <label key={index} className="flex flex-col items-center">
                            <input
                                type="radio"
                                name="default_photo"
                                value={photoName}
                                checked={data.default_photo === photoName}
                                onChange={() => handleDefaultPhotoChange(photoName)}
                                className="hidden"
                            />
                            <img
                                src={photoMap[photoName]}
                                alt={photoName}
                                className={`w-16 h-16 rounded-full object-cover border-2 ${
                                    data.default_photo === photoName ? "border-blue-500" : "border-gray-300"
                                }`}
                            />
                        </label>
                    ))}
                </div>
                {errors.default_photo && (
                    <p className="mt-2 text-sm text-red-600">{errors.default_photo}</p>
                )}
            </div>

            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                disabled={processing}
            >
                {processing ? "Updating..." : "Update Photo"}
            </button>
        </form>
    );
}