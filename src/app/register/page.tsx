"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Github } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import RoleSelection from "@/components/auth/RoleSelection";

export default function RegisterPage() {
    const [step, setStep] = useState<"signup" | "role">("signup");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock signup
        login(email);
        setStep("role");
    };

    if (step === "role") {
        return <RoleSelection />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 border-2 border-gray-100 shadow-2xl shadow-emerald-100/20">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-gray-900 mb-2">Create Account</h1>
                    <p className="text-gray-500">Join the smarter way to find properties</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-6">
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2 uppercase tracking-widest">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-100 py-4 pl-12 pr-4 rounded-2xl outline-none focus:border-emerald-500 transition-all font-medium"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2 uppercase tracking-widest">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-100 py-4 pl-12 pr-4 rounded-2xl outline-none focus:border-emerald-500 transition-all font-medium"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                    >
                        Sign Up <ArrowRight className="w-5 h-5" />
                    </button>
                </form>

                <div className="mt-8">
                    <div className="relative flex items-center justify-center mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <span className="relative bg-white px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Or continue with</span>
                    </div>

                    <button
                        onClick={() => handleSignup({ preventDefault: () => { } } as any)}
                        className="w-full bg-white border border-gray-100 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all"
                    >
                        <img src="https://www.google.com/favicon.ico" className="w-5 h-5" />
                        Google Account
                    </button>
                </div>

                <p className="text-center mt-10 text-gray-500 text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="text-emerald-600 font-bold hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
