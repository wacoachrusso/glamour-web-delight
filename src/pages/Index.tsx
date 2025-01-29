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
      <Services />
      <FeaturedWork />
      <FeaturedProducts />
      <section className="py-24 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-center mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16 font-montserrat">
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