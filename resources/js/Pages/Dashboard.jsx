import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="mt-[15px] mb-[15px] mr-[15px] bg-dark-secondary rounded-[20px] shadow-sm overflow-hidden w-[calc(100%-15px)] h-[calc(100vh-30px)]">
    <div className="p-6 text-white">
        Saleeeeeee 
    </div>
</div>
        </AuthenticatedLayout>
    );
}
