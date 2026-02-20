"use client";

import { useState } from "react";
import { Check, Calendar, Clock, Save } from "lucide-react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIME_SLOTS = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

export default function AvailabilitySetter() {
    const [selectedDays, setSelectedDays] = useState<string[]>(["Mon", "Tue", "Wed", "Thu", "Fri"]);
    const [selectedSlots, setSelectedSlots] = useState<string[]>(["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"]);
    const [isSaving, setIsSaving] = useState(false);

    const toggleDay = (day: string) => {
        setSelectedDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };

    const toggleSlot = (slot: string) => {
        setSelectedSlots(prev =>
            prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
        );
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert("Availability saved successfully!");
        }, 1000);
    };

    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm max-w-4xl mx-auto">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Set Your Availability</h2>
                <p className="text-gray-500 mt-1">Select the days and times when you are available for property inspections</p>
            </div>

            <div className="space-y-10">
                {/* Available Days */}
                <div>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-600" /> Available Days
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {DAYS.map(day => (
                            <button
                                key={day}
                                onClick={() => toggleDay(day)}
                                className={`px-6 py-3 rounded-xl font-bold transition-all border ${selectedDays.includes(day)
                                        ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-100"
                                        : "bg-gray-50 border-gray-100 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                    }`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Available Time Slots */}
                <div>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-emerald-600" /> Available Time Slots
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                        {TIME_SLOTS.map(slot => (
                            <button
                                key={slot}
                                onClick={() => toggleSlot(slot)}
                                className={`px-4 py-3 rounded-xl font-bold text-sm transition-all border ${selectedSlots.includes(slot)
                                        ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-100"
                                        : "bg-gray-50 border-gray-100 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                    }`}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Schedule Preview */}
                <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                    <h4 className="text-sm font-bold text-gray-900 mb-2">Your Schedule Preview</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-outfit">
                        You are available on <span className="text-gray-900 font-bold">{selectedDays.join(", ") || "no days selected"}</span> at <span className="text-gray-900 font-bold">{selectedSlots.join(", ") || "no time slots selected"}</span>
                    </p>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Save className="w-5 h-5" />
                        )}
                        {isSaving ? "Saving..." : "Save Availability"}
                    </button>
                </div>
            </div>
        </div>
    );
}
