"use client";

import {
    ShieldCheck, Clock, MapPin, Video,
    User, Home, TrendingUp, CheckCircle2,
    XCircle, AlertTriangle, PlayCircle, Crown,
    Search, ArrowRight, Info
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/**
 * About Page / System Guide
 * 
 * Covering:
 * 1. Problems faced by Clients, Agents, and Landlords.
 * 2. MyEasyAgent Solutions.
 * 3. Detailed HuntSmart Pass features and comparison.
 * 4. Step-by-step instructions for Diaspora & Physical inspections.
 */

export default function AboutPage() {
    const [activeTab, setActiveTab] = useState<'diaspora' | 'physical'>('diaspora');

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="bg-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
                <div className="relative z-10 max-w-4xl mx-auto space-y-6">
                    <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest border border-emerald-500/30">
                        The Future of Lagos Real Estate
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                        Ending the Chaos of <span className="text-emerald-500">Fake Listings</span> & <span className="text-orange-500">Agent Wahala</span>.
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        MyEasyAgent is not just a listing site. It's an enforced ecosystem where Clients, Agents, and Landlords play by fair rules.
                    </p>
                </div>
                {/* Background Blobs */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[100px]" />
                </div>
            </div>

            {/* Problems Section */}
            <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-black text-gray-900">The Problem with Lagos Real Estate</h2>
                    <p className="text-gray-500 mt-2">Everyone is suffering. Here is why.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Clients */}
                    <div className="bg-red-50 rounded-[2.5rem] p-8 border border-red-100">
                        <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-6 text-red-600">
                            <User className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-red-900 mb-4">For Clients</h3>
                        <ul className="space-y-4">
                            {[
                                "Fake listings used as 'bait' to get leads.",
                                "Wasted mobilization fees on properties that don't exist.",
                                "Lack of transparency on total costs.",
                                "Fear of fraud and impersonation."
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-red-800/80 text-sm font-medium">
                                    <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Agents */}
                    <div className="bg-orange-50 rounded-[2.5rem] p-8 border border-orange-100">
                        <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
                            <Briefcase className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-orange-900 mb-4">For Agents</h3>
                        <ul className="space-y-4">
                            {[
                                "Clients bypassing fees after inspection.",
                                "Time wasted on unserious 'window shoppers'.",
                                "Difficulty proving credibility to new clients.",
                                "Chaotic commission splitting disputes."
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-orange-800/80 text-sm font-medium">
                                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Landlords */}
                    <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100">
                        <div className="w-14 h-14 bg-gray-200 rounded-2xl flex items-center justify-center mb-6 text-gray-600">
                            <Home className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">For Landlords</h3>
                        <ul className="space-y-4">
                            {[
                                "Property mismanagement and unauthorized access.",
                                "Poorly qualified tenants causing damage.",
                                "Lengthy vacancies due to inefficient marketing.",
                                "Lack of visibility on agent activities."
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-600 text-sm font-medium">
                                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Solution Section */}
            <div className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-gray-900">The MyEasyAgent Solution</h2>
                        <p className="text-gray-500 mt-2">A fair playground for everyone.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50",
                                title: "Gold Verification", desc: "Properties are verified by our team, not just agents."
                            },
                            {
                                icon: Crown, color: "text-purple-600", bg: "bg-purple-50",
                                title: "HuntSmart Pass", desc: "Premium access to video tours and detailed fault reports."
                            },
                            {
                                icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50",
                                title: "Alpha Script", desc: "Automated, fair commission splits (50/50 Direct or 50/25/25 Shared) for collaboration."
                            },
                            {
                                icon: Video, color: "text-rose-600", bg: "bg-rose-50",
                                title: "Virtual Tours", desc: "Inspect remotely with confidence before paying a dime."
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* HuntSmart Pass Detail */}
            <div id="how-huntsmart-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="bg-gray-900 rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden">
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-amber-500/20 text-amber-400 p-2 rounded-xl">
                                    <Crown className="w-8 h-8" />
                                </div>
                                <h2 className="text-4xl font-black">HuntSmart Pass</h2>
                            </div>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                Stop wasting money on mobilization fees for bad apartments. The HuntSmart Pass gives you <span className="text-white font-bold">remote superpowers</span> to inspect properties from anywhere.
                            </p>

                            <div className="space-y-6 mb-10">
                                {[
                                    { title: "Priority Support & Access", desc: "Priority notifications (30 mins early) and dedicated support line." },
                                    { title: "Exclusive Intelligence", desc: "Fault reports, 4K videos, and neighborhood intelligence." },
                                    { title: "Platform Protection", desc: "100% money-back guarantee if listings are inaccurate." },
                                    { title: "1st Inspection FREE", desc: "Your first physical inspection is on us. Next 4 at ₦2,000 each." }
                                ].map((feat, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shrink-0 mt-1">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-900" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">{feat.title}</h4>
                                            <p className="text-gray-400 text-sm">{feat.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link href="/dashboard/client" className="inline-flex items-center gap-2 bg-emerald-500 text-emerald-950 px-8 py-4 rounded-2xl font-bold hover:bg-emerald-400 transition-all">
                                Get Pass - ₦15,000 <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        {/* Comparison Table */}
                        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-sm">
                            <h3 className="font-bold text-xl mb-6 text-center">Why Upgrade?</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-4 text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-white/10 pb-4">
                                    <span>Feature</span>
                                    <span className="text-center">Basic Agent</span>
                                    <span className="text-center text-emerald-400">HuntSmart</span>
                                </div>
                                {[
                                    { label: "Contact", basic: "General line", pro: "Priority line" },
                                    { label: "Booking", basic: "Limited", pro: "Priority" },
                                    { label: "Response", basic: "Slow", pro: "Fast" },
                                    { label: "Competition", basic: "High", pro: "Limited" },
                                    { label: "Support", basic: "None", pro: "Full" },
                                    { label: "Commission", basic: "Unclear", pro: "Fixed 10%" },
                                    { label: "Risk", basic: "High", pro: "Low" },
                                    { label: "Freshness", basic: "Not guaranteed", pro: "Confirmed" },
                                ].map((row, i) => (
                                    <div key={i} className="grid grid-cols-3 gap-4 items-center py-2 border-b border-white/5 last:border-0">
                                        <span className="font-medium text-sm text-gray-300">{row.label}</span>
                                        <div className="text-center">
                                            <span className="text-gray-500 text-xs font-medium">{row.basic}</span>
                                        </div>
                                        <div className="text-center">
                                            <span className="text-emerald-400 text-xs font-black">{row.pro}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works (Instructions) */}
            <div className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-gray-900">How to Book</h2>
                        <div className="flex justify-center gap-4 mt-8">
                            <button
                                onClick={() => setActiveTab('diaspora')}
                                className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${activeTab === 'diaspora' ? 'bg-black text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-200'}`}
                            >
                                Diaspora / Remote
                            </button>
                            <button
                                onClick={() => setActiveTab('physical')}
                                className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${activeTab === 'physical' ? 'bg-black text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-200'}`}
                            >
                                Physical Inspection
                            </button>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {activeTab === 'diaspora' ? (
                            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-4">
                                <Step number={1} title="Get HuntSmart Pass" desc="Purchase the pass to unlock remote inspection tools." />
                                <Step number={2} title="Take Virtual Tour" desc="Watch 4K video walkthroughs and check detailed fault reports." />
                                <Step number={3} title="Schedule Live Call" desc="Book a video call with a verified agent to ask questions in real-time." />
                                <Step number={4} title="Secure Property" desc="Pay safely through MyEasyAgent to lock down the unit." />
                            </div>
                        ) : (
                            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-4">
                                <Step number={1} title="Search & Select" desc="Find properties with the 'Verified' Gold Crown." />
                                <Step number={2} title="Book Inspection" desc="Choose a date and time. Pay the mobilization fee (₦2,500) securely." />
                                <Step number={3} title="Get Booking Code" desc="Receive a unique 6-digit code. Do NOT share this until you meet the agent." />
                                <Step number={4} title="Inspect & Verify" desc="Meet the agent, inspect the property. Give them the code ONLY if satisfied." />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Briefcase({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
    );
}

function Step({ number, title, desc }: { number: number, title: string, desc: string }) {
    return (
        <div className="flex gap-6 items-start">
            <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center text-xl font-bold shrink-0 shadow-lg shadow-gray-200">
                {number}
            </div>
            <div>
                <h4 className="text-xl font-bold text-gray-900">{title}</h4>
                <p className="text-gray-500 mt-1 leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}
