import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Agenda from "@/Components/Dashboard/Agenda/Agenda";
import Projects from "@/Components/Dashboard/Projects/Projects";
import Tasks from "@/Components/Dashboard/Tasks/Tasks";

import { Head, usePage, useRemember } from "@inertiajs/react";

export default function Dashboard() {
    const { tasks, projects, auth } = usePage().props;

    const [localTasks, setLocalTasks] = useRemember(tasks, "tasks");
    const [localProjects, setLocalProjects] = useRemember(projects, "projects");

    return (
        <AuthenticatedLayout>
            <Head title={`Dashboard`} />
            <div className="grid grid-cols-[2fr_1fr] grid-rows-[1fr_3fr] gap-[15px] h-[100vh] p-[15px] box-border">
                <Agenda tasks={localTasks} projects={localProjects} auth={auth} />
                <Tasks tasks={localTasks} projects={localProjects} />
                <Projects projects={localProjects} />
            </div>
        </AuthenticatedLayout>
    );
}
