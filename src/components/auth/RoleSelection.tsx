"use client";

import { User, Building2, Home as HomeIcon, ArrowRight } from "lucide-react";
import useAuth, { UserRole } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function RoleSelection() {
    const { setRole } = useAuth();
    const router = useRouter();

    const handleRoleSelect = (role: UserRole) => {
        setRole(role);
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 animate-in fade-in duration-700">
            <div className="max-w-5xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-black text-gray-900 mb-4">Complete Your Profile</h1>
                    <p className="text-xl text-gray-500">How would you like to use MyEasyAgent?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Client Role */}
                    <button
                        onClick={() => handleRoleSelect("client")}
                        className="group bg-white rounded-[2.5rem] p-10 border-2 border-gray-100 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all text-left"
                    >
                        <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-all">
                            <User className="w-10 h-10 text-blue-600 group-hover:text-white transition-all" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-3">I'm Looking for a Home</h2>
                        <p className="text-gray-500 mb-6 text-sm">Find verified properties and manage your bookings effortlessly.</p>
                        <div className="flex items-center gap-2 text-emerald-600 font-bold group-hover:gap-4 transition-all">
                            Select Role <ArrowRight className="w-5 h-5" />
                        </div>
                    </button>

                    {/* Agent Role */}
                    <button
                        onClick={() => handleRoleSelect("agent")}
                        className="group bg-white rounded-[2.5rem] p-10 border-2 border-gray-100 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all text-left"
                    >
                        <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-all">
                            <Building2 className="w-10 h-10 text-emerald-600 group-hover:text-white transition-all" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-3">I'm an Agent / Owner</h2>
                        <p className="text-gray-500 mb-6 text-sm">List properties, manage viewings, and close deals. For agents, owners, and property managers.</p>
                        <div className="flex items-center gap-2 text-emerald-600 font-bold group-hover:gap-4 transition-all">
                            Select Role <ArrowRight className="w-5 h-5" />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
