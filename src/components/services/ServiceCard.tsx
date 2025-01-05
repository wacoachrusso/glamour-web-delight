import { motion } from "framer-motion";
import { Clock, Phone, Mail } from "lucide-react";
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

type Service = Database['public']['Tables']['services']['Row'];

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const { t } = useTranslation();
  
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
        <div className="absolute top-0 right-0 p-4">
          <span className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary">
            {t(`services.categories.${formattedCategory}`)}
          </span>
        </div>

        <CardHeader className="pt-12">
          <CardTitle className="text-2xl font-playfair">{service.name}</CardTitle>
          <CardDescription className="text-base mt-2">
            {service.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{t('services.duration', { duration: service.duration })}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="default"
              className="w-full bg-secondary hover:bg-secondary-light text-secondary-foreground transition-colors duration-300"
              onClick={() => window.location.href = 'tel:+19733445199'}
            >
              <Phone className="w-4 h-4 mr-2" />
              {t('nav.phone')}
            </Button>
            
            <Button 
              variant="outline"
              className="w-full border-secondary hover:bg-secondary/10 transition-colors duration-300"
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