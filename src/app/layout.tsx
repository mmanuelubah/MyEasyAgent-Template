import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: 'MyEasyAgent | Lagos Real Estate Marketplace',
    description: 'The most transparent way to find and list properties in Lagos, Nigeria.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Navbar />
                <main className="min-h-[100dvh]">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
