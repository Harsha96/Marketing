import DudoNavbar from "@/components/DudoNavbar";
import DudoHero from "@/components/DudoHero";
import FeaturedWork from "@/components/FeaturedWork";
import ServicesSection from "@/components/ServicesSection";
import WhyUsSection from "@/components/WhyUsSection";
import ClientsSection from "@/components/ClientsSection";
import BlogSection from "@/components/BlogSection";
import ContactCTA from "@/components/ContactCTA";
import DudoFooter from "@/components/DudoFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DudoNavbar />
      <DudoHero />
      <FeaturedWork />
      <ServicesSection />
      <WhyUsSection />
      <ClientsSection />
      <BlogSection />
      <ContactCTA />
      <DudoFooter />
    </div>
  );
};

export default Index;
