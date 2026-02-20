"use client";

import { properties } from "@/lib/mock-data";
import PropertyCard from "@/components/ui/PropertyCard";
import { Search, SlidersHorizontal, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function PropertiesListing() {
    const [activeType, setActiveType] = useState('All');

    const filteredProperties = activeType === 'All'
        ? properties
        : properties.filter(p => p.type === activeType);

    return (
        <div className="bg-gray-50/50 min-h-screen pb-20">
            {/* Search Header */}
            <div className="bg-white border-b border-gray-100 py-10 mb-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Explore Properties</h1>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Enter city, neighborhood, or zip code..."
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl outline-none focus:ring-2 ring-emerald-600/20 text-gray-900 font-medium transition-all"
                            />
                        </div>
                        <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all">
                            Search Properties
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Sidebar Filters */}
                    <aside className="lg:w-64 space-y-8">
                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Property Type</h3>
                            <div className="space-y-2">
                                {['All', 'Residential', 'Commercial', 'Land'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setActiveType(type)}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeType === type ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' : 'text-gray-500 hover:bg-white hover:text-gray-900'}`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-100">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Price Range</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <input type="text" placeholder="Min" className="w-full p-3 bg-white border border-gray-100 rounded-xl text-sm text-gray-900 outline-none" />
                                <input type="text" placeholder="Max" className="w-full p-3 bg-white border border-gray-100 rounded-xl text-sm text-gray-900 outline-none" />
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-100">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Status</h3>
                            <div className="flex flex-col gap-3">
                                {['For Sale', 'For Rent'].map((status) => (
                                    <label key={status} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="w-5 h-5 border-2 border-gray-200 rounded-md group-hover:border-emerald-600 transition-all" />
                                        <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">{status}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-8">
                            <p className="text-gray-500 text-sm font-medium">
                                Showing <span className="text-gray-900 font-bold">{filteredProperties.length}</span> properties in <span className="text-emerald-600 font-bold">All Locations</span>
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-400 font-medium">Sort by:</span>
                                <button className="flex items-center gap-1 text-sm font-bold text-gray-900 hover:text-emerald-600">
                                    Recommended <ChevronDown className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {filteredProperties.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>

                        {/* Pagination Placeholder */}
                        {filteredProperties.length > 0 && (
                            <div className="mt-16 flex justify-center gap-2">
                                <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-xl text-sm font-bold text-emerald-600 shadow-sm">1</button>
                                <button className="w-10 h-10 flex items-center justify-center hover:bg-white border border-transparent hover:border-gray-100 rounded-xl text-sm font-bold text-gray-500 transition-all">2</button>
                                <button className="w-10 h-10 flex items-center justify-center hover:bg-white border border-transparent hover:border-gray-100 rounded-xl text-sm font-bold text-gray-500 transition-all">3</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
