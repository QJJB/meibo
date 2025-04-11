import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="space-y-[15px] space-x-[15px] mt-[15px] mb-[15px] mr-[15px] bg-red-500 ] w-[calc(100%-15px)] h-[calc(100vh-30px)]">
            </div>
        </AuthenticatedLayout>
    );
}
