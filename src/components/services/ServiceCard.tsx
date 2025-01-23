import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Service } from "@/integrations/supabase/types/service";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  const getImageUrl = (url: string | null, category: string) => {
    if (!url || imageError) {
      const categoryFallbacks: Record<string, string> = {
        "Hair": "photo-1560869713-da86bd4f8afd?w=800&q=80",
        "Nails": "photo-1604654894610-df63bc536371?w=800&q=80",
        "Waxing": "photo-1598440947619-2c35fc9aa908?w=800&q=80",
        "Makeup": "photo-1596462502278-27bfdc403348?w=800&q=80",
        "Massage": "photo-1544161515-4ab6ce6db874?w=800&q=80",
        "Facial": "photo-1570172619644-dfd03ed5d881?w=800&q=80"
      };
      
      return `https://source.unsplash.com/${categoryFallbacks[category] || "photo-1487412720507-e7ab37603c6f?w=800&q=80"}`;
    }
    
    return url;
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    console.error("Error loading image for service:", service.name);
    setImageError(true);
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary/5">
          {isLoading && (
            <div className="absolute inset-0">
              <div className="animate-pulse w-full h-full bg-secondary/10" />
            </div>
          )}
          <img
            src={getImageUrl(service.image_url, service.category)}
            alt={t(`services.categories.${service.category.toLowerCase()}`)}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
            className={cn(
              "h-full w-full object-cover transition-all duration-500",
              "group-hover:scale-110 group-hover:rotate-1",
              isLoading && "opacity-0",
              imageError && "object-contain p-4"
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <CardHeader>
          <CardTitle className="text-xl font-cormorant">
            {t(`services.names.${service.name.toLowerCase().replace(/\s+/g, '_')}`, { defaultValue: service.name })}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {t(`services.descriptions.${service.name.toLowerCase().replace(/\s+/g, '_')}`, { defaultValue: service.description })}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{t('services.duration', { duration: service.duration })}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="mr-1 h-4 w-4" />
              <span>{service.price}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;