"use client";

import { useState } from "react";
import {
    Home, CheckCircle2, ShieldAlert, ArrowRight,
    Wallet, Hammer, HelpCircle,
    Briefcase, Landmark, MapPin, Users, History, HeartHandshake, ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * Client Registration Page
 * 
 * This component handles the full onboarding flow for new clients (tenants).
 * It collects personal data, employment details, and rental history to build a trusted profile.
 * 
 * Steps:
 * 1. Fair Play Pledge (Commitment fees, Legal, Non-circumvention)
 * 2. Personal & Work (Occupation, Workplace, Family Status)
 * 3. Rental History (Previous experience, reasons for moving)
 * 4. Cost Transparency & Submit
 */
export default function ClientRegisterPage() {
    const router = useRouter();

    // Track current step in the wizard (1-4)
    const [step, setStep] = useState(1);

    // Form State - capturing all user inputs
    const [formData, setFormData] = useState({
        // Step 1: Pledge
        pledgeAgreed: {
            mobilization: false,
            legal: false,
            fairplay: false
        },
        // Step 2: Personal & Work
        occupation: '', // Occupation / Business Type
        workplaceType: '', // 'office', 'shop', 'remote'
        workplaceLocation: '', // Neighborhood
        employerName: '',
        incomeRange: '',
        familyStatus: '', // 'single', 'married', 'family'
        familySize: '',
        // Step 3: Rental History
        rentalDuration: '', // Years rented
        currentStatus: '', // 'renting', 'living_with_family'
        reasonForMoving: '',
        behaviorPromise: false // Willingness to conduct properly
    });

    // Helper to update form fields
    const updateForm = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const updatePledge = (field: string) => {
        setFormData(prev => ({
            ...prev,
            pledgeAgreed: {
                ...prev.pledgeAgreed,
                // @ts-ignore
                [field]: !prev.pledgeAgreed[field]
            }
        }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleFinalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, send formData to API here
        router.push('/dashboard/client');
    };

    /**
     * Step 1: Fair Play Pledge
     * Ensures users understand the rules before joining.
     */
    const renderPledge = () => (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
                    <ShieldAlert className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 font-outfit">The Fair Play Pledge</h1>
                <p className="text-gray-500 mt-2">To keep the Lagos market safe, we require all hunters to play by the rules.</p>
            </div>

            <div className="space-y-4 mb-10">
                <label className="flex items-start gap-4 p-5 rounded-2xl border-2 border-gray-50 hover:border-emerald-100 cursor-pointer transition-all bg-gray-50/30">
                    <input
                        type="checkbox"
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                        checked={formData.pledgeAgreed.mobilization}
                        onChange={() => updatePledge('mobilization')}
                    />
                    <div>
                        <p className="font-bold text-gray-900">₦2,500 Commitment Fee Logic</p>
                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">I understand this is a mobilization fee for the agent's time/transport and is non-refundable once they arrive.</p>
                    </div>
                </label>

                <label className="flex items-start gap-4 p-5 rounded-2xl border-2 border-gray-50 hover:border-emerald-100 cursor-pointer transition-all bg-gray-50/30">
                    <input
                        type="checkbox"
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                        checked={formData.pledgeAgreed.legal}
                        onChange={() => updatePledge('legal')}
                    />
                    <div>
                        <p className="font-bold text-gray-900">Legal Review Awareness</p>
                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">I understand MyEasyAgent provides a "Safe to Sign" document review, not a 100% legal title guarantee.</p>
                    </div>
                </label>

                <label className="flex items-start gap-4 p-5 rounded-2xl border-2 border-gray-50 hover:border-emerald-100 cursor-pointer transition-all bg-gray-50/30">
                    <input
                        type="checkbox"
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                        checked={formData.pledgeAgreed.fairplay}
                        onChange={() => updatePledge('fairplay')}
                    />
                    <div>
                        <p className="font-bold text-gray-900">Non-Bypassing Agreement</p>
                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">I pledge to use the platform for the entire deal and not bypass MyEasyAgent to sideline the system.</p>
                    </div>
                </label>
            </div>

            <button
                onClick={nextStep}
                disabled={!formData.pledgeAgreed.mobilization || !formData.pledgeAgreed.legal || !formData.pledgeAgreed.fairplay}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed shadow-lg shadow-emerald-100"
            >
                I Agree to the Rules <ArrowRight className="w-5 h-5" />
            </button>
        </div>
    );

    /**
     * Step 2: Personal & Work Information
     * Collects lifestyle data to help landlords assess tenant suitability.
     */
    const renderPersonalWork = () => (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 font-outfit">About You</h2>

            <div className="space-y-6">
                {/* Employment Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Occupation / Business</label>
                        <div className="relative">
                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="e.g. Banker, Software Engineer"
                                className="w-full pl-11 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-medium outline-none focus:ring-2 ring-emerald-600/20"
                                value={formData.occupation}
                                onChange={(e) => updateForm('occupation', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Workplace Type</label>
                        <select
                            className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-medium outline-none focus:ring-2 ring-emerald-600/20 appearance-none"
                            value={formData.workplaceType}
                            onChange={(e) => updateForm('workplaceType', e.target.value)}
                        >
                            <option value="">Select Type</option>
                            <option value="office">Corporate Office</option>
                            <option value="shop">Physical Shop/Store</option>
                            <option value="remote">Remote / Home Office</option>
                            <option value="field">Field Work</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Workplace Location</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select
                                className="w-full pl-11 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-medium outline-none focus:ring-2 ring-emerald-600/20 appearance-none"
                                value={formData.workplaceLocation}
                                onChange={(e) => updateForm('workplaceLocation', e.target.value)}
                            >
                                <option value="">Select Neighborhood</option>
                                <option value="vi">Victoria Island</option>
                                <option value="lekki">Lekki Phase 1</option>
                                <option value="ikeja">Ikeja / GRA</option>
                                <option value="marina">Marina / Lagos Island</option>
                                <option value="yaba">Yaba / Ebute Metta</option>
                                <option value="other">Other Mainland</option>
                                <option value="other_island">Other Island</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Income Range (Annual)</label>
                        <div className="relative">
                            <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select
                                className="w-full pl-11 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-medium outline-none focus:ring-2 ring-emerald-600/20 appearance-none"
                                value={formData.incomeRange}
                                onChange={(e) => updateForm('incomeRange', e.target.value)}
                            >
                                <option value="">Select Range</option>
                                <option value="1m-3m">₦1M - ₦3M</option>
                                <option value="3m-7m">₦3M - ₦7M</option>
                                <option value="7m-15m">₦7M - ₦15M</option>
                                <option value="15m+">₦15M+</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Family Status */}
                <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-sm font-bold text-gray-900 mb-4">Family & Household</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Marital Status</label>
                            <div className="relative">
                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <select
                                    className="w-full pl-11 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-medium outline-none focus:ring-2 ring-emerald-600/20 appearance-none"
                                    value={formData.familyStatus}
                                    onChange={(e) => updateForm('familyStatus', e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                    <option value="engaged">Engaged</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Who will live here?</label>
                            <input
                                type="text"
                                placeholder="e.g. Just me, Wife + 2 kids"
                                className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-medium outline-none focus:ring-2 ring-emerald-600/20"
                                value={formData.familySize}
                                onChange={(e) => updateForm('familySize', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 mt-8">
                <button onClick={prevStep} className="px-8 py-4 bg-gray-50 text-gray-500 rounded-2xl font-bold hover:bg-gray-100 transition-all flex items-center gap-2">
                    <ArrowLeft className="w-5 h-5" /> Back
                </button>
                <button
                    onClick={nextStep}
                    className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                >
                    Next: Rental History <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );

    /**
     * Step 3: Rental History
     * Collects past tenancy behavior to build trust with landlords.
     */
    const renderRentalHistory = () => (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 font-outfit">Rental History</h2>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Current Status</label>
                        <select
                            className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-medium outline-none focus:ring-2 ring-emerald-600/20 appearance-none"
                            value={formData.currentStatus}
                            onChange={(e) => updateForm('currentStatus', e.target.value)}
                        >
                            <option value="">Select Status</option>
                            <option value="renting">Currently Renting</option>
                            <option value="family">Living with Family</option>
                            <option value="new">First Time Renter</option>
                            <option value="owner">Home Owner</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">How long renting (Years)</label>
                        <div className="relative">
                            <History className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="number"
                                placeholder="e.g. 5"
                                className="w-full pl-11 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-medium outline-none focus:ring-2 ring-emerald-600/20"
                                value={formData.rentalDuration}
                                onChange={(e) => updateForm('rentalDuration', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Reason for leaving previous/current home</label>
                    <textarea
                        className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-medium outline-none focus:ring-2 ring-emerald-600/20 min-h-[100px]"
                        placeholder="e.g. Wanted closer proximity to work, Need more space"
                        value={formData.reasonForMoving}
                        onChange={(e) => updateForm('reasonForMoving', e.target.value)}
                    />
                </div>

                <label className="flex items-start gap-4 p-5 rounded-2xl border-2 border-emerald-50 bg-emerald-50/20 hover:border-emerald-100 cursor-pointer transition-all">
                    <input
                        type="checkbox"
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                        checked={formData.behaviorPromise}
                        onChange={(e) => updateForm('behaviorPromise', e.target.checked)}
                    />
                    <div>
                        <p className="font-bold text-gray-900 flex items-center gap-2">
                            <HeartHandshake className="w-4 h-4" /> Good Conduct Pledge
                        </p>
                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                            I promise to conduct myself responsibly, respect the property, and maintain good relations with neighbors.
                        </p>
                    </div>
                </label>
            </div>

            <div className="flex gap-4 mt-8">
                <button onClick={prevStep} className="px-8 py-4 bg-gray-50 text-gray-500 rounded-2xl font-bold hover:bg-gray-100 transition-all flex items-center gap-2">
                    <ArrowLeft className="w-5 h-5" /> Back
                </button>
                <button
                    onClick={nextStep}
                    disabled={!formData.behaviorPromise}
                    className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 disabled:bg-gray-200 disabled:text-gray-400"
                >
                    Review Costs <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );

    /**
     * Step 4: Cost Transparency & Finish
     * Final review of fees before account creation.
     */
    const renderSummary = () => (
        <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-gray-900 font-outfit">Cost Transparency Summary</h2>
                <p className="text-gray-500 mt-2 italic">Standard pricing for all MyEasyAgent users.</p>
            </div>

            <div className="mb-10 space-y-3">
                <div className="flex items-center justify-between p-6 bg-emerald-50 rounded-3xl border border-emerald-100/50">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shrink-0">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-emerald-700/60 uppercase tracking-widest mb-0.5">Commitment Fee</p>
                            <p className="font-bold text-emerald-900 leading-tight">₦2,500 <span className="text-xs font-medium opacity-60">/inspection</span></p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-emerald-700/60 uppercase tracking-widest mb-0.5">Coverage</p>
                        <p className="text-xs font-bold text-emerald-900">Agent Mobilization</p>
                    </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white shrink-0">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">HuntSmart Pass</p>
                            <p className="font-bold text-gray-900 leading-tight">₦15,000 <span className="text-xs font-medium opacity-60">/6mo</span></p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Coverage</p>
                        <p className="text-xs font-bold text-gray-900">Legal Review & Forms</p>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 mb-10 flex gap-4">
                <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0" />
                <p className="text-xs text-amber-800 leading-relaxed italic">
                    "Nigerians everywhere can now hunt for homes with confidence. No more fake registrations or ghost listings."
                </p>
            </div>

            <form onSubmit={handleFinalSubmit} className="flex gap-4">
                <button
                    type="button"
                    onClick={prevStep}
                    className="px-8 py-4 bg-gray-50 text-gray-500 rounded-2xl font-bold hover:bg-gray-100 transition-all flex items-center gap-2"
                >
                    <ArrowLeft className="w-5 h-5" /> Back
                </button>
                <button type="submit" className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
                    Start My Lagos Hunt <CheckCircle2 className="w-5 h-5" />
                </button>
            </form>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50/50 flex items-center justify-center px-4 py-12">
            <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden">
                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-gray-100 flex">
                    <div
                        className="h-full bg-emerald-600 transition-all duration-500"
                        style={{ width: `${(step / 4) * 100}%` }}
                    />
                </div>

                <div className="p-8 md:p-12">
                    {step === 1 && renderPledge()}
                    {step === 2 && renderPersonalWork()}
                    {step === 3 && renderRentalHistory()}
                    {step === 4 && renderSummary()}
                </div>
            </div>
        </div>
    );
}

// Icon Component
function ShieldCheck({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
    );
}
