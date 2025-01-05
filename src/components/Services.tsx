import { useQuery } from "@tanstack/react-query";
import { Scissors } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import ServiceCard from "./services/ServiceCard";
import SectionHeader from "./shared/SectionHeader";
import ViewAllButton from "./shared/ViewAllButton";

const Services = () => {
  const { t } = useTranslation();
  
  const { data: services, isLoading } = useQuery({
    queryKey: ["featuredServices"],
    queryFn: async () => {
      console.log("Fetching services...");
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('category')
        .limit(3);
      
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
      <div className="w-full min-h-[40vh] flex items-center justify-center">
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
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted via-white/50 to-white/80" />
      
      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-secondary blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader 
          titleKey="services.title"
          highlightKey="services.highlight"
          subtitleKey="services.subtitle"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {services?.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ServiceCard service={service} index={index} />
            </motion.div>
          ))}
        </div>

        <ViewAllButton textKey="services.viewAll" Icon={Scissors} />
      </div>
    </section>
  );
};

export default Services;