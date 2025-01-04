import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { supabase } from "@/integrations/supabase/client";

const ImageShowcase = () => {
  const { t } = useTranslation();

  const { data: images, isLoading } = useQuery({
    queryKey: ["salon_images"],
    queryFn: async () => {
      console.log("Fetching salon images...");
      const { data: imageList, error } = await supabase
        .storage
        .from('salon_images')
        .list();

      if (error) {
        console.error("Error fetching images:", error);
        throw error;
      }

      const imageUrls = await Promise.all(
        imageList.map(async (file) => {
          const { data: { publicUrl } } = supabase
            .storage
            .from('salon_images')
            .getPublicUrl(file.name);
          return {
            url: publicUrl,
            name: file.name
          };
        })
      );

      console.log("Fetched images:", imageUrls);
      return imageUrls;
    },
  });

  if (isLoading || !images?.length) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-b from-muted to-white/50 overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            {t('showcase.title')} <span className="gradient-text">{t('showcase.highlight')}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('showcase.description')}
          </p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={image.name} className="md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="aspect-square relative overflow-hidden rounded-lg shadow-lg group"
                >
                  <img
                    src={image.url}
                    alt={t('showcase.imageAlt', { index: index + 1 })}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 bg-white/80 hover:bg-white">
            <ChevronLeft className="h-4 w-4" />
          </CarouselPrevious>
          <CarouselNext className="hidden md:flex -right-4 bg-white/80 hover:bg-white">
            <ChevronRight className="h-4 w-4" />
          </CarouselNext>
        </Carousel>
      </div>
    </section>
  );
};

export default ImageShowcase;