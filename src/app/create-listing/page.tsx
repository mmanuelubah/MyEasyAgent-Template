"use client";

import { useState } from "react";
import { ArrowLeft, Check, MapPin, UploadCloud, AlertTriangle, Home as HomeIcon, Building, Trees, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateListing() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);

    // Form State
    const [whyHere, setWhyHere] = useState("");
    const [isDirectOwner, setIsDirectOwner] = useState<boolean | null>(null);
    const [locationState, setLocationState] = useState("Lagos");
    const [locationLGA, setLocationLGA] = useState("Amuwo Odofin");
    const [locationArea, setLocationArea] = useState("Apple junction");
    const [shareAddress, setShareAddress] = useState<boolean | null>(null);
    const [propertyType, setPropertyType] = useState("");
    const [inspectionAgreement, setInspectionAgreement] = useState<boolean | null>(null);

    // Map & Premium State
    const [address, setAddress] = useState("");
    const [isPremium, setIsPremium] = useState(false);

    const sidebarSections = [
        { id: 'overview', title: 'Overview', steps: [1] },
        { id: 'location', title: 'Location', steps: [2, 3, 4, 5] },
        { id: 'basic', title: 'Basic Information', steps: [6] },
        { id: 'more', title: 'More Information', steps: [7, 8] },
        { id: 'images', title: 'Upload Images', steps: [9] }
    ];

    const handleNext = () => {
        if (currentStep === 4 && shareAddress === false) {
            setCurrentStep(6); // Skip Map
        } else if (currentStep < 9) {
            setCurrentStep(curr => curr + 1);
        } else {
            alert("Listing Submitted!");
            router.push('/dashboard/agent');
        }
    };

    const handleBack = () => {
        if (currentStep === 6 && shareAddress === false) {
            setCurrentStep(4);
        } else if (currentStep > 1) {
            setCurrentStep(curr => curr - 1);
        } else {
            router.push('/');
        }
    };

    const getSectionStatus = (steps: number[]) => {
        if (steps.includes(currentStep)) return 'active';
        if (currentStep > steps[steps.length - 1]) return 'completed';
        return 'pending';
    };

    const brandGreen = "#0F5A3E";
    const bgGreen = "bg-[#0F5A3E]";
    const textGreen = "text-[#0F5A3E]";
    const borderGreen = "border-[#0F5A3E]";

    return (
        <div className="flex bg-white min-h-[calc(100vh-4rem)] font-sans">
            {/* Sidebar */}
            <div className="w-[300px] border-r border-gray-100 p-8 pt-12 hidden md:flex flex-col relative z-10 bg-white shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-4 mb-10 text-gray-900 font-bold hover:text-[#0F5A3E] transition-colors"
                >
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    Steps to Publish
                </button>

                <div className="flex flex-col space-y-9 ml-4">
                    {sidebarSections.map((section, idx) => {
                        const status = getSectionStatus(section.steps);

                        return (
                            <div key={section.id} className="flex flex-col relative">
                                {idx !== sidebarSections.length - 1 && (
                                    <div className={`absolute left-[11px] top-6 bottom-[-36px] w-[2px] ${status === 'completed' ? bgGreen : 'bg-gray-100'}`} />
                                )}

                                <div className="flex items-center gap-4 relative z-10">
                                    {status === 'completed' ? (
                                        <div className={`w-6 h-6 rounded-full ${bgGreen} text-white flex items-center justify-center`}>
                                            <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                        </div>
                                    ) : status === 'active' ? (
                                        <div className={`w-6 h-6 flex items-center justify-center ${textGreen}`}>
                                            {/* Dashed circular spinner matching the image */}
                                            <svg className="animate-spin w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 3V5M12 19V21M3 12H5M19 12H21M5.63604 5.63604L7.05025 7.05025M16.9497 16.9497L18.364 18.364M5.63604 18.364L7.05025 16.9497M16.9497 7.05025L18.364 5.63604" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-400">
                                            {idx + 1}
                                        </div>
                                    )}
                                    <span className={`text-sm tracking-tight ${status === 'active' ? 'text-gray-600 font-medium' : status === 'completed' ? 'text-gray-600 font-medium' : 'text-gray-400 font-medium'}`}>
                                        {section.title}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
                <div className="flex-1 overflow-y-auto px-6 flex justify-center pt-24 pb-32">
                    <div className="max-w-2xl w-full">

                        {/* Step 1 */}
                        {currentStep === 1 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
                                <h1 className="text-[1.7rem] font-medium text-gray-900 mb-2">What best describes why you are here today?</h1>
                                <p className="text-[15px] text-gray-500 mb-10">Select an option so we can tailor the next steps.</p>

                                <div className="space-y-4 max-w-xl mx-auto">
                                    {["Rent", "Sale", "Lease"].map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => setWhyHere(opt)}
                                            className={`w-full p-4 rounded-xl border transition-all flex items-center gap-4 ${whyHere === opt ? `${bgGreen} text-white ${borderGreen}` : 'border-gray-200 text-gray-800 hover:border-gray-300'}`}
                                        >
                                            <div className="ml-2 font-medium">List a property for {opt}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 2 */}
                        {currentStep === 2 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center max-w-xl mx-auto">
                                <h1 className="text-[1.7rem] font-medium text-gray-900 mb-2">Are you communicating with the owner directly?</h1>
                                <p className="text-[15px] text-gray-500 mb-10">This would give your customers and real estate agents more clarity.</p>

                                <div className="space-y-4">
                                    <button
                                        onClick={() => setIsDirectOwner(true)}
                                        className={`w-full p-4 text-left rounded-[12px] border transition-all flex items-center gap-3 ${isDirectOwner === true ? `${borderGreen} ${bgGreen} text-white` : 'border-gray-200 text-gray-900 hover:border-gray-300'}`}
                                    >
                                        <CheckIcon className={`w-5 h-5 ml-2 ${isDirectOwner === true ? 'text-white' : textGreen}`} />
                                        <span className="font-semibold text-[15px] tracking-tight">Yes, I am</span>
                                    </button>
                                    <button
                                        onClick={() => setIsDirectOwner(false)}
                                        className={`w-full p-4 text-left rounded-[12px] border transition-all flex flex-col ${isDirectOwner === false ? `border-gray-200 ${textGreen}` : 'border-gray-200 text-gray-900 hover:border-gray-300'}`}
                                    >
                                        <div className="flex items-center gap-3 w-full">
                                            <CloseBoxIcon className={`w-5 h-5 ml-2 ${isDirectOwner === false ? textGreen : textGreen}`} />
                                            <span className="font-semibold text-[15px] tracking-tight">No, I'm not</span>
                                        </div>

                                        {isDirectOwner === false && (
                                            <div className="mt-4 ml-10 p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-3 animate-in fade-in zoom-in duration-300">
                                                <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                                                <p className="text-sm font-medium text-orange-800 leading-relaxed">
                                                    Please alert the direct agent about the <strong className="font-bold">₦2,000 commitment fee</strong> per client head and come to a conclusion before proceeding.
                                                </p>
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3 */}
                        {currentStep === 3 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center max-w-xl mx-auto">
                                <h1 className="text-[1.7rem] font-medium text-gray-900 mb-2">Let's Get Your Location Locked In</h1>
                                <p className="text-[15px] text-gray-500 mb-10">Enter your area and street to help people find your property more easily.</p>

                                <div className="space-y-4">
                                    <div className="relative">
                                        <select
                                            value={locationState} onChange={e => setLocationState(e.target.value)}
                                            className="w-full p-4 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#0F5A3E] transition-colors text-gray-800 appearance-none font-medium"
                                        >
                                            <option value="Lagos">Lagos</option>
                                            <option value="Abuja">Abuja</option>
                                        </select>
                                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>

                                    <div className="relative">
                                        <select
                                            value={locationLGA} onChange={e => setLocationLGA(e.target.value)}
                                            className="w-full p-4 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#0F5A3E] transition-colors text-gray-800 appearance-none font-medium"
                                        >
                                            <option value="Amuwo Odofin">Amuwo Odofin</option>
                                            <option value="Lekki">Lekki</option>
                                        </select>
                                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>

                                    <div className="relative">
                                        <select
                                            value={locationArea} onChange={e => setLocationArea(e.target.value)}
                                            className="w-full p-4 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#0F5A3E] transition-colors text-gray-800 appearance-none font-medium"
                                        >
                                            <option value="Apple junction">Apple junction</option>
                                            <option value="Festac">Festac</option>
                                        </select>
                                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>

                                    <div className="text-left mt-6">
                                        <span className="text-xs text-gray-500">Can't locate your neighbourhood? </span>
                                        <a href="#" className="text-xs text-[#E17E36] hover:underline underline-offset-2">Click here to enter neighbourhood</a>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4 */}
                        {currentStep === 4 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center max-w-xl mx-auto">
                                <h1 className="text-[1.7rem] font-medium text-gray-900 mb-2">Would you like to share your property's address?</h1>
                                <p className="text-[15px] text-gray-500 mb-8 leading-relaxed">
                                    Sharing your address helps your listing rank higher and allows customers to find the location easily, creating a better viewing experience
                                </p>

                                <div className="space-y-4">
                                    <button
                                        onClick={() => setShareAddress(true)}
                                        className={`w-full p-4 text-left rounded-[12px] border transition-all flex items-center gap-3 ${shareAddress === true ? `${bgGreen} text-white ${borderGreen}` : 'border-gray-200 text-gray-900 hover:border-gray-300'}`}
                                    >
                                        <CheckIcon className={`w-5 h-5 ml-2 ${shareAddress === true ? 'text-white' : textGreen}`} />
                                        <span className="font-semibold text-[15px] tracking-tight">Yes, I'd like to</span>
                                    </button>
                                    <button
                                        onClick={() => setShareAddress(false)}
                                        className={`w-full p-4 text-left rounded-[12px] border transition-all flex items-center gap-3 ${shareAddress === false ? `border-gray-200 ${textGreen}` : 'border-gray-200 text-gray-900 hover:border-gray-300'}`}
                                    >
                                        <CloseBoxIcon className={`w-5 h-5 ml-2 ${shareAddress === false ? textGreen : textGreen}`} />
                                        <span className="font-semibold text-[15px] tracking-tight">No, I'd rather not</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 5 */}
                        {currentStep === 5 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center max-w-4xl mx-auto w-full">
                                <h1 className="text-[1.7rem] font-medium text-gray-900 mb-2">Let's Place Your Property on the Map</h1>
                                <p className="text-[15px] text-gray-500 mb-6">Submit the exact location so buyers know exactly where to find it.</p>

                                {/* Toggle for Demo Purposes */}
                                <div className="flex justify-center mb-8">
                                    <button
                                        onClick={() => setIsPremium(!isPremium)}
                                        className={`text-xs px-4 py-1.5 rounded-full border transition-colors font-medium ${isPremium ? 'bg-amber-100 border-amber-300 text-amber-700 shadow-inner' : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'}`}
                                    >
                                        {isPremium ? "Demo: Premium Overview Enabled" : "Demo: Premium Overview Disabled"}
                                    </button>
                                </div>

                                <div className="max-w-[48rem] mx-auto flex flex-col md:flex-row gap-6">
                                    <div className="flex-1 flex flex-col">
                                        <div className="w-full bg-white border border-gray-200 rounded-2xl p-3.5 flex items-center gap-3 mb-6 relative shadow-sm focus-within:border-[#0F5A3E] focus-within:ring-1 focus-within:ring-[#0F5A3E] transition-all">
                                            <MapPin className="w-5 h-5 text-gray-400 ml-1 shrink-0" />
                                            <input
                                                type="text"
                                                placeholder="Enter your exact address (e.g. 15 Admiralty Way, Lekki)"
                                                className="w-full outline-none text-gray-900 placeholder:text-gray-400 text-[15px] font-medium"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </div>

                                        <div className="h-[400px] w-full rounded-2xl border border-gray-200 overflow-hidden relative shadow-sm bg-gray-50">
                                            {address.length > 3 ? (
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    frameBorder="0"
                                                    scrolling="no"
                                                    marginHeight={0}
                                                    marginWidth={0}
                                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=m&z=15&ie=UTF8&iwloc=&output=embed`}
                                                ></iframe>
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                                    <MapPin className="w-12 h-12 mb-4 opacity-20" />
                                                    <p className="font-medium text-sm">Type an address to view your location on the map.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Premium Overview Sidebar */}
                                    {isPremium && address.length > 5 && (
                                        <div className="w-full md:w-[280px] bg-gradient-to-b from-[#FAF8F5] to-white border border-[#E8DCC4] rounded-2xl p-6 text-left shrink-0 animate-in fade-in slide-in-from-right-4 duration-500 shadow-md flex flex-col relative overflow-hidden">
                                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300 to-orange-400"></div>
                                            <div className="flex items-center gap-2 mb-6 mt-1">
                                                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-amber-600" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                </div>
                                                <h3 className="font-bold text-gray-900 text-[15px]">Premium Overview</h3>
                                            </div>

                                            <div className="space-y-5 flex-1">
                                                <div>
                                                    <p className="text-[10px] font-bold text-[#A88C5A] uppercase tracking-widest mb-1.5">Neighborhood Safety</p>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                                                            <div className="w-[85%] h-full bg-[#0F5A3E] rounded-full"></div>
                                                        </div>
                                                        <span className="text-sm font-bold text-gray-900">85/100</span>
                                                    </div>
                                                </div>
                                                <div className="pb-3 border-b border-[#F0E6D2]">
                                                    <p className="text-[10px] font-bold text-[#A88C5A] uppercase tracking-widest mb-1">Avg. Property Value</p>
                                                    <p className="font-extrabold text-gray-900 text-lg">₦120M - ₦150M</p>
                                                    <p className="text-[11px] text-emerald-600 font-bold mt-0.5 flex items-center gap-1">
                                                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                                                        4.2% YoY Growth
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-[#A88C5A] uppercase tracking-widest mb-1.5">Demographics Snapshot</p>
                                                    <p className="text-[13px] text-gray-700 font-medium leading-relaxed">Primarily working professionals and expatriates with high lifestyle demands.</p>
                                                </div>
                                                <div className="pt-2">
                                                    <p className="text-[10px] font-bold text-[#A88C5A] uppercase tracking-widest mb-2">Nearby Amenities</p>
                                                    <ul className="text-[13px] text-gray-800 space-y-2 font-medium">
                                                        <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" /> 3 Top Tier Schools</li>
                                                        <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" /> 2 Major Hospitals</li>
                                                        <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" /> 5+ Supermarkets</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 6 */}
                        {currentStep === 6 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center max-w-xl mx-auto">
                                <h1 className="text-[1.7rem] font-medium text-gray-900 mb-2">What Kind of Property Are We Working With?</h1>
                                <p className="text-[15px] text-gray-500 mb-10">Select a type so we can tailor the next steps.</p>

                                <div className="space-y-4">
                                    <button
                                        onClick={() => setPropertyType("Residential")}
                                        className={`w-full p-4 rounded-[12px] border transition-all flex items-center gap-4 ${propertyType === "Residential" ? `${bgGreen} text-white ${borderGreen}` : 'border-gray-200 text-gray-900 hover:border-gray-300'}`}
                                    >
                                        <HomeIcon className={`w-5 h-5 ml-2 ${propertyType === "Residential" ? 'text-white' : textGreen}`} />
                                        <span className="font-semibold text-[15px] tracking-tight">Residential</span>
                                    </button>
                                    <button
                                        onClick={() => setPropertyType("Commercial")}
                                        className={`w-full p-4 rounded-[12px] border transition-all flex items-center gap-4 ${propertyType === "Commercial" ? `${bgGreen} text-white ${borderGreen}` : 'border-gray-200 text-gray-900 hover:border-gray-300'}`}
                                    >
                                        <Building className={`w-5 h-5 ml-2 ${propertyType === "Commercial" ? 'text-white' : textGreen}`} />
                                        <span className="font-semibold text-[15px] tracking-tight">Commercial</span>
                                    </button>
                                    <button
                                        onClick={() => setPropertyType("Land")}
                                        className={`w-full p-4 rounded-[12px] border transition-all flex items-center gap-4 ${propertyType === "Land" ? `${bgGreen} text-white ${borderGreen}` : 'border-gray-200 text-gray-900 hover:border-gray-300'}`}
                                    >
                                        <Trees className={`w-5 h-5 ml-2 ${propertyType === "Land" ? 'text-white' : textGreen}`} />
                                        <span className="font-semibold text-[15px] tracking-tight">Land</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 7 */}
                        {currentStep === 7 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center max-w-xl mx-auto">
                                <h1 className="text-[1.7rem] font-medium text-gray-900 mb-2">Please give details of property</h1>
                                <p className="text-[15px] text-gray-500 mb-10">Fill in the specifications to attract the right people.</p>

                                <div className="space-y-6 text-left">
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Property Title</label>
                                        <input type="text" placeholder="e.g. Stunning 3 Bedroom Duplex" className="w-full p-4 rounded-xl border border-gray-200 text-gray-900 outline-none focus:border-[#0F5A3E] transition-colors font-medium" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Bedrooms</label>
                                            <input type="number" placeholder="0" className="w-full p-4 rounded-xl border border-gray-200 text-gray-900 outline-none focus:border-[#0F5A3E] transition-colors font-medium" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Bathrooms</label>
                                            <input type="number" placeholder="0" className="w-full p-4 rounded-xl border border-gray-200 text-gray-900 outline-none focus:border-[#0F5A3E] transition-colors font-medium" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Description</label>
                                        <textarea placeholder="Describe the property features..." rows={4} className="w-full p-4 rounded-xl border border-gray-200 text-gray-900 outline-none focus:border-[#0F5A3E] transition-colors font-medium resize-none"></textarea>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 8 : NEW - Inspection Agreement */}
                        {currentStep === 8 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center max-w-xl mx-auto">
                                <h1 className="text-[1.7rem] font-medium text-gray-900 mb-2">MyEasyAgent Property Inspection</h1>
                                <p className="text-[15px] text-gray-500 mb-10">Do you agree to allow MyEasyAgent representatives to perform an independent verification inspection on this property?</p>

                                <div className="space-y-4">
                                    <button
                                        onClick={() => setInspectionAgreement(true)}
                                        className={`w-full p-4 text-left rounded-[12px] border transition-all flex items-center gap-3 ${inspectionAgreement === true ? `${borderGreen} ${bgGreen} text-white` : 'border-gray-200 text-gray-900 hover:border-gray-300'}`}
                                    >
                                        <CheckIcon className={`w-5 h-5 ml-2 ${inspectionAgreement === true ? 'text-white' : textGreen}`} />
                                        <span className="font-semibold text-[15px] tracking-tight">Yes, I agree to an inspection</span>
                                    </button>
                                    <button
                                        onClick={() => setInspectionAgreement(false)}
                                        className={`w-full p-4 text-left rounded-[12px] border transition-all flex items-center gap-3 ${inspectionAgreement === false ? `border-gray-200 ${textGreen}` : 'border-gray-200 text-gray-900 hover:border-gray-300'}`}
                                    >
                                        <CloseBoxIcon className={`w-5 h-5 ml-2 ${inspectionAgreement === false ? textGreen : textGreen}`} />
                                        <span className="font-semibold text-[15px] tracking-tight">No, thank you</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 9 */}
                        {currentStep === 9 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center max-w-xl mx-auto">
                                <h1 className="text-[1.7rem] font-medium text-gray-900 mb-2">Upload Images and Videos</h1>
                                <p className="text-[15px] text-gray-500 mb-10">Listings with clear, numerous photos rent or sell 3x faster.</p>

                                <div className="w-full border-2 border-dashed border-gray-300 rounded-[2rem] p-12 flex flex-col items-center justify-center text-center hover:border-[#0F5A3E] hover:bg-[#0F5A3E]/5 transition-all cursor-pointer group">
                                    <div className="w-20 h-20 bg-gray-50 group-hover:bg-white rounded-full border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <UploadCloud className={`w-10 h-10 ${textGreen}`} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Click to upload or drag and drop</h3>
                                    <p className="text-sm font-medium text-gray-400">SVG, PNG, JPG or GIF (max. 10MB)</p>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* Footer Action */}
                <div className="border-t border-gray-200 px-8 py-4 flex justify-end bg-white w-full sticky bottom-0 left-0 z-20">
                    <button
                        onClick={handleNext}
                        className={`${bgGreen} hover:bg-[#0B4A31] text-white px-8 py-2.5 rounded-full font-medium transition-colors text-sm`}
                    >
                        {currentStep === 9 ? "Publish Listing" : "Proceed"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// Custom icons to match screenshots exactly
const CheckIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CloseBoxIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="9" y1="9" x2="15" y2="15"></line>
        <line x1="15" y1="9" x2="9" y2="15"></line>
    </svg>
);
