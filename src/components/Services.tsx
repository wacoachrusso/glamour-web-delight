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
        .limit(6);
      
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
      <div className="w-full min-h-[50vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <Scissors className="w-8 h-8 md:w-12 md:h-12 text-secondary animate-spin" />
          <p className="text-base md:text-lg text-primary-foreground/60">{t('services.loading')}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted to-white/50" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 rounded-full bg-secondary blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute bottom-20 right-10 w-64 md:w-96 h-64 md:h-96 rounded-full bg-primary blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader 
          titleKey="services.title"
          highlightKey="services.highlight"
          subtitleKey="services.subtitle"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services?.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <ViewAllButton textKey="services.viewAll" Icon={Scissors} />
      </div>
    </section>
  );
};

export default Services;