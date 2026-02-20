"use client";

import { useState } from "react";
import { CheckCircle2, ShieldCheck, X, Search, Lock } from "lucide-react";

export default function VerificationForm() {
    const [code, setCode] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleVerify = () => {
        setIsVerifying(true);
        setTimeout(() => {
            if (code === "CODE-2026") { // Mock unique code
                setStatus('success');
            } else {
                setStatus('error');
            }
            setIsVerifying(false);
        }, 1500);
    };

    return (
        <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-xl max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
                    <Lock className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-gray-900">Dual-Factor Verification</h2>
                    <p className="text-gray-500 text-sm italic">Enter the unique code provided by the client to certify completion.</p>
                </div>
            </div>

            {status === 'success' ? (
                <div className="bg-emerald-50 border border-emerald-100 rounded-[2rem] p-8 text-center animate-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-black text-emerald-900 mb-2">Verification Successful!</h3>
                    <p className="text-emerald-700 text-sm mb-6">Inspection B-2026-XP92 has been certified. Earnings ₦24,000 moved to 'Locked' status.</p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all"
                    >
                        Done
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 block">Inspection Code</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value.toUpperCase())}
                                placeholder="E.G. ABCD-1234"
                                className="w-full bg-white border border-gray-100 rounded-2xl p-5 text-2xl font-mono font-black tracking-[0.5em] text-center focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                maxLength={9}
                            />
                            {status === 'error' && (
                                <p className="text-red-500 text-[10px] font-bold mt-2 text-center uppercase tracking-widest">Invalid code for this session</p>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleVerify}
                            disabled={isVerifying || code.length < 4}
                            className={`flex-1 py-5 rounded-2xl font-black text-white shadow-lg transition-all flex items-center justify-center gap-3 ${isVerifying || code.length < 4 ? 'bg-gray-200 cursor-not-allowed shadow-none' : 'bg-gray-900 hover:bg-black shadow-gray-200'}`}
                        >
                            {isVerifying ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Validating...
                                </>
                            ) : (
                                <>
                                    <ShieldCheck className="w-5 h-5" />
                                    Certify Inspection
                                </>
                            )}
                        </button>
                    </div>

                    <p className="text-center text-[10px] text-gray-400 font-medium">
                        <span className="text-red-500 font-black">WARNING:</span> Code validation requires active GPS proximity and timestamp match. Code reuse is flagged as fraud.
                    </p>
                </div>
            )}
        </div>
    );
}
