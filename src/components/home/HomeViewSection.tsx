"use client";

import { Crown, ArrowRight, Play, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function HomeViewSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-2xl shadow-emerald-900/5 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Image Side */}
                    <div className="relative h-[400px] lg:h-auto overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
                            alt="Premium Real Estate Inspection"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

                        {/* Floating Badge */}
                        <div className="absolute bottom-8 left-8 right-8">
                            <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Latest Update</p>
                                        <p className="text-sm font-bold text-gray-900">Inspection Report Generated</p>
                                    </div>
                                </div>
                                <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:text-emerald-700">View Report</button>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="p-12 md:p-20 flex flex-col justify-center relative">
                        {/* "Powered by" small tag */}
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                                <Crown className="w-4 h-4 text-emerald-600" />
                            </div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Powered by MyEasyAgent</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 font-outfit leading-tight">
                            Say goodbye to <br />
                            <span className="text-emerald-600">property surprises.</span>
                        </h2>

                        <p className="text-lg text-gray-500 font-medium leading-relaxed mb-10">
                            Inspect properties from your home and at your comfort, say Goodbye to surprises at little to no expense
                            through our <span className="text-gray-900 font-black">Homeview</span> powered by MyEasyAgent through
                            HuntSmart Pass.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-12">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                <span className="text-sm font-bold text-gray-700">Detailed Snagging</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                <span className="text-sm font-bold text-gray-700">Verified Condition</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/pricing"
                                className="bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black text-center hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                            >
                                Book Now
                            </Link>
                            <Link
                                href="/how-it-works"
                                className="bg-white text-gray-900 border-2 border-gray-100 px-10 py-5 rounded-2xl font-black text-center hover:border-emerald-600 transition-all"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
