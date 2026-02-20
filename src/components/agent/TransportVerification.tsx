"use client";

import { useState } from "react";
import { CheckCircle2, QrCode, ArrowRight, Wallet, History, Info } from "lucide-react";

export default function TransportVerification() {
    const [bookingCode, setBookingCode] = useState("");
    const [status, setStatus] = useState<'idle' | 'verifying' | 'success'>('idle');

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (!bookingCode) return;
        setStatus('verifying');
        setTimeout(() => setStatus('success'), 1500);
    };

    return (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
            <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Transport Fair Reimbursement</h3>
                        <p className="text-sm text-gray-500 mt-1">Claim your ₦2,500 mobilization fee per inspection.</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                        <Wallet className="w-6 h-6" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="md:col-span-2">
                        <form onSubmit={handleVerify} className="space-y-4">
                            <div className="relative">
                                <QrCode className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={bookingCode}
                                    onChange={(e) => setBookingCode(e.target.value)}
                                    placeholder="Enter Client Booking Code (e.g. MEA-X82)"
                                    className="w-full pl-14 pr-6 py-5 bg-gray-50 border-0 rounded-2xl text-sm font-bold uppercase tracking-widest outline-none focus:ring-2 ring-emerald-600/20"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'verifying' || !bookingCode}
                                className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 disabled:bg-gray-200"
                            >
                                {status === 'verifying' ? "Verifying Code..." : "Claim Reimbursement"} <ArrowRight className="w-5 h-5" />
                            </button>
                        </form>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex flex-col justify-center text-center">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Today's Earnings</p>
                        <p className="text-3xl font-black text-emerald-600">₦{status === 'success' ? '7,500' : '5,000'}</p>
                        <div className="flex items-center justify-center gap-1 mt-2 text-emerald-700 text-[10px] font-bold">
                            <CheckCircle2 className="w-3 h-3" /> {status === 'success' ? '3' : '2'} Inspections Validated
                        </div>
                    </div>
                </div>

                {status === 'success' && (
                    <div className="mb-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl animate-in zoom-in-95 duration-300">
                        <p className="text-xs text-emerald-800 font-medium">
                            <span className="font-bold">Success!</span> Code validated. ₦2,500 has been credited to your payout wallet.
                        </p>
                    </div>
                )}

                <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 flex items-center gap-2">
                        <History className="w-3 h-3" /> Claim History (Last 24h)
                    </h4>
                    <div className="divide-y divide-gray-50 bg-gray-50/50 rounded-2xl border border-gray-100">
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-emerald-600 shadow-sm font-bold text-[10px]">#022</div>
                                <div>
                                    <p className="text-xs font-bold text-gray-900">Client: Alex Rivera</p>
                                    <p className="text-[10px] text-gray-500">10:45 AM • Gbagada Ph 1</p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-emerald-600">+₦2,500</span>
                        </div>
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-emerald-600 shadow-sm font-bold text-[10px]">#019</div>
                                <div>
                                    <p className="text-xs font-bold text-gray-900">Client: Sarah Williams</p>
                                    <p className="text-[10px] text-gray-500">09:15 AM • Surulere</p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-emerald-600">+₦2,500</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <Info className="w-5 h-5 text-blue-600 shrink-0" />
                    <p className="text-[10px] text-blue-800 leading-relaxed font-medium">
                        Reimbursement is only for <span className="font-bold">Direct/Semi-Direct</span> agents with valid <span className="font-bold">LASRERA</span> certification. Third-party referrers are not eligible for transport fair matching.
                    </p>
                </div>
            </div>
        </div>
    );
}
