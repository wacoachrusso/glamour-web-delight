import { Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

const ContactInfo = () => {
  const { t } = useTranslation();
  const salonLocation = { lat: 40.7241, lng: -74.1584 };
  
  const openInWaze = () => {
    const wazeUrl = `https://www.waze.com/ul?ll=${salonLocation.lat}%2C${salonLocation.lng}&navigate=yes`;
    window.open(wazeUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h3 className="text-3xl font-cormorant font-semibold text-secondary">
        {t('footer.contact')}
      </h3>
      <div className="space-y-6">
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-secondary/5 space-x-4 h-auto py-4 group"
          onClick={() => window.location.href = 'tel:+19733445199'}
        >
          <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
            <Phone className="w-5 h-5 text-secondary" />
          </div>
          <span className="text-primary-foreground/80 group-hover:text-primary-foreground">
            {t('nav.phone')}
          </span>
        </Button>
        
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-secondary/5 space-x-4 h-auto py-4 group"
          onClick={() => window.location.href = 'mailto:glamoursbeautysalon1@gmail.com'}
        >
          <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
            <Mail className="w-5 h-5 text-secondary" />
          </div>
          <span className="text-primary-foreground/80 text-sm sm:text-base break-all group-hover:text-primary-foreground">
            glamoursbeautysalon1@gmail.com
          </span>
        </Button>

        <HoverCard>
          <HoverCardTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-secondary/5 space-x-4 h-auto py-4 group"
              onClick={openInWaze}
            >
              <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <MapPin className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-primary-foreground/80 text-left group-hover:text-primary-foreground">
                  {t('nav.address')}
                </span>
                <span className="text-xs text-primary-foreground/60">
                  Click to open in Waze
                </span>
              </div>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 p-4 bg-white/95 backdrop-blur-sm">
            <p className="text-sm text-primary-foreground/80">
              Click to get directions using Waze
            </p>
          </HoverCardContent>
        </HoverCard>
      </div>
    </motion.div>
  );
};

export default ContactInfo;