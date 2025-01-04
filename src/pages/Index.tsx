import { Navbar } from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { sendTestEmail } from "../utils/emailService";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    const sendEmail = async () => {
      try {
        await sendTestEmail("wacoachrusso@gmail.com");
        toast({
          title: "Test email sent",
          description: "Please check your inbox",
        });
      } catch (error) {
        console.error("Error sending test email:", error);
        toast({
          title: "Error sending test email",
          description: "Please check the console for details",
          variant: "destructive",
        });
      }
    };

    sendEmail();
  }, []);

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