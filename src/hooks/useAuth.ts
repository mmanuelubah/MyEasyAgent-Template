"use client";

import { useState, useEffect } from "react";

export type UserRole = "client" | "agent" | null;

interface User {
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    phone?: string;
    isProfileComplete?: boolean;
    pledgeAccepted?: boolean;
    personalDetails?: any;
}

export default function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }

        const handleAuthUpdate = () => {
            const updatedUser = localStorage.getItem("user");
            if (updatedUser) {
                setUser(JSON.parse(updatedUser));
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        };

        window.addEventListener("auth_update", handleAuthUpdate);
        return () => window.removeEventListener("auth_update", handleAuthUpdate);
    }, []);

    const login = (email: string, name: string = "Chinaza Ubanatu") => {
        const newUser: User = {
            name,
            email,
            role: null,
            avatar: `https://i.pravatar.cc/150?u=${email}`
        };
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        setIsAuthenticated(true);
        window.dispatchEvent(new Event("auth_update"));
    };

    const setRole = (role: UserRole) => {
        if (user) {
            const updatedUser = { ...user, role };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
            window.dispatchEvent(new Event("auth_update"));
        }
    };

    const updateUser = (data: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...data };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
            window.dispatchEvent(new Event("auth_update"));
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
        window.dispatchEvent(new Event("auth_update"));
        window.location.href = "/";
    };

    return { user, isAuthenticated, login, setRole, updateUser, logout };
}
