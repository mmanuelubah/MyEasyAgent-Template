"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
    Search, Menu, X, Home, MapPin, User as UserIcon,
    LayoutDashboard, Crown, Bell, MessageSquare,
    Heart, LogOut, Settings, HelpCircle, ChevronDown
} from "lucide-react";
import useHuntSmart from "@/hooks/useHuntSmart";
import useAuth from "@/hooks/useAuth";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { isHuntSmartActive } = useHuntSmart();
    const { user, isAuthenticated, logout } = useAuth();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const dashboardLink = user?.role === "client"
        ? "/dashboard/client"
        : user?.role === "agent"
            ? "/dashboard/agent"
            : "/register";

    const manageLabel = user?.role === "client" ? "Manage Bookings" : "Manage Listings";

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                            <Home className="text-white w-5 h-5" />
                        </div>
                        <Link href="/" className="text-xl font-bold text-gray-900 tracking-tight">
                            MyEasyAgent<span className="text-emerald-600">.</span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <div className="flex gap-6">
                            <Link href="/properties" className="text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors">Rent</Link>
                            <Link href="/properties" className="text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors">Buy</Link>
                            <Link href="/how-it-works" className="text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors">How it Works</Link>
                            <Link href="/pricing" className="text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors">Pricing</Link>
                            <Link href="/properties" className="text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors">Lease</Link>
                            <Link href="/properties" className="text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors">Commercial</Link>
                        </div>

                        <div className="h-4 w-px bg-gray-200" />

                        <div className="flex items-center gap-6">
                            {user?.role === 'agent' && (
                                <Link href="/properties" className="text-sm font-semibold text-gray-600 hover:text-emerald-600">List your Property</Link>
                            )}
                            <button className="text-gray-400 hover:text-emerald-600 transition-colors">
                                <Bell className="w-5 h-5" />
                            </button>

                            {!isAuthenticated ? (
                                <Link
                                    href="/register"
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-emerald-100"
                                >
                                    Join MyEasyAgent
                                </Link>
                            ) : (
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center gap-2 p-1 pl-3 bg-gray-50 rounded-full border border-gray-100 hover:bg-gray-100 transition-all shrink-0"
                                    >
                                        <div className="flex flex-col items-end mr-1">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter leading-none">Account</span>
                                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter leading-none mt-0.5">{user?.role}</span>
                                        </div>
                                        <img
                                            src={user?.avatar || "https://i.pravatar.cc/150"}
                                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                                            alt="Profile"
                                        />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-3 w-72 bg-white rounded-[1.5rem] border border-gray-100 shadow-2xl py-4 animate-in fade-in zoom-in duration-200 overflow-hidden">
                                            <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50 mb-2">
                                                <div className="flex items-center gap-3">
                                                    <img src={user?.avatar} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                                                    <div className="overflow-hidden">
                                                        <p className="font-black text-gray-900 truncate">{user?.name}</p>
                                                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="px-2 space-y-1">
                                                <Link
                                                    href={dashboardLink}
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-all"
                                                >
                                                    <LayoutDashboard className="w-4 h-4" />
                                                    {manageLabel}
                                                </Link>
                                                <Link
                                                    href="/properties"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-all"
                                                >
                                                    <Heart className="w-4 h-4" />
                                                    Favorite Properties
                                                </Link>
                                                <Link
                                                    href="/profile"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-all"
                                                >
                                                    <UserIcon className="w-4 h-4" />
                                                    Profile
                                                </Link>
                                                <Link
                                                    href="/about"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-all"
                                                >
                                                    <MessageSquare className="w-4 h-4" />
                                                    Share feedback
                                                </Link>
                                            </div>

                                            <div className="mt-4 pt-2 border-t border-gray-50 px-2">
                                                <button
                                                    onClick={logout}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
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
                <div className="md:hidden bg-white border-t border-gray-100 py-6 px-4 space-y-4 animate-in slide-in-from-top duration-300">
                    <div className="grid grid-cols-2 gap-3 pb-4">
                        <Link href="/properties" className="flex items-center justify-center py-3 bg-gray-50 rounded-xl font-bold text-sm">Rent</Link>
                        <Link href="/properties" className="flex items-center justify-center py-3 bg-gray-50 rounded-xl font-bold text-sm">Buy</Link>
                        <Link href="/how-it-works" className="flex items-center justify-center py-3 bg-gray-50 rounded-xl font-bold text-sm">How it Works</Link>
                        <Link href="/pricing" className="flex items-center justify-center py-3 bg-gray-50 rounded-xl font-bold text-sm">Pricing</Link>
                    </div>

                    {!isAuthenticated ? (
                        <Link href="/register" className="block w-full bg-emerald-600 text-white text-center py-4 rounded-xl font-black">Join MyEasyAgent</Link>
                    ) : (
                        <div className="space-y-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <img src={user?.avatar} className="w-12 h-12 rounded-full border-2 border-emerald-100" />
                                <div>
                                    <p className="font-black text-gray-900">{user?.name}</p>
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">{user?.role}</p>
                                </div>
                            </div>
                            <Link href={dashboardLink} className="block font-black text-gray-900">{manageLabel}</Link>
                            <Link href="/profile" className="block font-black text-gray-900">Profile</Link>
                            <button onClick={logout} className="block font-black text-red-500">Sign Out</button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
