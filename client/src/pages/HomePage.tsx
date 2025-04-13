import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SDGSection from "@/components/SDGSection";
import CampaignSection from "@/components/CampaignSection";
import ResourcesSection from "@/components/ResourcesSection";
import ImpactSection from "@/components/ImpactSection";
import JoinFormSection from "@/components/JoinFormSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-light text-neutral-dark">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SDGSection />
      <CampaignSection />
      <ResourcesSection />
      <ImpactSection />
      <JoinFormSection />
      <Footer />
    </div>
  );
}
