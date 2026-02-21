"use client";

import { useState } from "react";
import PropertyUpload from "@/components/agent/PropertyUpload";
import SafetyBanner from "@/components/common/SafetyBanner";
import { properties } from "@/lib/mock-data";
import {
    CreditCard, Heart, Calendar, Settings, Bell,
    ArrowUpRight, CheckCircle2, Clock, Search,
    ShieldCheck, MapPin, Home, TrendingUp, AlertCircle, Lock, Info
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useHuntSmart from "@/hooks/useHuntSmart";
import PaymentModal from "@/components/common/PaymentModal";
import RoleWalkthrough from "@/components/common/RoleWalkthrough";
import RefundForm from "@/components/booking/RefundForm";

type Tab = 'overview' | 'saved' | 'inspections' | 'alerts' | 'preferences';

export default function ClientDashboard() {
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const [showWalkthrough, setShowWalkthrough] = useState(false);
    const [showRefundForm, setShowRefundForm] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const { isHuntSmartActive, setHuntSmart } = useHuntSmart();
    const savedProperties = properties.slice(0, 3);

    // Mock data — inspections with various booking states (per PAYMENT_LOGIC.md)
    const [inspections, setInspections] = useState([
        { id: 1, property: properties[0], date: '2026-02-25', time: '10:00 AM', agent: 'Oluwaseun Adeyemi', status: 'Scheduled' as const, hoursUntil: 72 },
        { id: 2, property: properties[1], date: '2026-02-21', time: '2:00 PM', agent: 'Chioma Nwosu', status: 'AgentCancelled' as const, hoursUntil: 0 },
        { id: 3, property: properties[2 % properties.length], date: '2026-02-21', time: '5:00 PM', agent: 'Ade Williams', status: 'Locked' as const, hoursUntil: 8 },
        { id: 4, property: properties[0], date: '2026-02-20', time: '11:00 AM', agent: 'Fatima Al-Hassan', status: 'Completed' as const, hoursUntil: 0 },
    ]);
    const creditsRemaining = isHuntSmartActive ? 4 : 0;
    const totalCredits = 5;
    const inspectionCredits = isHuntSmartActive ? 1 : 0;
    const daysUntilExpiry = 28;

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header */}
                <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 mb-2">Welcome back, Alex!</h1>
                        <p className="text-gray-500">Your Lagos property hunt is active. Let's find your perfect home.</p>
                    </div>
                    <div className="flex gap-3">
                        {!isHuntSmartActive && (
                            <button
                                onClick={() => setShowPaymentModal(true)}
                                className="px-6 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                            >
                                Upgrade to HuntSmart
                            </button>
                        )}
                        <button
                            onClick={() => setShowWalkthrough(true)}
                            className="px-6 py-4 bg-purple-50 text-purple-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-purple-100 transition-all border border-purple-100"
                        >
                            <Info className="w-5 h-5" />
                            Help & Instructions
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {/* Credits Card */}
                    <div className={`relative rounded-[2.5rem] p-6 text-white shadow-xl overflow-hidden transition-all duration-500 ${isHuntSmartActive ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' : 'bg-gray-200'}`}>
                        {!isHuntSmartActive && (
                            <div className="absolute inset-0 backdrop-blur-md bg-white/10 flex flex-col items-center justify-center p-6 text-center z-10">
                                <Lock className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-tight">HuntSmart Pass Required</p>
                            </div>
                        )}
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            {isHuntSmartActive && <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">HuntSmart</span>}
                        </div>
                        <p className={`${isHuntSmartActive ? 'text-emerald-100' : 'text-gray-400'} text-sm mb-1`}>Credits Remaining</p>
                        <p className={`text-4xl font-black ${isHuntSmartActive ? 'text-white' : 'text-gray-400'}`}>{creditsRemaining}/{totalCredits}</p>
                        <p className={`${isHuntSmartActive ? 'text-emerald-100' : 'text-gray-400'} text-xs mt-2`}>Inspections available</p>
                    </div>

                    {/* Expiry Card */}
                    <div className="bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-sm relative overflow-hidden">
                        {!isHuntSmartActive && (
                            <div className="absolute inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-10" />
                        )}
                        <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-4">
                            <Clock className="w-6 h-6 text-amber-600" />
                        </div>
                        <p className="text-gray-500 text-sm mb-1">Days Until Expiry</p>
                        <p className="text-4xl font-black text-gray-900">{isHuntSmartActive ? daysUntilExpiry : '--'}</p>
                        <p className="text-gray-400 text-xs mt-2">Use credits before expiry</p>
                    </div>

                    {/* Inspection Credits Card (Section 5) */}
                    <div className={`bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-sm relative overflow-hidden transition-all duration-500 ${!isHuntSmartActive ? 'opacity-50 grayscale' : ''}`}>
                        {!isHuntSmartActive && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/40">
                                <Lock className="w-6 h-6 text-gray-400" />
                            </div>
                        )}
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">
                            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                        </div>
                        <p className="text-gray-500 text-sm mb-1">Available Inspection Credits</p>
                        <p className="text-4xl font-black text-gray-900">{inspectionCredits}</p>
                        <p className="text-emerald-600 text-[10px] font-bold mt-2 uppercase tracking-wider">Valid for physical/remote</p>
                    </div>

                    {/* Saved Properties Card */}
                    <div className="bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-sm">
                        <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center mb-4">
                            <Heart className="w-6 h-6 text-pink-600" />
                        </div>
                        <p className="text-gray-500 text-sm mb-1">Saved Properties</p>
                        <p className="text-4xl font-black text-gray-900">{savedProperties.length}</p>
                        <Link href="#" onClick={() => setActiveTab('saved')} className="text-emerald-600 text-xs mt-2 inline-block hover:underline">View all →</Link>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                    {/* Tab Headers */}
                    <div className="flex border-b border-gray-100 overflow-x-auto">
                        {[
                            { id: 'overview', label: 'Overview', icon: Home },
                            { id: 'saved', label: 'Saved', icon: Heart },
                            { id: 'inspections', label: 'Inspections', icon: Calendar },
                            { id: 'alerts', label: 'Alerts', icon: Bell },
                            { id: 'preferences', label: 'Preferences', icon: Settings }
                        ].map((tab) => {
                            const isActive = activeTab === tab.id;
                            const isLocked = !isHuntSmartActive && !['alerts', 'preferences'].includes(tab.id);

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => !isLocked && setActiveTab(tab.id as Tab)}
                                    className={`flex items-center gap-2 px-8 py-5 font-bold text-sm transition-all whitespace-nowrap relative ${isActive
                                        ? 'text-emerald-600 border-b-2 border-emerald-600'
                                        : isLocked ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    <tab.icon className={`w-4 h-4 ${isLocked ? 'opacity-50' : ''}`} />
                                    {tab.label}
                                    {isLocked && (
                                        <Lock className="w-3 h-3 absolute top-5 right-3 opacity-40" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Tab Content */}
                    <div className="p-8">
                        {activeTab === 'overview' && (
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Activity</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Quick Actions */}
                                        <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100">
                                            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                                            <div className="space-y-3">
                                                <Link href="/properties" className="flex items-center justify-between p-4 bg-white rounded-2xl hover:shadow-md transition-all">
                                                    <span className="font-medium text-gray-700">Browse Properties</span>
                                                    <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                                                </Link>
                                                {!isHuntSmartActive && (
                                                    <button
                                                        onClick={() => setShowPaymentModal(true)}
                                                        className="w-full flex items-center justify-between p-4 bg-emerald-600 text-white rounded-2xl hover:shadow-md transition-all"
                                                    >
                                                        <span className="font-bold">Buy HuntSmart Pass</span>
                                                        <TrendingUp className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Recent Activity */}
                                        <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                                            <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2" />
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">Inspection booked</p>
                                                        <p className="text-xs text-gray-500">2 hours ago</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">Property saved</p>
                                                        <p className="text-xs text-gray-500">1 day ago</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'saved' && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Properties</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {savedProperties.map((property) => (
                                        <Link key={property.id} href={`/properties/${property.id}`} className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                                            <div className="relative h-48">
                                                <Image src={property.images[0]} alt={property.title} fill className="object-cover" />
                                                {property.intelligenceLevel === 'Inspected' && (
                                                    <span className="absolute top-3 right-3 bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-1 rounded-full">
                                                        Inspected
                                                    </span>
                                                )}
                                            </div>
                                            <div className="p-5">
                                                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">{property.title}</h3>
                                                <p className="text-emerald-600 font-bold text-lg mb-2">₦{property.price.toLocaleString()}</p>
                                                <p className="text-gray-500 text-sm flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" /> {property.location}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'inspections' && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Inspections</h2>
                                <div className="space-y-4">
                                    {inspections.map((inspection) => {
                                        const isScheduled = inspection.status === 'Scheduled';
                                        const isLocked = inspection.status === 'Locked';
                                        const isAgentCancelled = inspection.status === 'AgentCancelled';
                                        const isCompleted = inspection.status === 'Completed';

                                        const statusBadge = () => {
                                            if (isScheduled) return <span className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase bg-emerald-100 text-emerald-700 tracking-widest">Scheduled</span>;
                                            if (isLocked) return <span className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase bg-amber-100 text-amber-700 tracking-widest flex items-center gap-1"><Lock className="w-2.5 h-2.5" /> Locked (≤24h)</span>;
                                            if (isAgentCancelled) return <span className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase bg-red-100 text-red-700 tracking-widest">Agent Cancelled</span>;
                                            if (isCompleted) return <span className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase bg-blue-100 text-blue-700 tracking-widest">Completed</span>;
                                        };

                                        return (
                                            <div key={inspection.id} className={`bg-white rounded-[2.5rem] p-8 border shadow-sm ${isLocked ? 'border-amber-100' : isAgentCancelled ? 'border-red-100' : 'border-gray-100'}`}>
                                                <div className="flex flex-col md:flex-row gap-6">
                                                    <div className="relative w-full md:w-36 h-36 rounded-[2rem] overflow-hidden shrink-0 border-4 border-white shadow-sm">
                                                        <Image src={inspection.property.images[0]} alt={inspection.property.title} fill className="object-cover" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">{statusBadge()}<span className="text-[10px] font-bold text-gray-400">ID: MEA-{String(inspection.id).padStart(4, '0')}</span></div>
                                                        <h3 className="font-black text-xl text-gray-900 mb-1">{inspection.property.title}</h3>
                                                        <p className="text-gray-500 text-sm mb-4">{inspection.property.location}</p>
                                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                                            <div className="flex items-center gap-2">
                                                                <Calendar className="w-4 h-4 text-emerald-600" />
                                                                <span className="font-bold text-gray-900">{inspection.date}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Clock className="w-4 h-4 text-emerald-600" />
                                                                <span className="font-bold text-gray-900">{inspection.time}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-3 justify-center min-w-[180px]">
                                                        {isScheduled && (
                                                            <>
                                                                <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100 text-center">
                                                                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Free to cancel</p>
                                                                    <p className="text-xs text-emerald-800 font-bold mt-1">{inspection.hoursUntil}h remaining</p>
                                                                </div>
                                                                <button
                                                                    onClick={() => {
                                                                        setInspections(prev => prev.map(i => i.id === inspection.id ? { ...i, status: 'Cancelled' as any } : i));
                                                                        setShowRefundForm(true);
                                                                    }}
                                                                    className="w-full px-4 py-3 border border-red-200 text-red-600 rounded-2xl font-bold text-xs hover:bg-red-50 transition-all"
                                                                >
                                                                    Cancel Booking (Refund ₦2,500)
                                                                </button>
                                                            </>
                                                        )}
                                                        {isLocked && (
                                                            <div className="space-y-3">
                                                                <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100 text-center">
                                                                    <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Locked — No Refund</p>
                                                                    <p className="text-[10px] text-amber-700 mt-1">Inspection in {inspection.hoursUntil}h. You cannot cancel.</p>
                                                                </div>
                                                                <button className="w-full px-4 py-3 bg-gray-100 text-gray-400 rounded-2xl font-bold text-xs cursor-not-allowed" disabled>
                                                                    Cancel Locked
                                                                </button>
                                                            </div>
                                                        )}
                                                        {isAgentCancelled && (
                                                            <>
                                                                <div className="bg-red-50 p-3 rounded-2xl border border-red-100 text-center">
                                                                    <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">Agent Cancelled</p>
                                                                    <p className="text-[10px] text-red-800 font-medium mt-1">Full refund available</p>
                                                                </div>
                                                                <button
                                                                    onClick={() => setShowRefundForm(true)}
                                                                    className="w-full px-4 py-3 bg-emerald-600 text-white rounded-2xl font-black text-xs hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
                                                                >
                                                                    <ShieldCheck className="w-4 h-4" /> Claim ₦2,500 Refund
                                                                </button>
                                                            </>
                                                        )}
                                                        {isCompleted && (
                                                            <div className="bg-blue-50 p-3 rounded-2xl border border-blue-100 text-center">
                                                                <CheckCircle2 className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                                                                <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Inspection Complete</p>
                                                                <p className="text-[10px] text-blue-600 mt-1">Booking code submitted</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {activeTab === 'alerts' && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Alerts & Notifications</h2>
                                <div className="space-y-4">
                                    <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
                                                <Bell className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-blue-900 mb-1">New property matches your criteria</h3>
                                                <p className="text-blue-700 text-sm">3 new properties in Lekki Phase 1 within your budget.</p>
                                                <p className="text-blue-600 text-xs mt-2">2 hours ago</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
                                                <AlertCircle className="w-5 h-5 text-amber-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-amber-900 mb-1">Credits expiring soon</h3>
                                                <p className="text-amber-700 text-sm">You have {creditsRemaining} credits expiring in {daysUntilExpiry} days.</p>
                                                <p className="text-amber-600 text-xs mt-2">1 day ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'preferences' && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Preferences</h2>
                                <div className="space-y-6">
                                    <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                                        <h3 className="font-bold text-gray-900 mb-4">Search Preferences</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-sm font-bold text-gray-700 mb-2 block">Preferred Areas</label>
                                                <input type="text" placeholder="e.g. Lekki, VI, Ikoyi" className="w-full bg-white border border-gray-200 rounded-2xl p-4 text-sm" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-sm font-bold text-gray-700 mb-2 block">Min Budget (₦)</label>
                                                    <input type="number" placeholder="500,000" className="w-full bg-white border border-gray-200 rounded-2xl p-4 text-sm" />
                                                </div>
                                                <div>
                                                    <label className="text-sm font-bold text-gray-700 mb-2 block">Max Budget (₦)</label>
                                                    <input type="number" placeholder="2,000,000" className="w-full bg-white border border-gray-200 rounded-2xl p-4 text-sm" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all">
                                        Save Preferences
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showWalkthrough && (
                <RoleWalkthrough
                    role="client"
                    onClose={() => setShowWalkthrough(false)}
                />
            )}

            {showRefundForm && (
                <RefundForm
                    bookingId="B-2026-XP92"
                    clientName="Alex Rivera"
                    amount={2500}
                    onClose={() => setShowRefundForm(false)}
                    onSuccess={() => {
                        setShowRefundForm(false);
                        alert("Refund claimed successfully!");
                    }}
                    role="client"
                />
            )}

            {showPaymentModal && (
                <PaymentModal
                    amount={15000}
                    onClose={() => setShowPaymentModal(false)}
                    onSuccess={() => {
                        setHuntSmart(true);
                        setShowPaymentModal(false);
                    }}
                />
            )}
        </div>
    );
}
