"use client";

import { useState } from "react";
import { properties } from "@/lib/mock-data";
import {
    Plus, Home, Users, Wallet,
    TrendingUp, MessageSquare, Calendar, Bell,
    ShieldCheck, DollarSign, ArrowUpRight, Star, Info
} from "lucide-react";
import RoleWalkthrough from "@/components/common/RoleWalkthrough";
import AvailabilitySetter from "@/components/agent/AvailabilitySetter";
import { ArrowRight } from "lucide-react";

export default function LandlordDashboard() {
    const [showWalkthrough, setShowWalkthrough] = useState(false);
    const [view, setView] = useState<'dashboard' | 'availability'>('dashboard');
    // Mocking landlord properties
    const myProperties = properties.slice(0, 2);

    return (
        <div className="bg-gray-50/50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header */}
                <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 font-outfit">Landlord Portal</h1>
                        <p className="text-gray-500 mt-1">Overview of your property portfolio in Lagos.</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setView(view === 'dashboard' ? 'availability' : 'dashboard')}
                            className={`px-6 py-3 rounded-2xl font-bold border transition-all flex items-center gap-2 ${view === 'availability'
                                ? "bg-gray-900 text-white shadow-lg border-gray-900"
                                : "bg-white text-gray-600 border-gray-100 hover:bg-gray-50"
                                }`}
                        >
                            <Calendar className="w-5 h-5" /> {view === 'availability' ? 'Back to Portal' : 'My Availability'}
                        </button>
                        <button
                            onClick={() => setShowWalkthrough(true)}
                            className="bg-purple-50 text-purple-600 px-6 py-3 rounded-2xl font-bold border border-purple-100 hover:bg-purple-100 transition-all flex items-center gap-2"
                        >
                            <Info className="w-5 h-5" /> Help
                        </button>
                        <button className="bg-white text-gray-600 px-6 py-3 rounded-2xl font-bold border border-gray-100 hover:bg-gray-50 transition-all flex items-center gap-2">
                            <Users className="w-5 h-5" /> Manage Tenants
                        </button>
                        <button className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
                            <Plus className="w-5 h-5" /> Add New Property
                        </button>
                    </div>
                </div>

                {view === 'availability' ? (
                    <div className="max-w-4xl mx-auto">
                        <button
                            onClick={() => setView('dashboard')}
                            className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold text-sm"
                        >
                            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Portal
                        </button>
                        <AvailabilitySetter />
                    </div>
                ) : (
                    <>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                                <div className="relative z-10">
                                    <p className="text-gray-500 text-sm font-medium mb-1">Total Rental Yield</p>
                                    <p className="text-2xl font-bold text-gray-900">₦18.5M <span className="text-xs text-emerald-600 font-bold">/yr</span></p>
                                </div>
                                <Wallet className="absolute -right-4 -bottom-4 w-24 h-24 text-emerald-50 transition-transform group-hover:scale-110" />
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                <p className="text-gray-500 text-sm font-medium mb-1">Properties Owned</p>
                                <p className="text-2xl font-bold text-gray-900">3</p>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                <p className="text-gray-500 text-sm font-medium mb-1">Active Tenants</p>
                                <p className="text-2xl font-bold text-gray-900">12</p>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                <p className="text-gray-500 text-sm font-medium mb-1">Maintenance Tasks</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <p className="text-2xl font-bold text-red-500">2</p>
                                    <span className="text-[10px] font-bold bg-red-50 text-red-600 px-2 py-0.5 rounded-full uppercase tracking-tighter">Urgent</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            {/* Main Portfolio */}
                            <div className="lg:col-span-2 space-y-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">Property Portfolio</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {myProperties.map((prop) => (
                                        <div key={prop.id} className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden group hover:shadow-xl transition-all">
                                            <div className="relative h-48">
                                                <img src={prop.images[0]} className="w-full h-full object-cover" />
                                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                                                    <ShieldCheck className="w-3 h-3" /> Fully Verified
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <h3 className="font-bold text-gray-900 mb-1">{prop.title}</h3>
                                                <p className="text-sm text-gray-500 mb-4">{prop.location}</p>
                                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                                    <div>
                                                        <p className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Next Rent Due</p>
                                                        <p className="text-sm font-bold text-gray-900">April 12, 2026</p>
                                                    </div>
                                                    <button className="p-3 bg-gray-50 rounded-xl text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                                                        <Plus className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Rent Collection Matrix */}
                                <div className="mt-10 pt-10 border-t border-gray-100">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-900">Rent Collection Matrix</h2>
                                        <button className="text-emerald-600 font-bold text-sm hover:underline">Download Report</button>
                                    </div>
                                    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                                        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                                            <div className="flex gap-10">
                                                <div>
                                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Paid Overall</p>
                                                    <p className="text-2xl font-bold text-emerald-600">85%</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Overdue</p>
                                                    <p className="text-2xl font-bold text-red-500">₦1.2M</p>
                                                </div>
                                            </div>
                                            <div className="flex -space-x-3">
                                                {[1, 2, 3, 4].map(i => (
                                                    <img key={i} src={`https://i.pravatar.cc/150?u=${i}`} className="w-10 h-10 rounded-full border-2 border-white" />
                                                ))}
                                                <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500">+8</div>
                                            </div>
                                        </div>
                                        <div className="p-6 bg-gray-50/50 italic text-center text-sm text-gray-400">
                                            Payment analytics powered by HuntSmart Pay
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Activity sidebar */}
                            <div className="space-y-6">
                                <div className="bg-emerald-900 rounded-[2rem] p-8 text-white">
                                    <h3 className="text-xl font-bold mb-4">Market Insights</h3>
                                    <div className="space-y-6">
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                                <TrendingUp className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold">Lekki Prices are up 12%</p>
                                                <p className="text-xs text-emerald-200 mt-1 leading-relaxed">Rental demand in Lekki Phase 1 has spiked since January.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                                <Star className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold">Featured Listing Boost</p>
                                                <p className="text-xs text-emerald-200 mt-1 leading-relaxed">Upgrade your Surulere office space to reach 5x more tenants.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full mt-8 py-3 bg-white text-emerald-900 rounded-xl font-bold text-sm">View Full Insights</button>
                                </div>

                                <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                                    <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <Bell className="w-5 h-5 text-emerald-600" /> Notifications
                                    </h3>
                                    <div className="space-y-6">
                                        {[
                                            { title: "New viewing request", time: "2m ago", desc: "Amina Yusuf requested a viewing for Lekki Terrace." },
                                            { title: "Rent Received", time: "1h ago", desc: "Alex Rivera paid rent for Ikeja Executive Flat." }
                                        ].map((notif, i) => (
                                            <div key={i}>
                                                <div className="flex justify-between items-center mb-1">
                                                    <p className="text-sm font-bold text-gray-900">{notif.title}</p>
                                                    <span className="text-[10px] text-gray-400">{notif.time}</span>
                                                </div>
                                                <p className="text-xs text-gray-500 leading-relaxed">{notif.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {showWalkthrough && (
                <RoleWalkthrough
                    role="landlord"
                    onClose={() => setShowWalkthrough(false)}
                />
            )}
        </div>
    );
}
