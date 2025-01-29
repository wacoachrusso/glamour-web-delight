import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioSection from "@/components/services/PortfolioSection";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/50 via-background to-background">
      <Navbar />
      <PortfolioSection />
      <Footer />
    </div>
  );
};

export default Portfolio;