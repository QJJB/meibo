import { Head, usePage } from "@inertiajs/react"; // <-- ajoute usePage ici
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Description from "@/Components/Project/Description/Description";
import Team from "@/Components/Project/Team/Team";
<<<<<<< HEAD
import CreateTaskButton from "@/Components/Dashboard/Tasks/CreateTaskButton";
=======
import Tasks from "@/Components/Project/Tasks/Tasks";
>>>>>>> c4369e51ed92588c985a3e230a22aaa56ba82b60

export default function Project() {
    const { projects, users, tasks, roles } = usePage().props;
    return (
        <AuthenticatedLayout>
            <div className="grid grid-cols-[1.6fr_1fr] grid-rows-[1fr_3fr] gap-[15px] h-[100vh] p-[15px] box-border">
                <Description
                    projects={projects}
                    roles={roles}
                    users={users}
                />
                <Team users={users} />
<<<<<<< HEAD
                {/* Ligne 2 */}
                <div className="bg-red-500 w-full h-full"></div>
                 <CreateTaskButton projectId={projects.id} users={users} />
                 <TasksDashboard projectId={projects.id} users={users} className="h-[80%]" />
=======
                <Tasks />
>>>>>>> c4369e51ed92588c985a3e230a22aaa56ba82b60
            </div>
        </AuthenticatedLayout>
    );
}
