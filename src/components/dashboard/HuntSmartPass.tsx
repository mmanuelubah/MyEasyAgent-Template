"use client";

import { CreditCard, ShieldCheck, Zap, AlertCircle, RefreshCcw, Crown } from "lucide-react";
import { useState } from "react";

export default function HuntSmartPass() {
    const [inspectionsUsed, setInspectionsUsed] = useState(1);
    const totalInspections = 5;

    return (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
            <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">HuntSmart Pass</h3>
                        <p className="text-sm text-gray-500 mt-1">Usage-based access for Lagos hunters.</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                        <Zap className="w-6 h-6 fill-current" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <CreditCard className="w-5 h-5 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Credits</p>
                                <p className="font-bold text-gray-900">Inspections Remaining</p>
                            </div>
                        </div>
                        <div className="flex items-end gap-2 text-4xl font-black text-emerald-600">
                            {totalInspections - inspectionsUsed}
                            <span className="text-sm text-gray-400 font-bold mb-1.5 uppercase tracking-widest">/ {totalInspections} total</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200/50">
                            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                <div
                                    className="bg-emerald-600 h-full transition-all duration-1000"
                                    style={{ width: `${((totalInspections - inspectionsUsed) / totalInspections) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-emerald-900 p-6 rounded-3xl text-white relative overflow-hidden group">
                        <div className="relative z-10">
                            <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest mb-1">Detailed Intelligence</p>
                            <h4 className="font-bold text-lg mb-4">HuntSmart Benefits</h4>
                            <ul className="space-y-2 mb-4">
                                {[
                                    "1 FREE Physical Inspection",
                                    "4 Additional at ₦2,000 each",
                                    "Priority Notifications (30m early)",
                                    "Exclusive Photos/Videos",
                                    "Area Intelligence Reports",
                                    "Priority Scheduling",
                                    "Legal Document Review",
                                    "Offer Letter Generation"
                                ].map((benefit, i) => (
                                    <li key={i} className="text-[10px] flex items-center gap-2 text-emerald-100/90">
                                        <div className="w-1 h-1 bg-emerald-400 rounded-full" />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                            <button className="text-[10px] font-bold text-emerald-300 underline underline-offset-4 decoration-emerald-500/50 hover:text-white transition-colors">
                                Learn how HuntSmart Pass works
                            </button>
                        </div>
                        <Crown className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-amber-50 rounded-2xl border border-amber-100/50">
                    <div className="flex items-center gap-3">
                        <RefreshCcw className="w-5 h-5 text-amber-600" />
                        <p className="text-xs text-amber-800 font-medium leading-relaxed">
                            <span className="font-bold">Usage Alert:</span> Your pass includes 1 free inspection and 4 discounted inspections (₦2,000 each). Total value: ₦25,000+.
                        </p>
                    </div>
                    <button className="text-amber-800 font-bold text-xs underline decoration-2 underline-offset-4">Top Up Credits</button>
                </div>
            </div>
        </div>
    );
}
