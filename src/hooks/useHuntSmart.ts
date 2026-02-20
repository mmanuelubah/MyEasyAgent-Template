'use client';

import { useState, useEffect } from 'react';

export default function useHuntSmart() {
    const [isHuntSmartActive, setIsHuntSmartActive] = useState(false);

    useEffect(() => {
        const status = localStorage.getItem('huntsmart_active') === 'true';
        setIsHuntSmartActive(status);

        // Listener for storage changes in other tabs/components
        const handleStorageChange = () => {
            const newStatus = localStorage.getItem('huntsmart_active') === 'true';
            setIsHuntSmartActive(newStatus);
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('huntsmart_update', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('huntsmart_update', handleStorageChange);
        };
    }, []);

    const setHuntSmart = (status: boolean) => {
        localStorage.setItem('huntsmart_active', status.toString());
        setIsHuntSmartActive(status);
        // Dispatch custom event for same-tab updates
        window.dispatchEvent(new Event('huntsmart_update'));
    };

    const signOut = () => {
        localStorage.removeItem('huntsmart_active');
        setIsHuntSmartActive(false);
        window.location.href = '/';
    };

    return { isHuntSmartActive, setHuntSmart, signOut };
}
