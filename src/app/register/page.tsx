"use client";

import Link from "next/link";
import { User, Building2, Home, ArrowRight } from "lucide-react";

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-5xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-black text-gray-900 mb-4">Join MyEasyAgent</h1>
                    <p className="text-xl text-gray-500">Choose how you want to get started</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Client Registration */}
                    <Link
                        href="/register/client"
                        className="group bg-white rounded-[2.5rem] p-10 border-2 border-gray-100 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all"
                    >
                        <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-all">
                            <User className="w-10 h-10 text-blue-600 group-hover:text-white transition-all" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-3">I'm Looking for a Home</h2>
                        <p className="text-gray-500 mb-6">Find verified properties with HuntSmart Pass</p>
                        <div className="flex items-center gap-2 text-emerald-600 font-bold group-hover:gap-4 transition-all">
                            Get Started <ArrowRight className="w-5 h-5" />
                        </div>
                    </Link>

                    {/* Agent Registration */}
                    <Link
                        href="/register/agent"
                        className="group bg-white rounded-[2.5rem] p-10 border-2 border-gray-100 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all"
                    >
                        <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-all">
                            <Building2 className="w-10 h-10 text-emerald-600 group-hover:text-white transition-all" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-3">I'm an Agent</h2>
                        <p className="text-gray-500 mb-6">List properties and earn commissions</p>
                        <div className="flex items-center gap-2 text-emerald-600 font-bold group-hover:gap-4 transition-all">
                            Register Now <ArrowRight className="w-5 h-5" />
                        </div>
                    </Link>

                    {/* Landlord Registration */}
                    <Link
                        href="/register/landlord"
                        className="group bg-white rounded-[2.5rem] p-10 border-2 border-gray-100 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all"
                    >
                        <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-amber-600 transition-all">
                            <Home className="w-10 h-10 text-amber-600 group-hover:text-white transition-all" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-3">I'm a Landlord</h2>
                        <p className="text-gray-500 mb-6">List your property directly</p>
                        <div className="flex items-center gap-2 text-emerald-600 font-bold group-hover:gap-4 transition-all">
                            List Property <ArrowRight className="w-5 h-5" />
                        </div>
                    </Link>
                </div>

                <div className="text-center mt-12">
                    <p className="text-gray-500">
                        Already have an account?{' '}
                        <Link href="/login" className="text-emerald-600 font-bold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
