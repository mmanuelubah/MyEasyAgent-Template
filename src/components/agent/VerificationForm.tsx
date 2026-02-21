"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, ShieldCheck, Lock, Loader2 } from "lucide-react";

// Mock valid codes — in production these come from the DB
const VALID_CODES = new Set(["MEA-AB12", "MEA-CD34", "MEA-EF56", "CODE-2026"]);

export default function VerificationForm() {
    const [code, setCode] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [status, setStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

    const handleVerify = () => {
        if (code.length < 4) return;
        setIsVerifying(true);
        setTimeout(() => {
            setStatus(VALID_CODES.has(code.toUpperCase()) ? 'valid' : 'invalid');
            setIsVerifying(false);
        }, 1200);
    };

    const handleReset = () => {
        setCode("");
        setStatus('idle');
    };

    const ringClass =
        status === 'valid' ? 'ring-2 ring-emerald-500 bg-emerald-50' :
            status === 'invalid' ? 'ring-2 ring-red-400 bg-red-50' :
                'ring-2 ring-transparent bg-white';

    return (
        <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-xl max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-500 ${status === 'valid' ? 'bg-emerald-100 text-emerald-600' : status === 'invalid' ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600'}`}>
                    <Lock className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-gray-900">Verify Booking Code</h2>
                    <p className="text-gray-500 text-sm">Enter the client's booking code to certify the inspection.</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Input */}
                <div className={`p-6 rounded-[2rem] border transition-all duration-300 ${status === 'valid' ? 'border-emerald-200 bg-emerald-50' : status === 'invalid' ? 'border-red-200 bg-red-50' : 'border-gray-100 bg-gray-50'}`}>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 block">Booking Code</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => { setCode(e.target.value.toUpperCase()); setStatus('idle'); }}
                            placeholder="E.G. MEA-AB12"
                            className={`w-full border rounded-2xl p-5 pr-14 text-2xl font-mono font-black tracking-[0.4em] text-center focus:outline-none transition-all duration-300 ${ringClass}`}
                            maxLength={10}
                        />
                        {/* Status icon inside input */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            {isVerifying && <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />}
                            {!isVerifying && status === 'valid' && <CheckCircle2 className="w-7 h-7 text-emerald-500 animate-in zoom-in duration-300" />}
                            {!isVerifying && status === 'invalid' && <XCircle className="w-7 h-7 text-red-500 animate-in zoom-in duration-300" />}
                        </div>
                    </div>
                </div>

                {/* Result feedback */}
                {status === 'valid' && (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex items-center gap-4 animate-in slide-in-from-bottom-2 duration-300">
                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                            <p className="font-black text-emerald-900">✓ Code Verified — Inspection Certified</p>
                            <p className="text-xs text-emerald-700 mt-1">₦2,000 will be moved to your Locked balance. Payout after 24h.</p>
                        </div>
                    </div>
                )}
                {status === 'invalid' && (
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex items-center gap-4 animate-in slide-in-from-bottom-2 duration-300">
                        <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                            <XCircle className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <p className="font-black text-red-900">✗ Invalid Code</p>
                            <p className="text-xs text-red-700 mt-1">This code doesn't match any active booking. Do not certify. Contact support if needed.</p>
                        </div>
                    </div>
                )}

                <div className="flex gap-4">
                    <button
                        onClick={handleVerify}
                        disabled={isVerifying || code.length < 4}
                        className={`flex-1 py-5 rounded-2xl font-black text-white shadow-lg transition-all flex items-center justify-center gap-3 ${isVerifying || code.length < 4 ? 'bg-gray-200 cursor-not-allowed shadow-none text-gray-400' : 'bg-gray-900 hover:bg-black shadow-gray-200'}`}
                    >
                        {isVerifying ? (
                            <><Loader2 className="w-5 h-5 animate-spin" /> Validating...</>
                        ) : (
                            <><ShieldCheck className="w-5 h-5" /> Verify Code</>
                        )}
                    </button>
                    {status !== 'idle' && (
                        <button
                            onClick={handleReset}
                            className="px-6 py-5 rounded-2xl font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
                        >
                            Reset
                        </button>
                    )}
                </div>

                <p className="text-center text-[10px] text-gray-400 font-medium">
                    <span className="text-red-500 font-black">WARNING:</span> Code reuse is flagged as fraud. Only certify after the inspection is physically/remotely completed.
                </p>
            </div>
        </div>
    );
}
