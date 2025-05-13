import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdateProfilePhotoForm from './Partials/UpdateProfilePhotoForm';

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props; // Récupère les données utilisateur
    const profilePhotoName = auth.user?.profile_photo
    ? auth.user.profile_photo.split('/').pop() // Récupère la dernière partie de l'URL
    : "default-avatar";

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12 overflow-auto h-[100vh] scrollbar-hide">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow-sm sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>
                    <div className='bg-white p-4 shadow-sm sm:rounded-lg sm:p-8'>
                        <UpdateProfilePhotoForm
                            className="max-w-xl"
                            currentPhoto={profilePhotoName || "default-avatar"} // Passe le nom de la photo ou un nom par défaut
                        />
                    </div>
                    <div className="bg-white p-4 shadow-sm sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white p-4 shadow-sm sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}