import { Zap, ShieldCheck, CreditCard, BellRing } from "lucide-react";

const features = [
    {
        title: "Instant Alerts",
        description: "Receive real-time notifications when a property matching your criteria hits the market.",
        icon: BellRing,
        color: "bg-blue-50 text-blue-600",
    },
    {
        title: "HuntSmart Analytics",
        description: "A-driven insights into price trends, neighborhood safety, and investment potential.",
        icon: Zap,
        color: "bg-emerald-50 text-emerald-600",
    },
    {
        title: "Secure Verification",
        description: "Every agent and listing goes through a rigorous primary source verification process.",
        icon: ShieldCheck,
        color: "bg-purple-50 text-purple-600",
    },
    {
        title: "Credits System",
        description: "Earn and use credits for premium listing features and priority viewing requests.",
        icon: CreditCard,
        color: "bg-orange-50 text-orange-600",
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
