import { Property } from "@/lib/mock-data";
import { Bed, Bath, Hash, MapPin, ShieldCheck, Star, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PropertyCard({ property }: { property: Property }) {
    return (
        <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Badges - Section 2.B Compliance */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {property.intelligenceLevel === 'Inspected' ? (
                        <div className="bg-amber-100/90 backdrop-blur-md text-amber-900 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1.5 border border-amber-200">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> MyEasyAgent Inspected
                        </div>
                    ) : (
                        <div className="bg-emerald-100/90 backdrop-blur-md text-emerald-900 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm flex items-center gap-1.5 border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Direct Agent Upload
                        </div>
                    )}
                    {property.premium && (
                        <span className="bg-gray-900/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm flex items-center gap-1.5">
                            <Star className="w-3 h-3 fill-white" /> Premium
                        </span>
                    )}
                </div>

                <div className="absolute bottom-4 left-4">
                    <span className="bg-white text-gray-900 text-sm font-bold px-4 py-2 rounded-xl shadow-lg">
                        ₦{property.price.toLocaleString()}{property.status === 'For Rent' ? '/yr' : ''}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-center gap-1 text-emerald-600 mb-2">
                    <MapPin className="w-3 h-3" />
                    <span className="text-xs font-semibold uppercase tracking-wider">{property.location}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                    {property.title}
                </h3>

                {/* Specs */}
                <div className="flex items-center justify-between py-4 border-y border-gray-50 mb-6">
                    <div className="flex items-center gap-2 text-gray-500">
                        <Bed className="w-4 h-4" />
                        <span className="text-sm font-medium">{property.beds} <span className="hidden sm:inline">Beds</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                        <Bath className="w-4 h-4" />
                        <span className="text-sm font-medium">{property.baths} <span className="hidden sm:inline">Baths</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                        <Hash className="w-4 h-4" />
                        <span className="text-sm font-medium">{property.sqft} <span className="hidden sm:inline">Sqft</span></span>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={property.agent.image} className="w-8 h-8 rounded-full border border-gray-100" />
                        <span className="text-xs font-medium text-gray-600">{property.agent.name}</span>
                    </div>
                    <Link
                        href={`/properties/${property.id}`}
                        className="text-sm font-bold text-emerald-600 hover:text-emerald-700 underline decoration-2 underline-offset-4"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
