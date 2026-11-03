import HeroSection from "@/components/shared/HeroSection";
import PlatformFeatures from "@/components/home/PlatformFeatures";
import RecentEvents from "@/components/home/RecentEvents";
import GallerySection from "@/components/home/GallerySection";
import ImpactSection from "@/components/home/ImpactSection";
import AboutSection from "@/components/home/AboutSection";


export default function Home() {
  return (
    <>
      
        <HeroSection />
        <PlatformFeatures />
        <RecentEvents />
        <GallerySection />
        <AboutSection />
        <ImpactSection />
    
    </>
  );
}
