import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import React from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const { user } = usePage().props.auth || {};  // ป้องกันการเข้าถึงจาก null หรือ undefined

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-white">  {/* เปลี่ยนพื้นหลังเป็นสีขาว */}
           
            {header && (
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* ส่วนของเนื้อหาหลัก */}
            <main>{children}</main>
        </div>
    );
}
