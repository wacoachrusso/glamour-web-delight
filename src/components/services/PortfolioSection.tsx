import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import SectionHeader from "../shared/SectionHeader";
import InteractiveBentoGallery from "../ui/interactive-bento-gallery";

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
      
      // Transform the data to match MediaItemType
      const transformedImages = [
        {
          id: 1,
          type: "image",
          title: "Balayage Transformation",
          desc: "Beautiful blonde balayage by our expert colorists",
          url: "/lovable-uploads/Balayage5.jpg",
          span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2"
        },
        {
          id: 2,
          type: "image",
          title: "Classic Bayalage",
          desc: "Seamless color transition for a natural look",
          url: "/lovable-uploads/Bayalage.jpg",
          span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2"
        },
        {
          id: 3,
          type: "image",
          title: "Blonde Highlights",
          desc: "Stunning blonde highlights with dimensional color",
          url: "/lovable-uploads/Blonde hair color with highlights.jpg",
          span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2"
        },
        {
          id: 4,
          type: "image",
          title: "Eyelash Extensions",
          desc: "Beautiful, natural-looking lash extensions",
          url: "/lovable-uploads/EyelashExtensions.jpg",
          span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2"
        },
        {
          id: 5,
          type: "image",
          title: "Gel Manicure",
          desc: "Long-lasting, glossy gel manicure",
          url: "/lovable-uploads/Gel manicure.jpg",
          span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2"
        },
        {
          id: 6,
          type: "image",
          title: "Highlights",
          desc: "Perfect placement of highlights for maximum impact",
          url: "/lovable-uploads/Highlights.jpg",
          span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2"
        },
        {
          id: 7,
          type: "image",
          title: "Modern Highlights",
          desc: "Contemporary highlighting techniques",
          url: "/lovable-uploads/Highlights2.jpg",
          span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2"
        },
        {
          id: 8,
          type: "image",
          title: "Natural Highlights",
          desc: "Sun-kissed natural-looking highlights",
          url: "/lovable-uploads/Highlights3.jpg",
          span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2"
        },
        {
          id: 9,
          type: "image",
          title: "Layered Balayage",
          desc: "Perfectly blended balayage on layered cut",
          url: "/lovable-uploads/Layers haircut and balayage.jpg",
          span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2"
        },
        {
          id: 10,
          type: "image",
          title: "Modern Layers",
          desc: "Contemporary layered haircut",
          url: "/lovable-uploads/Layers haircut.jpg",
          span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2"
        },
        {
          id: 11,
          type: "image",
          title: "Curtain Bangs",
          desc: "Trendy curtain bangs with layers",
          url: "/lovable-uploads/Layers with curtain bangs.jpg",
          span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2"
        },
        {
          id: 12,
          type: "image",
          title: "Partial Highlights",
          desc: "Strategic partial highlights for dimension",
          url: "/lovable-uploads/Partial highlights.jpg",
          span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2"
        }
      ];
      
      console.log("Transformed portfolio images:", transformedImages);
      return transformedImages;
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
        
        {portfolioImages && (
          <InteractiveBentoGallery
            mediaItems={portfolioImages}
            title={t('portfolio.title') + " " + t('portfolio.highlight')}
            description={t('portfolio.subtitle')}
          />
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;