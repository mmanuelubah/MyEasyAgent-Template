import {
    Zap, Target, Wallet, Map as MapIcon,
    Home, BellRing, Image as ImageIcon
} from "lucide-react";

const features = [
    {
        title: "Smart Matching & Alerts",
        description: "Set your preferences once and get instant alerts only for properties that fit your specific budget, location, and lifestyle.",
        icon: BellRing,
        color: "bg-blue-50 text-blue-600",
    },
    {
        title: "Quality & Serious Leads",
        description: "We filter out the noise. Agents and landlords get connected with high-intent, verified clients leads that actually close.",
        icon: Target,
        color: "bg-purple-50 text-purple-600",
    },
    {
        title: "Home Inspections (Remote)",
        description: "Save time and transport costs. Inspect properties in detail from the comfort of your home using our HomeView technology.",
        icon: Home,
        color: "bg-emerald-50 text-emerald-600",
    },
    {
        title: "Maps & Visual Overviews",
        description: "No more guessing. Get precise Google Maps locations and high-resolution overview images for every single listing.",
        icon: MapIcon,
        color: "bg-amber-50 text-amber-600",
    },
    {
        title: "Less Spending",
        description: "Stop wasting money on endless inspections. With fixed 10% commissions and zero hidden fees, you save more with every deal.",
        icon: Wallet,
        color: "bg-red-50 text-red-600",
    },
];

export default function HuntSmartSection() {
    return (
        <section className="bg-gray-50 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                <span className="text-emerald-600 font-bold text-sm uppercase tracking-widest mb-3 block">Why Choose Us</span>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900">The HuntSmart Advantage</h2>
                <p className="text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                    We combine cutting-edge technology with real estate expertise to provide the most secure and efficient marketplace.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                {features.map((feature, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all group">
                        <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            <feature.icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
