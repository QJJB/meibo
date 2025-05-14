import InputError from "@/Components/Form/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import PrimaryButton from "@/Components/Form/PrimaryButton";
import TextInput from "@/Components/Form/TextInput";
import { useForm } from "@inertiajs/react";

function EditProjectForm({ project, onClose }) {
    const { data, setData, put, processing, errors } = useForm({
        name: project.name || "",
        description: project.description || "",
        start_date: project.start_date || "",
        end_date: project.end_date || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("projects.update", { id: project.id }), {
            onSuccess: () => {
                if (onClose) onClose(); // Ferme la modal après succès
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <InputLabel htmlFor="name" value="Project name" />
                <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    className="bg-[#172227] h-15 w-full rounded-xl focus:border-[#B5B5B8] focus:ring-2 focus:ring-[#B5B5B8]"
                    autoComplete="name"
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="description" value="Description" />
                <textarea
                    id="description"
                    name="description"
                    value={data.description}
                    className="bg-[#172227] h-15 w-full rounded-xl p-3 text-white focus:border-[#B5B5B8] focus:ring-2 focus:ring-[#B5B5B8]"
                    onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="start_date" value="Starting date" />
                <TextInput
                    id="start_date"
                    type="date"
                    name="start_date"
                    value={data.start_date}
                    className="bg-[#172227] h-15 w-full rounded-xl focus:border-[#B5B5B8] focus:ring-2 focus:ring-[#B5B5B8]"
                    onChange={(e) => setData("start_date", e.target.value)}
                    required
                />
                <InputError message={errors.start_date} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="end_date" value="End date" />
                <TextInput
                    id="end_date"
                    type="date"
                    name="end_date"
                    value={data.end_date}
                    className="bg-[#172227] h-15 w-full rounded-xl focus:border-[#B5B5B8] focus:ring-2 focus:ring-[#B5B5B8]"
                    onChange={(e) => setData("end_date", e.target.value)}
                    required
                />
                <InputError message={errors.end_date} className="mt-2" />
            </div>

            <div className="mt-4 flex items-center justify-end">
                <PrimaryButton
                    className="ms-4 bg-[#FFFF] text-black hover:bg-[#172227] hover:text-white transition duration-300"
                    disabled={processing}
                >
                    {processing ? "Updating..." : "Update"}
                </PrimaryButton>
            </div>
        </form>
    );
}

export default EditProjectForm;
