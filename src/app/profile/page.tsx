"use client";

import { useState, useEffect, useRef } from "react";
import {
    ShieldAlert, ArrowRight, ArrowLeft, CheckCircle2,
    Briefcase, MapPin, Users, History, HeartHandshake,
    User, Mail, Lock, Phone, Save, ChevronRight,
    Landmark, ShieldCheck, Building2, Upload, Home, Globe,
    Shield, Check, Info, X
} from "lucide-react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

type ProfileStep = "pledge" | "personal" | "management" | "agentType" | "agentDetails" | "agentDisclosure" | "agentAgreement" | "agentCompliance";
type ManagementTab = "account" | "details";
type AgentProfessionalType = "agent" | "development" | "brokerage" | null;
type AgentConnection = "owner" | "semi-direct" | null;

export default function ProfilePage() {
    const router = useRouter();
    const { user, isAuthenticated, updateUser } = useAuth();
    const [step, setStep] = useState<ProfileStep>("pledge");
    const [tab, setTab] = useState<ManagementTab>("account");
    const [managementMode, setManagementMode] = useState<"overview" | "settings">("overview");
    const isInitialized = useRef(false);

    // Agent Specific States
    const [isProfessional, setIsProfessional] = useState<boolean | null>(null);
    const [profType, setProfType] = useState<AgentProfessionalType>(null);
    const [connection, setConnection] = useState<AgentConnection>(null);

    // Form states
    const [pledgeAgreed, setPledgeAgreed] = useState({
        mobilization: false,
        legal: false,
        fairplay: false
    });

    const [personalData, setPersonalData] = useState({
        // Client/Shared fields
        occupation: '',
        workplaceType: '',
        workplaceLocation: '',
        workAddress: '',
        incomeRange: '',
        familyStatus: '',
        familySize: '',
        currentStatus: '',
        rentalDuration: '',
        reasonForMoving: '',
        behaviorPromise: false,
        // Agent fields
        lasreraNumber: '',
        ercaanNumber: '',
        isProfessional: false,
        profType: '',
        connection: '',
        alternatePhone: '',
        agencyName: '',
        websiteUrl: '',
        yearsInBusiness: '',
        operatingLocation: '',
        languages: '',
        bio: '',
        discloseDirectAgent: false,
        directAgentName: '',
        directAgentPhone: '',
        agreedToFeeSplit: false,
        agreedToCommissionStructure: false,
        agreedToNoSidelining: false,
        agreedToIndemnity: false
    });

    const [accountData, setAccountData] = useState({
        name: '',
        email: '',
        phone: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (user) {
            // Only set the auto-step once on mount/initial load
            if (!isInitialized.current) {
                if (user.isProfileComplete) {
                    setStep("management");
                } else if (user.role === "agent") {
                    if (user.personalDetails?.profType || user.personalDetails?.connection) {
                        if (user.personalDetails?.operatingLocation) {
                            // Professional agents go to compliance, others go to disclosure
                            if (user.personalDetails?.isProfessional) {
                                setStep("agentCompliance");
                            } else {
                                setStep("agentDisclosure");
                            }
                        } else {
                            setStep("agentDetails");
                        }
                    } else {
                        setStep("agentType");
                    }
                } else if (user.pledgeAccepted) {
                    setStep("personal");
                }
                isInitialized.current = true;
            }

            setAccountData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });

            if (user.personalDetails) {
                setPersonalData(user.personalDetails);
            }
        }
    }, [user]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Please log in to view your profile</h2>
                    <button onClick={() => router.push("/login")} className="mt-4 bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold">
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    const handleStepChange = (newStep: ProfileStep) => {
        setStep(newStep);
        window.scrollTo(0, 0);
    };

    const handlePledgeSubmit = () => {
        updateUser({ pledgeAccepted: true });
        handleStepChange("personal");
    };

    const handlePersonalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser({
            personalDetails: personalData,
            isProfileComplete: true
        });
        handleStepChange("management");
    };

    const handleAgentTypeSubmit = () => {
        if (isProfessional === true && profType === 'agent') {
            updateUser({
                personalDetails: { ...personalData, isProfessional, profType }
            });
            handleStepChange("agentDetails");
        } else if (isProfessional === false && connection !== null) {
            updateUser({
                personalDetails: { ...personalData, isProfessional, profType: null, connection }
            });
            handleStepChange("agentDetails");
        }
    };

    const handleAgentDetailsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser({
            personalDetails: { ...personalData, isProfessional, profType, connection }
        });

        // Non-professional agents skip compliance
        if (isProfessional) {
            handleStepChange("agentCompliance");
        } else {
            handleStepChange("agentDisclosure");
        }
    };

    const handleAgentComplianceSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser({
            personalDetails: { ...personalData, isProfessional, profType, connection }
        });
        handleStepChange("agentDisclosure");
    };

    const handleAgentDisclosureSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser({
            personalDetails: { ...personalData, isProfessional, profType, connection }
        });
        handleStepChange("agentAgreement");
    };

    const handleAgentAgreementSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser({
            personalDetails: { ...personalData, isProfessional, profType, connection },
            isProfileComplete: true
        });
        handleStepChange("management");
    };

    const handleAccountUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser({
            name: accountData.name,
            email: accountData.email,
            phone: accountData.phone
        });
        alert("Account updated successfully!");
    };

    const renderAgentType = () => (
        <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in zoom-in duration-500">
            <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-gray-100">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-gray-900 font-outfit">What best describes you?</h2>
                    <p className="text-gray-500 mt-2 font-medium">Choose your role to help us provide the best experience and protections for you.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <button
                        onClick={() => { setIsProfessional(true); setConnection(null); }}
                        className={`p-8 rounded-[2rem] border-2 text-left transition-all ${isProfessional === true ? 'border-emerald-600 bg-emerald-50/30' : 'border-gray-50 bg-white hover:border-emerald-100'}`}
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isProfessional === true ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                            <Briefcase className="w-6 h-6" />
                        </div>
                        <h3 className="font-black text-gray-900">I'm a professional</h3>
                        <p className="text-xs text-gray-500 mt-1">For agencies, brokerage and development companies</p>
                    </button>

                    <button
                        onClick={() => { setIsProfessional(false); setProfType(null); }}
                        className={`p-8 rounded-[2rem] border-2 text-left transition-all ${isProfessional === false ? 'border-emerald-600 bg-emerald-50/30' : 'border-gray-50 bg-white hover:border-emerald-100'}`}
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isProfessional === false ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                            <User className="w-6 h-6" />
                        </div>
                        <h3 className="font-black text-gray-900">I'm not a professional</h3>
                        <p className="text-xs text-gray-500 mt-1">For individual owners or representatives manageing properties.</p>
                    </button>
                </div>

                {isProfessional === true && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                        <h3 className="text-xl font-black text-gray-900 text-center mb-6">What type of professional are you?</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <button
                                onClick={() => setProfType('agent')}
                                className={`p-6 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${profType === 'agent' ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-gray-50 bg-white hover:border-emerald-100 text-gray-900'}`}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${profType === 'agent' ? 'bg-white/20' : 'bg-emerald-50 text-emerald-600'}`}>
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <span className="font-bold">Agent</span>
                                {profType === 'agent' && <CheckCircle2 className="w-5 h-5 ml-auto" />}
                            </button>

                            <div className="p-6 rounded-2xl border-2 border-gray-50 bg-gray-50/50 text-gray-400 flex items-center gap-4 cursor-not-allowed grayscale">
                                <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                                    <Landmark className="w-5 h-5" />
                                </div>
                                <span className="font-bold">Development Company</span>
                                <span className="ml-auto text-[10px] font-black uppercase tracking-widest bg-gray-200 px-3 py-1 rounded-full">Coming Soon</span>
                            </div>

                            <div className="p-6 rounded-2xl border-2 border-gray-50 bg-gray-50/50 text-gray-400 flex items-center gap-4 cursor-not-allowed grayscale">
                                <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                                    <Building2 className="w-5 h-5" />
                                </div>
                                <span className="font-bold">Brokerage Company</span>
                                <span className="ml-auto text-[10px] font-black uppercase tracking-widest bg-gray-200 px-3 py-1 rounded-full">Coming Soon</span>
                            </div>
                        </div>
                    </div>
                )}

                {isProfessional === false && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                        <h3 className="text-xl font-black text-gray-900 text-center mb-6">Confirm your connection to this property</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <button
                                onClick={() => setConnection('owner')}
                                className={`p-6 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${connection === 'owner' ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-gray-50 bg-white hover:border-emerald-100 text-gray-900'}`}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${connection === 'owner' ? 'bg-white/20' : 'bg-emerald-50 text-emerald-600'}`}>
                                    <Home className="w-5 h-5" />
                                </div>
                                <span className="font-bold">I'm the owner</span>
                                {connection === 'owner' && <CheckCircle2 className="w-5 h-5 ml-auto" />}
                            </button>

                            <button
                                onClick={() => setConnection('semi-direct')}
                                className={`p-6 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${connection === 'semi-direct' ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-gray-50 bg-white hover:border-emerald-100 text-gray-900'}`}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${connection === 'semi-direct' ? 'bg-white/20' : 'bg-emerald-50 text-emerald-600'}`}>
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="font-bold block">I'm a semi-direct agent</span>
                                    <span className="text-[10px] opacity-70">I don't have direct access to the property keys or landlord.</span>
                                </div>
                                {connection === 'semi-direct' && <CheckCircle2 className="w-5 h-5 ml-auto" />}
                            </button>
                        </div>

                        {connection === 'semi-direct' && (
                            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 mt-4 flex gap-3">
                                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
                                <p className="text-[10px] text-amber-800 leading-relaxed">
                                    <strong>Note:</strong> Semi-direct agents work under a Direct Agent. If you have direct access to property keys and landlords, please use the <strong>"I'm a professional"</strong> flow to apply as a Direct Agent.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-10">
                    <button
                        onClick={handleAgentTypeSubmit}
                        disabled={isProfessional === null || (isProfessional === true && profType === null)}
                        className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all disabled:bg-gray-100 disabled:text-gray-400"
                    >
                        Proceed <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );

    const renderAgentDetails = () => (
        <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-gray-100">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-gray-900 font-outfit">Let's get to know you</h2>
                    <p className="text-gray-500 mt-2 font-medium">Tell us more about your business and experience.</p>
                </div>

                <form onSubmit={handleAgentDetailsSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Partner/Alternate Phone Number</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-gray-400 text-xs font-bold border-r pr-3">
                                    <span className="opacity-50">🇳🇬</span> +234
                                </div>
                                <input
                                    type="tel"
                                    placeholder="801 234 5678"
                                    className="w-full pl-24 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-emerald-600/20"
                                    value={personalData.alternatePhone}
                                    onChange={(e) => setPersonalData(prev => ({ ...prev, alternatePhone: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Name of Agency (Optional)</label>
                            <div className="relative">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="e.g. Dream Homes Ltd"
                                    className="w-full pl-11 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-emerald-600/20"
                                    value={personalData.agencyName}
                                    onChange={(e) => setPersonalData(prev => ({ ...prev, agencyName: e.target.value }))}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Website / Portfolio URL (Optional)</label>
                        <div className="relative">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="url"
                                placeholder="https://yourwork.com"
                                className="w-full pl-11 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-emerald-600/20"
                                value={personalData.websiteUrl}
                                onChange={(e) => setPersonalData(prev => ({ ...prev, websiteUrl: e.target.value }))}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">How many years have you been in business?</label>
                            <input
                                type="number"
                                placeholder="e.g. 5"
                                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-emerald-600/20"
                                value={personalData.yearsInBusiness}
                                onChange={(e) => setPersonalData(prev => ({ ...prev, yearsInBusiness: e.target.value }))}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Operating Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <select
                                    className="w-full pl-11 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-emerald-600/20 appearance-none"
                                    value={personalData.operatingLocation}
                                    onChange={(e) => setPersonalData(prev => ({ ...prev, operatingLocation: e.target.value }))}
                                    required
                                >
                                    <option value="">Select Location</option>
                                    <option value="lekki">Lekki / Ajah</option>
                                    <option value="ikeja">Ikeja / Mainland</option>
                                    <option value="victoria-island">Victoria Island</option>
                                    <option value="surulere">Surulere</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">What language(s) do you speak?</label>
                        <input
                            type="text"
                            placeholder="e.g. English, Yoruba"
                            className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-emerald-600/20"
                            value={personalData.languages}
                            onChange={(e) => setPersonalData(prev => ({ ...prev, languages: e.target.value }))}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Tell us a little about yourself</label>
                        <textarea
                            placeholder="Your bio, specialties, or mission..."
                            className="w-full px-6 py-4 bg-gray-50 border-0 rounded-3xl text-sm font-bold outline-none focus:ring-2 ring-emerald-600/20 min-h-[120px]"
                            value={personalData.bio}
                            onChange={(e) => setPersonalData(prev => ({ ...prev, bio: e.target.value }))}
                            required
                        />
                    </div>

                    <div className="flex gap-4 pt-6">
                        <button type="button" onClick={() => setStep("agentType")} className="px-8 py-4 bg-gray-50 text-gray-500 rounded-2xl font-bold hover:bg-gray-100 flex items-center gap-2">
                            <ArrowLeft className="w-5 h-5" /> Back
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                        >
                            Proceed <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    const renderAgentCompliance = () => (
        <div className="max-w-3xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-gray-100">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-gray-900 font-outfit">Lagos State Compliance Check</h2>
                    <p className="text-gray-500 mt-2 font-medium">Add your registration numbers to build trust and meet local requirements.</p>
                </div>

                <form onSubmit={handleAgentComplianceSubmit} className="space-y-8">
                    {/* Manual Approval Warning */}
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
                        <div>
                            <p className="text-[10px] text-amber-800 font-bold leading-relaxed">
                                Manual Approval Warning
                            </p>
                            <p className="text-[9px] text-amber-700/80 leading-relaxed mt-0.5">
                                LASRERA and ERCAAN numbers are optional but highly recommended.
                                If left blank, your profile will require manual admin approval, which may delay your property listings being approved and going live.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">LASRERA Registration Number (Optional)</label>
                            <input
                                type="text"
                                placeholder="e.g. LAS-123456"
                                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-emerald-600/20"
                                value={personalData.lasreraNumber || ''}
                                onChange={(e) => setPersonalData(prev => ({ ...prev, lasreraNumber: e.target.value }))}
                            />
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-50">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">ERCAAN Membership ID (Optional)</label>
                                <input
                                    type="text"
                                    placeholder="Enter your ERCAAN ID"
                                    className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-emerald-600/20"
                                    value={personalData.ercaanNumber || ''}
                                    onChange={(e) => setPersonalData(prev => ({ ...prev, ercaanNumber: e.target.value }))}
                                />
                                {!personalData.ercaanNumber && (
                                    <div className="px-2 pt-2">
                                        <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                                            If you don't have an ERCAAN ID, we can help you register and place you under a zone.
                                            Reach out via email: <a href="mailto:support@myeasyagent.com" className="text-emerald-600 font-bold hover:underline">support@myeasyagent.com</a>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                        <button type="button" onClick={() => setStep("agentDetails")} className="px-8 py-4 bg-gray-50 text-gray-500 rounded-2xl font-bold hover:bg-gray-100 flex items-center gap-2">
                            <ArrowLeft className="w-5 h-5" /> Back
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                        >
                            {(!personalData.lasreraNumber && !personalData.ercaanNumber) ? "Skip & Continue" : "Save & Continue"} <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    const renderAgentDisclosure = () => (
        <div className="max-w-3xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-gray-100">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-gray-900 font-outfit">
                        Let's Get to Know Your Business More
                    </h2>
                    <p className="text-gray-500 mt-2 font-medium">
                        Upload your CAC Document, a profile picture and a valid ID (National ID, Driver's License, Passport, or Voter's Card).
                    </p>
                </div>

                <form onSubmit={handleAgentDisclosureSubmit} className="space-y-8">
                    {/* Passport Style Photo Upload */}
                    <div className="flex flex-col items-center justify-center space-y-4 mb-10">
                        <div className="relative group">
                            <div className="w-32 h-32 bg-gray-100 rounded-full border-4 border-white shadow-lg overflow-hidden flex items-center justify-center text-gray-300">
                                <User className="w-16 h-16" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                    <Upload className="text-white w-6 h-6" />
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Passport Style Photo</p>
                            <p className="text-[8px] text-emerald-600 cursor-pointer hover:underline flex items-center justify-center gap-1 mt-1 font-bold">
                                <Info className="w-2.5 h-2.5" /> Neutral background, no hats or sunglasses
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* ID Card Upload */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Government Issued ID</label>
                            <div className="aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-center p-6 group cursor-pointer hover:border-emerald-300 transition-all">
                                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-3 group-hover:scale-110 transition-transform">
                                    <Upload className="w-5 h-5" />
                                </div>
                                <p className="text-xs font-bold text-gray-900 leading-tight">Identity Document<br /><span className="text-[10px] opacity-50 font-medium">(NIN, Voter's Card, or Driver's License)</span></p>
                                <p className="text-[8px] text-gray-400 mt-2">Drag & drop or click to upload</p>
                            </div>
                        </div>

                        {/* CAC Document Upload - Required for Agents */}
                        {(isProfessional || connection === 'semi-direct') && (
                            <div className="space-y-4">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">CAC Document</label>
                                <div className="aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-center p-6 group cursor-pointer hover:border-emerald-300 transition-all">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-3 group-hover:scale-110 transition-transform">
                                        <Upload className="w-5 h-5" />
                                    </div>
                                    <p className="text-xs font-bold text-gray-900 leading-tight">Business Registration<br /><span className="text-[10px] opacity-50 font-medium">(CAC Certificate)</span></p>
                                    <p className="text-[8px] text-gray-400 mt-2">Drag & drop or click to upload</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Disclosure Checkboxes for Semi-Direct */}
                    {connection === 'semi-direct' && (
                        <div className="space-y-4 p-6 bg-emerald-50/50 rounded-3xl border border-emerald-100">
                            <h4 className="text-xs font-black text-emerald-900 uppercase tracking-widest flex items-center gap-2">
                                <Info className="w-4 h-4" /> Mandatory Disclosure
                            </h4>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="mt-1 w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                                    checked={personalData.discloseDirectAgent}
                                    onChange={(e) => setPersonalData(prev => ({ ...prev, discloseDirectAgent: e.target.checked }))}
                                    required
                                />
                                <p className="text-[10px] text-emerald-800 font-medium leading-relaxed">
                                    I agree to provide the full name and reachability contact (phone number) of the <strong>Direct Agent</strong> for any property I list on this platform.
                                </p>
                            </label>
                        </div>
                    )}

                    {connection === 'semi-direct' && personalData.discloseDirectAgent && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Direct Agent Name</label>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full px-5 py-3 bg-gray-50 border-0 rounded-xl text-sm font-bold outline-none focus:ring-2 ring-emerald-600/20"
                                        value={personalData.directAgentName}
                                        onChange={(e) => setPersonalData(prev => ({ ...prev, directAgentName: e.target.value }))}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Direct Agent Phone</label>
                                    <input
                                        type="tel"
                                        placeholder="+234..."
                                        className="w-full px-5 py-3 bg-gray-50 border-0 rounded-xl text-sm font-bold outline-none focus:ring-2 ring-emerald-600/20"
                                        value={personalData.directAgentPhone}
                                        onChange={(e) => setPersonalData(prev => ({ ...prev, directAgentPhone: e.target.value }))}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-4 pt-6">
                        <button
                            type="button"
                            onClick={() => isProfessional ? setStep("agentCompliance") : setStep("agentDetails")}
                            className="px-8 py-4 bg-gray-50 text-gray-500 rounded-2xl font-bold hover:bg-gray-100 flex items-center gap-2"
                        >
                            <ArrowLeft className="w-5 h-5" /> Back
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                        >
                            Proceed <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    const renderAgentAgreement = () => {
        const isOwner = connection === 'owner';

        return (
            <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-gray-100">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-gray-900 font-outfit">
                            {isOwner ? "Owner Indemnity Agreement" : "Agent Partner Agreement"}
                        </h2>
                        <p className="text-gray-500 mt-2 font-medium">Please review and sign to activate your account.</p>
                    </div>

                    <form onSubmit={handleAgentAgreementSubmit} className="space-y-6">
                        <div className="space-y-4">
                            {isOwner ? (
                                <>
                                    <label className="flex items-start gap-4 p-6 rounded-3xl border-2 border-emerald-50 bg-emerald-50/20 hover:border-emerald-100 cursor-pointer transition-all text-left">
                                        <input
                                            type="checkbox"
                                            className="mt-1 w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                                            checked={personalData.agreedToIndemnity}
                                            onChange={(e) => setPersonalData(prev => ({ ...prev, agreedToIndemnity: e.target.checked }))}
                                            required
                                        />
                                        <div>
                                            <h4 className="font-black text-gray-900">Liability Indemnity</h4>
                                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                                I hereby indemnify MyEasyAgent against any claims, losses, or disputes arising from properties listed by me.
                                                I acknowledge that MyEasyAgent is a platform for connection and bears no responsibility for the property's condition or legal status.
                                            </p>
                                        </div>
                                    </label>

                                    <label className="flex items-start gap-4 p-6 rounded-3xl border-2 border-emerald-50 bg-emerald-50/20 hover:border-emerald-100 cursor-pointer transition-all text-left">
                                        <input
                                            type="checkbox"
                                            className="mt-1 w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                                            checked={personalData.agreedToIndemnity} // Re-using state for simplicity or could add another field
                                            required
                                        />
                                        <div>
                                            <h4 className="font-black text-gray-900">Proof of Ownership</h4>
                                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                                I confirm that I have valid proof of ownership for all properties listed.
                                                I understand that I may be required to submit these documents for verification at any time.
                                            </p>
                                        </div>
                                    </label>
                                </>
                            ) : (
                                <>
                                    <label className="flex items-start gap-4 p-6 rounded-3xl border-2 border-emerald-50 bg-emerald-50/20 hover:border-emerald-100 cursor-pointer transition-all text-left">
                                        <input
                                            type="checkbox"
                                            className="mt-1 w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                                            checked={personalData.agreedToFeeSplit}
                                            onChange={(e) => setPersonalData(prev => ({ ...prev, agreedToFeeSplit: e.target.checked }))}
                                            required
                                        />
                                        <div>
                                            <h4 className="font-black text-gray-900">Commitment Fee Split (₦2,000)</h4>
                                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                                I agree to forfeit the ₦2,000 commitment fee to the Direct Agent for property mobilization,
                                                OR have a written agreement to split it 50/50. MyEasyAgent will call to confirm.
                                            </p>
                                        </div>
                                    </label>

                                    <label className="flex items-start gap-4 p-6 rounded-3xl border-2 border-emerald-50 bg-emerald-50/20 hover:border-emerald-100 cursor-pointer transition-all text-left">
                                        <input
                                            type="checkbox"
                                            className="mt-1 w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                                            checked={personalData.agreedToCommissionStructure}
                                            onChange={(e) => setPersonalData(prev => ({ ...prev, agreedToCommissionStructure: e.target.checked }))}
                                            required
                                        />
                                        <div>
                                            <h4 className="font-black text-gray-900">Commission Structure (50/25/25)</h4>
                                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                                I acknowledge the planned future commission split of 50% for platform/listing,
                                                and 25%/25% between involved agents as system updates roll out.
                                            </p>
                                        </div>
                                    </label>

                                    <label className="flex items-start gap-4 p-6 rounded-3xl border-2 border-amber-50 bg-amber-50/20 hover:border-amber-100 cursor-pointer transition-all text-left">
                                        <input
                                            type="checkbox"
                                            className="mt-1 w-5 h-5 rounded border-amber-300 text-amber-600 focus:ring-amber-600"
                                            checked={personalData.agreedToNoSidelining}
                                            onChange={(e) => setPersonalData(prev => ({ ...prev, agreedToNoSidelining: e.target.checked }))}
                                            required
                                        />
                                        <div>
                                            <h4 className="font-black text-amber-900 flex items-center gap-2">
                                                <ShieldAlert className="w-4 h-4" /> No-Sidelining Protection
                                            </h4>
                                            <p className="text-xs text-amber-800/70 mt-1 leading-relaxed">
                                                I agree NOT to perform business outside the platform's protection.
                                                I understand I bear all risks of loss, fraud, or fault alone if I sideline the system.
                                            </p>
                                        </div>
                                    </label>
                                </>
                            )}
                        </div>

                        <div className="flex gap-4 pt-8">
                            <button
                                type="button"
                                onClick={() => {
                                    if (connection === 'semi-direct' || profType === 'agent') {
                                        setStep("agentDisclosure");
                                    } else {
                                        setStep("agentCompliance");
                                    }
                                }}
                                className="px-8 py-4 bg-gray-50 text-gray-500 rounded-2xl font-bold hover:bg-gray-100 flex items-center gap-2"
                            >
                                <ArrowLeft className="w-5 h-5" /> Back
                            </button>
                            <button
                                type="submit"
                                className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                            >
                                Sign & Complete Profile <CheckCircle2 className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const renderPledge = () => (
        <div className="max-w-2xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 p-8 md:p-12">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
                        <ShieldAlert className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 font-outfit">The Fair Play Pledge</h1>
                    <p className="text-gray-500 mt-2 font-medium">To keep the Lagos market safe, we require all hunters to play by the rules.</p>
                </div>

                <div className="space-y-4 mb-10">
                    <label className="flex items-start gap-4 p-5 rounded-2xl border-2 border-gray-50 hover:border-emerald-100 cursor-pointer transition-all bg-gray-50/30">
                        <input
                            type="checkbox"
                            className="mt-1 w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                            checked={pledgeAgreed.mobilization}
                            onChange={() => setPledgeAgreed(prev => ({ ...prev, mobilization: !prev.mobilization }))}
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
                            checked={pledgeAgreed.legal}
                            onChange={() => setPledgeAgreed(prev => ({ ...prev, legal: !prev.legal }))}
                        />
                        <div>
                            <p className="font-bold text-gray-900">Legal Review Awareness</p>
                            <p className="text-sm text-gray-500 mt-1 leading-relaxed">I understand MyEasyAgent provides a "Safe to Sign" document review, not 100% legal title guarantee.</p>
                        </div>
                    </label>

                    <label className="flex items-start gap-4 p-5 rounded-2xl border-2 border-gray-50 hover:border-emerald-100 cursor-pointer transition-all bg-gray-50/30">
                        <input
                            type="checkbox"
                            className="mt-1 w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                            checked={pledgeAgreed.fairplay}
                            onChange={() => setPledgeAgreed(prev => ({ ...prev, fairplay: !prev.fairplay }))}
                        />
                        <div>
                            <p className="font-bold text-gray-900">Non-Bypassing Agreement</p>
                            <p className="text-sm text-gray-500 mt-1 leading-relaxed">I pledge to use the platform for the entire deal and not bypass MyEasyAgent to sideline the system.</p>
                        </div>
                    </label>
                </div>

                <button
                    onClick={handlePledgeSubmit}
                    disabled={!pledgeAgreed.mobilization || !pledgeAgreed.legal || !pledgeAgreed.fairplay}
                    className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed shadow-lg shadow-emerald-100"
                >
                    I Agree to the Rules <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );

    const renderPersonalDetails = () => (
        <div className="max-w-3xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 p-8 md:p-12">
                <div className="mb-10">
                    <h2 className="text-3xl font-black text-gray-900 font-outfit">About You</h2>
                    <p className="text-gray-500 mt-2 font-medium">This information helps us and landlords understand your profile better.</p>
                </div>

                <form onSubmit={handlePersonalSubmit} className="space-y-8">
                    {/* Employment Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Occupation / Business</label>
                            <div className="relative">
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="e.g. Banker, Engineer"
                                    className="w-full pl-11 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-emerald-600/20"
                                    value={personalData.occupation}
                                    onChange={(e) => setPersonalData(prev => ({ ...prev, occupation: e.target.value }))}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Workplace Type</label>
                            <select
                                className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-emerald-600/20 appearance-none pointer-events-auto"
                                value={personalData.workplaceType}
                                onChange={(e) => setPersonalData(prev => ({ ...prev, workplaceType: e.target.value }))}
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="office">Corporate Office</option>
                                <option value="shop">Physical Shop</option>
                                <option value="remote">Remote / Home</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Work / Shop / Business Address</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="e.g. 5 Admiralty Way, Lekki"
                                className="w-full pl-11 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-emerald-600/20"
                                value={personalData.workAddress}
                                onChange={(e) => setPersonalData(prev => ({ ...prev, workAddress: e.target.value }))}
                                required
                            />
                        </div>
                        <p className="text-[9px] text-gray-400 font-bold px-2 italic">This would be used to find homes closer to your work place.</p>
                    </div>

                    {/* Family Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Marital Status</label>
                            <select
                                className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-emerald-600/20 appearance-none"
                                value={personalData.familyStatus}
                                onChange={(e) => setPersonalData(prev => ({ ...prev, familyStatus: e.target.value }))}
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="family">Family</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Income Range (Annual)</label>
                            <select
                                className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-emerald-600/20 appearance-none"
                                value={personalData.incomeRange}
                                onChange={(e) => setPersonalData(prev => ({ ...prev, incomeRange: e.target.value }))}
                                required
                            >
                                <option value="">Select Range</option>
                                <option value="1m-5m">₦1M - ₦5M</option>
                                <option value="5m-15m">₦5M - ₦15M</option>
                                <option value="15m+">₦15M+</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Reason for Moving</label>
                        <textarea
                            placeholder="Tell us why you're looking for a new place..."
                            className="w-full px-6 py-4 bg-gray-50 border-0 rounded-3xl text-sm font-bold outline-none focus:ring-2 ring-emerald-600/20 min-h-[120px]"
                            value={personalData.reasonForMoving}
                            onChange={(e) => setPersonalData(prev => ({ ...prev, reasonForMoving: e.target.value }))}
                            required
                        />
                    </div>

                    <label className="flex items-start gap-4 p-6 rounded-[2rem] border-2 border-emerald-50 bg-emerald-50/20 hover:border-emerald-100 cursor-pointer transition-all">
                        <input
                            type="checkbox"
                            className="mt-1 w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                            checked={personalData.behaviorPromise}
                            onChange={(e) => setPersonalData(prev => ({ ...prev, behaviorPromise: e.target.checked }))}
                            required
                        />
                        <div>
                            <p className="font-black text-gray-900 flex items-center gap-2">
                                <HeartHandshake className="w-4 h-4" /> Good Conduct Pledge
                            </p>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed font-medium">
                                I promise to conduct myself responsibly, respect the property, and maintain good relations with neighbors.
                            </p>
                        </div>
                    </label>

                    <div className="flex gap-4 pt-4">
                        <button type="button" onClick={() => handleStepChange("pledge")} className="px-8 py-4 bg-gray-50 text-gray-500 rounded-2xl font-bold hover:bg-gray-100 transition-all flex items-center gap-2">
                            <ArrowLeft className="w-5 h-5" /> Back
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                        >
                            Complete Profile <CheckCircle2 className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    const renderAgentOverview = () => (
        <div className="max-w-md mx-auto py-10 px-4 animate-in fade-in zoom-in-95 duration-500 relative">
            {/* Close Button UI like screenshot */}
            <button
                onClick={() => router.push('/dashboard/agent')}
                className="absolute right-0 top-0 p-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
                <X className="w-5 h-5" />
            </button>

            <div className="bg-[#f0f4f1] rounded-[3rem] p-10 shadow-2xl shadow-emerald-900/5 mt-4">
                {/* Avatar Section */}
                <div className="relative w-44 h-44 mx-auto mb-8">
                    <div className="w-full h-full rounded-full border-[6px] border-white shadow-xl overflow-hidden">
                        {user?.avatar ? (
                            <img src={user.avatar} className="w-full h-full object-cover" alt="Profile" />
                        ) : (
                            <div className="w-full h-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                <User className="w-16 h-16" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="text-center space-y-4 mb-10">
                    <h2 className="text-3xl font-black text-gray-900 font-outfit tracking-tight">{user?.name}</h2>
                    <div className="inline-flex items-center gap-2 px-6 py-2 bg-white rounded-full border border-gray-100 shadow-sm">
                        <User className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-black text-emerald-800 uppercase tracking-widest">{user?.role}</span>
                    </div>

                    <button
                        onClick={() => setManagementMode("settings")}
                        className="block w-full text-emerald-700 font-black text-lg hover:underline transition-all mt-4"
                    >
                        Edit Profile
                    </button>
                </div>

                {/* Info Card */}
                <div className="bg-white rounded-[2.5rem] p-8 space-y-6 shadow-sm border border-emerald-50/50 mb-8">
                    <div className="flex items-start gap-5">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0">
                            <Building2 className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 leading-tight">Agency</p>
                            <p className="font-bold text-gray-800 leading-snug">{personalData.agencyName || 'Independent'}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-5">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0">
                            <Mail className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 leading-tight">Email Address</p>
                            <p className="font-bold text-gray-800 leading-snug truncate">{user?.email}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-5">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0">
                            <Phone className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 leading-tight">Phone Number</p>
                            <div className="flex items-center gap-2">
                                <p className="font-bold text-gray-800 leading-snug">{user?.phone}</p>
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 px-4">Manage Account</p>

                <div className="space-y-4">
                    <button
                        onClick={() => { setManagementMode("settings"); setTab("details"); }}
                        className="w-full bg-white p-6 rounded-[2rem] flex items-center justify-between group hover:shadow-lg transition-all border border-transparent hover:border-emerald-100"
                    >
                        <div className="flex items-center gap-4">
                            <div className="text-emerald-600 group-hover:scale-110 transition-transform">
                                <Users className="w-6 h-6" />
                            </div>
                            <span className="font-black text-gray-900">Manage Business Information</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600" />
                    </button>

                    <button
                        onClick={() => { setManagementMode("settings"); setTab("account"); }}
                        className="w-full bg-white p-6 rounded-[2rem] flex items-center justify-between group hover:shadow-lg transition-all border border-transparent hover:border-emerald-100"
                    >
                        <div className="flex items-center gap-4">
                            <div className="text-emerald-600 group-hover:scale-110 transition-transform">
                                <Shield className="w-6 h-6" />
                            </div>
                            <span className="font-black text-gray-900">Change Password</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600" />
                    </button>
                </div>

                <div className="flex justify-center items-center gap-6 mt-10">
                    <button className="text-xs font-bold text-gray-500 hover:text-gray-900 uppercase tracking-wider">Terms of Service</button>
                    <div className="w-px h-4 bg-gray-300" />
                    <button className="text-xs font-bold text-gray-500 hover:text-gray-900 uppercase tracking-wider">Privacy Policy</button>
                </div>
            </div>
        </div>
    );

    const renderManagement = () => {
        if (managementMode === "overview" && user?.role === 'agent') {
            return renderAgentOverview();
        }

        return (
            <div className="max-w-6xl mx-auto py-12 px-4 animate-in fade-in duration-500">
                <button
                    onClick={() => setManagementMode("overview")}
                    className="mb-8 flex items-center gap-2 text-emerald-600 font-bold hover:underline"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Overview
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm text-center">
                            <div className="relative w-24 h-24 mx-auto mb-4">
                                <img src={user?.avatar} className="w-full h-full rounded-full border-4 border-white shadow-md object-cover" />
                                <div className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-600 rounded-full border-4 border-white flex items-center justify-center text-white">
                                    <CheckCircle2 className="w-4 h-4" />
                                </div>
                            </div>
                            <h3 className="font-black text-xl text-gray-900">{user?.name}</h3>
                            <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest mt-1">{user?.role}</p>
                        </div>

                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                            <button
                                onClick={() => setTab("account")}
                                className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-bold transition-all ${tab === 'account' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                <User className="w-4 h-4" /> Account Settings
                            </button>
                            <button
                                onClick={() => setTab("details")}
                                className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-bold transition-all ${tab === 'details' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                <Briefcase className="w-4 h-4" /> Personal Details
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-12">
                            {tab === "account" ? (
                                <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                                    <div className="flex items-center justify-between mb-10">
                                        <h2 className="text-2xl font-black text-gray-900 font-outfit">Account Settings</h2>
                                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full uppercase tracking-widest">
                                            Verified Hunter
                                        </span>
                                    </div>

                                    <form onSubmit={handleAccountUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input
                                                    type="text"
                                                    className="w-full pl-11 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-emerald-600/20"
                                                    value={accountData.name}
                                                    onChange={(e) => setAccountData(prev => ({ ...prev, name: e.target.value }))}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input
                                                    type="email"
                                                    className="w-full pl-11 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-emerald-600/20"
                                                    value={accountData.email}
                                                    onChange={(e) => setAccountData(prev => ({ ...prev, email: e.target.value }))}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Phone Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    placeholder="+234..."
                                                    className="w-full pl-11 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-emerald-600/20"
                                                    value={accountData.phone}
                                                    onChange={(e) => setAccountData(prev => ({ ...prev, phone: e.target.value }))}
                                                />
                                            </div>
                                        </div>

                                        <div className="hidden md:block" />

                                        <div className="md:col-span-2 pt-6 border-t border-gray-50">
                                            <h4 className="text-sm font-black text-gray-900 mb-6 flex items-center gap-2">
                                                <Lock className="w-4 h-4 text-emerald-600" /> Security
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">New Password</label>
                                                    <input
                                                        type="password"
                                                        placeholder="Keep it secret"
                                                        className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-emerald-600/20"
                                                        value={accountData.newPassword}
                                                        onChange={(e) => setAccountData(prev => ({ ...prev, newPassword: e.target.value }))}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Confirm Password</label>
                                                    <input
                                                        type="password"
                                                        placeholder="Once more..."
                                                        className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-emerald-600/20"
                                                        value={accountData.confirmPassword}
                                                        onChange={(e) => setAccountData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="md:col-span-2 flex justify-end">
                                            <button type="submit" className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
                                                <Save className="w-4 h-4" /> Save Changes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                                    <div className="flex items-center justify-between mb-10">
                                        <h2 className="text-2xl font-black text-gray-900 font-outfit">Personal Details</h2>
                                        <button
                                            onClick={() => user?.role === 'agent' ? setStep("agentDetails") : setStep("personal")}
                                            className="text-emerald-600 text-sm font-bold hover:underline flex items-center gap-1"
                                        >
                                            Edit Details <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {user?.role === 'agent' ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Agency Name</p>
                                                <p className="font-black text-gray-900">{personalData.agencyName || 'Not set'}</p>
                                            </div>
                                            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Years in Business</p>
                                                <p className="font-black text-gray-900">{personalData.yearsInBusiness || 'Not set'}</p>
                                            </div>
                                            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Operating Location</p>
                                                <p className="font-black text-gray-900 capitalize">{personalData.operatingLocation || 'Not set'}</p>
                                            </div>
                                            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Languages Spoken</p>
                                                <p className="font-black text-gray-900">{personalData.languages || 'Not set'}</p>
                                            </div>
                                            <div className="md:col-span-2 p-6 bg-emerald-50/50 rounded-3xl border border-emerald-100">
                                                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1.5">Professional Bio</p>
                                                <p className="font-bold text-gray-700 italic leading-relaxed">"{personalData.bio || 'No bio provided'}"</p>
                                            </div>
                                            {personalData.websiteUrl && (
                                                <div className="md:col-span-2 p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-between">
                                                    <div>
                                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Website / Portfolio</p>
                                                        <p className="font-black text-emerald-600">{personalData.websiteUrl}</p>
                                                    </div>
                                                    <Globe className="w-5 h-5 text-gray-300" />
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Occupation</p>
                                                <p className="font-black text-gray-900">{personalData.occupation || 'Not set'}</p>
                                            </div>
                                            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Workplace Type</p>
                                                <p className="font-black text-gray-900 capitalize">{personalData.workplaceType || 'Not set'}</p>
                                            </div>
                                            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Family Status</p>
                                                <p className="font-black text-gray-900 capitalize">{personalData.familyStatus || 'Not set'}</p>
                                            </div>
                                            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Income Range</p>
                                                <p className="font-black text-gray-900">{personalData.incomeRange || 'Not set'}</p>
                                            </div>
                                            <div className="md:col-span-2 p-6 bg-emerald-50/50 rounded-3xl border border-emerald-100">
                                                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1.5">Reason for Moving</p>
                                                <p className="font-bold text-gray-700 italic leading-relaxed">"{personalData.reasonForMoving || 'No reason provided'}"</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-8 p-6 bg-emerald-600 rounded-3xl text-white flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                                <ShieldCheck className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="font-black">Fair Play Pledge</p>
                                                <p className="text-xs text-emerald-100 font-medium">Verified on {new Date().toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="hidden sm:block">
                                            <span className="text-[10px] font-black bg-white/20 px-3 py-1.5 rounded-full uppercase tracking-widest">Active</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            {step === "pledge" && renderPledge()}
            {step === "personal" && renderPersonalDetails()}
            {step === "agentType" && renderAgentType()}
            {step === "agentDetails" && renderAgentDetails()}
            {step === "agentCompliance" && renderAgentCompliance()}
            {step === "agentDisclosure" && renderAgentDisclosure()}
            {step === "agentAgreement" && renderAgentAgreement()}
            {step === "management" && renderManagement()}
        </div>
    );
}
