import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

function CreateProjectForm() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        start_date: "",
        end_date: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("projects.store"), {
            onSuccess: () => {
                // Redirige vers le tableau de bord après la création
                window.location.href = route("dashboard");
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <InputLabel htmlFor="name" value="Nom du projet" />

                <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    className="bg-[#172227] h-15 w-full rounded-xl"
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
                    className="bg-[#172227] h-15 w-full rounded-xl p-3 text-white"
                    onChange={(e) => setData("description", e.target.value)}
                    required
                />

                <InputError message={errors.description} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="start_date" value="Date de début" />

                <TextInput
                    id="start_date"
                    type="date"
                    name="start_date"
                    value={data.start_date}
                    className="bg-[#172227] h-15 w-full rounded-xl"
                    onChange={(e) => setData("start_date", e.target.value)}
                    required
                />

                <InputError message={errors.start_date} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="end_date" value="Date de fin" />

                <TextInput
                    id="end_date"
                    type="date"
                    name="end_date"
                    value={data.end_date}
                    className="bg-[#172227] h-15 w-full rounded-xl"
                    onChange={(e) => setData("end_date", e.target.value)}
                    required
                />

                <InputError message={errors.end_date} className="mt-2" />
            </div>

            <div className="mt-4 flex items-center justify-end">
                <PrimaryButton className="ms-4 bg-[#FFFF] text-black" disabled={processing}>
                    {processing ? "Création en cours..." : "Créer"}
                </PrimaryButton>
            </div>
        </form>
    );
}

export default CreateProjectForm;
