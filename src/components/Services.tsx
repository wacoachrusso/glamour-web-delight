import { useQuery } from "@tanstack/react-query";
import { Scissors } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ServiceCard from "./services/ServiceCard";
import SectionHeader from "./shared/SectionHeader";
import { Button } from "./ui/button";

const Services = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const { data: services, isLoading } = useQuery({
    queryKey: ["featuredServices"],
    queryFn: async () => {
      console.log("Fetching services...");
      // First, get all images from storage bucket
      const { data: storageImages } = await supabase
        .storage
        .from('salon_images')
        .list();

      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('category')
        .limit(6);
      
      if (error) {
        console.error("Error fetching services:", error);
        throw error;
      }

      // Map services to use storage URLs
      const getDefaultImageForCategory = (category: string, name: string) => {
        const categoryMap: { [key: string]: string } = {
          'Hair': '/lovable-uploads/Layers with curtain bangs.jpg',
          'Color': '/lovable-uploads/Blonde hair color with highlights.jpg',
          'Facial': '/lovable-uploads/facials.jpg',
          'Waxing': '/lovable-uploads/spa-services-card-waxing.avif',
          'Nails': '/lovable-uploads/Gel manicure.jpg',
          'Lashes': '/lovable-uploads/EyelashExtensions.jpg',
          'Makeup': '/lovable-uploads/MAKE UP.webp'
        };

        // Check if service name contains specific keywords for more precise matching
        if (name.toLowerCase().includes('highlight')) return '/lovable-uploads/Highlights3.jpg';
        if (name.toLowerCase().includes('balayage')) return '/lovable-uploads/Layers haircut and balayage.jpg';
        if (name.toLowerCase().includes('layer')) return '/lovable-uploads/Layers with curtain bangs.jpg';
        if (name.toLowerCase().includes('cut')) return '/lovable-uploads/Short hair cut and highlights.jpg';
        if (name.toLowerCase().includes('color')) return '/lovable-uploads/Blonde hair color with highlights.jpg';
        
        return categoryMap[category] || '/2721060a-90fa-4a64-97e9-d7747f1a40a8.png';
      };

      const mappedServices = await Promise.all(data.map(async service => {
        if (!service.image_url) {
          return {
            ...service,
            image_url: getDefaultImageForCategory(service.category, service.name)
          };
        }

        // If it's already a storage path, use it directly
        if (service.image_url.startsWith('/lovable-uploads/')) {
          return service;
        }

        // Check if the image exists in storage
        const storageImage = storageImages?.find(img => 
          img.name === service.image_url || 
          `${service.category.toLowerCase()}/${service.image_url}` === img.name
        );

        if (storageImage) {
          const { data: storageData } = supabase.storage
            .from('salon_images')
            .getPublicUrl(storageImage.name);

          return {
            ...service,
            image_url: storageData.publicUrl
          };
        }

        return {
          ...service,
          image_url: getDefaultImageForCategory(service.category, service.name)
        };
      }));
      
      console.log("Fetched services:", mappedServices);
      return mappedServices;
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
          <Scissors className="w-12 h-12 text-secondary animate-spin" />
          <p className="text-lg text-primary-foreground/60">{t('services.loading')}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <Button 
            variant="outline"
            size="lg"
            onClick={() => navigate('/services')}
            className="border-2 border-secondary hover:bg-secondary/10 text-primary-foreground group relative overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {t('services.viewAll')}
            <Scissors className="ml-2 h-5 w-5 transition-transform group-hover:rotate-45" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;