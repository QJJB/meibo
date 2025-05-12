import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react"; // <-- ajoute usePage ici
import TasksDashboard from "@/Components/Dashboard/Tasks/Tasks";
import Description from "@/Components/Project/Description/Description";
import Team from "@/Components/Project/Team/Team";

export default function Project() {
    const { projects, users, tasks, roles } = usePage().props;

    return (
        <AuthenticatedLayout>
            <div className="grid grid-cols-[1.6fr_1fr] grid-rows-[1fr_3fr] gap-[15px] h-[calc(100vh-30px)] p-[15px] box-border">
                {/* Ligne 1 */}
                <Description
                    projects={projects}
                    roles={roles}
                    users={users}
                />
                <Team users={users} />
                {/* Ligne 2 */}
                <div className="bg-red-500 w-full h-full"></div>
                <TasksDashboard className="h-[80%]" />
            </div>
        </AuthenticatedLayout>
    );
}
