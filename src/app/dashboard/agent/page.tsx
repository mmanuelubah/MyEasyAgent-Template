"use client";

import { properties } from "@/lib/mock-data";
import {
    Plus, Home, Users, MessageSquare, TrendingUp,
    Briefcase, ShieldCheck, PieChart, Wallet as WalletIcon,
    ChevronRight, MapPin, Calendar, Clock, Image as ImageIcon,
    CheckCircle2, AlertCircle, X, Search, Filter, ArrowUpRight,
    ArrowRight, Star, MoreVertical, Lock, CreditCard, Banknote, ShieldAlert, Info
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import PropertyUpload from "@/components/agent/PropertyUpload";
import TransportVerification from "@/components/agent/TransportVerification";
import AgentWallet from "@/components/agent/Wallet";
import VerificationForm from "@/components/agent/VerificationForm";
import ChatSafety from "@/components/dashboard/ChatSafety";
import SafetyBanner from "@/components/common/SafetyBanner";
import RoleWalkthrough from "@/components/common/RoleWalkthrough";
import AvailabilitySetter from "@/components/agent/AvailabilitySetter";

export default function AgentDashboard() {
    const [showUpload, setShowUpload] = useState(false);
    const [showWalkthrough, setShowWalkthrough] = useState(false);
    const [view, setView] = useState<'dashboard' | 'wallet' | 'messages' | 'verify' | 'availability' | 'bookings' | 'properties'>('dashboard');
    const [propertyAvailability, setPropertyAvailability] = useState<Record<string, string>>({}); // propertyId -> override availability
    const agentProperties = properties.filter(p => p.agent.name === 'Sarah Johnson');

    return (
        <div className="bg-gray-50/50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* TrustShield & Action Bar */}
                <div className="mb-10 flex flex-col lg:flex-row items-center justify-between gap-6 bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-emerald-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-bold text-gray-900">TrustShield Status</h2>
                                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">Verified Pro</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">LASRERA ID: <span className="font-mono text-gray-900">AG-2026-X839</span> • <span className="text-emerald-600 font-bold underline cursor-pointer">Upgrade to Trusted Partner</span></p>
                        </div>
                    </div>
                    <div className="h-10 w-px bg-gray-100 hidden lg:block" />
                    <div className="flex gap-4 w-full lg:w-auto">
                        <button
                            onClick={() => setShowWalkthrough(true)}
                            className="px-6 py-4 bg-purple-50 text-purple-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-purple-100 transition-all border border-purple-100"
                        >
                            <Info className="w-5 h-5" />
                            Help & Instructions
                        </button>
                        <button
                            onClick={() => setView(view === 'wallet' ? 'dashboard' : 'wallet')}
                            className={`px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${view === 'wallet' ? 'bg-gray-900 text-white shadow-lg' : 'bg-white border border-gray-100 text-gray-600 hover:bg-gray-50'}`}
                        >
                            <TrendingUp className="w-5 h-5" />
                            {view === 'wallet' ? 'Back to Dashboard' : 'My Wallet'}
                        </button>
                        {view === 'dashboard' && (
                            <Link
                                href="/create-listing"
                                className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                            >
                                <Plus className="w-5 h-5" /> New Listing
                            </Link>
                        )}
                    </div>
                </div>

                {view === 'wallet' ? (
                    <AgentWallet />
                ) : view === 'messages' ? (
                    <div className="max-w-4xl mx-auto">
                        <button
                            onClick={() => setView('dashboard')}
                            className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold text-sm"
                        >
                            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Dashboard
                        </button>
                        <ChatSafety />
                    </div>
                ) : view === 'verify' ? (
                    <div className="max-w-4xl mx-auto">
                        <button
                            onClick={() => setView('dashboard')}
                            className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold text-sm"
                        >
                            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Dashboard
                        </button>
                        <VerificationForm />
                    </div>
                ) : view === 'bookings' ? (
                    <div className="max-w-4xl mx-auto">
                        <button onClick={() => setView('dashboard')} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold text-sm">
                            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Dashboard
                        </button>
                        <h2 className="text-3xl font-black text-gray-900 mb-8">My Inspections</h2>
                        <div className="space-y-4">
                            {[
                                { id: 'MEA-A1B2', client: 'Alex Rivera', property: 'Admiralty Way Apartment', date: '2026-02-25', time: '10:00 AM', status: 'Scheduled', hoursUntil: 72 },
                                { id: 'MEA-C3D4', client: 'David Moss', property: 'Lekki Phase 1 Duplex', date: '2026-02-21', time: '2:00 PM', status: 'Locked', hoursUntil: 6 },
                                { id: 'MEA-E5F6', client: 'Sarah Chen', property: 'Victoria Island Penthouse', date: '2026-02-20', time: '11:00 AM', status: 'Completed', hoursUntil: 0 },
                            ].map((booking) => (
                                <div key={booking.id} className={`bg-white rounded-[2rem] p-6 border flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm ${booking.status === 'Locked' ? 'border-amber-100' :
                                    booking.status === 'Completed' ? 'border-blue-100' : 'border-gray-100'
                                    }`}>
                                    <div className="flex items-center gap-5">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xs ${booking.status === 'Locked' ? 'bg-amber-500' :
                                            booking.status === 'Completed' ? 'bg-blue-500' : 'bg-emerald-600'
                                            }`}>{booking.status === 'Locked' ? <Lock className="w-5 h-5" /> : booking.status === 'Completed' ? <CheckCircle2 className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}</div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-black text-gray-900">{booking.property}</p>
                                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${booking.status === 'Locked' ? 'bg-amber-100 text-amber-700' :
                                                    booking.status === 'Completed' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                                                    }`}>{booking.status}</span>
                                            </div>
                                            <p className="text-sm text-gray-500">Client: <span className="font-bold text-gray-900">{booking.client}</span> • {booking.date} @ {booking.time}</p>
                                            <p className="text-xs font-mono text-gray-400 mt-1">Code: <span className="font-black text-gray-700">{booking.id}</span></p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 shrink-0">
                                        {booking.status !== 'Completed' && (
                                            <button onClick={() => setView('verify')} className="px-5 py-3 bg-gray-900 text-white rounded-xl font-bold text-xs hover:bg-black transition-all">
                                                Verify Code
                                            </button>
                                        )}
                                        {booking.status === 'Completed' && (
                                            <span className="px-5 py-3 bg-blue-50 text-blue-700 rounded-xl font-bold text-xs">Certified ✓</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : view === 'properties' ? (
                    <div className="max-w-5xl mx-auto">
                        <button onClick={() => setView('dashboard')} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold text-sm">
                            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Dashboard
                        </button>
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-black text-gray-900">My Properties</h2>
                                <p className="text-gray-500 text-sm mt-1">Edit details and set custom availability per property (overrides your general schedule).</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {agentProperties.length === 0 ? (
                                <div className="bg-white rounded-[2rem] p-16 border border-dashed border-gray-200 text-center">
                                    <Home className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                                    <p className="font-bold text-gray-400">No listings yet. Add your first property.</p>
                                    <Link href="/create-listing" className="mt-4 inline-block bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all">
                                        + New Listing
                                    </Link>
                                </div>
                            ) : (
                                agentProperties.map((prop) => (
                                    <div key={prop.id} className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="relative w-full md:w-28 h-28 rounded-2xl overflow-hidden shrink-0 border border-gray-100">
                                                <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-black text-gray-900">{prop.title}</h3>
                                                    {propertyAvailability[prop.id] && (
                                                        <span className="text-[9px] bg-amber-100 text-amber-700 font-black px-2 py-0.5 rounded-full uppercase">Custom Hours</span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-500 mb-3">{prop.location}</p>
                                                <div className="flex flex-wrap gap-3">
                                                    <div>
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Landlord Availability Override</label>
                                                        <select
                                                            value={propertyAvailability[prop.id] || ''}
                                                            onChange={(e) => setPropertyAvailability(prev => ({ ...prev, [prop.id]: e.target.value }))}
                                                            className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:ring-2 ring-emerald-500/20 outline-none"
                                                        >
                                                            <option value="">Use General Schedule</option>
                                                            <option value="weekdays-only">Weekdays Only (9am–5pm)</option>
                                                            <option value="weekends-only">Weekends Only (10am–4pm)</option>
                                                            <option value="by-appointment">By Appointment Only</option>
                                                            <option value="not-available">Temporarily Unavailable</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                {propertyAvailability[prop.id] === 'not-available' && (
                                                    <p className="text-[10px] text-red-600 font-bold mt-2">⚠ This property will be hidden from booking until availability is restored.</p>
                                                )}
                                                {propertyAvailability[prop.id] && propertyAvailability[prop.id] !== 'not-available' && (
                                                    <p className="text-[10px] text-amber-600 font-bold mt-2">Override active — general schedule ignored for this property.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ) : view === 'availability' ? (
                    <div className="max-w-4xl mx-auto">
                        <button
                            onClick={() => setView('dashboard')}
                            className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold text-sm"
                        >
                            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Dashboard
                        </button>
                        <AvailabilitySetter />
                    </div>
                ) : (
                    <div className="space-y-12">
                        {/* Mandatory Tiles Grid - Section 4 Compliance */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Bookings Tile */}
                            <button
                                onClick={() => setView('dashboard')}
                                className="aspect-square bg-white rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all p-8 flex flex-col items-center justify-center text-center group"
                            >
                                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Calendar className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-black text-gray-900">Bookings</h3>
                                <p className="text-xs text-gray-500 mt-2">Manage appointments</p>
                            </button>

                            {/* Earnings Tile */}
                            <button
                                onClick={() => setView('wallet')}
                                className="aspect-square bg-white rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all p-8 flex flex-col items-center justify-center text-center group"
                            >
                                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Banknote className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-black text-gray-900">Earnings</h3>
                                <p className="text-xs text-gray-500 mt-2">₦48,000 Certified</p>
                            </button>

                            {/* Verify Tile - Section 1.C */}
                            <button
                                onClick={() => setView('verify')}
                                className="aspect-square bg-white rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all p-8 flex flex-col items-center justify-center text-center group"
                            >
                                <div className="w-20 h-20 bg-purple-50 text-purple-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-black text-gray-900">Verify Code</h3>
                                <p className="text-xs text-gray-500 mt-2">Enter validation codes</p>
                            </button>

                            {/* Upload Tile - Links to /create-listing */}
                            <Link
                                href="/create-listing"
                                className="aspect-square bg-white rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all p-8 flex flex-col items-center justify-center text-center group"
                            >
                                <div className="w-20 h-20 bg-pink-50 text-pink-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Plus className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-black text-gray-900">New Listing</h3>
                                <p className="text-xs text-gray-500 mt-2">Add new property</p>
                            </Link>

                            {/* Properties Tile (replaces Payout) */}
                            <button
                                onClick={() => setView('properties')}
                                className="aspect-square bg-white rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all p-8 flex flex-col items-center justify-center text-center group"
                            >
                                <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Home className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-black text-gray-900">Properties</h3>
                                <p className="text-xs text-gray-500 mt-2">Manage & set availability</p>
                            </button>

                            {/* Warnings Tile - Section 14 */}
                            <div className="aspect-square bg-white rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all p-8 flex flex-col items-center justify-center text-center group relative overflow-hidden">
                                <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <ShieldAlert className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-black text-gray-900">Warnings</h3>
                                <p className="text-xs text-red-500 mt-2 font-bold">0 Active Strikes</p>
                                <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-1 rounded-full uppercase">Good Standing</div>
                            </div>

                            {/* Availability Tile */}
                            <button
                                onClick={() => setView('availability')}
                                className="aspect-square bg-emerald-900 rounded-[3rem] border border-emerald-800 shadow-xl hover:-translate-y-2 transition-all p-8 flex flex-col items-center justify-center text-center group text-white"
                            >
                                <div className="w-20 h-20 bg-white/10 text-white rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Clock className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-black">Availability</h3>
                                <p className="text-xs text-emerald-300 mt-2">Set inspection hours</p>
                            </button>
                        </div>

                        {/* Property Upload Overlay (if active) */}
                        {showUpload && (
                            <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
                                <PropertyUpload />
                            </div>
                        )}

                        <div className="mt-12">
                            <SafetyBanner />
                        </div>
                    </div>
                )}
            </div>

            {showWalkthrough && (
                <RoleWalkthrough
                    role="agent"
                    onClose={() => setShowWalkthrough(false)}
                />
            )}
        </div>
    );
}
