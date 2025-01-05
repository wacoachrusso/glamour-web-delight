import { Navbar } from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-muted via-white/50 to-white">
      <Navbar />
      <main className="space-y-24 md:space-y-32">
        <Hero />
        <Services />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;