'use client';

import { useState } from 'react';
import {
    TrendingUp, ShieldCheck, Wallet as WalletIcon,
    ArrowRight, CheckCircle2, AlertCircle, Clock,
    CreditCard, Banknote, History, ChevronRight,
    ArrowDownRight, Plus, PieChart, Crown, Lock, Key,
    ArrowUpRight, Info, ShieldAlert
} from "lucide-react";
import FeeBreakdown from "@/components/booking/FeeBreakdown";
import RefundForm from "@/components/booking/RefundForm";
import PayoutForm from "@/components/agent/PayoutForm";

export default function AgentWallet() {
    const [balance, setBalance] = useState(8000); // Withdrawable
    const [pendingBalance, setPendingBalance] = useState(24000); // Expected
    const [lockedBalance, setLockedBalance] = useState(4000); // Locked (within 24h)
    const [certifiedBalance, setCertifiedBalance] = useState(12000); // Certified (Completed)

    const [view, setView] = useState<'overview' | 'mobilization' | 'commissions'>('overview');
    const [bookingCode, setBookingCode] = useState("");
    const [showRefundForm, setShowRefundForm] = useState<{ id: string, client: string, amount: number } | null>(null);
    const [showPayoutForm, setShowPayoutForm] = useState(false);
    const [warningCount, setWarningCount] = useState(1);
    const agentName = "Sarah Johnson";

    const transactions = [
        { id: '1', type: 'credit', category: 'Mobilization', amount: 2000, desc: 'Verified - 5 Admiralty Way', client: 'Alex Rivera', date: '2 hrs ago', status: 'completed' },
        { id: '2', type: 'credit', category: 'Mobilization', amount: 2000, desc: 'Locked - Lekki Phase 1', client: 'David Moss', date: 'Scheduled: 4h from now', status: 'pending', isLocked: true },
        { id: '3', type: 'credit', category: 'Mobilization', amount: 2000, desc: 'Awaiting - Victoria Island', client: 'Sarah Chen', date: 'Scheduled: 2 days from now', status: 'pending', isLocked: false },
    ];

    const renderOverview = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Real-time Earnings (Section 6) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gray-900 rounded-[2.5rem] p-6 text-white overflow-hidden relative group">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Expected</p>
                    <h2 className="text-3xl font-black">₦{pendingBalance.toLocaleString()}</h2>
                    <p className="text-[10px] text-gray-500 mt-2">Potential from bookings</p>
                    <TrendingUp className="absolute -right-2 -bottom-2 w-16 h-16 text-white/5 group-hover:scale-110 transition-transform" />
                </div>
                <div className="bg-white border border-gray-100 rounded-[2.5rem] p-6 shadow-sm">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Locked</p>
                    <h2 className="text-3xl font-black text-amber-600">₦{lockedBalance.toLocaleString()}</h2>
                    <p className="text-[10px] text-gray-400 mt-2">Within 24h window (3.B)</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-[2.5rem] p-6 shadow-sm">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Certified</p>
                    <h2 className="text-3xl font-black text-blue-600">₦{certifiedBalance.toLocaleString()}</h2>
                    <p className="text-[10px] text-gray-400 mt-2">Attendance verified</p>
                </div>
                <div className="bg-emerald-600 rounded-[2.5rem] p-6 text-white shadow-xl shadow-emerald-200">
                    <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest mb-1">Withdrawable</p>
                    <h2 className="text-3xl font-black">₦{balance.toLocaleString()}</h2>
                    <button
                        onClick={() => setShowPayoutForm(true)}
                        className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white py-2 rounded-xl text-xs font-bold transition-all"
                    >
                        Apply for Payout
                    </button>
                </div>
            </div>

            {/* Internal Warnings (Section 8) */}
            <div className="p-6 bg-red-50 rounded-3xl border border-red-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600">
                        <ShieldAlert className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900">TrustShield Warning Level</h4>
                        <p className="text-xs text-gray-500">Internal status: {warningCount === 0 ? 'Excellent' : warningCount + ' Active Warning(s)'}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">Agent-Side Only</p>
                </div>
            </div>

            {/* Recent Mobilization Fees */}
            <div className="space-y-4">
                <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <History className="w-5 h-5 text-gray-400" /> Recent Mobility Fees
                </h3>
                <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden divide-y divide-gray-50">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="p-6 flex flex-col md:flex-row items-center justify-between hover:bg-gray-50/50 transition-colors gap-4">
                            <div className="flex items-center gap-4 flex-1">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tx.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : tx.isLocked ? 'bg-amber-50 text-amber-600' : 'bg-orange-50 text-orange-600'}`}>
                                    <Banknote className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-gray-900">{tx.desc}</p>
                                        {tx.isLocked && tx.status !== 'completed' && (
                                            <span className="bg-amber-100 text-amber-700 text-[9px] font-black px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                                                <Lock className="w-2.5 h-2.5" /> Locked
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500">Client: {tx.client} • {tx.date}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                {tx.status !== 'completed' && (
                                    <div className="flex flex-col gap-2">
                                        <div className="relative">
                                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Enter Code"
                                                className="bg-gray-50 border border-gray-100 rounded-xl pl-9 pr-4 py-2 text-[10px] font-bold outline-none focus:ring-2 ring-emerald-500/10 w-32"
                                            />
                                        </div>
                                        {!tx.isLocked && (
                                            <button
                                                onClick={() => setShowRefundForm({ id: tx.id, client: tx.client, amount: tx.amount })}
                                                className="text-[10px] text-red-500 font-bold hover:underline text-left pl-3"
                                            >
                                                Cancel & Refund
                                            </button>
                                        )}
                                    </div>
                                )}
                                <div className="text-right">
                                    <p className="font-bold text-gray-900">₦{tx.amount.toLocaleString()}</p>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${tx.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : tx.isLocked ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-500'}`}>
                                            {tx.status === 'completed' ? 'Completed' : tx.isLocked ? 'Locked for Inspection' : 'Awaiting Code'}
                                        </span>
                                        {tx.isLocked ? (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setBalance(prev => prev + 24000);
                                                        setLockedBalance(prev => Math.max(0, prev - 24000));
                                                        alert("MATCH VERIFIED: Logic Overridden. ₦24,000 moved to WITHDRAWABLE immediately. (Section 2.C)");
                                                    }}
                                                    className="text-[8px] font-bold text-emerald-600 hover:underline uppercase tracking-tighter"
                                                >
                                                    Simulate Match Verified (2.C)
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setBalance(prev => prev + 2000);
                                                        setLockedBalance(prev => Math.max(0, prev - 24000));
                                                        setWarningCount(prev => prev + 1);
                                                        alert("REPORT NO-SHOW: Timer ended. ₦2,000 mobilized to agent. (Section 2.B)");
                                                    }}
                                                    className="text-[8px] font-bold text-orange-600 hover:underline uppercase tracking-tighter"
                                                >
                                                    Report No-Show (2.B)
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Awaiting Session</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section 11: Vigilance Guard */}
            <div className="bg-gray-900 rounded-[2.5rem] p-8 border border-gray-800 relative overflow-hidden text-white/90">
                <div className="absolute -right-10 -bottom-10 opacity-5">
                    <ShieldCheck className="w-64 h-64" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <h3 className="text-xs font-black text-emerald-500 uppercase tracking-[0.2em]">Fraud Guard active</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div>
                            <p className="text-[10px] font-bold text-gray-500 uppercase mb-3">Attendance Monitoring</p>
                            <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[94%]" />
                            </div>
                            <p className="text-[10px] text-gray-500 mt-3">Analyzing GPS proximity data...</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-500 uppercase mb-3">Code Authenticity</p>
                            <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[100%]" />
                            </div>
                            <p className="text-[10px] text-gray-500 mt-3">Encryption tokens verified.</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-500 uppercase mb-3">Abuse Prevention</p>
                            <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[88%]" />
                            </div>
                            <p className="text-[10px] text-gray-500 mt-3">Monitoring refund patterns.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto space-y-10 px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Agent Wallet</h1>
                    <p className="text-gray-500 text-sm mt-1">Real-time mobilization fee earnings and verification.</p>
                </div>
                <div className="flex bg-white border border-gray-100 p-1.5 rounded-2xl shadow-sm">
                    {['overview', 'mobilization', 'commissions'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setView(t as any)}
                            className={`px-6 py-2.5 rounded-xl font-bold text-xs capitalize transition-all ${view === t ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {view === 'overview' ? renderOverview() : (
                <div className="p-20 text-center bg-white rounded-[3rem] border border-dashed border-gray-200">
                    <p className="text-gray-400 font-bold italic">Detailed {view} view coming soon in production.</p>
                </div>
            )}

            {showRefundForm && (
                <RefundForm
                    bookingId={showRefundForm.id}
                    clientName={showRefundForm.client}
                    amount={showRefundForm.amount}
                    onClose={() => setShowRefundForm(null)}
                    onSuccess={() => {
                        alert("Refund Processed. User has been credited.");
                        setShowRefundForm(null);
                        setWarningCount(prev => prev + 1);
                    }}
                />
            )}
            {showPayoutForm && (
                <PayoutForm
                    availableBalance={balance}
                    agentName={agentName}
                    onClose={() => setShowPayoutForm(false)}
                />
            )}
        </div>
    );
}
