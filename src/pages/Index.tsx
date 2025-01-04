import { Navbar } from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { sendTestEmail } from "../utils/emailService";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

  const handleSendTestEmail = async () => {
    try {
      console.log("Sending test email...");
      await sendTestEmail("mikescordcutters@gmail.com");
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

  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={handleSendTestEmail} variant="outline">
          Send Test Email
        </Button>
      </div>
      <Hero />
      <Services />
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

export default Index;