import { Head, usePage } from "@inertiajs/react"; // <-- ajoute usePage ici
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Description from "@/Components/Project/Description/Description";
import Team from "@/Components/Project/Team/Team";
import Tasks from "@/Components/Project/Tasks/Tasks";

export default function Project() {
    const { projects, users, tasks, roles, tasksTodo, tasksInProgress, tasksDone } = usePage().props;

    return (
        <AuthenticatedLayout>
            <div className="grid grid-cols-[2fr_1fr] grid-rows-[1fr_3fr] gap-[15px] h-[100vh] p-[15px] box-border">
                <Description
                    projects={projects}
                    roles={roles}
                    users={users}
                />
                <Team users={users} />
                <Tasks users={users} roles={roles} projectId={projects.id} tasksTodo={tasksTodo} tasksInProgress={tasksInProgress} tasksDone={tasksDone}/>
            </div>
        </AuthenticatedLayout>
    );
}
