"use client";

import { Search, MapPin, Home, DollarSign } from "lucide-react";
import { useState } from "react";

export default function Hero() {
    const [search, setSearch] = useState("");

    return (
        <div className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
            {/* Background with Gradient Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80')" }}
            >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-600/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-500/30 backdrop-blur-md">
                        The Future of Real Estate
                    </span>
                    <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-[1.1]">
                        Find Your Dream Home <br />
                        <span className="text-emerald-400 italic font-serif">Smarter</span> and Faster.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Over 50,000 premium listings verified by HuntSmart technology. Experience a seamless property journey.
                    </p>

                    {/* Search Box */}
                    <div className="bg-white p-2 md:p-3 rounded-2xl md:rounded-3xl shadow-2xl max-w-4xl mx-auto border border-gray-100 flex flex-col md:flex-row gap-2">
                        <div className="flex-1 flex items-center px-4 py-3 md:py-0 border-b md:border-b-0 md:border-r border-gray-100">
                            <MapPin className="w-5 h-5 text-emerald-600 mr-3" />
                            <input
                                type="text"
                                placeholder="Where in Lagos (e.g. Lekki, Ikeja)?"
                                className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400 font-medium"
                            />
                        </div>
                        <div className="flex-1 flex items-center px-4 py-3 md:py-0 border-b md:border-b-0 md:border-r border-gray-100">
                            <Home className="w-5 h-5 text-emerald-600 mr-3" />
                            <select className="w-full bg-transparent outline-none text-gray-900 font-medium appearance-none cursor-pointer">
                                <option>Property Type</option>
                                <option>Residential</option>
                                <option>Commercial</option>
                                <option>Land</option>
                            </select>
                        </div>
                        <div className="flex-1 flex items-center px-4 py-3 md:py-0">
                            <DollarSign className="w-5 h-5 text-emerald-600 mr-3" />
                            <select className="w-full bg-transparent outline-none text-gray-900 font-medium appearance-none cursor-pointer">
                                <option>Price Range</option>
                                <option>₦1M - ₦50M</option>
                                <option>₦50M - ₦200M</option>
                                <option>₦200M+</option>
                            </select>
                        </div>
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl md:rounded-2xl font-bold transition-all shadow-lg hover:shadow-emerald-200 flex items-center justify-center gap-2 group">
                            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span>Search</span>
                        </button>
                    </div>

                    <div className="mt-8 flex flex-wrap justify-center gap-8 text-white/80 text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            100% Verified Agents
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            No Hidden Fees
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Premium Support
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
