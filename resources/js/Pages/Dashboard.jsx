import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ projects }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="mt-[15px] mb-[15px] mr-[15px] bg-red-600 rounded-[20px] shadow-sm overflow-hidden">
                <div className="p-6 text-white">
                    Saleeeeeee 
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
