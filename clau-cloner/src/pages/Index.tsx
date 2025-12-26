import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowTeamsUseSection from "@/components/HowTeamsUseSection";
import BlogSection from "@/components/BlogSection";
import CreateYourOwnSection from "@/components/CreateYourOwnSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ResourcesSection from "@/components/ResourcesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowTeamsUseSection />
        <BlogSection />
        <CreateYourOwnSection />
        <TestimonialsSection />
        <ResourcesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;