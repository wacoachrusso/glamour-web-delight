import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { Service } from "@/integrations/supabase/types/service";
import { ServiceImage } from "./ServiceImage";
import { ServiceDetails } from "./ServiceDetails";

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
        <ServiceImage 
          imageUrl={service.image_url}
          serviceName={service.name}
          category={service.category}
        />
        <ServiceDetails service={service} />
      </Card>
    </motion.div>
  );
};

export default ServiceCard;