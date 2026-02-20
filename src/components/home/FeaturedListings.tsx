import { properties } from "@/lib/mock-data";
import PropertyCard from "../ui/PropertyCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedListings() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="max-w-xl">
                    <span className="text-emerald-600 font-bold text-sm uppercase tracking-widest mb-3 block">Exclusive Market</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Featured Premium Properties
                    </h2>
                    <p className="text-gray-500 mt-4 leading-relaxed">
                        Discover our hand-picked selection of luxury homes and commercial spaces, all vetted by our expert team.
                    </p>
                </div>
                <Link
                    href="/properties"
                    className="group flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all"
                >
                    Explore All Properties
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.slice(0, 3).map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>
        </section>
    );
}
