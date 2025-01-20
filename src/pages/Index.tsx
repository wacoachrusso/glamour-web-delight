import { Navbar } from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import { Testimonials } from "../components/testimonials/Testimonials";
import { useTranslation } from "react-i18next";
import { FeatureSteps } from "@/components/ui/feature-steps";

const Index = () => {
  const { t } = useTranslation();
  
  const salonFeatures = [
    {
      step: "Step 1",
      title: "Book Your Appointment",
      content: "Choose your preferred service and schedule a time that works for you.",
      image: "/lovable-uploads/789a6486-f3a1-4fb4-bc1e-61ac0a7ea95b.png"
    },
    {
      step: "Step 2",
      title: "Consultation",
      content: "Meet with our expert stylists to discuss your desired look and preferences.",
      image: "/lovable-uploads/2d83d154-d2c7-4d46-b712-8a6b5d698c37.png"
    },
    {
      step: "Step 3",
      title: "Transformation",
      content: "Relax and let our skilled professionals work their magic.",
      image: "/lovable-uploads/61e5db9a-2533-4a68-a338-13395392c7ed.png"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-white">
      <Navbar />
      <Hero />
      <Services />
      <FeatureSteps 
        features={salonFeatures}
        title="Your Beauty Journey"
        autoPlayInterval={4000}
        className="bg-muted/50"
      />
      <FeaturedProducts />
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-cormorant font-bold text-center mb-12">
            {t('testimonials.title')}
          </h2>
          <Testimonials />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index;