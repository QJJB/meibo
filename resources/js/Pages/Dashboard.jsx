import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AgendaDashboard from '@/Components/AgendaDashboard';
import { Head } from '@inertiajs/react';
import NewsDashboard from '@/Components/NewsDashboard';
import ProjectsDashboard from '@/Components/ProjectsDashboard';
import TasksDashboard from '@/Components/TasksDashboard';
import TaskCard from "@/Components/TaskCard.jsx";
import React from "react";
import { usePage } from '@inertiajs/react';

export default function Dashboard() {

    const { tasks, projects, creator, className } = usePage().props;

    console.log("tasks", tasks);
    console.log("creator", creator);
    console.log("project", projects);

    return (

        <AuthenticatedLayout>
            <div className="grid grid-cols-[1.6fr_1fr] grid-rows-[1fr_3fr] gap-[15px] h-[100vh] p-[15px] box-border">
                {/* Ligne 1 */}
                <AgendaDashboard />     {/* 1/4 de la hauteur = 1fr dans une grille 1fr/3fr */}
                {/* <NewsDashboard className="h-[20%]" />       1/5 = 20% de 100vh */}

                {/* Ligne 2 */}
                <TasksDashboard tasks={tasks} projects={projects}/>      {/* 4/5 = 80% */}
                <ProjectsDashboard projects={projects} />    {/* 3/4 = 3fr */}

            </div>
        </AuthenticatedLayout>

    );
}
