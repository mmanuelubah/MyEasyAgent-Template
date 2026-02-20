"use client";

import { useState } from "react";
import {
    FileText, ShieldCheck, Search, Upload,
    CheckCircle2, AlertTriangle, ArrowRight,
    Clock, Download
} from "lucide-react";
import { RED_FLAG_CHECKLIST } from "@/lib/documents";

export default function TransactionBridge() {
    const [activeTab, setActiveTab] = useState<'offers' | 'reviews'>('offers');
    const [isReviewing, setIsReviewing] = useState(false);

    return (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
            <div className="flex border-b border-gray-50">
                <button
                    onClick={() => setActiveTab('offers')}
                    className={`flex-1 py-6 font-bold text-sm transition-all ${activeTab === 'offers' ? 'text-emerald-600 bg-emerald-50/30 border-b-2 border-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    Provisional Offers
                </button>
                <button
                    onClick={() => setActiveTab('reviews')}
                    className={`flex-1 py-6 font-bold text-sm transition-all ${activeTab === 'reviews' ? 'text-emerald-600 bg-emerald-50/30 border-b-2 border-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    Legal Review Tracker
                </button>
            </div>

            <div className="p-8">
                {activeTab === 'offers' ? (
                    <div className="animate-in fade-in duration-500">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Your Secured Offers</h3>
                                <p className="text-sm text-gray-500 mt-1">Lagos properties you've locked with a deposit.</p>
                            </div>
                            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                                <FileText className="w-6 h-6" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-6 rounded-3xl border border-gray-100 bg-gray-50/30 flex items-center justify-between group hover:border-emerald-200 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">2-Bedroom Flat, Lekki Ph 1</p>
                                        <p className="text-xs text-gray-500">Issued: Feb 12, 2026 • Valid for 48h</p>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Download PDF <Download className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="animate-in fade-in duration-500">
                        <div className="mb-8 p-6 bg-emerald-900 rounded-3xl text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-2">The "Safe to Sign" Check</h3>
                                <p className="text-sm text-emerald-100/70 leading-relaxed mb-6">
                                    Got an agreement from a landlord's lawyer? Upload it here. Our team will scan for trap clauses for free.
                                </p>
                                <button
                                    onClick={() => setIsReviewing(true)}
                                    className="flex items-center gap-2 bg-white text-emerald-900 px-6 py-3 rounded-2xl font-bold text-xs"
                                >
                                    Upload Contract for Review <Upload className="w-4 h-4" />
                                </button>
                            </div>
                            <Search className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5" />
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">Review Status</h4>
                            <div className="p-6 rounded-3xl border border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 italic">"Gbagada Terrace Agreement.pdf"</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Pending Analysis</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 font-medium">Est. completion: 2 hours</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
