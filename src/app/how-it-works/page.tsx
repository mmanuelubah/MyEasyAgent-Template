"use client";

import {
    UserPlus, Search, Bell, Home, Crown, ShieldCheck,
    Upload, Users, Info, X, Clock, AlertCircle, ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Hero Section */}
            <div className="bg-white border-b border-gray-100 py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-black text-gray-900 mb-6 font-outfit">How MyEasyAgent Works</h1>
                    <p className="text-xl text-gray-500 font-medium leading-relaxed">
                        Find your perfect rental in four simple steps. Our platform does the heavy lifting so you don't have to.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-20 space-y-32">
                {/* For Seekers: 4 Steps */}
                <section>
                    <div className="text-center mb-16">
                        <span className="bg-emerald-100 text-emerald-700 text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest border border-emerald-200">For Seekers</span>
                        <h2 className="text-4xl font-black text-gray-900 mt-6 font-outfit">Find your next home in 4 steps</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <UserPlus className="w-8 h-8 text-emerald-600" />,
                                title: "Set Your Profile",
                                text: "Tell us your budget, preferred location, and must-haves. Takes just 2 minutes."
                            },
                            {
                                icon: <Search className="w-8 h-8 text-emerald-600" />,
                                title: "We Track the Market",
                                text: "Our system scans new listings from verified agents 24/7, matching them to your criteria."
                            },
                            {
                                icon: <Bell className="w-8 h-8 text-emerald-600" />,
                                title: "You Get Notified",
                                text: "Receive instant alerts for properties that match. HuntSmart Pass users get notifications 30 minutes early."
                            },
                            {
                                icon: <Home className="w-8 h-8 text-emerald-600" />,
                                title: "View & Move In",
                                text: "Book a viewing with your HuntSmart Pass or contact the agent directly. Move into your new home."
                            }
                        ].map((step, i) => (
                            <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-emerald-900/5 hover:scale-[1.02] transition-all group">
                                <div className="w-16 h-16 bg-emerald-50 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:rotate-6 transition-all">
                                    <div className="group-hover:text-white transition-colors">{step.icon}</div>
                                </div>
                                <h3 className="text-xl font-black text-gray-900 mb-3">{step.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed font-medium">{step.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* AI Matching Banner */}
                <section className="bg-emerald-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800/50 rounded-full blur-3xl -mr-20 -mt-20" />
                    <div className="relative z-10 max-w-3xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                <ShieldCheck className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-emerald-300 text-sm font-black uppercase tracking-[0.2em]">AI-Powered</span>
                        </div>
                        <h2 className="text-4xl font-black mb-8 font-outfit">AI-Powered Property Matching</h2>
                        <p className="text-emerald-100 text-lg leading-relaxed mb-10 font-medium">
                            Set your preferences once and our AI agent scans the market for you. Get instant notifications when properties match your criteria. No more endless scrolling or searching.
                        </p>
                        <Link href="/properties" className="inline-flex items-center gap-2 bg-white text-emerald-900 px-10 py-5 rounded-2xl font-black hover:bg-emerald-50 transition-all shadow-2xl">
                            Start Searching <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>

                {/* HuntSmart Pass Detail */}
                <section>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="bg-amber-100 text-amber-700 text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest border border-amber-200">Premium Upgrade</span>
                            <h2 className="text-4xl font-black text-gray-900 mt-6 mb-8 font-outfit leading-tight">How HuntSmart Pass Works</h2>
                            <p className="text-gray-500 text-lg mb-10 font-medium leading-relaxed">
                                Your complete property search package for <span className="text-gray-900 font-black font-mono">₦15,000</span>. We verify every listing so you don't get scammed.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { title: "Priority Notifications", text: "Get alerts 30 minutes before listings go public. Be the first to see and book new properties." },
                                    { title: "5 Property Inspections", text: "Includes 1 FREE inspection + 4 more at ₦2,000 each. The fee goes directly to the agent for transport." },
                                    { title: "Fixed 10% Commission", text: "No surprise fees. Agent commission is locked at 10% of annual rent for all platform deals." },
                                    { title: "Priority Handler", text: "Dedicated support and 4-hour agent response guarantee (for HuntSmart requests)." }
                                ].map((feature, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                                            <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-gray-900">{feature.title}</h4>
                                            <p className="text-sm text-gray-500 font-medium">{feature.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link href="/pricing" className="mt-12 inline-flex items-center gap-2 text-emerald-600 font-black group transition-all">
                                View Pricing Plans <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                        <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-2xl shadow-emerald-900/5 relative group">
                            <div className="absolute inset-0 bg-emerald-600 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity rounded-[3.5rem]" />
                            <div className="relative space-y-8">
                                <div className="flex items-center justify-between pb-8 border-b border-gray-50">
                                    <h3 className="text-2xl font-black text-gray-900">Pass Preview</h3>
                                    <Crown className="w-8 h-8 text-amber-500 fill-amber-500 animate-pulse" />
                                </div>
                                <div className="space-y-6">
                                    <div className="h-12 bg-gray-50 rounded-2xl animate-pulse" />
                                    <div className="h-12 bg-gray-50 rounded-2xl animate-pulse w-3/4" />
                                    <div className="h-12 bg-gray-50 rounded-2xl animate-pulse w-1/2" />
                                </div>
                                <div className="pt-8 bg-emerald-50/50 rounded-3xl p-6 border border-emerald-100/50">
                                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Inspection Token</p>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${i === 1 ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-gray-300'}`}>
                                                {i}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* For Agents Section */}
                <section>
                    <div className="text-center mb-16">
                        <span className="bg-purple-100 text-purple-700 text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest border border-purple-200">For Agents</span>
                        <h2 className="text-4xl font-black text-gray-900 mt-6 font-outfit">List your properties in 3 steps</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <ShieldCheck className="w-8 h-8 text-purple-600" />,
                                title: "Get Verified",
                                text: "Upload your LASRERA/ERCAAN certificate or company ID. Verified in 24-48 hours."
                            },
                            {
                                icon: <Upload className="w-8 h-8 text-purple-600" />,
                                title: "Upload Property",
                                text: "Add property details, high-quality photos, and set your available inspection times."
                            },
                            {
                                icon: <Users className="w-8 h-8 text-purple-600" />,
                                title: "Connect with Clients",
                                text: "Receive bookings from HuntSmart Pass holders. Earn ₦2,000 per completed inspection."
                            }
                        ].map((step, i) => (
                            <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-purple-900/5 group">
                                <div className="w-16 h-16 bg-purple-50 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-all">
                                    <div className="group-hover:text-white transition-colors">{step.icon}</div>
                                </div>
                                <h3 className="text-xl font-black text-gray-900 mb-3">{step.title}</h3>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed">{step.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link href="/register?role=agent" className="inline-flex items-center gap-2 bg-gray-900 text-white px-10 py-5 rounded-2xl font-black hover:bg-black transition-all shadow-2xl">
                            Register as Agent <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>

                {/* Booking Rules & Policies */}
                <section className="bg-white rounded-[3rem] border border-gray-100 p-12 md:p-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 mb-6 font-outfit">Booking Rules</h2>
                                <p className="text-gray-500 font-medium">Fair rules that protect both property seekers and agents.</p>
                            </div>

                            <div className="space-y-8">
                                <div className="flex gap-6 items-start">
                                    <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center shrink-0">
                                        <Clock className="w-6 h-6 text-amber-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black text-gray-900 mb-2 font-outfit">Cancellation Policy</h4>
                                        <div className="space-y-4 text-sm text-gray-500 font-medium leading-relaxed">
                                            <p><strong className="text-gray-900">More than 24h before:</strong> Both agents and clients can cancel freely by providing a reason.</p>
                                            <p><strong className="text-gray-900">Less than 24h before:</strong> Cancellation requires admin approval. Emergencies only.</p>
                                            <p><strong className="text-gray-900">Repeated no-shows:</strong> Risk permanent suspension from the platform.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-red-50 rounded-[2rem] border border-red-100 flex gap-4">
                                    <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                                    <div>
                                        <p className="text-sm font-black text-red-900 mb-1 leading-tight">No Side-Lining Policy</p>
                                        <p className="text-[11px] text-red-800/70 font-medium leading-relaxed">
                                            Attempting to close deals outside MyEasyAgent will result in immediate termination for both agent and client. We record all interaction logs.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 mb-6 font-outfit">Agent Response Requirements</h2>
                                <p className="text-gray-500 font-medium">What agents must do when receiving internal booking requests.</p>
                            </div>

                            <div className="space-y-8">
                                {[
                                    { title: "Respond within 4 hours", text: "Agents must acknowledge HuntSmart Pass booking requests within 4 hours of receiving them." },
                                    { title: "3 Available Slots within 48h", text: "Agents must offer at least 3 available time slots for property inspections within the next 48 hours." },
                                    { title: "Confirm Availability", text: "Listings must be confirmed available within 48-72 hours. No stale or fake listings allowed." }
                                ].map((rule, i) => (
                                    <div key={i} className="flex gap-6 items-start">
                                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-gray-900 mb-1 font-outfit">{rule.title}</h4>
                                            <p className="text-sm text-gray-500 font-medium leading-relaxed">{rule.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="text-center py-20">
                    <h2 className="text-5xl font-black text-gray-900 mb-8 font-outfit">Ready to get started?</h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 font-medium">
                        Join thousands of Lagosians who found their perfect property without stress. Stop searching, start matching.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/properties" className="bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
                            Browse Properties
                        </Link>
                        <Link href="/pricing" className="bg-white text-gray-900 border-2 border-gray-100 px-12 py-5 rounded-2xl font-black hover:border-emerald-600 transition-all">
                            Get HuntSmart Pass
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}

const CheckCircle2 = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);
