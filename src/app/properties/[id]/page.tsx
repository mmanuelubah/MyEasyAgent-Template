"use client";

import FeeBreakdown from "@/components/booking/FeeBreakdown";
import { useState } from "react";
import { useParams } from "next/navigation";
import { properties } from "@/lib/mock-data";
import {
    Phone, MessageCircle, MapPin, Bed, Bath, Maximize,
    ShieldCheck, Video, Eye, AlertCircle, Lock, Crown,
    ChevronLeft, ChevronRight, X, Calendar, Clock, CheckCircle2, PlayCircle, Info
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useHuntSmart from "@/hooks/useHuntSmart";
import PaymentModal from "@/components/common/PaymentModal";
import TransactionBridge from "@/components/dashboard/TransactionBridge";

/**
 * Property Detail Page (Phase 29 Refined)
 * 
 * Features:
 * - Tiered Visualization: Gold Crown (Inspected) vs Purple Tick (Agent Upload).
 * - HuntSmart Logic: 
 *   - Inspected & Basic: Limited Images (3 max), Locked detailed content.
 *   - Inspected & Premium: All Images, Full Content.
 *   - Standard: All visible to everyone.
 * - Booking System: Date/Time picker for inspections.
 */

export default function PropertyDetailPage() {
    const params = useParams();
    const property = properties.find(p => p.id === params.id);
    const [showUpsell, setShowUpsell] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Mock User State (Using Hook for Persistence)
    const { isHuntSmartActive: isPremiumUser, setHuntSmart } = useHuntSmart();
    const [bookingDate, setBookingDate] = useState("");
    const [bookingTime, setBookingTime] = useState("");
    const [freeInspectionUsed, setFreeInspectionUsed] = useState(false); // Track for demo
    const [agreedToPolicy, setAgreedToPolicy] = useState(false);
    const [agreedToContact, setAgreedToContact] = useState(false);
    const [bookingCode, setBookingCode] = useState<string | null>(null);
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

    if (!property) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Property Not Found</h1>
                    <Link href="/properties" className="text-emerald-600 hover:underline mt-4 inline-block">
                        Back to Properties
                    </Link>
                </div>
            </div>
        );
    }

    const isInspected = property.intelligenceLevel === 'Inspected';

    // Image Logic:
    // 1. Inspected & Premium User: Show ALL (Verification + Premium images)
    // 2. Inspected & Basic User: Show ONLY first 3 images (Limited View)
    // 3. Standard (Agent Upload): Show ALL images to everyone
    let displayImages = property.images;
    if (isInspected) {
        if (isPremiumUser) {
            displayImages = property.premiumImages
                ? [...property.images, ...property.premiumImages]
                : property.images;
        } else {
            // Limited view for non-HuntSmart (Max 4 images)
            displayImages = property.images.slice(0, 4);
        }
    } else {
        // Standard Agent Upload - everyone sees what is there
        displayImages = property.images;
    }

    // Ensure index doesn't go out of bounds if switching from premium to basic
    if (currentImageIndex >= displayImages.length) {
        setCurrentImageIndex(0);
    }

    const handlePremiumFeatureClick = () => {
        if (!isPremiumUser) {
            setShowUpsell(true);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Gallery */}
            <div className="relative h-[60vh] bg-gray-900">
                <Image
                    src={displayImages[currentImageIndex]}
                    alt={property.title}
                    fill
                    className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                {/* Image Counter Badge */}
                <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold border border-white/10">
                    {currentImageIndex + 1} / {displayImages.length}
                </div>

                {/* Locked Photos Badge (Only for Inspected + Basic) */}
                {isInspected && !isPremiumUser && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                        <div className="bg-black/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 animate-in fade-in zoom-in duration-500 pointer-events-auto">
                            <Lock className="w-8 h-8 text-white mx-auto mb-2" />
                            <p className="text-white font-bold text-lg">
                                +{(property.images.length + (property.premiumImages?.length || 0)) - 3} More Photos
                            </p>
                            <p className="text-gray-300 text-xs mt-1">Unlock with HuntSmart Pass</p>
                            <button
                                onClick={() => setShowUpsell(true)}
                                className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-emerald-500 transition-all"
                            >
                                Get Access
                            </button>
                        </div>
                    </div>
                )}

                {/* Dev Toggle Override Removed for Compliance - Logic now global */}

                {/* Gallery Navigation */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {displayImages.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                                }`}
                        />
                    ))}
                </div>

                {/* Navigation Arrows */}
                {displayImages.length > 1 && (
                    <>
                        <button
                            onClick={() => setCurrentImageIndex((currentImageIndex - 1 + displayImages.length) % displayImages.length)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all"
                        >
                            <ChevronLeft className="w-6 h-6 text-white" />
                        </button>
                        <button
                            onClick={() => setCurrentImageIndex((currentImageIndex + 1) % displayImages.length)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all"
                        >
                            <ChevronRight className="w-6 h-6 text-white" />
                        </button>
                    </>
                )}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Title & Tier Badge */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                {isInspected ? (
                                    <span className="bg-amber-100 text-amber-800 text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 uppercase tracking-wide border border-amber-200">
                                        <Crown className="w-4 h-4 text-amber-600 fill-amber-600" /> Gold Verified
                                    </span>
                                ) : (
                                    <span className="bg-purple-100 text-purple-800 text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 uppercase tracking-wide border border-purple-200">
                                        <CheckCircle2 className="w-4 h-4 text-purple-600" /> Agent Upload
                                    </span>
                                )}
                                {property.premium && (
                                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100">
                                        Premium Listing
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl font-black text-gray-900 mb-2">{property.title}</h1>
                            <p className="text-emerald-600 text-3xl font-bold">₦{property.price.toLocaleString()}</p>
                            {isPremiumUser || !isInspected ? (
                                <p className="text-gray-500 flex items-center gap-2 mt-2">
                                    <MapPin className="w-4 h-4" /> {property.location}
                                </p>
                            ) : (
                                <p className="text-gray-500 flex items-center gap-2 mt-2 blur-[2px] select-none hover:blur-none transition-all cursor-help" title="Exact address hidden">
                                    <MapPin className="w-4 h-4" /> {property.location.split(',')[0]}... <span className="text-[10px] font-bold bg-gray-100 px-2 py-0.5 rounded-full uppercase">Area Only</span>
                                </p>
                            )}
                        </div>

                        {/* Quick Stats */}
                        <div className="flex gap-6 p-6 bg-white rounded-3xl border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                                    <Bed className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{property.beds}</p>
                                    <p className="text-xs text-gray-500">Bedrooms</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                                    <Bath className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{property.baths}</p>
                                    <p className="text-xs text-gray-500">Bathrooms</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                                    <Maximize className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{property.sqft}</p>
                                    <p className="text-xs text-gray-500">Sq Ft</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                            <p className="text-gray-600 leading-relaxed">
                                {isInspected && !isPremiumUser && property.detailedDescription
                                    ? "This property has detailed inspection notes available only to HuntSmart Pass holders. The standard description is available below..."
                                    : property.detailedDescription || "A beautiful property in a prime location. Contact MyEasyAgent for full details and inspection booking."}
                            </p>
                        </div>

                        {/* Location & Street View (Strictly Gated) */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900">Location & Environment</h2>

                            {/* Detailed Map (Always visible per Section 1.A) */}
                            <div className="relative h-80 rounded-3xl overflow-hidden border border-gray-100">
                                {property.coordinates ? (
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        scrolling="no"
                                        marginHeight={0}
                                        marginWidth={0}
                                        src={`https://maps.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&z=15&output=embed`}
                                        className="w-full h-full"
                                    ></iframe>
                                ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                        <p>Map data unavailable for this property.</p>
                                    </div>
                                )}
                            </div>

                            {/* Street View (Strictly Gated per Section 1.A) */}
                            <div className="relative h-80 rounded-3xl overflow-hidden border border-gray-100 bg-gray-900">
                                {!isPremiumUser ? (
                                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 z-10">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                                            <Lock className="w-6 h-6 text-white" />
                                        </div>
                                        <h4 className="font-bold text-white mb-2">Street View Locked</h4>
                                        <p className="text-sm text-gray-200 mb-4 max-w-[200px]">HuntSmart Pass required for 360° area tour</p>
                                        <button onClick={() => setShowUpsell(true)} className="px-6 py-3 bg-white text-emerald-900 font-bold rounded-2xl shadow-xl hover:bg-gray-100 transition-all">
                                            Upgrade Now
                                        </button>
                                    </div>
                                ) : (
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        allowFullScreen
                                        src={`https://www.google.com/maps/embed/v1/streetview?key=YOUR_API_KEY&location=${property.coordinates?.lat},${property.coordinates?.lng}&heading=210&pitch=10&fov=35`}
                                        className="w-full h-full"
                                    ></iframe>
                                )}
                                {!isPremiumUser && (
                                    <div className="w-full h-full bg-gray-800" />
                                )}
                            </div>
                        </div>
                    </div>
                    {/* HuntSmart Premium Features (Only for Inspected Properties) */}
                    {isInspected && (
                        <div className="space-y-6 relative">
                            {!isPremiumUser && (
                                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 rounded-3xl flex flex-col items-center justify-center text-center p-8 border border-gray-100">
                                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                                        <Crown className="w-8 h-8 text-amber-600" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 mb-2">HuntSmart Protected</h3>
                                    <p className="text-gray-500 max-w-sm mb-6">
                                        Unlock video tours, 3D walkthroughs, and detailed fault reports with the HuntSmart Pass.
                                    </p>
                                    <button
                                        onClick={() => setShowPaymentModal(true)}
                                        className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-200"
                                    >
                                        Get Pass - ₦15,000
                                    </button>
                                </div>
                            )}

                            {/* Video Tour */}
                            <div className={`bg-white rounded-3xl p-8 border border-gray-100 ${!isPremiumUser ? 'filter blur-sm select-none' : ''}`}>
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                                    <Video className="w-5 h-5 text-emerald-600" /> Video Walkthrough
                                </h3>
                                <div className="bg-gray-900 rounded-2xl h-64 flex items-center justify-center relative overflow-hidden">
                                    {/* Mock Video Placeholder */}
                                    <PlayCircle className="w-16 h-16 text-white opacity-80" />
                                </div>
                            </div>

                            {/* Property Faults */}
                            <div className={`bg-amber-50 rounded-3xl p-8 border border-amber-100 ${!isPremiumUser ? 'filter blur-sm select-none' : ''}`}>
                                <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5" /> Inspection Notes (Faults)
                                </h3>
                                <ul className="space-y-2">
                                    {property.faults?.map((fault, idx) => (
                                        <li key={idx} className="text-amber-800 text-sm flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 shrink-0" />
                                            {fault}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar - Booking */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6 space-y-6">

                        {/* Booking Card */}
                        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl shadow-gray-100/50">
                            <h3 className="text-xl font-black text-gray-900 mb-2">Book Inspection</h3>
                            <p className="text-xs text-gray-500 mb-6 font-medium">Schedule a physical or remote tour.</p>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2 mb-1 block">Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="date"
                                            value={bookingDate}
                                            onChange={(e) => setBookingDate(e.target.value)}
                                            className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-4 py-4 font-bold text-gray-900 focus:ring-2 ring-emerald-500/20 outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2 mb-1 block">Time</label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="time"
                                            value={bookingTime}
                                            onChange={(e) => setBookingTime(e.target.value)}
                                            className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-4 py-4 font-bold text-gray-900 focus:ring-2 ring-emerald-500/20 outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <label className="flex items-start gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={agreedToPolicy}
                                            onChange={(e) => setAgreedToPolicy(e.target.checked)}
                                            className="mt-1 w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <span className="text-[10px] text-gray-500 leading-tight group-hover:text-gray-700 transition-colors">
                                            <strong>Commitment Note:</strong> I agree to the ₦2,500 mobilization fee policy and understand fees are only refundable for fake listings.
                                        </span>
                                    </label>
                                    <label className="flex items-start gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={agreedToContact}
                                            onChange={(e) => setAgreedToContact(e.target.checked)}
                                            className="mt-1 w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <span className="text-[10px] text-gray-500 leading-tight group-hover:text-gray-700 transition-colors">
                                            I consent to being contacted by the verified agent for this inspection.
                                        </span>
                                    </label>
                                </div>

                                <div className="pt-6 border-t border-gray-100 bg-gray-50/50 -mx-8 px-8 pb-4">
                                    {!isPremiumUser ? (
                                        <div className="text-center bg-white p-6 rounded-2xl border border-dashed border-gray-300">
                                            <Lock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                                            <p className="text-xs font-bold text-gray-900">Booking Locked</p>
                                            <p className="text-[10px] text-gray-500 mt-1 mb-4">Only HuntSmart Pass holders can book inspections.</p>
                                            <button
                                                onClick={() => setShowUpsell(true)}
                                                className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold text-xs"
                                            >
                                                Upgrade to Book
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="bg-emerald-50 p-4 rounded-2xl mb-6 border border-emerald-100 flex items-start gap-3">
                                                <Info className="w-4 h-4 text-emerald-600 mt-0.5" />
                                                <div>
                                                    <p className="text-xs font-black text-emerald-900">
                                                        {freeInspectionUsed ? "Subsequent Inspection" : "1st Physical Inspection FREE"}
                                                    </p>
                                                    <p className="text-[10px] text-emerald-700/70 mt-0.5">
                                                        {freeInspectionUsed
                                                            ? "Mobilization fee (₦2,000) applies (Pass allows 4 at this rate)."
                                                            : "HuntSmart users get the 1st physical inspection free of mobilization fees."}
                                                    </p>
                                                </div>
                                            </div>
                                            <FeeBreakdown className="mb-6" />

                                            {isBookingConfirmed ? (
                                                <div className="bg-emerald-600 p-6 rounded-2xl text-center space-y-4 animate-in zoom-in duration-300">
                                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                                        <CheckCircle2 className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-black text-emerald-100 uppercase tracking-widest">Inspection Confirmed</p>
                                                        <p className="text-sm font-bold text-white mt-1">Your Unique Booking Code:</p>
                                                        <div className="mt-3 bg-white py-3 px-4 rounded-xl shadow-lg">
                                                            <p className="text-2xl font-mono font-black text-gray-900 tracking-[0.2em]">{bookingCode}</p>
                                                        </div>
                                                        <p className="text-[9px] text-emerald-100 mt-4 leading-tight">
                                                            Show this to the agent at the property ({bookingDate} @ {bookingTime}).
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    disabled={!bookingDate || !bookingTime || !agreedToPolicy || !agreedToContact}
                                                    onClick={() => {
                                                        const randomCode = `MEA-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
                                                        setBookingCode(randomCode);
                                                        setIsBookingConfirmed(true);
                                                        setFreeInspectionUsed(true);
                                                    }}
                                                    className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {freeInspectionUsed ? "Confirm & Pay ₦2,500" : "Book for FREE"}
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Agent Info (Compact) */}
                        <div className="bg-white rounded-3xl p-6 border border-gray-100 flex items-center gap-4">
                            <Image
                                src={property.agent.image}
                                alt={property.agent.name}
                                width={56}
                                height={56}
                                className="rounded-2xl"
                            />
                            <div>
                                <p className="font-bold text-gray-900">{property.agent.name}</p>
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                    <ShieldCheck className="w-3 h-3 text-emerald-500" /> Verified Agent
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* HuntSmart Upsell Modal */}
            {showUpsell && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[3rem] p-10 max-w-lg relative animate-in zoom-in duration-300 shadow-2xl border border-gray-100">
                        <button
                            onClick={() => setShowUpsell(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-2 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="text-center space-y-6">
                            <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mx-auto border border-amber-100 animate-pulse">
                                <Crown className="w-12 h-12 text-amber-500 fill-amber-500" />
                            </div>
                            <div>
                                <span className="bg-amber-100 text-amber-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest border border-amber-200">
                                    Premium Access
                                </span>
                                <h2 className="text-3xl font-black text-gray-900 mt-4 mb-2">Unlock Full Details</h2>
                                <p className="text-gray-500 leading-relaxed">
                                    See what the agent isn't telling you. Get access to video tours, fault reports, and landlord conditions.
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 text-left space-y-3">
                                {[
                                    "Unlimited Video Tours",
                                    "1st Physical Inspection FREE",
                                    "4 Addl. Inspections at ₦2,000",
                                    "Detailed Fault Reports",
                                    "Priority Booking Status",
                                    "Area Intelligence Reports",
                                    "Legal Document Review",
                                    "Offer Letter Generation"
                                ].map((feat, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> {feat}
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/about"
                                className="block bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-900 transition-all shadow-xl shadow-gray-200"
                            >
                                Get HuntSmart Pass - ₦15,000
                            </Link>

                            {showPaymentModal && (
                                <PaymentModal
                                    amount={15000}
                                    onClose={() => setShowPaymentModal(false)}
                                    onSuccess={() => {
                                        setHuntSmart(true);
                                        setShowPaymentModal(false);
                                        setShowUpsell(false);
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
