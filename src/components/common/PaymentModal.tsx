'use client';

import { useState } from 'react';
import { CreditCard, ShieldCheck, X, Loader2, CheckCircle2 } from 'lucide-react';

interface PaymentModalProps {
    onSuccess: () => void;
    onClose: () => void;
    amount: number;
}

export default function PaymentModal({ onSuccess, onClose, amount }: PaymentModalProps) {
    const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');

    const handlePay = () => {
        setStep('processing');
        setTimeout(() => {
            setStep('success');
            setTimeout(() => {
                onSuccess();
            }, 1500);
        }, 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full relative shadow-2xl animate-in zoom-in duration-300 border border-gray-100">
                {step !== 'processing' && (
                    <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-2">
                        <X className="w-5 h-5" />
                    </button>
                )}

                {step === 'details' && (
                    <div className="space-y-6">
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                            <CreditCard className="w-8 h-8" />
                        </div>
                        <div className="text-center">
                            <h2 className="text-2xl font-black text-gray-900">Payment Simulation</h2>
                            <p className="text-gray-500 text-sm mt-1">Upgrade to HuntSmart Pass for ₦{amount.toLocaleString()}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                                <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    <span>Card Number</span>
                                    <span>02/28</span>
                                </div>
                                <p className="text-lg font-mono font-black text-gray-900 tracking-wider text-center py-2">
                                    **** **** **** 4242
                                </p>
                            </div>

                            <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-2xl border border-blue-100">
                                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                <p className="text-[10px] text-blue-900 leading-tight font-medium">
                                    This is a secure simulation. No real funds will be deducted. Clicking "Paid" will grant you full HuntSmart access across the platform.
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handlePay}
                            className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black text-sm hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200"
                        >
                            Pay ₦{amount.toLocaleString()} Now
                        </button>
                    </div>
                )}

                {step === 'processing' && (
                    <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                        <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
                        <div>
                            <h2 className="text-xl font-black text-gray-900">Processing Payment</h2>
                            <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest font-bold">Verifying with Bank Simulation...</p>
                        </div>
                    </div>
                )}

                {step === 'success' && (
                    <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-500">
                        <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-200 animate-in zoom-in duration-500 scale-110">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900">Payment Successful!</h2>
                            <p className="text-emerald-600 font-bold uppercase tracking-widest text-[10px] mt-1">HuntSmart Status Activated</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
