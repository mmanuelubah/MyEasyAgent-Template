'use client';

import { ShieldCheck, Lock, Eye, AlertCircle, Scale } from "lucide-react";

export default function SafetyBanner() {
    const pillars = [
        { icon: Lock, title: "Blocked Direct Contact", desc: "Keep all chats on platform to prevent fraud and identity theft." },
        { icon: ShieldCheck, title: "Verified Identity", desc: "Agents and Landlords undergo strict LASRERA & govt. ID verification." },
        { icon: AlertCircle, title: "Mobilization Protection", desc: "Fees are held by MyEasyAgent until inspection code is verified." },
        { icon: Eye, title: "Inspection-First Policy", desc: "Never pay rent or agency fees before a physical property inspection." },
        { icon: Scale, title: "Legal Dispute Coverage", desc: "Every transaction is backed by our legal partner agreement framework." }
    ];

    return (
        <div className="bg-gray-900 rounded-[2.5rem] p-8 border border-gray-800 relative overflow-hidden text-white/90">
            <div className="absolute -right-10 -top-10 opacity-5">
                <ShieldCheck className="w-64 h-64" />
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <h3 className="text-xs font-black text-emerald-500 uppercase tracking-[0.2em]">TrustShield Safety Pillars</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {pillars.map((p, i) => (
                        <div key={i} className="space-y-3">
                            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-emerald-500">
                                <p.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-[11px] font-black uppercase text-white mb-1 tracking-tight">{p.title}</h4>
                                <p className="text-[10px] text-gray-500 leading-relaxed font-medium">{p.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
