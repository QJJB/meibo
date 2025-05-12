import InputError from "@/Components/Form/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import PrimaryButton from "@/Components/Form/PrimaryButton";
import TextInput from "@/Components/Form/TextInput";
import { useForm } from "@inertiajs/react";

function CreateTaskForm({ users }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        type: "task",
        description: "",
        due_date: "",
        priority: "1",
        status: "todo",
        user_id: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("tasks.store"), {
            onSuccess: () => {
                // Redirige vers la liste des tâches après la création
                window.location.href = route("tasks.index");
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <InputLabel htmlFor="title" value="Task Title" />

                <TextInput
                    id="title"
                    name="title"
                    value={data.title}
                    className="bg-[#172227] h-15 w-full rounded-xl focus:border-[#B5B5B8] focus:ring-2 focus:ring-[#B5B5B8]"
                    autoComplete="title"
                    isFocused={true}
                    onChange={(e) => setData("title", e.target.value)}
                    required
                />

                <InputError message={errors.title} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="description" value="Description" />

                <textarea
                    id="description"
                    name="description"
                    value={data.description}
                    className="bg-[#172227] h-15 w-full rounded-xl p-3 text-white focus:border-[#B5B5B8] focus:ring-2 focus:ring-[#B5B5B8]"
                    onChange={(e) => setData("description", e.target.value)}
                    required
                />

                <InputError message={errors.description} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="due_date" value="Due Date" />

                <TextInput
                    id="due_date"
                    type="date"
                    name="due_date"
                    value={data.due_date}
                    className="bg-[#172227] h-15 w-full rounded-xl focus:border-[#B5B5B8] focus:ring-2 focus:ring-[#B5B5B8]"
                    onChange={(e) => setData("due_date", e.target.value)}
                    required
                />

                <InputError message={errors.due_date} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="type" value="Type" />

                <select
                    id="type"
                    name="type"
                    value={data.type}
                    className="bg-[#172227] h-15 w-full rounded-xl p-3 text-white focus:border-[#B5B5B8] focus:ring-2 focus:ring-[#B5B5B8]"
                    onChange={(e) => setData("type", e.target.value)}
                    required
                >
                    <option value="task">Task</option>
                    <option value="event">Event</option>
                </select>

                <InputError message={errors.type} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="priority" value="Priority" />

                <select
                    id="priority"
                    name="priority"
                    value={data.priority}
                    className="bg-[#172227] h-15 w-full rounded-xl p-3 text-white focus:border-[#B5B5B8] focus:ring-2 focus:ring-[#B5B5B8]"
                    onChange={(e) => setData("priority", e.target.value)}
                    required
                >
                    <option value="1">Low</option>
                    <option value="2">Medium</option>
                    <option value="3">High</option>
                </select>

                <InputError message={errors.priority} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="status" value="Status" />

                <select
                    id="status"
                    name="status"
                    value={data.status}
                    className="bg-[#172227] h-15 w-full rounded-xl p-3 text-white focus:border-[#B5B5B8] focus:ring-2 focus:ring-[#B5B5B8]"
                    onChange={(e) => setData("status", e.target.value)}
                    required
                >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                </select>

                <InputError message={errors.status} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="user_id" value="Assigned User" />

                <select
                    id="user_id"
                    name="user_id"
                    value={data.user_id}
                    className="bg-[#172227] h-15 w-full rounded-xl p-3 text-white focus:border-[#B5B5B8] focus:ring-2 focus:ring-[#B5B5B8]"
                    onChange={(e) => setData("user_id", e.target.value)}
                >
                    <option value="">No user</option>
                    {/* {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option> */}
                    {/* ))} */}
                </select>

                <InputError message={errors.user_id} className="mt-2" />
            </div>

            <div className="mt-4 flex items-center justify-end">
                <PrimaryButton
                    className="ms-4 bg-[#FFFF] text-black hover:bg-[#172227]  hover:text-white transition duration-300"
                    disabled={processing}
                >
                    {processing ? "Creation in progress..." : "Create Task"}
                </PrimaryButton>
            </div>
        </form>
    );
}

export default CreateTaskForm;
