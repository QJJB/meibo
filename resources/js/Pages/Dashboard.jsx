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

    const { tasks } = usePage().props;

    return (

        <AuthenticatedLayout>
            <div className="grid grid-cols-[1.6fr_1fr] grid-rows-[1fr_3fr] gap-[15px] h-[calc(100vh-30px)] p-[15px] box-border">
                {/* Ligne 1 */}
                <AgendaDashboard className="h-full" />     {/* 1/4 de la hauteur = 1fr dans une grille 1fr/3fr */}
                <NewsDashboard className="h-[20%]" />       {/* 1/5 = 20% de 100vh */}

                {/* Ligne 2 */}
                <ProjectsDashboard className="h-full" />    {/* 3/4 = 3fr */}
                <TasksDashboard tasks={tasks} className="h-[80%]" />      {/* 4/5 = 80% */}

            </div>
        </AuthenticatedLayout>

    );
}
