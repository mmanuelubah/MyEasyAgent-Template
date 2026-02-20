"use client";

import { useState } from "react";
import {
    User, Upload, FileText, CheckCircle2,
    ArrowRight, ArrowLeft, AlertCircle, Home,
    Video, ShieldCheck
} from "lucide-react";
import Link from "next/link";

/**
 * Landlord Registration Page
 * 
 * Handles property owner onboarding.
 * 
 * Key Updates (Phase 23):
 * - Video Tour Option: Allow remote clients to view property.
 * - Platform Inspection Consent: Allow MyEasyAgent to verify property.
 */

type Step = 'personal' | 'ownership' | 'documents' | 'consent';
type OwnershipType = 'owner' | 'family' | 'poa' | 'manager' | null;

export default function LandlordRegistrationPage() {
    const [step, setStep] = useState<Step>('personal');
    const [ownershipType, setOwnershipType] = useState<OwnershipType>(null);
    const [documentOption, setDocumentOption] = useState<'upload' | 'indemnity' | null>(null);
    const [formData, setFormData] = useState({
        // Personal
        fullName: '',
        companyName: '',
        phone: '',
        email: '',
        address: '',

        // Settings (New)
        allowVideoTours: false,
        allowPlatformInspection: false,

        // Consent
        agreedToAuthenticity: false,
        agreedToLiability: false,
        agreedToMediation: false,
        agreedToAntiFraud: false
    });

    const nextStep = () => {
        const steps: Step[] = ['personal', 'ownership', 'documents', 'consent'];
        const currentIndex = steps.indexOf(step);
        if (currentIndex < steps.length - 1) {
            setStep(steps[currentIndex + 1]);
        }
    };

    const prevStep = () => {
        const steps: Step[] = ['personal', 'ownership', 'documents', 'consent'];
        const currentIndex = steps.indexOf(step);
        if (currentIndex > 0) {
            setStep(steps[currentIndex - 1]);
        }
    };

    const renderPersonalInfo = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center">
                <h2 className="text-3xl font-black text-gray-900 mb-2">Landlord Registration</h2>
                <p className="text-gray-500">Let's get your property listed on MyEasyAgent</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Full Name / Company Name *</label>
                    <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="As registered"
                        className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-600/20 outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Phone Number *</label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+234 XXX XXX XXXX"
                        className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-600/20 outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Email Address (Optional)</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-600/20 outline-none"
                    />
                </div>
                <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Residential Address *</label>
                    <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Full address"
                        className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-600/20 outline-none"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-bold text-gray-900">Identity Verification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-emerald-600/30 transition-all cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm font-bold text-gray-700">Upload Passport Photo</p>
                        <p className="text-xs text-gray-400 mt-1">Clear photo (JPG, PNG)</p>
                    </div>
                    <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-emerald-600/30 transition-all cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm font-bold text-gray-700">Upload Government ID</p>
                        <p className="text-xs text-gray-400 mt-1">NIN, Voter's Card, License</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderOwnership = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Ownership Status</h2>
                <p className="text-gray-500 text-sm">What is your relationship to the property?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { id: 'owner', label: 'Property Owner', desc: 'I own this property' },
                    { id: 'family', label: 'Family Representative', desc: 'Representing family property' },
                    { id: 'poa', label: 'Power of Attorney', desc: 'I have legal authority' },
                    { id: 'manager', label: 'Property Manager', desc: 'Managing on behalf of owner' }
                ].map((option) => (
                    <button
                        key={option.id}
                        onClick={() => setOwnershipType(option.id as OwnershipType)}
                        className={`p-6 rounded-3xl border-2 transition-all text-left ${ownershipType === option.id
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-100 hover:border-emerald-300'
                            }`}
                    >
                        <h3 className="font-bold text-gray-900 mb-1">{option.label}</h3>
                        <p className="text-sm text-gray-500">{option.desc}</p>
                    </button>
                ))}
            </div>

            {/* Visit Settings - New Section */}
            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 space-y-6">
                <h3 className="font-bold text-gray-900">Visit & Inspection Settings</h3>

                <label className="flex items-start gap-4 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={formData.allowVideoTours}
                        onChange={(e) => setFormData({ ...formData, allowVideoTours: e.target.checked })}
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                    />
                    <div>
                        <p className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors flex items-center gap-2">
                            <Video className="w-4 h-4" /> Allow Video Tours
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            I permit agents to conduct video inspections for remote clients/diaspora.
                        </p>
                    </div>
                </label>

                <label className="flex items-start gap-4 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={formData.allowPlatformInspection}
                        onChange={(e) => setFormData({ ...formData, allowPlatformInspection: e.target.checked })}
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                    />
                    <div>
                        <p className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4" /> Platform Inspection Consent
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            I authorize MyEasyAgent representatives to physically inspect the property for quality assurance if needed.
                        </p>
                    </div>
                </label>
            </div>

            {ownershipType && ownershipType !== 'owner' && (
                <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100 space-y-4 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                            <h3 className="font-bold text-amber-900 mb-2">Proof of Authority Required</h3>
                            <p className="text-sm text-amber-700">Please upload documents proving your authority to list this property.</p>
                        </div>
                    </div>
                    <div className="bg-white border-2 border-dashed border-amber-200 rounded-2xl p-6 text-center hover:border-amber-400 transition-all cursor-pointer">
                        <Upload className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                        <p className="text-sm font-bold text-amber-900">Upload Authorization Documents</p>
                        <p className="text-xs text-amber-600 mt-1">Power of Attorney, Family Agreement, etc.</p>
                    </div>
                </div>
            )}
        </div>
    );

    const renderDocuments = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Documentation</h2>
                <p className="text-gray-500 text-sm">Choose how you want to proceed</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                    onClick={() => setDocumentOption('upload')}
                    className={`p-8 rounded-3xl border-2 transition-all ${documentOption === 'upload'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-100 hover:border-emerald-300'
                        }`}
                >
                    <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <FileText className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Upload Documents</h3>
                    <p className="text-sm text-gray-500">I have property documents to upload</p>
                </button>

                <button
                    onClick={() => setDocumentOption('indemnity')}
                    className={`p-8 rounded-3xl border-2 transition-all ${documentOption === 'indemnity'
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-100 hover:border-amber-300'
                        }`}
                >
                    <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <AlertCircle className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Sign Indemnity</h3>
                    <p className="text-sm text-gray-500">I don't have documents available</p>
                </button>
            </div>

            {documentOption === 'upload' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                    <h3 className="font-bold text-gray-900">Upload Property Documents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            'Deed of Assignment',
                            'Survey Plan',
                            'Certificate of Occupancy',
                            'Purchase Receipt',
                            'Family Agreement',
                            'Other Documents'
                        ].map((doc) => (
                            <div key={doc} className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center hover:border-emerald-600/30 transition-all cursor-pointer">
                                <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                                <p className="text-xs font-bold text-gray-700">{doc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {documentOption === 'indemnity' && (
                <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100 space-y-6 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-amber-600 mt-1" />
                        <div>
                            <h3 className="text-xl font-bold text-amber-900 mb-2">Indemnity Agreement</h3>
                            <p className="text-sm text-amber-700 leading-relaxed">
                                By signing this indemnity, you confirm that you take full responsibility for this property and agree to bear all legal and financial consequences arising from ownership disputes, fraud, or misrepresentation.
                            </p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 text-sm text-gray-700 space-y-3 max-h-64 overflow-y-auto">
                        <p className="font-bold">I hereby declare that:</p>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 shrink-0" />
                                I am the rightful owner/authorized representative of this property
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 shrink-0" />
                                The property is free from legal disputes and encumbrances
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 shrink-0" />
                                I will indemnify MyEasyAgent against any claims arising from this listing
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 shrink-0" />
                                All information provided is accurate and truthful
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white rounded-2xl p-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-5 h-5 rounded border-amber-300 text-amber-600" />
                            <span className="text-sm font-bold text-amber-900">I agree to the Indemnity Agreement</span>
                        </label>
                    </div>
                </div>
            )}
        </div>
    );

    const renderConsent = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Final Agreements</h2>
                <p className="text-gray-500 text-sm">Please review and accept all terms</p>
            </div>

            <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 border border-gray-100 space-y-4">
                    <label className="flex items-start gap-4 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={formData.agreedToAuthenticity}
                            onChange={(e) => setFormData({ ...formData, agreedToAuthenticity: e.target.checked })}
                            className="w-5 h-5 rounded border-gray-300 text-emerald-600 mt-1"
                        />
                        <div>
                            <p className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">Property Authenticity Agreement</p>
                            <p className="text-sm text-gray-500 mt-1">I confirm that this property is legitimate and free from dispute.</p>
                        </div>
                    </label>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-gray-100 space-y-4">
                    <label className="flex items-start gap-4 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={formData.agreedToLiability}
                            onChange={(e) => setFormData({ ...formData, agreedToLiability: e.target.checked })}
                            className="w-5 h-5 rounded border-gray-300 text-emerald-600 mt-1"
                        />
                        <div>
                            <p className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">Liability Agreement</p>
                            <p className="text-sm text-gray-500 mt-1">I accept responsibility for legal issues arising from this property.</p>
                        </div>
                    </label>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-gray-100 space-y-4">
                    <label className="flex items-start gap-4 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={formData.agreedToMediation}
                            onChange={(e) => setFormData({ ...formData, agreedToMediation: e.target.checked })}
                            className="w-5 h-5 rounded border-gray-300 text-emerald-600 mt-1"
                        />
                        <div>
                            <p className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">Platform Mediation Consent</p>
                            <p className="text-sm text-gray-500 mt-1">I allow MyEasyAgent to mediate disputes related to this property.</p>
                        </div>
                    </label>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-gray-100 space-y-4">
                    <label className="flex items-start gap-4 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={formData.agreedToAntiFraud}
                            onChange={(e) => setFormData({ ...formData, agreedToAntiFraud: e.target.checked })}
                            className="w-5 h-5 rounded border-gray-300 text-emerald-600 mt-1"
                        />
                        <div>
                            <p className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">Anti-Fraud Policy</p>
                            <p className="text-sm text-gray-500 mt-1">I agree not to engage in fake listings, impersonation, or double listing.</p>
                        </div>
                    </label>
                </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <p className="text-xs text-gray-500 leading-relaxed italic">
                    <strong>Disclaimer:</strong> MyEasyAgent serves as a marketplace and verification platform. Ownership responsibility rests with landlords. The platform provides mediation but is not liable for undisclosed disputes.
                </p>
            </div>
        </div>
    );

    const canProceed = () => {
        if (step === 'ownership') return ownershipType !== null;
        if (step === 'documents') return documentOption !== null;
        if (step === 'consent') return formData.agreedToAuthenticity && formData.agreedToLiability && formData.agreedToMediation && formData.agreedToAntiFraud;
        return true;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-gray-100 shadow-2xl shadow-gray-100/50">
                    {/* Progress Bar */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 px-2">
                            <span className={step === 'personal' ? 'text-emerald-600' : ''}>Personal</span>
                            <span className={step === 'ownership' ? 'text-emerald-600' : ''}>Ownership</span>
                            <span className={step === 'documents' ? 'text-emerald-600' : ''}>Documents</span>
                            <span className={step === 'consent' ? 'text-emerald-600' : ''}>Consent</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-emerald-600 transition-all duration-700"
                                style={{
                                    width: step === 'personal' ? '25%' :
                                        step === 'ownership' ? '50%' :
                                            step === 'documents' ? '75%' : '100%'
                                }}
                            />
                        </div>
                    </div>

                    {/* Content */}
                    {step === 'personal' && renderPersonalInfo()}
                    {step === 'ownership' && renderOwnership()}
                    {step === 'documents' && renderDocuments()}
                    {step === 'consent' && renderConsent()}

                    {/* Navigation */}
                    <div className="flex gap-4 mt-12">
                        {step !== 'personal' && (
                            <button
                                onClick={prevStep}
                                className="px-8 py-4 rounded-2xl font-bold text-gray-600 hover:bg-gray-100 transition-all flex items-center gap-2"
                            >
                                <ArrowLeft className="w-5 h-5" /> Back
                            </button>
                        )}
                        {step !== 'consent' ? (
                            <button
                                onClick={nextStep}
                                disabled={!canProceed()}
                                className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 disabled:bg-gray-200 disabled:text-gray-400 flex items-center justify-center gap-2"
                            >
                                Continue <ArrowRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <Link
                                href="/dashboard/landlord"
                                className={`flex-1 py-4 rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${canProceed()
                                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100'
                                    : 'bg-gray-200 text-gray-400 pointer-events-none'
                                    }`}
                            >
                                <CheckCircle2 className="w-5 h-5" /> Complete Registration
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
