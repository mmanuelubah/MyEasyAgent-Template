"use client";

import { Check, CheckCircle2, Crown, ShieldCheck, Zap, Mail, MessageCircle, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Pricing() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 py-24">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-black text-gray-900 mb-6 font-outfit">Simple, Transparent Pricing</h1>
                    <p className="text-xl text-gray-500 font-medium leading-relaxed">
                        Browse for free. Get the HuntSmart Pass to unlock priority notifications,
                        inspections, and fixed commission rates.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-24">
                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch max-w-5xl mx-auto mb-32">
                    {/* Basic Plan */}
                    <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col justify-between group hover:scale-[1.02] transition-all">
                        <div>
                            <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center mb-10 border border-gray-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-all">
                                <Zap className="w-8 h-8 text-gray-400 group-hover:text-emerald-600" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-2 font-outfit">Explorer</h3>
                            <p className="text-gray-500 font-medium mb-8">Great for browsing and starting your journey.</p>

                            <div className="mb-10">
                                <span className="text-5xl font-black text-gray-900 font-mono">Free</span>
                            </div>

                            <ul className="space-y-5 mb-12">
                                {[
                                    "View all property listings",
                                    "General agent contact",
                                    "Save favorite properties",
                                    "Standard notifications",
                                    "Full platform support"
                                ].map((feat, i) => (
                                    <li key={i} className="flex gap-4 text-sm font-bold text-gray-500">
                                        <Check className="w-5 h-5 text-gray-300 shrink-0" /> {feat}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link href="/register" className="w-full bg-gray-100 text-gray-900 py-5 rounded-2xl font-black text-center hover:bg-gray-200 transition-all">
                            Get Started Free
                        </Link>
                    </div>

                    {/* HuntSmart Pass */}
                    <div className="bg-emerald-900 rounded-[3rem] p-12 text-white relative flex flex-col justify-between shadow-2xl shadow-emerald-900/40 hover:scale-[1.02] transition-all overflow-hidden border-4 border-emerald-400/20 group">
                        <div className="absolute top-0 right-0 p-8">
                            <Crown className="w-12 h-12 text-white/10 group-hover:scale-125 transition-transform duration-700" />
                        </div>

                        <div>
                            <div className="bg-emerald-500/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 inline-flex items-center gap-2 mb-10">
                                <Crown className="w-4 h-4 text-emerald-300" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">Recommended Upgrade</span>
                            </div>
                            <h3 className="text-3xl font-black mb-2 font-outfit">HuntSmart Pass</h3>
                            <p className="text-emerald-100/70 font-medium mb-8">Priority access to verified listings & fixed terms.</p>

                            <div className="mb-10 flex items-baseline gap-2">
                                <span className="text-5xl font-black font-mono">₦15,000</span>
                                <span className="text-emerald-300/50 text-xs font-bold uppercase tracking-widest">/ Pass</span>
                            </div>

                            <ul className="space-y-5 mb-12">
                                {[
                                    "Priority notifications (30m early)",
                                    "5 Physical property inspections",
                                    "Transparent Agent Commission",
                                    "Priority Handler / Support",
                                    "Verified-Only Listings",
                                    "1st Inspection completely FREE"
                                ].map((feat, i) => (
                                    <li key={i} className="flex gap-4 text-sm font-bold">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> {feat}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link href="/register?plan=huntsmart" className="w-full bg-white text-emerald-900 py-5 rounded-2xl font-black text-center hover:bg-emerald-50 transition-all shadow-xl">
                            Get HuntSmart Pass
                        </Link>
                    </div>
                </div>

                {/* Comparison Section */}
                <section className="bg-white rounded-[3.5rem] border border-gray-100 p-12 md:p-20 mb-32">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-black text-gray-900 font-outfit">Detailed Comparison</h2>
                        <p className="text-gray-500 font-medium mt-4">See why HuntSmart Pass users find homes faster</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-50">
                                    <th className="py-6 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Benefit</th>
                                    <th className="py-6 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Free Explorer</th>
                                    <th className="py-6 px-4 text-[10px] font-black text-emerald-600 uppercase tracking-widest">HuntSmart Pass</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {[
                                    { name: "Property Notifications", free: "Standard", premium: "Priority (30m Early)" },
                                    { name: "Inspection Limit", free: "N/A", premium: "5 per Pass" },
                                    { name: "Inspection Cost", free: "Varies", premium: "₦0 (1st) / ₦2,000 (Others)" },
                                    { name: "Commission Rate", free: "Negotiable (Often 15-20%)", premium: "Transparent & Negotiable" },
                                    { name: "Direct Agent Access", free: "Limited", premium: "Priority Line" },
                                    { name: "Legal Documentation", free: "Available", premium: "Review Included" },
                                    { name: "Support Level", free: "Help Center", premium: "Dedicated Handler" }
                                ].map((row, i) => (
                                    <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="py-6 px-4 text-sm font-black text-gray-900">{row.name}</td>
                                        <td className="py-6 px-4 text-sm text-gray-500 font-medium">{row.free}</td>
                                        <td className="py-6 px-4 text-sm text-emerald-600 font-black">{row.premium}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 font-outfit">Common Questions</h2>
                        <p className="text-gray-500 font-medium mt-4">Everything you need to know about the HuntSmart Pass</p>
                    </div>

                    <div className="space-y-8">
                        {[
                            {
                                q: "What happens after I use all 5 inspections?",
                                a: "You can purchase another HuntSmart Pass or continue browsing as a basic user. Each pass includes a fresh set of 5 inspections."
                            },
                            {
                                q: "Is the HuntSmart Pass refundable?",
                                a: "All payments are non-refundable unless required by law. The pass cannot be transferred to another user."
                            },
                            {
                                q: "What is the ₦2,000 inspection fee for?",
                                a: "The ₦2,000 covers the agent's transportation costs to meet you at the property. This goes directly to the agent via the platform."
                            },
                            {
                                q: "How are agent commissions handled?",
                                a: "While we strive to eliminate unnecessary middlemen, commissions are negotiated directly between you and the agent. We enforce transparency so there are no surprise fees."
                            }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                                <h3 className="text-lg font-black text-gray-900 mb-4 font-outfit flex items-center gap-3">
                                    <HelpCircle className="w-5 h-5 text-emerald-600" /> {faq.q}
                                </h3>
                                <p className="text-gray-500 font-medium leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Final CTA */}
                <section className="mt-32 text-center bg-gray-900 rounded-[4rem] p-20 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-emerald-600 opacity-5" />
                    <div className="relative z-10">
                        <h2 className="text-4xl font-black mb-6 font-outfit">Ready to find your home faster?</h2>
                        <p className="text-emerald-100/60 max-w-xl mx-auto mb-12 font-medium">
                            Join thousands of Lagosians who found their perfect property with HuntSmart Pass.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register?plan=huntsmart" className="bg-white text-gray-900 px-12 py-5 rounded-2xl font-black hover:bg-gray-100 transition-all shadow-2xl">
                                Get HuntSmart Pass
                            </Link>
                            <Link href="/about" className="bg-white/10 text-white border-2 border-white/20 backdrop-blur-md px-12 py-5 rounded-2xl font-black hover:bg-white/20 transition-all">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
