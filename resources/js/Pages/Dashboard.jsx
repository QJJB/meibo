import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AgendaDashboard from '@/Components/AgendaDashboard';
import ProjectsDashboard from '@/Components/ProjectsDashboard';
import TasksDashboard from '@/Components/TasksDashboard';
import { usePage } from '@inertiajs/react';

import { Head } from '@inertiajs/react';
import NewsDashboard from '@/Components/NewsDashboard';
import TaskCard from "@/Components/TaskCard.jsx";

export default function Dashboard() {

    const { tasks, projects, creator, auth} = usePage().props;

    return (
        <AuthenticatedLayout>
            <div className="grid grid-cols-[1.6fr_1fr] grid-rows-[1fr_3fr] gap-[15px] h-[100vh] p-[15px] box-border">
                <AgendaDashboard tasks={tasks} projects={projects} auth={auth} />
                <TasksDashboard tasks={tasks} />
                <ProjectsDashboard projects={projects} />              
            </div>
        </AuthenticatedLayout>
    );
}
