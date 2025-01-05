import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ImageOff, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Database } from "@/integrations/supabase/types";
import BookingModal from "./BookingModal";

type Service = Database['public']['Tables']['services']['Row'];

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const { t } = useTranslation();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Format category string by removing spaces and converting to lowercase
  const formattedCategory = service.category.toLowerCase().replace(/\s+/g, '');

  // Generate schema markup for the service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "BeautySalon",
      "name": "Glamour's Beauty Salon"
    },
    "offers": {
      "@type": "Offer",
      "price": service.price,
      "priceCurrency": "USD"
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card className="bg-white/80 backdrop-blur-sm border-secondary/20 hover:border-secondary transition-all duration-300 overflow-hidden h-full shadow-lg hover:shadow-xl">
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
        <div className="relative h-48 overflow-hidden bg-secondary/5">
          {service.image_url ? (
            <img
              src={service.image_url}
              alt={`${service.name} - ${service.description || t(`services.categories.${formattedCategory}`)} at Glamour's Beauty Salon`}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`absolute inset-0 flex items-center justify-center ${service.image_url ? 'hidden' : ''}`}>
            <ImageOff className="w-16 h-16 text-secondary/30" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <CardHeader className="relative">
          <div className="absolute -top-4 right-4 bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-medium shadow-lg">
            {t(`services.categories.${formattedCategory}`)}
          </div>
          <CardTitle className="text-2xl font-playfair mt-2">{service.name}</CardTitle>
          <CardDescription className="text-base">{service.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center text-primary-foreground/60">
              <Clock className="w-4 h-4 mr-1" />
              {t('services.duration', { duration: service.duration })}
            </span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-secondary fill-current" />
              ))}
            </div>
          </div>
          <Button 
            className="w-full bg-secondary hover:bg-secondary-light text-secondary-foreground group relative overflow-hidden"
            onClick={() => setIsBookingModalOpen(true)}
          >
            <span className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full opacity-10"></span>
            {t('services.bookNow')}
          </Button>
        </CardContent>
      </Card>

      <BookingModal
        service={service}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </motion.div>
  );
};

export default ServiceCard;