"use client";

import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { Search, MapPin, Home, DollarSign, Users, ChevronDown, ArrowRight } from "lucide-react";

export default function Hero() {
    const [activeTab, setActiveTab] = useState("Rent");
    const { user } = useAuth();
    const tabs = ["Buy", "Rent", "Lease", "Commercial"];

    // Calculate profile completion percentage for Clients/Agents
    const isClient = user?.role === "client";
    const isAgent = user?.role === "agent";
    const isIncomplete = (isClient || isAgent) && !user?.isProfileComplete;
    const completionPercentage = user?.pledgeAccepted || user?.personalDetails ? 66 : 33;

    const promptMessage = isAgent
        ? "Complete profile before you can list"
        : "Complete your profile to start hunting";

    return (
        <div className="relative h-[650px] md:h-[750px] flex items-center justify-center overflow-hidden">
            {/* Background with Gradient Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80')" }}
            >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
                {isIncomplete && (
                    <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                        <Link
                            href="/profile"
                            className="inline-flex items-center gap-4 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all group"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-12 h-1.5 bg-white/20 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-500 transition-all duration-1000"
                                        style={{ width: `${completionPercentage}%` }}
                                    />
                                </div>
                                <span className="text-xs font-black text-white">{completionPercentage}% Complete</span>
                            </div>
                            <div className="w-px h-4 bg-white/20" />
                            <span className="text-xs font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors flex items-center gap-1">
                                {promptMessage} <ArrowRight className="w-3 h-3" />
                            </span>
                        </Link>
                    </div>
                )}

                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-[1.1] font-outfit">
                        Find your preferred property <br />
                        in <span className="text-emerald-400">3 clicks</span> not months
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                        Exact Locations. Real Developers. Verified Agents.
                    </p>

                    {/* Search Section */}
                    <div className="max-w-4xl mx-auto">
                        {/* Tabs */}
                        <div className="inline-flex p-1.5 bg-white/20 backdrop-blur-xl rounded-full mb-4 border border-white/20">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === tab
                                        ? "bg-white text-emerald-600 shadow-lg"
                                        : "text-white hover:bg-white/10"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <div className="bg-white p-2 rounded-[2rem] shadow-2xl border border-gray-100 flex flex-col md:flex-row items-stretch gap-2">
                            <div className="flex-[1.2] flex flex-col items-start px-6 py-3 border-r border-gray-100">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Location</span>
                                <div className="flex items-center w-full">
                                    <MapPin className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                                    <input
                                        type="text"
                                        placeholder="Location"
                                        className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400 font-bold text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col items-start px-6 py-3 border-r border-gray-100">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Property Type</span>
                                <div className="flex items-center w-full group cursor-pointer">
                                    <Home className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                                    <select className="flex-1 bg-transparent outline-none text-gray-900 font-bold text-sm appearance-none cursor-pointer">
                                        <option>Any</option>
                                        <option>Apartment</option>
                                        <option>House</option>
                                        <option>Office</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col items-start px-6 py-3 border-r border-gray-100">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Beds & Baths</span>
                                <div className="flex items-center w-full cursor-pointer">
                                    <Users className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                                    <select className="flex-1 bg-transparent outline-none text-gray-900 font-bold text-sm appearance-none cursor-pointer">
                                        <option>Beds / Baths</option>
                                        <option>1+ Beds</option>
                                        <option>2+ Beds</option>
                                        <option>3+ Beds</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col items-start px-6 py-3 mr-2">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Price</span>
                                <div className="flex items-center w-full cursor-pointer">
                                    <DollarSign className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                                    <select className="flex-1 bg-transparent outline-none text-gray-900 font-bold text-sm appearance-none cursor-pointer">
                                        <option>Price Range</option>
                                        <option>₦1M - ₦5M</option>
                                        <option>₦5M - ₦20M</option>
                                        <option>₦20M+</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
                                </div>
                            </div>

                            <button className="bg-emerald-500 hover:bg-emerald-600 text-white w-full md:w-16 h-16 rounded-[1.5rem] flex items-center justify-center self-center transition-all shadow-lg shadow-emerald-200 group shrink-0">
                                <Search className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-wrap justify-center gap-10 text-white/90 text-sm font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            100% Verified Agents
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            Secure Payments
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            24/7 Support
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
