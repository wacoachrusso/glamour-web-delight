import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import SectionHeader from "../shared/SectionHeader";

const PortfolioSection = () => {
  const { t } = useTranslation();
  
  const { data: portfolioImages, isLoading } = useQuery({
    queryKey: ["portfolioImages"],
    queryFn: async () => {
      console.log("Fetching portfolio images...");
      const { data, error } = await supabase
        .from('portfolio_images')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching portfolio images:", error);
        throw error;
      }
      
      console.log("Fetched portfolio images:", data);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-full min-h-[200px] flex items-center justify-center">
        <div className="animate-pulse w-8 h-8 rounded-full bg-secondary/20" />
      </div>
    );
  }

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeader 
          titleKey="portfolio.title"
          highlightKey="portfolio.highlight"
          subtitleKey="portfolio.subtitle"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioImages?.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-xl bg-muted"
            >
              {image.image_url ? (
                <img
                  src={image.image_url}
                  alt={image.title}
                  className="h-full w-full object-cover transition-all duration-300 group-hover:scale-110"
                  onError={(e) => {
                    console.error(`Error loading image: ${image.image_url}`);
                    const target = e.target as HTMLImageElement;
                    target.parentElement?.classList.add('error-state');
                  }}
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <ImageOff className="h-12 w-12 text-muted-foreground/40" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-semibold">{image.title}</h3>
                  {image.description && (
                    <p className="mt-1 text-sm text-white/80">{image.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;