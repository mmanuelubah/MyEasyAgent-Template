import Link from "next/link";
import { Home, Mail, Phone, MapPin, Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-24 md:pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Info */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center transform rotate-3 shadow-md">
                                <Home className="text-white w-5 h-5 -rotate-3" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 tracking-tight">
                                MyEasyAgent<span className="text-emerald-600">.</span>
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Revolutionizing real estate with HuntSmart technology. Find your next premium property with ease and trust.
                        </p>
                        <div className="flex space-x-4">
                            <Twitter className="w-5 h-5 text-gray-400 hover:text-emerald-600 cursor-pointer transition-colors" />
                            <Instagram className="w-5 h-5 text-gray-400 hover:text-emerald-600 cursor-pointer transition-colors" />
                            <Facebook className="w-5 h-5 text-gray-400 hover:text-emerald-600 cursor-pointer transition-colors" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-6 text-sm uppercase tracking-wider">Marketplace</h3>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link href="/properties" className="hover:text-emerald-600 transition-colors">Residential</Link></li>
                            <li><Link href="/properties" className="hover:text-emerald-600 transition-colors">Commercial</Link></li>
                            <li><Link href="/properties" className="hover:text-emerald-600 transition-colors">Premium Listings</Link></li>
                            <li><Link href="/properties" className="hover:text-emerald-600 transition-colors">Verified Only</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-6 text-sm uppercase tracking-wider">Resources</h3>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link href="/how-it-works" className="hover:text-emerald-600 transition-colors">How it Works</Link></li>
                            <li><Link href="/pricing" className="hover:text-emerald-600 transition-colors">Pricing</Link></li>
                            <li><Link href="/faq" className="hover:text-emerald-600 transition-colors">FAQs</Link></li>
                            <li><Link href="/contact" className="hover:text-emerald-600 transition-colors">Support</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-6 text-sm uppercase tracking-wider">Contact Us</h3>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4" /> support@eeprom.com
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4" /> +1 (555) 123-4567
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 mt-1" /> 123 Real Estate Plaza,<br />San Francisco, CA 94103
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-xs">
                        © 2026 EEPROM Marketplace. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-xs text-gray-400">
                        <Link href="/privacy" className="hover:text-emerald-600">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-emerald-600">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
