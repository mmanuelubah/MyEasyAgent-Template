"use client";

import { useState, useRef, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { Search, MapPin, Home, DollarSign, Users, ChevronDown, ArrowRight, Check } from "lucide-react";

export default function Hero() {
    const [activeTab, setActiveTab] = useState("Rent");
    const { user } = useAuth();
    const tabs = ["Buy", "Rent", "Lease", "Commercial"];

    // Filter States
    const [location, setLocation] = useState("");
    const [propType, setPropType] = useState("Any Type");
    const [beds, setBeds] = useState("Beds / Baths");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    // Dropdown UI States
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    // Calculate profile completion percentage for Clients/Agents
    const isClient = user?.role === "client";
    const isAgent = user?.role === "agent";
    const isIncomplete = (isClient || isAgent) && !user?.isProfileComplete;
    const completionPercentage = user?.pledgeAccepted || user?.personalDetails ? 66 : 33;

    const promptMessage = isAgent
        ? "Complete profile before you can list"
        : "Complete your profile to start hunting";

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const formatMoney = (value: string) => {
        const digits = value.replace(/\D/g, "");
        if (!digits) return "";
        return parseInt(digits).toLocaleString('en-US');
    };

    const toggleDropdown = (id: string) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    const propertyTypes = ["Any Type", "Apartment", "Terrace", "Duplex", "Mansion", "Office Space"];
    const bedOptions = ["1+ Beds", "2+ Beds", "3+ Beds", "4+ Beds", "5+ Beds"];

    return (
        <div className="relative min-h-[calc(100dvh-4rem)] flex items-center justify-center overflow-hidden py-16 md:py-20">
            {/* Background with Gradient Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80')" }}
            >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 text-center">
                {isIncomplete && (
                    <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                        <Link
                            href="/profile"
                            className="inline-flex items-center gap-4 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all group shadow-2xl"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-12 h-1.5 bg-white/20 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-500 transition-all duration-1000 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                        style={{ width: `${completionPercentage}%` }}
                                    />
                                </div>
                                <span className="text-xs font-black text-white">{completionPercentage}% Complete</span>
                            </div>
                            <div className="w-px h-4 bg-white/20" />
                            <span className="text-xs font-bold text-emerald-300 group-hover:text-emerald-200 transition-colors flex items-center gap-1">
                                {promptMessage} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                    </div>
                )}

                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto">
                    <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-[1.1] font-outfit drop-shadow-xl">
                        Find your preferred property <br />
                        in <span className="text-emerald-400">3 clicks</span> not months
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md">
                        Exact Locations. Real Developers. Verified Agents.
                    </p>

                    {/* Search Section */}
                    <div className="max-w-[70rem] mx-auto" ref={searchRef}>
                        {/* Tabs */}
                        <div className="flex justify-center mb-6">
                            <div className="inline-flex p-1.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-xl overflow-x-auto w-full md:w-auto scrollbar-hide">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-shrink-0 px-8 py-3 rounded-full text-sm font-bold transition-all active-scale ${activeTab === tab
                                            ? "bg-white text-emerald-600 shadow-lg scale-100"
                                            : "text-white hover:bg-white/20 hover:text-white"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Search Bar container */}
                        <div className="bg-white p-3 rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col md:flex-row items-stretch gap-2 relative">

                            {/* Location Input */}
                            <div className="flex-[1.2] flex items-center px-6 py-3 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50/50 transition-colors rounded-3xl cursor-text relative group">
                                <MapPin className="w-5 h-5 text-emerald-600 mr-4 shrink-0 group-focus-within:scale-110 transition-transform" />
                                <div className="flex-1 text-left">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Where to?</span>
                                    <input
                                        type="text"
                                        placeholder="City, Neighborhood, or specific area"
                                        className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-300 font-bold text-sm"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        onFocus={() => setActiveDropdown(null)}
                                    />
                                </div>
                            </div>

                            {/* Property Type Custom Dropdown */}
                            <div
                                className="flex-1 flex items-center px-6 py-3 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50/50 transition-colors rounded-3xl cursor-pointer relative group"
                                onClick={() => toggleDropdown('type')}
                            >
                                <Home className="w-5 h-5 text-emerald-600 mr-4 shrink-0 group-hover:scale-110 transition-transform" />
                                <div className="flex-1 text-left">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Property</span>
                                    <div className="text-gray-900 font-bold text-sm truncate pr-4">{propType}</div>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-gray-400 absolute right-4 transition-transform ${activeDropdown === 'type' ? 'rotate-180' : ''}`} />

                                {activeDropdown === 'type' && (
                                    <div className="absolute top-[calc(100%+1rem)] left-0 w-64 bg-white rounded-3xl p-3 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200 z-50 text-left" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex flex-col space-y-1">
                                            {propertyTypes.map((type) => (
                                                <button
                                                    key={type}
                                                    onClick={() => { setPropType(type); setActiveDropdown(null); }}
                                                    className={`py-3 px-4 rounded-2xl text-sm font-bold flex justify-between items-center transition-all ${propType === type ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-gray-50 text-gray-700'}`}
                                                >
                                                    {type}
                                                    {propType === type && <Check className="w-4 h-4 text-emerald-600" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Beds & Baths */}
                            <div
                                className="flex-[0.8] flex items-center px-6 py-3 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50/50 transition-colors rounded-3xl cursor-pointer relative group"
                                onClick={() => toggleDropdown('beds')}
                            >
                                <Users className="w-5 h-5 text-emerald-600 mr-4 shrink-0 group-hover:scale-110 transition-transform" />
                                <div className="flex-1 text-left">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Space</span>
                                    <div className="text-gray-900 font-bold text-sm truncate pr-4">{beds}</div>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-gray-400 absolute right-4 transition-transform ${activeDropdown === 'beds' ? 'rotate-180' : ''}`} />

                                {activeDropdown === 'beds' && (
                                    <div className="absolute top-[calc(100%+1rem)] right-0 md:left-0 w-56 bg-white rounded-3xl p-3 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200 z-50 text-left" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex flex-col space-y-1">
                                            <button
                                                onClick={() => { setBeds("Any Space"); setActiveDropdown(null); }}
                                                className={`py-3 px-4 rounded-2xl text-sm font-bold flex justify-between items-center transition-all ${beds === "Any Space" ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-gray-50 text-gray-700'}`}
                                            >
                                                Any Space
                                                {beds === "Any Space" && <Check className="w-4 h-4 text-emerald-600" />}
                                            </button>
                                            {bedOptions.map((opt) => (
                                                <button
                                                    key={opt}
                                                    onClick={() => { setBeds(opt); setActiveDropdown(null); }}
                                                    className={`py-3 px-4 rounded-2xl text-sm font-bold flex justify-between items-center transition-all ${beds === opt ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-gray-50 text-gray-700'}`}
                                                >
                                                    {opt}
                                                    {beds === opt && <Check className="w-4 h-4 text-emerald-600" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Price Custom Editor */}
                            <div
                                className="flex-1 flex items-center px-6 py-3 mr-0 md:mr-2 hover:bg-gray-50/50 transition-colors rounded-3xl cursor-pointer relative group"
                                onClick={() => toggleDropdown('price')}
                            >
                                <DollarSign className="w-5 h-5 text-emerald-600 mr-4 shrink-0 group-hover:scale-110 transition-transform" />
                                <div className="flex-1 text-left">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Budget</span>
                                    <div className="text-gray-900 font-bold text-sm truncate pr-4">
                                        {minPrice || maxPrice
                                            ? `${minPrice ? '₦' + minPrice : '₦0'} - ${maxPrice ? '₦' + maxPrice : 'Max'}`
                                            : "Any Price"}
                                    </div>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-gray-400 absolute right-4 transition-transform ${activeDropdown === 'price' ? 'rotate-180' : ''}`} />

                                {activeDropdown === 'price' && (
                                    <div className="absolute top-[calc(100%+1rem)] right-0 mt-2 w-80 bg-white rounded-[2rem] p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200 z-50 text-left origin-top-right md:origin-top" onClick={(e) => e.stopPropagation()}>
                                        <h3 className="text-sm font-black text-gray-900 mb-6 font-outfit">Set Price Range</h3>
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="flex-1">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Min (₦)</label>
                                                <input
                                                    type="text"
                                                    placeholder="0"
                                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-200 focus:bg-white rounded-2xl px-4 py-3 text-sm font-bold text-gray-900 outline-none transition-all placeholder:text-gray-300 shadow-inner"
                                                    value={minPrice}
                                                    onChange={(e) => setMinPrice(formatMoney(e.target.value))}
                                                />
                                            </div>
                                            <div className="w-4 h-px bg-gray-300 mt-6" />
                                            <div className="flex-1">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Max (₦)</label>
                                                <input
                                                    type="text"
                                                    placeholder="Any"
                                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-200 focus:bg-white rounded-2xl px-4 py-3 text-sm font-bold text-gray-900 outline-none transition-all placeholder:text-gray-300 shadow-inner"
                                                    value={maxPrice}
                                                    onChange={(e) => setMaxPrice(formatMoney(e.target.value))}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 mb-6">
                                            {["5,000,000", "10,000,000", "30,000,000+", "Any"].map(preset => (
                                                <button
                                                    key={preset}
                                                    onClick={() => preset === 'Any' ? (setMinPrice(''), setMaxPrice('')) : setMaxPrice(preset.replace('+', ''))}
                                                    className="py-2 px-3 text-xs font-bold text-gray-600 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors text-center"
                                                >
                                                    {preset === 'Any' ? 'Clear' : '₦' + preset}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => setActiveDropdown(null)}
                                            className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active-scale"
                                        >
                                            Apply Filter
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Search Button */}
                            <Link href="/properties" className="bg-emerald-600 hover:bg-emerald-700 text-white w-full md:w-20 h-16 md:h-20 rounded-[2rem] flex items-center justify-center self-center transition-all shadow-xl shadow-emerald-900/20 group shrink-0 active-scale mt-2 md:mt-0">
                                <Search className="w-7 h-7 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
                            </Link>
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

