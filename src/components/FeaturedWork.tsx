import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SectionHeader from "./shared/SectionHeader";
import { Button } from "./ui/button";
import ClickableImage from "./shared/ClickableImage";

const FeaturedWork = () => {
  const { t } = useTranslation();
  
  const { data: portfolioImages, isLoading } = useQuery({
    queryKey: ["featuredPortfolioImages"],
    queryFn: async () => {
      console.log("Fetching featured portfolio images...");
      
      const featuredImages = [
        {
          id: '1',
          title: 'Luxurious Balayage',
          description: 'A stunning balayage treatment that creates a natural, sun-kissed look.',
          image_url: '/lovable-uploads/Balayage5.jpg',
          category: 'Hair Color'
        },
        {
          id: '2',
          title: 'Modern Balayage Style',
          description: 'Contemporary balayage featuring soft, blended colors.',
          image_url: '/lovable-uploads/Bayalage.jpg',
          category: 'Hair Color'
        },
        {
          id: '3',
          title: 'Professional Gel Manicure',
          description: 'Long-lasting, chip-resistant gel manicure with a perfect glossy finish.',
          image_url: '/lovable-uploads/Gel manicure.jpg',
          category: 'Nails'
        },
        {
          id: '4',
          title: 'Classic Eyelash Extensions',
          description: 'Full, natural-looking eyelash extensions that enhance your eyes.',
          image_url: '/lovable-uploads/EyelashExtensions.jpg',
          category: 'Beauty'
        }
      ];

      const { data: supabaseImages, error } = await supabase
        .from('portfolio_images')
        .select('*')
        .limit(4)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching portfolio images:", error);
        return featuredImages;
      }
      
      const allImages = [...featuredImages, ...supabaseImages];
      const uniqueImages = allImages
        .filter((item, index, self) =>
          index === self.findIndex((t) => t.image_url === item.image_url)
        )
        .slice(0, 4);
      
      console.log("Fetched featured portfolio images:", uniqueImages);
      return uniqueImages;
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
          titleKey="portfolio.featuredTitle"
          highlightKey="portfolio.featuredHighlight"
          subtitleKey="portfolio.featuredSubtitle"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioImages?.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-xl bg-muted"
            >
              {image.image_url ? (
                <ClickableImage
                  src={image.image_url}
                  alt={image.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <ImageOff className="h-12 w-12 text-muted-foreground/40" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-semibold">{image.title}</h3>
                  <p className="mt-1 text-sm text-white/80 line-clamp-2">{image.description}</p>
                  <span className="mt-2 inline-block text-xs text-white/60">{image.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/portfolio">
            <Button variant="secondary" size="lg" className="font-montserrat">
              {t('portfolio.viewMore')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;