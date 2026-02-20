"use client";

import { useState } from "react";
import {
    User, Building2, ShieldCheck, Upload, CheckCircle2,
    ArrowRight, ArrowLeft, FileText, CreditCard, AlertCircle,
    Users, Video, MapPin
} from "lucide-react";
import Link from "next/link";

/**
 * Agent Registration Page
 * 
 * Handles the onboarding of Real Estate Agents with strict verification.
 * 
 * Key Features:
 * - Business Structure: Independent vs Agency
 * - Operational Role: Direct vs Semi-Direct (New Requirement)
 * - Regulatory Compliance: LASRERA / ERCAAN checks
 * - Video Tour Consent: For diaspora clients
 * - Unique Property Pledge: Preventing duplicates
 */

type Step = 'type' | 'personal' | 'professional' | 'certification' | 'bank' | 'consent';
type AgentType = 'independent' | 'agency' | null;

export default function AgentRegistrationPage() {
    const [step, setStep] = useState<Step>('type');
    const [agentType, setAgentType] = useState<AgentType>(null);

    const [formData, setFormData] = useState({
        // Personal
        fullName: '',
        dob: '',
        nationality: '',
        stateOfOrigin: '',
        address: '',
        phone: '',
        email: '',

        // Professional
        businessName: '',
        yearsExperience: '',
        operatingAreas: '',
        officeAddress: '',

        // Agency-specific
        agencyName: '',
        agencyAddress: '',
        agencyPhone: '',
        agencyEmail: '',
        position: '',

        // Operational Role (New)
        operationalRole: '', // 'direct' | 'semi-direct'
        directAgentName: '', // If semi-direct
        directAgentPhone: '', // If semi-direct
        providesVideoTours: false,

        // Certification
        lasreraRegistered: '',
        lasreraNumber: '',
        ercaanRegistered: '',
        ercaanNumber: '',

        // Bank
        bankName: '',
        accountName: '',
        accountNumber: '',
        bvn: '',

        // Consent
        agreedToTerms: false,
        agreedToData: false,
        agreedToCommission: false,
        agreedToVideoPolicy: false,
        agreedToUniqueProperties: false
    });

    const updateForm = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        const steps: Step[] = ['type', 'personal', 'professional', 'certification', 'bank', 'consent'];
        const currentIndex = steps.indexOf(step);
        if (currentIndex < steps.length - 1) {
            setStep(steps[currentIndex + 1]);
        }
    };

    const prevStep = () => {
        const steps: Step[] = ['type', 'personal', 'professional', 'certification', 'bank', 'consent'];
        const currentIndex = steps.indexOf(step);
        if (currentIndex > 0) {
            setStep(steps[currentIndex - 1]);
        }
    };

    // Step 1: Business Structure
    const renderTypeSelection = () => (
        <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center">
                <h2 className="text-3xl font-black text-gray-900 mb-2">Agent Registration</h2>
                <p className="text-gray-500">Are you an independent agent or working for an agency?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                    onClick={() => { setAgentType('independent'); nextStep(); }}
                    className="p-10 rounded-[2.5rem] border-2 border-gray-100 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                >
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-emerald-600 group-hover:text-white transition-all mb-6 mx-auto">
                        <User className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">Independent Agent</h3>
                    <p className="text-sm text-gray-500">I operate on my own or manage my own listings</p>
                </button>
                <button
                    onClick={() => { setAgentType('agency'); nextStep(); }}
                    className="p-10 rounded-[2.5rem] border-2 border-gray-100 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                >
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-emerald-600 group-hover:text-white transition-all mb-6 mx-auto">
                        <Building2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">Agency Agent</h3>
                    <p className="text-sm text-gray-500">I work for a registered real estate agency</p>
                </button>
            </div>
        </div>
    );

    // Step 2: Personal Information
    const renderPersonalInfo = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
                <p className="text-gray-500 text-sm">Provide your personal details as they appear on your government ID</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Full Legal Name *</label>
                    <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => updateForm('fullName', e.target.value)}
                        placeholder="As on government ID"
                        className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-600/20 outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Date of Birth *</label>
                    <input
                        type="date"
                        value={formData.dob}
                        onChange={(e) => updateForm('dob', e.target.value)}
                        className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-600/20 outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Nationality *</label>
                    <input
                        type="text"
                        value={formData.nationality}
                        onChange={(e) => updateForm('nationality', e.target.value)}
                        placeholder="e.g., Nigerian"
                        className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-600/20 outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">State of Origin *</label>
                    <input
                        type="text"
                        value={formData.stateOfOrigin}
                        onChange={(e) => updateForm('stateOfOrigin', e.target.value)}
                        placeholder="e.g., Lagos"
                        className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-600/20 outline-none"
                    />
                </div>
                <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Residential Address *</label>
                    <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => updateForm('address', e.target.value)}
                        placeholder="Full address"
                        className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-600/20 outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Phone Number *</label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateForm('phone', e.target.value)}
                        placeholder="+234 XXX XXX XXXX"
                        className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-600/20 outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Email Address *</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateForm('email', e.target.value)}
                        placeholder="your@email.com"
                        className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-600/20 outline-none"
                    />
                </div>
            </div>

            {/* Document Uploads */}
            <div className="space-y-4">
                <h3 className="font-bold text-gray-900">Identity Verification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-emerald-600/30 transition-all cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm font-bold text-gray-700">Upload Passport Photo</p>
                        <p className="text-xs text-gray-400 mt-1">Clear selfie (JPG, PNG)</p>
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

    // Step 3: Professional Info (Updated with Roles)
    const renderProfessionalInfo = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Information</h2>
                <p className="text-gray-500 text-sm">Tell us about your real estate experience and how you operate</p>
            </div>

            {/* Operational Role Selection */}
            <div className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Operational Role *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all ${formData.operationalRole === 'direct' ? 'border-emerald-600 bg-emerald-50/50' : 'border-gray-100 bg-white hover:border-emerald-200'}`}>
                        <input
                            type="radio"
                            name="role"
                            className="absolute top-6 right-6 w-5 h-5 text-emerald-600 focus:ring-emerald-600"
                            checked={formData.operationalRole === 'direct'}
                            onChange={() => updateForm('operationalRole', 'direct')}
                        />
                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900">Direct Agent</h3>
                        <p className="text-xs text-gray-500 mt-1">I source my own properties and confirm mandate.</p>
                    </label>

                    <label className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all ${formData.operationalRole === 'semi-direct' ? 'border-emerald-600 bg-emerald-50/50' : 'border-gray-100 bg-white hover:border-emerald-200'}`}>
                        <input
                            type="radio"
                            name="role"
                            className="absolute top-6 right-6 w-5 h-5 text-emerald-600 focus:ring-emerald-600"
                            checked={formData.operationalRole === 'semi-direct'}
                            onChange={() => updateForm('operationalRole', 'semi-direct')}
                        />
                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-4">
                            <Users className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900">Semi-Direct Agent</h3>
                        <p className="text-xs text-gray-500 mt-1">I work with a Direct Agent to complete deals.</p>
                    </label>
                </div>
            </div>

            {/* Semi-Direct Fields */}
            {formData.operationalRole === 'semi-direct' && (
                <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100 space-y-4 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-2 text-amber-900 font-bold">
                        <Users className="w-5 h-5" /> Direct Agent Details
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-amber-700 uppercase tracking-widest px-2">Direct Agent Name *</label>
                            <input
                                type="text"
                                value={formData.directAgentName}
                                onChange={(e) => updateForm('directAgentName', e.target.value)}
                                placeholder="Name of your partner"
                                className="w-full bg-white border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-amber-600/20 outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-amber-700 uppercase tracking-widest px-2">Direct Agent Phone *</label>
                            <input
                                type="tel"
                                value={formData.directAgentPhone}
                                onChange={(e) => updateForm('directAgentPhone', e.target.value)}
                                placeholder="Partner phone number"
                                className="w-full bg-white border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-amber-600/20 outline-none"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Agency Fields (only if Agency type) */}
            {agentType === 'agency' && (
                <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100 space-y-4">
                    <h3 className="font-bold text-blue-900">Agency Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-blue-700 uppercase tracking-widest px-2">Agency Name *</label>
                            <input
                                type="text"
                                value={formData.agencyName}
                                onChange={(e) => updateForm('agencyName', e.target.value)}
                                placeholder="e.g., Prime Properties Ltd"
                                className="w-full bg-white border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-blue-600/20 outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-blue-700 uppercase tracking-widest px-2">Your Position *</label>
                            <input
                                type="text"
                                value={formData.position}
                                onChange={(e) => updateForm('position', e.target.value)}
                                placeholder="e.g., Senior Agent"
                                className="w-full bg-white border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-blue-600/20 outline-none"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-xs font-bold text-blue-700 uppercase tracking-widest px-2">Agency Address *</label>
                            <input
                                type="text"
                                value={formData.agencyAddress}
                                onChange={(e) => updateForm('agencyAddress', e.target.value)}
                                placeholder="Office location"
                                className="w-full bg-white border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-blue-600/20 outline-none"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* General Professional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agentType === 'independent' && (
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Business Name (Optional)</label>
                        <input
                            type="text"
                            value={formData.businessName}
                            onChange={(e) => updateForm('businessName', e.target.value)}
                            placeholder="e.g., John's Properties"
                            className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-600/20 outline-none"
                        />
                    </div>
                )}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Years of Experience *</label>
                    <select
                        value={formData.yearsExperience}
                        onChange={(e) => updateForm('yearsExperience', e.target.value)}
                        className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-600/20 outline-none appearance-none"
                    >
                        <option value="">Select</option>
                        <option value="0-1">Less than 1 year</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5+">5+ years</option>
                    </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Primary Operating Areas *</label>
                    <input
                        type="text"
                        value={formData.operatingAreas}
                        onChange={(e) => updateForm('operatingAreas', e.target.value)}
                        placeholder="e.g., Lekki, Victoria Island, Ikoyi"
                        className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-600/20 outline-none"
                    />
                </div>
            </div>

            {/* Video Tour Option */}
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <label className="flex items-start gap-4 cursor-pointer">
                    <input
                        type="checkbox"
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                        checked={formData.providesVideoTours}
                        onChange={(e) => updateForm('providesVideoTours', e.target.checked)}
                    />
                    <div>
                        <div className="flex items-center gap-2 font-bold text-gray-900">
                            <Video className="w-5 h-5 text-gray-400" />
                            Use Video Tours?
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            I verify that I can provide video tours for clients in the diaspora if requested (Additional fees apply only for HuntSmart subscribers).
                        </p>
                    </div>
                </label>
            </div>
        </div>
    );

    // Step 4: Certification (Unchanged mostly)
    const renderCertification = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Certification & Regulatory Status</h2>
                <p className="text-gray-500 text-sm">LASRERA and ERCAAN registration details</p>
            </div>

            {/* LASRERA */}
            <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100 space-y-4">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-amber-600" />
                    <h3 className="font-bold text-amber-900">LASRERA Registration</h3>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-amber-700 uppercase tracking-widest px-2">Are you LASRERA Registered? *</label>
                        <select
                            value={formData.lasreraRegistered}
                            onChange={(e) => updateForm('lasreraRegistered', e.target.value)}
                            className="w-full bg-white border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-amber-600/20 outline-none appearance-none"
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                            <option value="in-process">In Process</option>
                        </select>
                    </div>
                    {formData.lasreraRegistered === 'yes' && (
                        <>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-amber-700 uppercase tracking-widest px-2">LASRERA Registration Number *</label>
                                <input
                                    type="text"
                                    value={formData.lasreraNumber}
                                    onChange={(e) => updateForm('lasreraNumber', e.target.value)}
                                    placeholder="Enter registration number"
                                    className="w-full bg-white border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-amber-600/20 outline-none"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* ERCAAN */}
            <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100 space-y-4">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-emerald-600" />
                    <h3 className="font-bold text-emerald-900">ERCAAN Membership</h3>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-emerald-700 uppercase tracking-widest px-2">Are you ERCAAN Registered? *</label>
                        <select
                            value={formData.ercaanRegistered}
                            onChange={(e) => updateForm('ercaanRegistered', e.target.value)}
                            className="w-full bg-white border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-600/20 outline-none appearance-none"
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                            <option value="in-process">In Process</option>
                        </select>
                    </div>
                    {formData.ercaanRegistered === 'yes' && (
                        <>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-emerald-700 uppercase tracking-widest px-2">ERCAAN Membership Number *</label>
                                <input
                                    type="text"
                                    value={formData.ercaanNumber}
                                    onChange={(e) => updateForm('ercaanNumber', e.target.value)}
                                    placeholder="Enter membership number"
                                    className="w-full bg-white border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-600/20 outline-none"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

    // Step 5: Bank Details
    const renderBankDetails = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Bank & Payment Details</h2>
                <p className="text-gray-500 text-sm">For receiving your earnings and commissions</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Bank Name *</label>
                    <select
                        value={formData.bankName}
                        onChange={(e) => updateForm('bankName', e.target.value)}
                        className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-600/20 outline-none appearance-none"
                    >
                        <option value="">Select Bank</option>
                        <option value="gtbank">GTBank</option>
                        <option value="access">Access Bank</option>
                        <option value="zenith">Zenith Bank</option>
                        <option value="uba">UBA</option>
                        <option value="firstbank">First Bank</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Account Name *</label>
                    <input
                        type="text"
                        value={formData.accountName}
                        onChange={(e) => updateForm('accountName', e.target.value)}
                        placeholder="As registered with bank"
                        className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-600/20 outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Account Number *</label>
                    <input
                        type="text"
                        value={formData.accountNumber}
                        onChange={(e) => updateForm('accountNumber', e.target.value)}
                        placeholder="10-digit account number"
                        className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-600/20 outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">BVN (Optional)</label>
                    <input
                        type="text"
                        value={formData.bvn}
                        onChange={(e) => updateForm('bvn', e.target.value)}
                        placeholder="Bank Verification Number"
                        className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-emerald-600/20 outline-none"
                    />
                </div>
            </div>
        </div>
    );

    // Step 6: Consent
    const renderConsent = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Consent & Agreements</h2>
                <p className="text-gray-500 text-sm">Please review and accept our strict operating terms</p>
            </div>

            <div className="space-y-6">
                <div className="bg-gray-900 rounded-3xl p-8 text-white space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <FileText className="w-5 h-5 text-emerald-400" />
                        Agent Service Agreement
                    </h3>
                    <div className="bg-white/10 rounded-2xl p-6 text-sm space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                        <p>I agree to:</p>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 shrink-0" />
                                Operate honestly and with integrity
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 shrink-0" />
                                Not duplicate listings that already exist on the platform
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 shrink-0" />
                                Respect the operational role I have selected (Direct vs Semi-Direct)
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="flex items-start gap-4 cursor-pointer group p-4 rounded-2xl border border-gray-100 hover:border-emerald-200 transition-all">
                        <input
                            type="checkbox"
                            checked={formData.agreedToUniqueProperties}
                            onChange={(e) => updateForm('agreedToUniqueProperties', e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-emerald-600 mt-1"
                        />
                        <div>
                            <p className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">Unique Property Policy</p>
                            <p className="text-sm text-gray-500 mt-1">I pledge to upload ONLY unique properties. I understand duplicate listings will be removed and may lead to account suspension.</p>
                        </div>
                    </label>

                    {formData.providesVideoTours && (
                        <label className="flex items-start gap-4 cursor-pointer group p-4 rounded-2xl border border-gray-100 hover:border-emerald-200 transition-all">
                            <input
                                type="checkbox"
                                checked={formData.agreedToVideoPolicy}
                                onChange={(e) => updateForm('agreedToVideoPolicy', e.target.checked)}
                                className="w-5 h-5 rounded border-gray-300 text-emerald-600 mt-1"
                            />
                            <div>
                                <p className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">Video Tour Consent</p>
                                <p className="text-sm text-gray-500 mt-1">I agree to the MyEasyAgent Video Inspection Guidelines and understand I may be recorded during inspections for quality assurance.</p>
                            </div>
                        </label>
                    )}

                    <label className="flex items-start gap-4 cursor-pointer group p-4 rounded-2xl border border-gray-100 hover:border-emerald-200 transition-all">
                        <input
                            type="checkbox"
                            checked={formData.agreedToTerms}
                            onChange={(e) => updateForm('agreedToTerms', e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-emerald-600 mt-1"
                        />
                        <div>
                            <p className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">General Terms & Services</p>
                            <p className="text-sm text-gray-500 mt-1">I accept the Agent Service Agreement and Data Usage Policy.</p>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );

    const canProceed = () => {
        if (step === 'type') return agentType !== null;
        if (step === 'consent') {
            const basicConsent = formData.agreedToTerms && formData.agreedToUniqueProperties;
            if (formData.providesVideoTours && !formData.agreedToVideoPolicy) return false;
            return basicConsent;
        }
        return true;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-gray-100 shadow-2xl shadow-gray-100/50">
                    {/* Progress Bar */}
                    {step !== 'type' && (
                        <div className="mb-12">
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 px-2">
                                <span className={step === 'personal' ? 'text-emerald-600' : ''}>Personal</span>
                                <span className={step === 'professional' ? 'text-emerald-600' : ''}>Professional</span>
                                <span className={step === 'certification' ? 'text-emerald-600' : ''}>Certification</span>
                                <span className={step === 'bank' ? 'text-emerald-600' : ''}>Bank</span>
                                <span className={step === 'consent' ? 'text-emerald-600' : ''}>Consent</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-emerald-600 transition-all duration-700"
                                    style={{
                                        width: step === 'personal' ? '20%' :
                                            step === 'professional' ? '40%' :
                                                step === 'certification' ? '60%' :
                                                    step === 'bank' ? '80%' : '100%'
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    {step === 'type' && renderTypeSelection()}
                    {step === 'personal' && renderPersonalInfo()}
                    {step === 'professional' && renderProfessionalInfo()}
                    {step === 'certification' && renderCertification()}
                    {step === 'bank' && renderBankDetails()}
                    {step === 'consent' && renderConsent()}

                    {/* Navigation */}
                    {step !== 'type' && (
                        <div className="flex gap-4 mt-12">
                            <button
                                onClick={prevStep}
                                className="px-8 py-4 rounded-2xl font-bold text-gray-600 hover:bg-gray-100 transition-all flex items-center gap-2"
                            >
                                <ArrowLeft className="w-5 h-5" /> Back
                            </button>
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
                                    href="/dashboard/agent"
                                    className={`flex-1 py-4 rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${canProceed()
                                        ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100'
                                        : 'bg-gray-200 text-gray-400 pointer-events-none'
                                        }`}
                                >
                                    <CheckCircle2 className="w-5 h-5" /> Submit Registration
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
