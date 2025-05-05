import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AgendaDashboard from '@/Components/AgendaDashboard';
import { Head } from '@inertiajs/react';
import NewsDashboard from '@/Components/NewsDashboard';
import ProjectsDashboard from '@/Components/ProjectsDashboard';
import TasksDashboard from '@/Components/TasksDashboard';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <div className="grid grid-cols-[1.6fr_1fr]  gap-[15px] mt-[15px] mb-[15px] w-[calc(100%-15px)] h-[calc(100vh-30px)]">
                <AgendaDashboard></AgendaDashboard>
                <NewsDashboard></NewsDashboard>
                <ProjectsDashboard></ProjectsDashboard>
                <TasksDashboard></TasksDashboard>
            </div>
        </AuthenticatedLayout>
    );
}
