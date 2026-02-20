"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X, Home, MapPin, User, LayoutDashboard, Crown } from "lucide-react";
import useHuntSmart from "@/hooks/useHuntSmart";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { isHuntSmartActive, signOut } = useHuntSmart();

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center transform rotate-3 shadow-md">
                            <Home className="text-white w-5 h-5 -rotate-3" />
                        </div>
                        <Link href="/" className="text-xl font-bold text-gray-900 tracking-tight">
                            MyEasyAgent<span className="text-emerald-600">.</span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/properties" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">Properties</Link>
                        <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">About Us</Link>

                        <div className="h-4 w-px bg-gray-200" />

                        {/* Demo Dashboard Links */}
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard/client" className="text-xs font-bold text-gray-500 hover:text-emerald-600 uppercase tracking-wide">Client</Link>
                            <Link href="/dashboard/agent" className="text-xs font-bold text-gray-500 hover:text-emerald-600 uppercase tracking-wide">Agent</Link>
                            <Link href="/dashboard/landlord" className="text-xs font-bold text-gray-500 hover:text-emerald-600 uppercase tracking-wide">Landlord</Link>
                        </div>

                        {isHuntSmartActive && (
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-full border border-amber-100 animate-in fade-in zoom-in duration-500">
                                <Crown className="w-3 h-3 text-amber-500 fill-amber-500" />
                                <span className="text-[10px] font-black text-amber-900 uppercase tracking-tighter">HuntSmart Pass Active</span>
                            </div>
                        )}

                        <Link
                            href="/login"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-md ml-4"
                        >
                            Sign In
                        </Link>
                        <button
                            onClick={signOut}
                            className="text-xs font-black text-red-500 hover:text-red-600 uppercase tracking-tighter ml-4 flex items-center gap-1"
                        >
                            Sign Out
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-emerald-600 p-2"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 animate-in slide-in-from-top duration-300">
                    <Link href="/properties" className="block text-base font-medium text-gray-700">Find Property</Link>
                    <Link href="/about" className="block text-base font-medium text-gray-700">How it Works</Link>
                    <div className="border-t border-gray-100 pt-4">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Dashboards</p>
                        <Link href="/dashboard/client" className="block py-2 text-sm font-bold text-gray-600">Client Dashboard</Link>
                        <Link href="/dashboard/agent" className="block py-2 text-sm font-bold text-emerald-600">Agent Dashboard</Link>
                        <Link href="/dashboard/landlord" className="block py-2 text-sm font-bold text-gray-600">Landlord Dashboard</Link>
                    </div>
                    <Link href="/login" className="block w-full bg-black text-white text-center py-3 rounded-xl font-bold mt-4">Sign In</Link>
                    <button
                        onClick={signOut}
                        className="block w-full text-center py-3 text-red-500 font-bold uppercase text-xs tracking-widest"
                    >
                        Sign Out (End Test)
                    </button>
                </div>
            )}
        </nav>
    );
}
