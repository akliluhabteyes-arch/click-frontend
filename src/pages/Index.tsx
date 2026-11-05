import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import SolutionsSection from "@/components/SolutionsSection";
import CustomersSection from "@/components/CustomersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import ScrollRevealWrapper from "@/components/ScrollRevealWrapper";
import ChatWidget from "@/components/ChatWidget";
import CustomCursor from "@/components/CustomCursor";
import TeamSection from "@/components/TeamSection";
import { SiteDataProvider } from "@/context/SiteDataContext";

const Index = () => {
  return (
    <SiteDataProvider>
    <div className="min-h-screen bg-background overflow-x-hidden pt-16 sm:pt-18 md:pt-20">
      <CustomCursor />

      <Navbar />

      <HeroSection />

      <SectionDivider variant="glow" />

      <ScrollRevealWrapper direction="up">
        <ServicesSection />
      </ScrollRevealWrapper>

      <SectionDivider variant="wave" />

      <ScrollRevealWrapper direction="scale">
        <SolutionsSection />
      </ScrollRevealWrapper>

      <SectionDivider variant="particles" />

      <ScrollRevealWrapper direction="left">
        <CustomersSection />
      </ScrollRevealWrapper>

      <SectionDivider variant="line" />

      <ScrollRevealWrapper direction="right">
        <TestimonialsSection />
      </ScrollRevealWrapper>

      <SectionDivider variant="glow" />

      <ScrollRevealWrapper direction="up">
        <AboutSection />
      </ScrollRevealWrapper>

      <SectionDivider variant="wave" />
      <ScrollRevealWrapper direction="scale">
        <TeamSection />
      </ScrollRevealWrapper>
      <SectionDivider variant="particles" />

      <ScrollRevealWrapper direction="scale">
        <ContactSection />
      </ScrollRevealWrapper>

      <ScrollRevealWrapper direction="up">
        <MapSection />
      </ScrollRevealWrapper>

      <Footer />
      <ChatWidget />
    </div>
    </SiteDataProvider>
  );
};

export default Index;
