import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";
import { Service } from "@/integrations/supabase/types/service";

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

  const formatMediaItems = (services: Service[]) => {
    return services.map((service, index) => ({
      id: index + 1,
      type: "image",
      title: service.name,
      desc: service.description || '',
      url: service.image_url || 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80',
      span: index % 3 === 0 
        ? "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2"
        : index % 4 === 0
        ? "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2"
        : "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="w-12 h-12 text-secondary animate-spin" />
          <p className="text-lg text-primary-foreground/60">{t('services.loading')}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/50 via-background to-background">
      <Navbar />
      <main className="py-24 md:py-32">
        {services && (
          <InteractiveBentoGallery
            mediaItems={formatMediaItems(services)}
            title={t('services.title')}
            description={t('services.subtitle')}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;