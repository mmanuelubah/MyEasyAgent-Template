import { Property } from "@/lib/mock-data";
import { Bed, Bath, Hash, MapPin, CheckCircle2, Crown } from "lucide-react";
import Link from "next/link";

export default function PropertyCard({ property }: { property: Property }) {
    return (
        <div className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
            {/* Image Container */}
            <div className="relative h-72 overflow-hidden">
                <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Reference Style Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                        {property.status}
                    </span>
                    {property.premium && (
                        <span className="bg-amber-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider flex items-center gap-1.5">
                            <Crown className="w-3 h-3 fill-white" /> Premium
                        </span>
                    )}
                </div>

                {/* Verified Agent Badge (Top Right) */}
                <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified Agent
                    </span>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-8">
                {/* Location */}
                <div className="flex items-center gap-2 text-gray-400 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{property.location}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                    {property.title}
                </h3>

                {/* Price (Emerald Bold) */}
                <div className="mb-6">
                    <span className="text-2xl font-black text-emerald-600 flex items-baseline gap-1">
                        ₦{property.price.toLocaleString()}
                        <span className="text-sm font-bold text-gray-400">
                            {property.status === 'For Rent' ? '/year' : ''}
                        </span>
                    </span>
                </div>

                {/* Specs Bar (Horizontal with dividers) */}
                <div className="flex items-center gap-4 sm:gap-6 pt-5 border-t border-gray-50">
                    <div className="flex items-center gap-2 text-gray-400">
                        <Bed className="w-5 h-5" />
                        <span className="text-sm font-bold">{property.beds}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <Bath className="w-5 h-5" />
                        <span className="text-sm font-bold">{property.baths}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <Hash className="w-5 h-5" />
                        <span className="text-sm font-bold">{property.sqft} sqm</span>
                    </div>
                </div>

                {/* Clickable Overlay */}
                <Link href={`/properties/${property.id}`} className="absolute inset-0 z-10" aria-label="View property details" />
            </div>
        </div>
    );
}
