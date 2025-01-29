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
          title: 'Luxurious Balayage',
          description: 'A stunning balayage treatment that creates a natural, sun-kissed look with seamless color transitions from root to tip.',
          image_url: '/lovable-uploads/Balayage5.jpg',
          category: 'Hair Color'
        },
        {
          id: '2',
          title: 'Modern Balayage Style',
          description: 'Contemporary balayage technique featuring soft, blended colors that create dimension and movement in the hair.',
          image_url: '/lovable-uploads/Bayalage.jpg',
          category: 'Hair Color'
        },
        {
          id: '3',
          title: 'Blonde Highlights Transformation',
          description: 'Bright, face-framing highlights that brighten the complexion and add dimension to natural hair color.',
          image_url: '/lovable-uploads/Blonde hair color with highlights.jpg',
          category: 'Hair Color'
        },
        {
          id: '4',
          title: 'Classic Eyelash Extensions',
          description: 'Full, natural-looking eyelash extensions that enhance your eyes and eliminate the need for mascara.',
          image_url: '/lovable-uploads/EyelashExtensions.jpg',
          category: 'Beauty'
        },
        {
          id: '5',
          title: 'Professional Gel Manicure',
          description: 'Long-lasting, chip-resistant gel manicure with a perfect glossy finish that stays beautiful for weeks.',
          image_url: '/lovable-uploads/Gel manicure.jpg',
          category: 'Nails'
        },
        {
          id: '6',
          title: 'Traditional Highlights',
          description: 'Classic highlighting technique creating beautiful, light-catching dimension throughout the hair.',
          image_url: '/lovable-uploads/Highlights.jpg',
          category: 'Hair Color'
        },
        {
          id: '7',
          title: 'Natural Sun-Kissed Highlights',
          description: 'Subtle, natural-looking highlights that mimic the effect of time spent in the summer sun.',
          image_url: '/lovable-uploads/Highlights2.jpg',
          category: 'Hair Color'
        },
        {
          id: '8',
          title: 'Multi-Dimensional Highlights',
          description: 'Strategic placement of varying highlight tones creating depth and dimension for a dynamic look.',
          image_url: '/lovable-uploads/Highlights3.jpg',
          category: 'Hair Color'
        },
        {
          id: '9',
          title: 'Layered Balayage Blend',
          description: 'Expertly layered haircut combined with soft balayage coloring for movement and dimension.',
          image_url: '/lovable-uploads/Layers haircut and balayage.jpg',
          category: 'Hair Style'
        },
        {
          id: '10',
          title: 'Modern Layered Cut',
          description: 'Fresh, contemporary layered haircut that adds volume and movement to the hair.',
          image_url: '/lovable-uploads/Layers haircut.jpg',
          category: 'Hair Style'
        },
        {
          id: '11',
          title: 'Trendy Curtain Bangs',
          description: 'Soft, face-framing curtain bangs with layers that perfectly blend into the rest of the hairstyle.',
          image_url: '/lovable-uploads/Layers with curtain bangs.jpg',
          category: 'Hair Style'
        },
        {
          id: '12',
          title: 'Partial Highlight Design',
          description: 'Strategic partial highlights focused on the crown and face-framing sections for a natural glow.',
          image_url: '/lovable-uploads/Partial highlights.jpg',
          category: 'Hair Color'
        },
        {
          id: '13',
          title: 'Short Cut with Bright Highlights',
          description: 'Modern short haircut enhanced with bright highlights for a bold, contemporary look.',
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
                  <span className="mt-2 inline-block text-xs text-white/60">{image.category}</span>
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