import Hero from "@/components/home/Hero";
import FeaturedListings from "@/components/home/FeaturedListings";
import HuntSmartSection from "@/components/home/HuntSmartSection";

export default function Home() {
    return (
        <div className="flex flex-col gap-20 pb-20">
            <Hero />
            <FeaturedListings />
            <HuntSmartSection />
        </div>
    );
}
