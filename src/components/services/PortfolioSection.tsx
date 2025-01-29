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
      
      // Define the local images from public/lovable-uploads
      const localImages = [
        {
          id: '1',
          title: 'Balayage',
          description: 'Professional balayage hair coloring',
          image_url: '/lovable-uploads/Balayage5.jpg',
          category: 'Hair Color'
        },
        {
          id: '2',
          title: 'Bayalage Style',
          description: 'Modern bayalage technique',
          image_url: '/lovable-uploads/Bayalage.jpg',
          category: 'Hair Color'
        },
        {
          id: '3',
          title: 'Blonde Highlights',
          description: 'Beautiful blonde hair with highlights',
          image_url: '/lovable-uploads/Blonde hair color with highlights.jpg',
          category: 'Hair Color'
        },
        {
          id: '4',
          title: 'Eyelash Extensions',
          description: 'Professional eyelash extension service',
          image_url: '/lovable-uploads/EyelashExtensions.jpg',
          category: 'Beauty'
        },
        {
          id: '5',
          title: 'Gel Manicure',
          description: 'Long-lasting gel manicure',
          image_url: '/lovable-uploads/Gel manicure.jpg',
          category: 'Nails'
        },
        {
          id: '6',
          title: 'Highlights',
          description: 'Classic highlighting technique',
          image_url: '/lovable-uploads/Highlights.jpg',
          category: 'Hair Color'
        },
        {
          id: '7',
          title: 'Natural Highlights',
          description: 'Natural-looking highlights',
          image_url: '/lovable-uploads/Highlights2.jpg',
          category: 'Hair Color'
        },
        {
          id: '8',
          title: 'Dimensional Highlights',
          description: 'Multi-dimensional highlighting',
          image_url: '/lovable-uploads/Highlights3.jpg',
          category: 'Hair Color'
        },
        {
          id: '9',
          title: 'Layered Cut with Balayage',
          description: 'Layered haircut with balayage coloring',
          image_url: '/lovable-uploads/Layers haircut and balayage.jpg',
          category: 'Hair Style'
        },
        {
          id: '10',
          title: 'Layered Haircut',
          description: 'Modern layered haircut',
          image_url: '/lovable-uploads/Layers haircut.jpg',
          category: 'Hair Style'
        },
        {
          id: '11',
          title: 'Curtain Bangs',
          description: 'Layered cut with curtain bangs',
          image_url: '/lovable-uploads/Layers with curtain bangs.jpg',
          category: 'Hair Style'
        },
        {
          id: '12',
          title: 'Partial Highlights',
          description: 'Partial highlighting technique',
          image_url: '/lovable-uploads/Partial highlights.jpg',
          category: 'Hair Color'
        },
        {
          id: '13',
          title: 'Short Cut with Highlights',
          description: 'Short haircut with highlights',
          image_url: '/lovable-uploads/Short hair cut and highlights.jpg',
          category: 'Hair Style'
        }
      ];

      // Combine with any existing Supabase images
      const { data: supabaseImages, error } = await supabase
        .from('portfolio_images')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching portfolio images:", error);
        // Return local images if Supabase fetch fails
        return localImages;
      }
      
      // Combine and deduplicate images based on image_url
      const allImages = [...localImages, ...supabaseImages];
      const uniqueImages = allImages.filter((item, index, self) =>
        index === self.findIndex((t) => t.image_url === item.image_url)
      );
      
      console.log("Fetched portfolio images:", uniqueImages);
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