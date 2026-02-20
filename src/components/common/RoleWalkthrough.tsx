"use client";

import { useState } from "react";
import { Info, X, ChevronRight, ChevronLeft, MapPin, ShieldCheck, Banknote, Calendar, Clock, Crown } from "lucide-react";

interface Step {
    title: string;
    desc: string;
    icon: React.ReactNode;
}

interface RoleWalkthroughProps {
    role: "agent" | "client" | "landlord";
    onClose: () => void;
}

export default function RoleWalkthrough({ role, onClose }: RoleWalkthroughProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const steps: Record<string, Step[]> = {
        agent: [
            {
                title: "Welcome, Agent!",
                desc: "Manage your listings and earn mobilization fees directly. Follow these steps to maximize your profile.",
                icon: <ShieldCheck className="w-8 h-8" />
            },
            {
                title: "Booking Management",
                desc: "Check your 'Bookings' tile for upcoming inspections. You must be at the property within the scheduled window.",
                icon: <Calendar className="w-8 h-8" />
            },
            {
                title: "The 24h Lock",
                desc: "Bookings within 24 hours are 'Locked'. Neither you nor the client can cancel without penalty. Attendance is mandatory.",
                icon: <Clock className="w-8 h-8" />
            },
            {
                title: "Dual-Confirmation",
                desc: "After an inspection, the client clicks 'Completed'. You then enter a unique code in your dashboard to certify the visit.",
                icon: <Info className="w-8 h-8" />
            },
            {
                title: "Fast Payouts",
                desc: "Once certified, funds move to 'Withdrawable'. Request a payout and get your money within 24 business hours.",
                icon: <Banknote className="w-8 h-8" />
            }
        ],
        client: [
            {
                title: "Finding Your Home",
                desc: "Browse Lagos listings with confidence. Look for 'Gold Verified' properties for maximum security. These listings have been physically verified by our team.",
                icon: <MapPin className="w-8 h-8" />
            },
            {
                title: "HuntSmart Pass",
                desc: "Unlock Street View, Video Tours, and Detailed Fault Reports with a HuntSmart Pass. This minimizes wasted physical visits and protects your time.",
                icon: <Crown className="w-8 h-8" />
            },
            {
                title: "Booking & Mobilization",
                desc: "Every physical inspection requires a ₦2,500 mobilization fee. This fee ensures our verified agents are compensated for their commute and professional time.",
                icon: <Banknote className="w-8 h-8" />
            },
            {
                title: "The Booking Code",
                desc: "During the inspection, the agent will ask for your 'Booking Code'. Only provide this if you are satisfied with the visit. This acts as your digital signature of completion.",
                icon: <Lock className="w-8 h-8" />
            },
            {
                title: "Confirming Attendance",
                desc: "Once the inspection is done, you MUST click 'Confirm Completion' on your dashboard. This releases the mobilization fee to the agent's wallet.",
                icon: <CheckCircle2 className="w-8 h-8" />
            },
            {
                title: "Refund Process",
                desc: "If an agent cancels, you receive 1 free inspection credit. You can also claim a ₦2,500 cash refund by providing your bank details via the 'Claim Refund' button.",
                icon: <ShieldCheck className="w-8 h-8" />
            }
        ],
        landlord: [
            {
                title: "Passive Management",
                desc: "List your property and let our verified agents handle the heavy lifting while you monitor from here.",
                icon: <Home className="w-8 h-8" />
            },
            {
                title: "Inspection Oversight",
                desc: "Track how many people have viewed your property and stay updated on inspection feedback.",
                icon: <Eye className="w-8 h-8" />
            }
        ]
    };

    const currentRoleSteps = steps[role];

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[3rem] p-10 max-w-lg w-full relative shadow-2xl border border-gray-100 animate-in zoom-in duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-2"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto">
                        {currentRoleSteps[currentStep].icon}
                    </div>

                    <div>
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-2 block">
                            Guided Tour • Step {currentStep + 1} of {currentRoleSteps.length}
                        </span>
                        <h2 className="text-3xl font-black text-gray-900 leading-tight">
                            {currentRoleSteps[currentStep].title}
                        </h2>
                        <p className="text-gray-500 mt-4 leading-relaxed font-medium">
                            {currentRoleSteps[currentStep].desc}
                        </p>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            disabled={currentStep === 0}
                            onClick={() => setCurrentStep(prev => prev - 1)}
                            className="flex-1 py-4 border border-gray-100 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 disabled:opacity-0 transition-all flex items-center justify-center gap-2"
                        >
                            <ChevronLeft className="w-5 h-5" /> Back
                        </button>
                        <button
                            onClick={() => {
                                if (currentStep < currentRoleSteps.length - 1) {
                                    setCurrentStep(prev => prev + 1);
                                } else {
                                    onClose();
                                }
                            }}
                            className="flex-[2] py-4 bg-gray-900 text-white rounded-2xl font-black hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-gray-200"
                        >
                            {currentStep === currentRoleSteps.length - 1 ? "Got it!" : "Next Step"}
                            {currentStep < currentRoleSteps.length - 1 && <ChevronRight className="w-5 h-5" />}
                        </button>
                    </div>

                    <div className="flex justify-center gap-2">
                        {currentRoleSteps.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all ${i === currentStep ? 'w-8 bg-emerald-600' : 'w-2 bg-gray-100'}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={onClose}
                        className="text-[10px] font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest mt-8"
                    >
                        Skip Instruction
                    </button>
                </div>
            </div>
        </div>
    );
}

import { CheckCircle2, Home, Eye } from "lucide-react";
