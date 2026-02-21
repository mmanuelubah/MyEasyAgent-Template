"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import PaymentModal from "./PaymentModal";

interface HuntSmartPaymentButtonProps {
    className?: string;
    children?: React.ReactNode;
}

export default function HuntSmartPaymentButton({ className, children = "Get HuntSmart Pass" }: HuntSmartPaymentButtonProps) {
    const router = useRouter();
    const { user, isAuthenticated, updateUser } = useAuth();
    const [showModal, setShowModal] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if (!isAuthenticated) {
            router.push("/register?plan=huntsmart");
            return;
        }

        if (user?.hasHuntSmartPass) {
            router.push("/dashboard/client");
            return;
        }

        setShowModal(true);
    };

    const handlePaymentSuccess = () => {
        updateUser({
            hasHuntSmartPass: true,
            huntSmartTokens: 5 // Default starting tokens
        });
        setShowModal(false);
        router.push("/dashboard/client");
    };

    return (
        <>
            <button onClick={handleClick} className={className}>
                {user?.hasHuntSmartPass ? "View Pass in Dashboard" : children}
            </button>

            {showModal && (
                <PaymentModal
                    amount={15000}
                    onClose={() => setShowModal(false)}
                    onSuccess={handlePaymentSuccess}
                />
            )}
        </>
    );
}
