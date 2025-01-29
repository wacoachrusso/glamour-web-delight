"use client"
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";
import { Loader2 } from "lucide-react";

// Helper function to determine span class based on index
const getSpanClass = (index: number) => {
  const spans = [
    "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
    "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
    "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
    "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
    "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2"
  ];
  return spans[index % spans.length];
};

const PortfolioGallery = () => {
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
      const mediaItems = data.map((item, index) => ({
        id: index + 1,
        type: "image",
        title: item.title,
        desc: item.description || "",
        url: item.image_url,
        span: getSpanClass(index)
      }));

      console.log("Transformed portfolio images:", mediaItems);
      return mediaItems;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-secondary" />
      </div>
    );
  }

  if (!portfolioImages?.length) {
    return null;
  }

  return (
    <InteractiveBentoGallery
      mediaItems={portfolioImages}
      title="Our Portfolio"
      description="Explore our collection of beautiful transformations"
    />
  );
};

export default PortfolioGallery;