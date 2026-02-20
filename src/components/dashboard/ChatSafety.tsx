"use client";

import { useState, useRef, useEffect } from "react";
import {
    Send, ShieldAlert, User, Check,
    AlertTriangle, Lock, ShieldCheck
} from "lucide-react";

/**
 * Chat Component with Safety Logic (Phase 26)
 * 
 * Implements automated moderation rules:
 * 1. Blocks phone numbers/emails (Contact Info Leaking).
 * 2. Injects "Referee" warnings.
 * 3. Enforces platform payments.
 */

type Message = {
    id: number;
    sender: 'user' | 'agent' | 'system';
    text: string;
    timestamp: string;
    isBlocked?: boolean;
};

export default function ChatSafety() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, sender: 'user', text: "Is this property still available for inspection?", timestamp: "10:30 AM" },
        { id: 2, sender: 'agent', text: "Yes, it is available. When would you like to visit?", timestamp: "10:32 AM" },
        { id: 3, sender: 'system', text: "Safety Tip: Keep all payments within MyEasyAgent to be covered by TrustShield.", timestamp: "10:32 AM" }
    ]);
    const [showSafetyWarning, setShowSafetyWarning] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        // Safety Rule: Detect Contact Info (Phone numbers 080... or emails)
        const phoneRegex = /\b\d{11}\b|\b\d{3}[-\s]?\d{4}[-\s]?\d{4}\b/g;
        const emailRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/g;
        const keywords = /call me|whatsapp/i;

        if (phoneRegex.test(input) || emailRegex.test(input) || keywords.test(input)) {
            // Block the message
            setShowSafetyWarning(true);
            setTimeout(() => setShowSafetyWarning(false), 5000);
            return;
        }

        // Add User Message
        const newMessage: Message = {
            id: Date.now(),
            sender: 'agent', // Acting as Agent answering client
            text: input,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newMessage]);
        setInput("");

        // Simulate User Reply
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'user',
                text: "Okay, can I pay the mobilization fee now?",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        }, 1500);
    };

    return (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden flex flex-col h-[600px] max-w-2xl mx-auto animate-in zoom-in duration-300">
            {/* Header */}
            <div className="bg-gray-900 p-6 flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Client: Alex Rivera</h3>
                        <p className="text-xs text-emerald-400 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Verified Account
                        </p>
                    </div>
                </div>
                <div className="bg-gray-800 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest text-gray-400">
                    Monitored Chat
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'system' ? (
                            <div className="w-full text-center my-4">
                                <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-xs font-bold px-4 py-2 rounded-full border border-amber-100">
                                    <Lock className="w-3 h-3" /> {msg.text}
                                </span>
                            </div>
                        ) : (
                            <div className={`max-w-[75%] p-4 rounded-2xl text-sm font-medium ${msg.sender === 'agent'
                                    ? 'bg-emerald-600 text-white rounded-br-none'
                                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none shadow-sm'
                                }`}>
                                <p>{msg.text}</p>
                                <p className={`text-[10px] mt-1 text-right ${msg.sender === 'agent' ? 'text-emerald-200' : 'text-gray-400'}`}>
                                    {msg.timestamp}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Safety Warning Toast */}
            {showSafetyWarning && (
                <div className="px-6 pb-2 animate-in slide-in-from-bottom-2">
                    <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-bold text-red-700 text-sm">Security Violation Detected</h4>
                            <p className="text-xs text-red-600 mt-1 leading-relaxed">
                                Sharing contact information (phone numbers, emails) before payment is restricted to prevent fraud. Please use the "Book Inspection" button to proceed safely.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div className="p-6 bg-white border-t border-gray-100">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a message..."
                        className="w-full bg-gray-50 border-0 rounded-2xl pl-6 pr-14 py-4 font-medium focus:ring-2 ring-emerald-600/20 outline-none transition-all placeholder:text-gray-400"
                    />
                    <button
                        onClick={handleSend}
                        className="absolute right-2 top-2 bottom-2 aspect-square bg-emerald-600 text-white rounded-xl flex items-center justify-center hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-center text-[10px] text-gray-400 mt-3 flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" /> Chats are end-to-end encrypted & monitored by TrustShield AI.
                </p>
            </div>
        </div>
    );
}
