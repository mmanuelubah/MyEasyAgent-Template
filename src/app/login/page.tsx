"use client";

import { Home, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");

    const handleLogin = (e: React.FormEvent, role: 'client' | 'agent' | 'landlord') => {
        e.preventDefault();
        // In a real app, this would validate credentials
        router.push(`/dashboard/${role}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4 py-12">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center transform rotate-3 shadow-lg mb-4">
                        <Home className="text-white w-7 h-7 -rotate-3" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h2>
                    <p className="text-gray-500 mt-2">Sign in to manage your property hunt in Lagos.</p>
                </div>

                {/* Demo Selection */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 mb-6">
                    <form className="space-y-6">
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl outline-none focus:ring-2 ring-emerald-600/20 text-gray-900 font-medium transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl outline-none focus:ring-2 ring-emerald-600/20 text-gray-900 font-medium transition-all"
                                />
                            </div>
                        </div>

                        <div className="pt-2 space-y-3">
                            <button
                                onClick={(e) => handleLogin(e, 'client')}
                                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                            >
                                Sign In as Client <ArrowRight className="w-5 h-5" />
                            </button>
                            <button
                                onClick={(e) => handleLogin(e, 'landlord')}
                                className="w-full bg-white border-2 border-emerald-600 text-emerald-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-50 transition-all"
                            >
                                Sign In as Landlord
                            </button>
                            <button
                                onClick={(e) => handleLogin(e, 'agent')}
                                className="w-full bg-white border-2 border-gray-100 text-gray-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
                            >
                                Sign In as Agent
                            </button>
                        </div>
                    </form>
                </div>

                <p className="text-center text-sm text-gray-500">
                    Don't have an account? <Link href="/register" className="text-emerald-600 font-bold hover:underline">Create an account</Link>
                </p>
            </div>
        </div>
    );
}
