"use client";

import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

const neighborhoods = [
    {
        name: "Lekki",
        description: "The heart of modern Lagos living.",
        image: "https://images.unsplash.com/photo-1599307337222-297f66a01497?auto=format&fit=crop&w=1200&q=80",
        colSpan: "lg:col-span-2 lg:row-span-2",
        listings: 124
    },
    {
        name: "VI",
        description: "Business hub & upscale lifestyle.",
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
        listings: 86
    },
    {
        name: "Ikoyi",
        description: "Old money charm & exclusivity.",
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d6957c?auto=format&fit=crop&w=800&q=80",
        listings: 62
    },
    {
        name: "Ikeja",
        description: "Mainland center & administrative core.",
        image: "https://images.unsplash.com/photo-1594992569300-47b1c313437f?auto=format&fit=crop&w=800&q=80",
        colSpan: "lg:col-span-2",
        listings: 110
    }
];

export default function NeighborhoodsSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="max-w-xl">
                    <span className="text-emerald-600 font-bold text-sm uppercase tracking-widest mb-3 block">Locate Your Space</span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight font-outfit">
                        Explore Lagos Neighborhoods
                    </h2>
                    <p className="text-gray-500 mt-4 font-medium">
                        Find your perfect rental in the most vibrant parts of the city. Verified listings across all major areas.
                    </p>
                </div>
                <Link
                    href="/properties"
                    className="group flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all"
                >
                    View all locations
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[250px]">
                {neighborhoods.map((area, idx) => (
                    <Link
                        key={idx}
                        href={`/properties?location=${area.name}`}
                        className={`group relative overflow-hidden rounded-[2.5rem] bg-gray-100 ${area.colSpan || ""}`}
                    >
                        <img
                            src={area.image}
                            alt={area.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90" />

                        <div className="absolute bottom-8 left-8 right-8 text-white">
                            <div className="flex items-center gap-2 mb-2">
                                <MapPin className="w-3 h-3 text-emerald-400" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                                    {area.listings} Listings
                                </span>
                            </div>
                            <h3 className="text-3xl font-black mb-2 font-outfit">{area.name}</h3>
                            <p className="text-xs font-medium text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                {area.description}
                            </p>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-md rounded-full w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                            <ArrowRight className="w-5 h-5 text-white" />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
