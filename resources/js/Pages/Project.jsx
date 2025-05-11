import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AgendaDashboard from '@/Components/AgendaDashboard';
import { Head, usePage } from '@inertiajs/react'; // <-- ajoute usePage ici
import NewsDashboard from '@/Components/NewsDashboard';
import TasksDashboard from '@/Components/TasksDashboard';
import TaskCard from "@/Components/TaskCard.jsx";
import ProjectDescriptionDashboard from '@/Components/ProjectDashboard/ProjectDescriptionDashboard';
import ProjectsDashboard from '@/Components/ProjectsDashboard';
import RoleDashboard from '@/Components/RoleDashboard';
import React from "react";


export default function Project() {

    const { projects, users, tasks, roles } = usePage().props;

    return (

        <AuthenticatedLayout>
            <div className="grid grid-cols-[1.6fr_1fr] grid-rows-[1fr_3fr] gap-[15px] h-[calc(100vh-30px)] p-[15px] box-border">
                {/* Ligne 1 */}
                <ProjectDescriptionDashboard projects={projects} roles={roles} users={users}/>
                <RoleDashboard users={users}/>
                {/* Ligne 2 */}
                <div className='bg-red-500 w-full h-full'></div>
                <TasksDashboard className="h-[80%]" />

            </div>
        </AuthenticatedLayout>
    );

}
