import { useQuery } from "@tanstack/react-query";
import { Scissors } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import ServiceCard from "@/components/services/ServiceCard";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

const ServicesPage = () => {
  const { t } = useTranslation();
  
  const { data: services, isLoading } = useQuery({
    queryKey: ["allServices"],
    queryFn: async () => {
      console.log("Fetching all services...");
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('category');
      
      if (error) {
        console.error("Error fetching services:", error);
        throw error;
      }
      console.log("Fetched services:", data);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <Scissors className="w-12 h-12 text-secondary animate-spin" />
          <p className="text-lg text-primary-foreground/60">{t('services.loading')}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted via-white/50 to-white/80">
      <Navbar />
      <main className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="w-24 h-0.5 bg-secondary mx-auto mb-8" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair mb-6">
              {t('services.title')} <span className="gradient-text">{t('services.highlight')}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {services?.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;