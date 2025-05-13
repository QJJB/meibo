import InputError from "@/Components/Form/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import PrimaryButton from "@/Components/Form/PrimaryButton";
import TextInput from "@/Components/Form/TextInput";
import { useForm } from "@inertiajs/react";

function CreateProjectForm() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        colors: "#F7D539",
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
                    required
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

            <div className="mt-4">
                <InputLabel value="Project color" />

                <div className="flex gap-6 mt-2 text-white">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="color"
                            value="#F7D539"
                            checked={data.color === "#F7D539"}
                            onChange={(e) => setData("color", e.target.value)}
                            className="mr-2"
                        />
                        Yellow
                    </label>

                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="color"
                            value="#C099F2"
                            checked={data.color === "#C099F2"}
                            onChange={(e) => setData("color", e.target.value)}
                            className="mr-2"
                        />
                        Purple
                    </label>

                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="color"
                            value="#FF7DA9"
                            checked={data.color === "#FF7DA9"}
                            onChange={(e) => setData("color", e.target.value)}
                            className="mr-2"
                        />
                        Pink
                    </label>
                </div>

                <InputError message={errors.color} className="mt-2" />
            </div>


            <div className="mt-4 flex items-center justify-end">
                <PrimaryButton
                    className="ms-4 bg-[#FFFF] text-black  hover:bg-[#172227]  hover:text-white transition duration-300"
                    disabled={processing}
                >
                    {processing ? "Creation in progress..." : "Create"}
                </PrimaryButton>
            </div>
        </form>
    );
}

export default CreateProjectForm;
