import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Agenda from "@/Components/Dashboard/Agenda/Agenda";
import Projects from "@/Components/Dashboard/Projects/Projects";
import Tasks from "@/Components/Dashboard/Tasks/Tasks";

import { usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    const { tasks, projects, auth } = usePage().props;

    return (
        <AuthenticatedLayout>
            <div className="grid grid-cols-[1.6fr_1fr] grid-rows-[1fr_3fr] gap-[15px] h-[100vh] p-[15px] box-border">
                <Agenda tasks={tasks} projects={projects} auth={auth} />
                <Tasks tasks={tasks} projects={projects}/>
                <Projects projects={projects} />
            </div>
        </AuthenticatedLayout>
    );
}
