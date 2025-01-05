import { motion } from "framer-motion";
import { Clock, Phone, Mail, ImageIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Database } from "@/integrations/supabase/types";
import { useState } from "react";

type Service = Database['public']['Tables']['services']['Row'];

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const { t } = useTranslation();
  const [imageError, setImageError] = useState(false);
  
  const formattedCategory = service.category.toLowerCase().replace(/\s+/g, '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary to-primary rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
      
      <Card className="relative bg-white/80 backdrop-blur-sm border-0 overflow-hidden">
        <div className="relative h-48 overflow-hidden bg-secondary/5">
          {service.image_url && !imageError ? (
            <motion.img
              src={service.image_url}
              alt={service.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={() => setImageError(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-secondary/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center rounded-full bg-secondary/20 px-4 py-2 text-sm font-medium text-secondary backdrop-blur-sm">
            {t(`services.categories.${formattedCategory}`)}
          </span>
        </div>

        <CardHeader className="pt-6">
          <CardTitle className="text-2xl font-cormorant">{service.name}</CardTitle>
          <CardDescription className="text-base mt-2 text-gray-600">
            {service.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Clock className="w-5 h-5 text-secondary" />
            <span>{t('services.duration', { duration: service.duration })}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="default"
              className="w-full bg-secondary hover:bg-secondary-light text-secondary-foreground transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              onClick={() => window.location.href = 'tel:+19733445199'}
            >
              <Phone className="w-4 h-4 mr-2" />
              {t('nav.phone')}
            </Button>
            
            <Button 
              variant="outline"
              className="w-full border-secondary hover:bg-secondary/10 transition-all duration-300 shadow hover:shadow-lg transform hover:-translate-y-0.5"
              onClick={() => window.location.href = 'mailto:glamoursbeautysalon1@gmail.com'}
            >
              <Mail className="w-4 h-4 mr-2" />
              {t('nav.contact')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;