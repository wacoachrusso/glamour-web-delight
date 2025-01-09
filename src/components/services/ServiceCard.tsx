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
  const { t } = useTranslation();

  const getImageUrl = (url: string | null) => {
    if (!url) return "/placeholder.svg";
    
    if (url.startsWith('http')) {
      console.log("Using direct URL:", url);
      return url;
    }
    
    if (url.startsWith('/lovable-uploads')) {
      console.log("Using local path:", url);
      return url;
    }
    
    if (url.includes('supabase')) {
      console.log("Using Supabase URL:", url);
      return url;
    }
    
    console.log("Using placeholder for invalid URL:", url);
    return "/placeholder.svg";
  };

  const handleImageError = () => {
    console.error("Error loading image for service:", service.name);
    setImageError(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={!imageError ? getImageUrl(service.image_url) : "/placeholder.svg"}
            alt={t('services.categories.' + service.category.toLowerCase())}
            onError={handleImageError}
            className={cn(
              "h-full w-full object-cover transition-transform duration-300 group-hover:scale-110",
              imageError && "object-contain p-4"
            )}
          />
        </div>
        
        <CardHeader>
          <CardTitle className="text-xl font-cormorant">{service.name}</CardTitle>
          <CardDescription>{service.description}</CardDescription>
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