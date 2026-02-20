import Hero from "@/components/home/Hero";
import FeaturedListings from "@/components/home/FeaturedListings";
import HuntSmartSection from "@/components/home/HuntSmartSection";
import NeighborhoodsSection from "@/components/home/NeighborhoodsSection";
import HomeViewSection from "@/components/home/HomeViewSection";

export default function Home() {
    return (
        <div className="flex flex-col gap-20 pb-20">
            <Hero />
            <NeighborhoodsSection />
            <FeaturedListings />
            <HomeViewSection />
            <HuntSmartSection />
        </div>
    );
}
