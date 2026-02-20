"use client";

import { Info } from "lucide-react";

interface FeeBreakdownProps {
    className?: string;
    showPlatformFee?: boolean;
}

export default function FeeBreakdown({ className = "", showPlatformFee = true }: FeeBreakdownProps) {
    return (
        <div className={`space-y-2 ${className}`}>
            <div className="flex items-center gap-2 text-sm font-black text-gray-900">
                <span>₦2,500 Commitment Fee</span>
            </div>
            <div className="space-y-1.5 pl-4 border-l-2 border-emerald-100">
                <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">To Agent (Mobilization)</span>
                    <span className="font-bold text-gray-900">₦2,000</span>
                </div>
                {showPlatformFee && (
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">To Platform (Service)</span>
                        <span className="font-bold text-gray-900">₦500</span>
                    </div>
                )}
            </div>
            <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
                <Info className="w-3 h-3" /> Fees are 100% refundable if the property is verified as fake.
            </p>
        </div>
    );
}
