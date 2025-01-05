import { Navbar } from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import { TestimonialCarousel } from "../components/testimonials/TestimonialCarousel";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-white">
      <Navbar />
      <Hero />
      <Services />
      <FeaturedProducts />
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-cormorant font-bold text-center mb-12">
            What Our Clients Say
          </h2>
          <TestimonialCarousel />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index;