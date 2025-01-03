import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      <Hero />
      <Services />
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

export default Index;