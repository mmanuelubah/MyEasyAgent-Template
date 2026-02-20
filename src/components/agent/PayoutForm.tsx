"use client";

import { useState } from "react";
import { Landmark, CheckCircle2, ChevronRight, X, ShieldCheck } from "lucide-react";

interface PayoutFormProps {
    onClose: () => void;
    availableBalance: number;
    agentName: string;
}

export default function PayoutForm({ onClose, availableBalance, agentName }: PayoutFormProps) {
    const [step, setStep] = useState(1);
    const [bank, setBank] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountName, setAccountName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setStep(3);
            setIsSubmitting(false);
        }, 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[3rem] p-10 max-w-xl w-full relative animate-in zoom-in duration-300 border border-gray-100 shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-2"
                >
                    <X className="w-5 h-5" />
                </button>

                {step === 1 ? (
                    <div className="space-y-8 text-center">
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto">
                            <Landmark className="w-10 h-10" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-gray-900">Request Payout</h2>
                            <p className="text-gray-500 mt-2">Withdraw your certified earnings to your bank account.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Available for Payout</p>
                            <h3 className="text-4xl font-black text-emerald-600">₦{availableBalance.toLocaleString()}</h3>
                        </div>
                        <button
                            onClick={() => setStep(2)}
                            className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black hover:bg-black transition-all flex items-center justify-center gap-2 group shadow-xl shadow-gray-200"
                        >
                            Enter Bank Details
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                ) : step === 2 ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-black text-gray-900">Bank Details</h2>
                            <p className="text-sm text-gray-500 mt-1">Funds will only be disbursed to accounts matching your registered name.</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Bank Name</label>
                                <select
                                    required
                                    value={bank}
                                    onChange={(e) => setBank(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold focus:ring-2 ring-emerald-500/20 outline-none"
                                >
                                    <option value="">Select Bank</option>
                                    <option value="gtb">Guaranty Trust Bank</option>
                                    <option value="zenith">Zenith Bank</option>
                                    <option value="access">Access Bank</option>
                                    <option value="kuda">Kuda MFB</option>
                                    <option value="opay">OPay</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Account Number</label>
                                <input
                                    required
                                    type="text"
                                    maxLength={10}
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
                                    placeholder="0123456789"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold focus:ring-2 ring-emerald-500/20 outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Account Name</label>
                                <input
                                    required
                                    type="text"
                                    value={accountName}
                                    onChange={(e) => setAccountName(e.target.value)}
                                    placeholder={agentName}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold focus:ring-2 ring-emerald-500/20 outline-none"
                                />
                                {accountName && accountName.toLowerCase() !== agentName.toLowerCase() && (
                                    <p className="text-[10px] text-red-500 font-bold mt-2 uppercase tracking-wide">
                                        Warning: Account name MUST match "{agentName}" for successful payout.
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 flex gap-3">
                            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                            <p className="text-[10px] text-emerald-800 font-medium leading-relaxed">
                                DISBURSEMENT SECURITY: Payout requests are audited within 2 hours. Funds are usually received within 24 business hours.
                            </p>
                        </div>

                        <button
                            disabled={isSubmitting || !bank || accountNumber.length !== 10 || !accountName}
                            type="submit"
                            className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Submitting Request...
                                </>
                            ) : `Confirm Payout ₦${availableBalance.toLocaleString()}`}
                        </button>
                    </form>
                ) : (
                    <div className="text-center space-y-8 animate-in zoom-in duration-300">
                        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-gray-900">Request Received!</h2>
                            <p className="text-gray-500 mt-2">Disbursement ID: <span className="font-mono text-gray-900">#PAY-2026-X83</span></p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-sm font-medium text-gray-600">
                            Your payout of ₦{availableBalance.toLocaleString()} is currently being audited. You will receive an alert once disbursed.
                        </div>
                        <button
                            onClick={onClose}
                            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold"
                        >
                            Return to Wallet
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
