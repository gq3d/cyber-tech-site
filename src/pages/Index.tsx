import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProductTiersSection from "@/components/ProductTiersSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import FeaturesSection from "@/components/FeaturesSection";
import InfraAnalyzer from "@/components/InfraAnalyzer";
import TrafficScheme from "@/components/TrafficScheme";
import ThreatsSection from "@/components/ThreatsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-cyber-blue">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProductTiersSection />
      <CapabilitiesSection />
      <FeaturesSection />
      <InfraAnalyzer />
      <TrafficScheme />
      <ThreatsSection />
      <HowItWorksSection />
      <ContactSection />
    </main>
  );
};

export default Index;