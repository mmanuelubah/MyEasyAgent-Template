"use client";

import { useState, useEffect } from "react";
import {
    Upload, MapPin, Home, Info,
    CheckCircle2, AlertCircle, ShieldCheck,
    ChevronRight, ArrowRight, X, User, Users,
    Building2, FileText, ImageIcon, Video, Lock
} from "lucide-react";

/**
 * Property Upload Component
 * 
 * Handles the comprehensive property listing flow.
 * 
 * New Features (Phase 24):
 * - Duplicate Address Prevention: Blocks listings with same address.
 * - Tiered Access: Locks advanced fields (Video, 3D) for non-premium users.
 * - Representation Enforcement: Strict "Direct" vs "Semi-Direct" logic.
 */

// Mock Database of existing addresses for duplicate checking
const EXISTING_ADDRESSES = [
    "5 Admiralty Way, Lekki Phase 1",
    "12 Banana Island Road, Ikoyi",
    "Plot 45, Victoria Arobieke Street, Lekki"
];

type Step = 'intro' | 'agent-type' | 'verification' | 'property-details' | 'media' | 'success';

export default function PropertyUpload() {
    const [step, setStep] = useState<Step>('intro');
    const [agentType, setAgentType] = useState<'landlord' | 'agent' | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        address: '',
        description: '',
        videoTourUrl: '',
        walkthroughUrl: ''
    });

    // Logic State
    const [isDirect, setIsDirect] = useState<boolean>(true);
    const [agreedToRules, setAgreedToRules] = useState(false);
    const [duplicateError, setDuplicateError] = useState<string | null>(null);

    // Mock User Tier (Toggle this to test restrictions)
    const [isPremium, setIsPremium] = useState(false);

    const nextStep = (s: Step) => setStep(s);

    const updateForm = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (field === 'address') setDuplicateError(null); // Clear error on change
    };

    // Duplicate Check Logic
    const handleAddressBlur = () => {
        if (!formData.address) return;
        const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
        const current = normalize(formData.address);

        const isDuplicate = EXISTING_ADDRESSES.some(addr => normalize(addr) === current);

        if (isDuplicate) {
            setDuplicateError("This property address is already listed on MyEasyAgent. Duplicate listings are strictly prohibited to prevent spam.");
        }
    };

    const renderIntro = () => (
        <div className="text-center space-y-8 py-10">
            <div className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center mx-auto text-emerald-600 shadow-inner animate-in zoom-in duration-500">
                <Home className="w-10 h-10" />
            </div>
            <div>
                <h2 className="text-3xl font-black text-gray-900 font-outfit">Partner with MyEasyAgent</h2>
                <p className="text-gray-500 mt-2 max-w-sm mx-auto">Join the most transparent real estate ecosystem in Lagos.</p>
            </div>
            <button
                onClick={() => nextStep('agent-type')}
                className="bg-emerald-600 text-white px-10 py-5 rounded-[2rem] font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100/50 flex items-center gap-3 mx-auto"
            >
                Start Listing Your Property <ArrowRight className="w-5 h-5" />
            </button>
        </div>
    );

    const renderAgentType = () => (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">Select Your Partnership Tier</h3>
                <p className="text-sm text-gray-500 mt-2">Are you listing your own property or representing a client?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                    onClick={() => { setAgentType('landlord'); nextStep('verification'); }}
                    className="p-8 rounded-[2.5rem] border-2 border-gray-50 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all text-left group"
                >
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-emerald-600 group-hover:text-white transition-all mb-4">
                        <User className="w-7 h-7" />
                    </div>
                    <h4 className="font-bold text-xl text-gray-900">I am a Landlord</h4>
                    <p className="text-sm text-gray-500 mt-2">List your own property directly to verified tenants.</p>
                </button>
                <button
                    onClick={() => { setAgentType('agent'); nextStep('verification'); }}
                    className="p-8 rounded-[2.5rem] border-2 border-gray-50 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all text-left group"
                >
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-emerald-600 group-hover:text-white transition-all mb-4">
                        <Users className="w-7 h-7" />
                    </div>
                    <h4 className="font-bold text-xl text-gray-900">I am an Agent</h4>
                    <p className="text-sm text-gray-500 mt-2">Manage multiple listings and earning mobilization fees.</p>
                </button>
            </div>
        </div>
    );

    const renderVerification = () => (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">TrustShield Verification</h3>
                <p className="text-sm text-gray-500 mt-2">Upload your identification to maintain our "Gold Verified" ecosystem.</p>
            </div>
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2.5rem] p-12 text-center space-y-4 hover:border-emerald-600/30 transition-all group cursor-pointer">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto text-gray-400 group-hover:text-emerald-600 shadow-sm">
                    <Upload className="w-8 h-8" />
                </div>
                <div>
                    <p className="font-bold text-gray-900">Upload ID / LASRERA License</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, JPG, or PNG (Max 5MB)</p>
                </div>
            </div>
            <div className="flex gap-4">
                <button onClick={() => nextStep('agent-type')} className="px-8 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all">Back</button>
                <button onClick={() => nextStep('property-details')} className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">Continue Upwards</button>
            </div>
        </div>
    );

    const renderDetails = () => (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Property Details</h3>
                    <p className="text-sm text-gray-500 mt-1">Lagos market standards focus on accuracy.</p>
                </div>
                {/* Dev Toggle for Premium */}
                <button
                    onClick={() => setIsPremium(!isPremium)}
                    className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${isPremium ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}
                >
                    {isPremium ? 'Premium Mode: ON' : 'Premium Mode: OFF'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Listing Type</label>
                    <select className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-emerald-600/20 outline-none appearance-none">
                        <option>For Rent (₦/yr)</option>
                        <option>For Sale (Total ₦)</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Title</label>
                    <input
                        type="text"
                        placeholder="e.g. Luxury 4 Bedroom Terrace"
                        value={formData.title}
                        onChange={(e) => updateForm('title', e.target.value)}
                        className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-emerald-600/20 outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Total Price (₦)</label>
                    <input
                        type="number"
                        placeholder="Enter amount"
                        value={formData.price}
                        onChange={(e) => updateForm('price', e.target.value)}
                        className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-emerald-600/20 outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Area / Neighborhood</label>
                    <select className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-emerald-600/20 outline-none appearance-none">
                        <option>Lekki Phase 1</option>
                        <option>Victoria Island</option>
                        <option>Ikeja GRA</option>
                        <option>Gbagada</option>
                        <option>Ajah</option>
                    </select>
                </div>
            </div>

            {/* Address with Duplicate Check */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Full Address *</label>
                <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="e.g. 5 Admiralty Way"
                        value={formData.address}
                        onChange={(e) => updateForm('address', e.target.value)}
                        onBlur={handleAddressBlur}
                        className={`w-full bg-gray-50 border-2 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:ring-2 outline-none transition-all ${duplicateError ? 'border-red-500 ring-red-500/20 bg-red-50' : 'border-gray-50 ring-emerald-600/20 focus:border-emerald-500'}`}
                    />
                </div>
                {duplicateError && (
                    <div className="flex items-center gap-2 text-red-600 px-2 animate-in slide-in-from-top-1">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-xs font-bold">{duplicateError}</span>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Description</label>
                <textarea
                    placeholder="Describe the property..."
                    value={formData.description}
                    onChange={(e) => updateForm('description', e.target.value)}
                    className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-600/20 outline-none min-h-[100px]"
                />
            </div>

            {/* Representation Toggle */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Representation (Agent Only)</label>
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => setIsDirect(true)}
                        className={`flex-1 py-4 rounded-2xl border-2 font-bold text-sm transition-all ${isDirect ? 'border-emerald-600 bg-emerald-50 text-emerald-900' : 'border-gray-50 bg-gray-50 text-gray-400'}`}
                    >
                        Direct to Owner
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsDirect(false)}
                        className={`flex-1 py-4 rounded-2xl border-2 font-bold text-sm transition-all ${!isDirect ? 'border-emerald-600 bg-emerald-50 text-emerald-900' : 'border-gray-50 bg-gray-50 text-gray-400'}`}
                    >
                        Semi-Direct (Split)
                    </button>
                </div>
                {isDirect ? (
                    <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex gap-3 animate-in fade-in slide-in-from-top-2">
                        <Info className="w-5 h-5 text-emerald-600 shrink-0" />
                        <p className="text-[10px] text-emerald-800 font-medium leading-relaxed">
                            Direct listings follow the <span className="font-bold">50/50 sharing formula</span>. You keep 50% of the commission, and MyEasyAgent takes 50% for verification & platform services.
                        </p>
                    </div>
                ) : (
                    <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3 animate-in fade-in slide-in-from-top-2">
                        <Info className="w-5 h-5 text-amber-600 shrink-0" />
                        <p className="text-[10px] text-amber-800 font-medium leading-relaxed">
                            Semi-Direct listings follow the <span className="font-bold">50/25/25 sharing formula</span>. 50% to the Direct Agent, 25% to you (Connector), and 25% to platform.
                        </p>
                    </div>
                )}
            </div>

            <button
                onClick={() => nextStep('media')}
                disabled={!!duplicateError}
                className="w-full bg-emerald-600 text-white py-5 rounded-[2rem] font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
            >
                Next: Media & Analytics
            </button>
        </div>
    );

    const renderMedia = () => (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h3 className="text-2xl font-bold text-gray-900">Media & Analytics</h3>
                <p className="text-sm text-gray-500 mt-1">High-quality visual content attracts premium clients.</p>
            </div>

            {/* Basic Image Upload */}
            <div className="space-y-4">
                <h4 className="font-bold text-gray-900">Standard Photos (All Tiers)</h4>
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2.5rem] p-8 text-center hover:border-emerald-600/30 transition-all cursor-pointer">
                    <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="font-bold text-gray-900">Upload Property Photos</p>
                    <p className="text-xs text-gray-400 mt-1">Max 10 images (JPG, PNG)</p>
                </div>
            </div>

            {/* Premium Features - Tiered Access */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-900">Advanced Visuals (Pro)</h4>
                    {!isPremium && <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded-full uppercase">Locked</span>}
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${!isPremium ? 'opacity-60 pointer-events-none grayscale' : ''}`}>
                    <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem] p-6 text-center">
                        <Video className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                        <p className="font-bold text-gray-900">Video Tour</p>
                        <p className="text-xs text-gray-400 mt-1">MP4 Upload</p>
                    </div>
                    <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem] p-6 text-center">
                        <Building2 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <p className="font-bold text-gray-900">3D Walkthrough</p>
                        <p className="text-xs text-gray-400 mt-1">Matterport Link</p>
                    </div>
                </div>

                {!isPremium && (
                    <div className="p-6 bg-gray-900 rounded-3xl text-center relative overflow-hidden group cursor-pointer">
                        <div className="relative z-10">
                            <Lock className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                            <h4 className="font-bold text-white text-lg">Unlock Advanced Features</h4>
                            <p className="text-gray-400 text-sm mt-1 mb-4">Get Video Tours, 3D Analytics, and Priority Listing.</p>
                            <button onClick={() => setIsPremium(true)} className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-xs hover:bg-emerald-500 transition-all">
                                Upgrade to Agent Pro
                            </button>
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-emerald-900/0 via-emerald-900/20 to-emerald-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    </div>
                )}
            </div>

            <div className="bg-gray-900 rounded-[2rem] p-8 text-white mt-8">
                <h4 className="font-bold flex items-center gap-2 mb-4">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" /> Lagos Integrity Rules
                </h4>
                <div className="space-y-4">
                    <label className="flex items-center gap-4 cursor-pointer group">
                        <input
                            type="checkbox"
                            className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-emerald-500"
                            checked={agreedToRules}
                            onChange={() => setAgreedToRules(!agreedToRules)}
                        />
                        <span className="text-xs text-gray-300 font-medium group-hover:text-white transition-colors">
                            I agree to reconfirm availability every 48-72h. Blacklisting applies for fake listings.
                        </span>
                    </label>
                </div>
            </div>

            <div className="flex gap-4">
                <button onClick={() => nextStep('property-details')} className="px-8 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all">Back</button>
                <button
                    onClick={() => nextStep('success')}
                    disabled={!agreedToRules}
                    className="flex-1 bg-emerald-600 text-white py-5 rounded-[2rem] font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 disabled:bg-gray-200 disabled:text-gray-400"
                >
                    Submit Listing
                </button>
            </div>
        </div>
    );

    const renderSuccess = () => (
        <div className="text-center space-y-8 py-10 animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-12 h-12" />
            </div>
            <div>
                <h2 className="text-3xl font-black text-gray-900">Success!</h2>
                <p className="text-gray-500 mt-2 max-w-sm mx-auto">Your property has been submitted. Our "Referee" team will review the details and mark it as Gold Verified shortly.</p>
            </div>
            <div className="flex flex-col gap-4 max-w-xs mx-auto">
                <button
                    onClick={() => nextStep('intro')}
                    className="bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all"
                >
                    Back to Dashboard
                </button>
                <button
                    onClick={() => { setStep('property-details'); setAgreedToRules(false); }}
                    className="text-emerald-600 font-bold hover:underline"
                >
                    List Another Property
                </button>
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-gray-100 shadow-2xl shadow-gray-100/50 max-w-4xl mx-auto">
            {step === 'intro' && renderIntro()}
            {step === 'agent-type' && renderAgentType()}
            {step === 'verification' && renderVerification()}
            {step === 'property-details' && renderDetails()}
            {step === 'media' && renderMedia()}
            {step === 'success' && renderSuccess()}

            {/* Step Progress Bar */}
            {step !== 'intro' && step !== 'success' && (
                <div className="mt-12 pt-12 border-t border-gray-50">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 px-2">
                        <span className={step === 'agent-type' ? 'text-emerald-600' : ''}>Profile</span>
                        <span className={step === 'verification' ? 'text-emerald-600' : ''}>Verify</span>
                        <span className={step === 'property-details' ? 'text-emerald-600' : ''}>Details</span>
                        <span className={step === 'media' ? 'text-emerald-600' : ''}>Media</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-emerald-600 transition-all duration-700"
                            style={{
                                width: step === 'agent-type' ? '25%' :
                                    step === 'verification' ? '50%' :
                                        step === 'property-details' ? '75%' : '100%'
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
