'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle2, ShieldCheck, X } from 'lucide-react';

interface RefundFormProps {
    bookingId: string;
    clientName: string;
    amount: number;
    onClose: () => void;
    onSuccess: () => void;
    role?: 'agent' | 'client';
}

export default function RefundForm({ bookingId, clientName, amount, onClose, onSuccess, role = 'agent' }: RefundFormProps) {
    const [reason, setReason] = useState('');
    const [accepted, setAccepted] = useState(role === 'client'); // Auto-accept for client just claiming
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!accepted || (role === 'agent' && !reason)) return;

        setIsSubmitting(true);
        // Simulate API call for Section 4 & 5 compliance
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        onSuccess();
    };

    const isAgent = role === 'agent';

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[2.5rem] p-10 max-w-xl w-full relative animate-in zoom-in duration-300 border border-gray-100 shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-2"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="mb-8">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${isAgent ? 'bg-red-50' : 'bg-emerald-50'}`}>
                        {isAgent ? <AlertCircle className="w-8 h-8 text-red-600" /> : <ShieldCheck className="w-8 h-8 text-emerald-600" />}
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-2">
                        {isAgent ? 'Cancel Inspection' : 'Claim Refund'}
                    </h2>
                    <p className="text-gray-500">
                        {isAgent
                            ? <>You are initiating a refund for <strong>{clientName}</strong> (Booking #{bookingId}).</>
                            : <>Please provide your bank details to receive the ₦{amount.toLocaleString()} refund for Booking #{bookingId}.</>
                        }
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {isAgent && (
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Reason for Cancellation</label>
                            <textarea
                                required
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="e.g. Property suddenly unavailable, Emergency, etc."
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-red-500/20 outline-none transition-all min-h-[100px]"
                            />
                        </div>
                    )}

                    {isAgent && (
                        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 mb-6">
                            <div className="flex gap-3">
                                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                <div className="text-xs text-amber-900 leading-relaxed font-medium">
                                    <strong>Section 5 Compliance:</strong> Refunding this booking will automatically grant the client 1 (one) re-usable inspection credit. Your TrustShield score will be reviewed.
                                </div>
                            </div>
                        </div>
                    )}

                    {isAgent && (
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${accepted ? 'bg-emerald-600 border-emerald-600' : 'border-gray-200 bg-gray-50'}`}>
                                {accepted && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={accepted}
                                    onChange={() => setAccepted(!accepted)}
                                />
                            </div>
                            <span className="text-[11px] text-gray-500 leading-tight group-hover:text-gray-700 select-none">
                                <strong>Legal Acceptance Clause:</strong> I confirm that this cancellation is genuine. I understand that repeated cancellations without valid proof may lead to suspension, fine, and permanent removal from MyEasyAgent.
                            </span>
                        </label>
                    )}

                    <div className="space-y-4 pt-4 border-t border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            {isAgent ? 'Bank Details for Refund Payout' : 'Your Bank Details for Disbursement'}
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <input
                                    required
                                    type="text"
                                    placeholder="Bank Name"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-xs font-bold focus:ring-2 ring-emerald-500/10 outline-none"
                                />
                            </div>
                            <div>
                                <input
                                    required
                                    type="text"
                                    placeholder="Account Number"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-xs font-bold focus:ring-2 ring-emerald-500/10 outline-none"
                                />
                            </div>
                        </div>
                        <input
                            required
                            type="text"
                            placeholder="Account Name (e.g. Alex Rivera)"
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-xs font-bold focus:ring-2 ring-emerald-500/10 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!accepted || (isAgent && !reason) || isSubmitting}
                        className={`w-full text-white py-4 rounded-2xl font-bold transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${isAgent ? 'bg-red-600 hover:bg-red-700 shadow-red-200' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'}`}
                    >
                        {isSubmitting ? 'Processing...' : isAgent ? `Confirm Cancellation & Refund ₦${amount.toLocaleString()}` : `Claim My ₦${amount.toLocaleString()} Refund`}
                    </button>
                </form>
            </div>
        </div>
    );
}
