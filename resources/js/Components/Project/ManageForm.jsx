import InputLabel from "@/Components/Form/InputLabel";
import PrimaryButton from "@/Components/Form/PrimaryButton";
import TextInput from "@/Components/Form/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";


function ManageForm({ projects, onClose, users, roles }) {
    const [activeUserId, setActiveUserId] = useState(null); // utilisateur en cours d'ajout de rôle
    const [selectedRoles, setSelectedRoles] = useState({});
    const [showAddRoleForm, setShowAddRoleForm] = useState(false);

    const {
        data: newRoleData,
        setData: setNewRoleData,
        post: postNewRole,
        processing: newRoleProcessing,
        errors: newRoleErrors,
        reset: resetNewRole,
    } = useForm({
        name: ""
    });


    console.log("project: ", projects);

    const handleAddClick = (userId) => {
        // toggle l’affichage du formulaire pour l’utilisateur cliqué
        setActiveUserId(prev => prev === userId ? null : userId);
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        role_id: "",
    });


    const handleRoleAssign = (userId) => {
        if (!data.role_id) return;

        post(
            route("projects.roles.user", { project: projects.id, user: userId }),
            {
                data: { role_id: data.role_id }, // <-- envoie les données ici
                onSuccess: () => {
                    if (onClose) onClose();
                    setActiveUserId(null);
                    reset();
                },
            }
        );

    };



    return (
        <form className="space-y-4">
            {/* 👇 Affichage des utilisateurs */}
            <div className="block-role h-auto pl-8 mt-5">
                {users && users.map(user => (
                    <div key={user.id} className="flex flex-col gap-2 mb-6">
                        <div className="flex justify-between w-full gap-[24px]">
                            <div className="flex items-center gap-3">
                                <div className='w-10 h-10 rounded-full overflow-hidden'>
                                    <img
                                        src={user.profile_photo_url || "/default-avatar.png"}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="text-gray-title-secondary text-[22px] leading-[22px] font-medium [letter-spacing:-0.05em]">
                                    {user.name}
                                </p>
                            </div>

                            <div className="gap-2 flex items-center flex-row-reverse pr-[30px]">
                                {user.roles?.map(role => (
                                    <p key={role.id} className="bg-accent rounded-lg px-3 text-white">
                                        {role.name}
                                    </p>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() => handleAddClick(user.id)}
                                className="bg-red-500 rounded-lg py-1 px-3 text-white"
                            >
                                Add
                            </button>
                        </div>

                        {/* 👇 Formulaire de sélection des rôles s'affiche si c’est l’utilisateur actif */}
                        {activeUserId === user.id && (
                            <div className="mt-2 ml-12 flex items-center gap-4">
                                <select
                                    value={data.role_id}
                                    onChange={(e) => setData("role_id", e.target.value)}
                                    className="bg-[#172227] text-white rounded-xl p-2"
                                >
                                    <option value="">-- Select Role --</option>
                                    {roles
                                        .filter(role =>
                                            !user.roles.some(userRole => userRole.id === role.id)
                                        )
                                        .map(role => (
                                            <option key={role.id} value={role.id}>{role.name}</option>
                                        ))}
                                </select>


                                <button
                                    type="button"
                                    onClick={() => handleRoleAssign(user.id)}
                                    disabled={!data.role_id || processing}
                                    className={`px-3 py-1 rounded-lg ${
                                        data.role_id ? "bg-green-500 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"
                                    }`}
                                >
                                    Confirm
                                </button>

                            </div>
                        )}

                    </div>
                ))}
            </div>

            {/* 👉 Tu peux garder ceci si tu veux afficher la liste globale des rôles */}
            <h2 className="text-xl font-bold mb-4 text-white">All Roles</h2>
            <div className="block-role h-auto pl-8 mt-5">
                {roles.map(role => (
                    <div key={role.id} className="flex justify-between w-full gap-[24px] mb-3" >
                        <p className="bg-accent rounded-lg px-3 text-white">{role.name}</p>
                    </div>
                ))}

                {!showAddRoleForm ? (
                    <button
                        type="button"
                        onClick={() => setShowAddRoleForm(true)}
                        className="bg-red-500 rounded-lg py-1 px-3 text-white mt-4"
                    >
                        Add new roles
                    </button>
                ) : (
                    <div className="mt-4 flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Nom du rôle"
                            value={newRoleData.name}
                            onChange={(e) => setNewRoleData("name", e.target.value)}
                            className="bg-[#172227] text-white rounded-xl p-2"
                        />
                        <button
                            type="button"
                            onClick={() =>
                                postNewRole(
                                    route('projects.roles.store', { id: projects.id }),
                                    {
                                        onSuccess: () => {
                                            resetNewRole();
                                            setShowAddRoleForm(false);
                                        },
                                    }
                                )
                            }
                            disabled={!newRoleData.name || newRoleProcessing}
                            className={`px-3 py-1 rounded-lg ${
                                newRoleData.name
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                            }`}
                        >
                            Confirmer
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                resetNewRole();
                                setShowAddRoleForm(false);
                            }}
                            className="text-sm text-red-300 underline"
                        >
                            Annuler
                        </button>
                    </div>
                )}
            </div>




            <div className="mt-4 flex items-center justify-end">
                <PrimaryButton
                    className="ms-4 bg-[#FFFF] text-black hover:bg-[#172227] hover:text-white transition duration-300"
                >
                    Update
                </PrimaryButton>
            </div>
        </form>
    );
}

export default ManageForm;
