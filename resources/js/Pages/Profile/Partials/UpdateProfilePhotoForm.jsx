import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function UpdateProfilePhotoForm({ className, currentPhoto }) {
    const { data, setData, post, processing, errors } = useForm({
        profile_photo: null,
    });

    const [preview, setPreview] = useState(currentPhoto || "/default-avatar.png"); // Utilise currentPhoto ou une image par défaut

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setData("profile_photo", file);

        // Met à jour l'aperçu si un fichier est sélectionné
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreview(event.target.result);
            };
            reader.readAsDataURL(file);
        }
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
                <label htmlFor="profile_photo" className="block text-sm font-medium text-gray-700">
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

                <input
                    type="file"
                    id="profile_photo"
                    name="profile_photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                />
                {errors.profile_photo && (
                    <p className="mt-2 text-sm text-red-600">{errors.profile_photo}</p>
                )}
            </div>

            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                disabled={processing}
            >
                {processing ? "Uploading..." : "Update Photo"}
            </button>
        </form>
    );
}