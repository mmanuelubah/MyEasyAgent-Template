"use client";

import Image from "next/image";
import { Linkedin, Twitter } from "lucide-react";

const team = [
    {
        name: "Emmanuel",
        title: "CEO & Head of Product",
        image: "/team/emmanuel.jpg",
        description: "Visionary behind MyEasyAgent's mission to bring radical transparency to Lagos real estate.",
        initials: "EO",
        accent: "from-gray-900 to-gray-800",
    },
    {
        name: "Samson",
        title: "CMO & Communications Lead",
        image: "/team/samson.jpg",
        description: "Drives brand strategy and market expansion across the Lagos property ecosystem.",
        initials: "SA",
        accent: "from-emerald-800 to-emerald-700",
    },
    {
        name: "Precious",
        title: "CCO & Head of Field Operations",
        image: "/team/precious.jpg",
        description: "Leads on-ground inspection operations and ensures every landlord interaction meets our standards.",
        initials: "PO",
        accent: "from-emerald-700 to-teal-700",
    },
    {
        name: "Arinze",
        title: "CTO & Lead Developer",
        image: "/team/arinze.png",
        description: "Architecting the technology stack that powers HuntSmart and the full platform experience.",
        initials: "AO",
        accent: "from-gray-800 to-emerald-900",
    },
];

export default function TeamSection() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full mb-6">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">The Team</span>
                    </div>
                    <h2 className="text-5xl font-black text-gray-900 mb-4 leading-tight">
                        People Who Make It<br />
                        <span className="text-emerald-600">Possible</span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
                        A small, focused team obsessed with making Lagos real estate safer, smarter, and more transparent for everyone.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, i) => (
                        <div
                            key={member.name}
                            className="group relative flex flex-col items-center text-center"
                        >
                            {/* Photo container */}
                            <div className="relative w-full aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-6 shadow-xl shadow-gray-200/80 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-emerald-100/60 group-hover:-translate-y-2">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Gradient overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-t ${member.accent} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />

                                {/* Hover name plate */}
                                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-white font-black text-lg leading-tight">{member.name}</p>
                                    <p className="text-emerald-400 text-[11px] font-bold uppercase tracking-widest mt-1">{member.title}</p>
                                </div>

                                {/* Initials badge (fallback loader feel) */}
                                <div className={`absolute top-4 right-4 w-9 h-9 rounded-xl bg-gradient-to-br ${member.accent} flex items-center justify-center shadow-lg`}>
                                    <span className="text-white text-[10px] font-black">{member.initials}</span>
                                </div>
                            </div>

                            {/* Info */}
                            <h3 className="text-xl font-black text-gray-900 mb-1">{member.name}</h3>
                            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">{member.title}</p>
                            <p className="text-gray-500 text-sm leading-relaxed px-2">{member.description}</p>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA strip */}
                <div className="mt-20 bg-gray-900 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-white relative overflow-hidden">
                    <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10">
                        <p className="text-2xl font-black mb-1">We're building something big.</p>
                        <p className="text-gray-400 text-sm">Interested in joining the team? We'd love to hear from you.</p>
                    </div>
                    <a
                        href="/contact"
                        className="relative z-10 shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-xl shadow-emerald-900/40 text-sm"
                    >
                        Get in Touch
                    </a>
                </div>
            </div>
        </section>
    );
}
