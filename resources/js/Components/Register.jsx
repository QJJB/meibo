import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Components/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register({ handleNavButton }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <button className="text-3xl text-white font-medium mb-3 mr-1.5 ">
               register
            </button>
            <span className="text-3xl font-medium text-[#46484C]">| </span>
            <button
                className="text-3xl font-medium text-[#46484C] cursor-pointer hover:text-white transition duration-300"
                onClick={(e) => {
                    handleNavButton("login");
                }}
            >
                login
            </button>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

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
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="bg-[#172227] h-15 w-full rounded-xl focus:border-[#B5B5B8] focus:ring-2 focus:ring-[#B5B5B8]"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="bg-[#172227] h-15 w-full rounded-xl focus:border-[#B5B5B8] focus:ring-2 focus:ring-[#B5B5B8]"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="bg-[#172227] h-15 w-full rounded-xl focus:border-[#B5B5B8] focus:ring-2 focus:ring-[#B5B5B8]"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <a
                    href="#"
                    className="z-20 text-sm mb-3 font-semibold tracking-tight text-[#868688] hover:text-white cursor-pointer"
                >
                    already registered?
                </a>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
