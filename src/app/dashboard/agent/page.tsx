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
    const [view, setView] = useState<'dashboard' | 'wallet' | 'messages' | 'verify' | 'availability'>('dashboard');
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
                            onClick={() => setView(view === 'dashboard' ? 'wallet' : 'dashboard')}
                            className={`px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${view === 'wallet' ? 'bg-gray-900 text-white shadow-lg' : 'bg-white border border-gray-100 text-gray-600 hover:bg-gray-50'}`}
                        >
                            <TrendingUp className="w-5 h-5" />
                            {view === 'wallet' ? 'Back to Dashboard' : 'My Wallet'}
                        </button>
                        {view === 'dashboard' && (
                            <button
                                onClick={() => setShowUpload(!showUpload)}
                                className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                            >
                                {showUpload ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                {showUpload ? 'Close Form' : 'New Listing'}
                            </button>
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

                            {/* Upload Tile */}
                            <button
                                onClick={() => setShowUpload(true)}
                                className="aspect-square bg-white rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all p-8 flex flex-col items-center justify-center text-center group"
                            >
                                <div className="w-20 h-20 bg-pink-50 text-pink-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Plus className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-black text-gray-900">New Listing</h3>
                                <p className="text-xs text-gray-500 mt-2">Add new property</p>
                            </button>

                            {/* Payout Tile */}
                            <button
                                onClick={() => setView('wallet')}
                                className="aspect-square bg-white rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all p-8 flex flex-col items-center justify-center text-center group"
                            >
                                <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <CreditCard className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-black text-gray-900">Payout</h3>
                                <p className="text-xs text-gray-500 mt-2">Apply for settlement</p>
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
