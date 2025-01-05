import { motion } from "framer-motion";
import { Phone, Mail, ImageIcon } from "lucide-react";
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
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

type Service = Database['public']['Tables']['services']['Row'];

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const { t } = useTranslation();
  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Fetch the public URL when the component mounts
  useEffect(() => {
    const loadImage = async () => {
      if (!service.image_url) {
        console.log("No image URL for service:", service.name);
        return;
      }

      try {
        // Handle local paths starting with /lovable-uploads
        if (service.image_url.startsWith('/lovable-uploads')) {
          const cleanPath = service.image_url.replace('/lovable-uploads/', '');
          console.log("Processing local path for service:", service.name, cleanPath);
          
          const { data } = supabase.storage
            .from('salon_images')
            .getPublicUrl(cleanPath);

          if (data?.publicUrl) {
            console.log("Generated public URL for service:", service.name, data.publicUrl);
            setImageUrl(data.publicUrl);
          }
        } else {
          // Direct URL case
          setImageUrl(service.image_url);
        }
      } catch (error) {
        console.error("Error loading image for service:", service.name, error);
        setImageError(true);
      }
    };

    loadImage();
  }, [service.image_url, service.name]);
  
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
          {imageUrl && !imageError ? (
            <motion.img
              src={imageUrl}
              alt={service.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={() => {
                console.error("Error loading image for service:", service.name);
                setImageError(true);
              }}
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

        <CardHeader className="pt-6">
          <CardTitle className="text-2xl font-cormorant">{service.name}</CardTitle>
          <CardDescription className="text-base mt-2 text-gray-600">
            {service.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
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