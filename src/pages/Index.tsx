import { Navbar } from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import FeaturedProducts from "../components/FeaturedProducts";
import FeaturedWork from "../components/FeaturedWork";
import Footer from "../components/Footer";
import { Testimonials } from "../components/testimonials/Testimonials";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-white">
      <Navbar />
      <Hero />
      
      {/* Services Section with enhanced styling */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <Services />
      </div>
      
      {/* Portfolio Section with subtle gradient */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-secondary/10 to-white" />
        <FeaturedWork />
      </div>
      
      {/* Products Section with elegant background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <FeaturedProducts />
      </div>
      
      {/* Testimonials Section with refined styling */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-primary/5 to-white" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-center mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-center text-primary-foreground/60 max-w-2xl mx-auto mb-16 font-montserrat">
            {t('testimonials.subtitle')}
          </p>
          <Testimonials />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;