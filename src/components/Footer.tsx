import { Facebook, Instagram, Mail, MapPin, Phone, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./ui/hover-card";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const salonLocation = { lat: 40.7241, lng: -74.1584 };
  
  const openInWaze = () => {
    const wazeUrl = `https://www.waze.com/ul?ll=${salonLocation.lat}%2C${salonLocation.lng}&navigate=yes`;
    window.open(wazeUrl, '_blank');
  };

  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-secondary/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-cormorant font-semibold gradient-text">
              {t('footer.contact')}
            </h3>
            <div className="space-y-4">
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-secondary/10 space-x-4 h-auto py-3"
                onClick={() => window.location.href = 'tel:+19733445199'}
              >
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  {t('nav.phone')}
                </span>
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-secondary/10 space-x-4 h-auto py-3 break-words"
                onClick={() => window.location.href = 'mailto:glamoursbeautysalon1@gmail.com'}
              >
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm sm:text-base break-all">
                  glamoursbeautysalon1@gmail.com
                </span>
              </Button>

              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-secondary/10 space-x-4 h-auto py-3 group"
                    onClick={openInWaze}
                  >
                    <MapPin className="w-5 h-5 text-secondary flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div className="flex flex-col items-start">
                      <span className="text-primary-foreground/80 text-left">
                        {t('nav.address')}
                      </span>
                      <span className="text-xs text-primary-foreground/60">
                        Click to open in Waze
                      </span>
                    </div>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 p-4">
                  <p className="text-sm text-primary-foreground/80">
                    Click to get directions using Waze
                  </p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-cormorant font-semibold gradient-text">
              {t('footer.hours')}
            </h3>
            <div className="space-y-4">
              <div className="bg-white/50 rounded-lg p-6 backdrop-blur-sm border border-secondary/10">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-5 h-5 text-secondary" />
                  <span className="text-primary-foreground/80 font-medium">
                    Open 7 days a week
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-primary-foreground/60">Every day</span>
                    <span className="text-primary-foreground/80 font-medium">
                      10:00 AM - 7:00 PM
                    </span>
                  </div>
                  <p className="text-sm text-primary-foreground/60 italic mt-4">
                    Including holidays
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-cormorant font-semibold gradient-text">
              {t('footer.follow')}
            </h3>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/glamours.beauty.salon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-14 h-14 rounded-full border-2 border-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                  >
                    <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </Button>
                </a>
                <a
                  href="https://www.facebook.com/people/Glamours-Beauty-Salon/100085002544559/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-14 h-14 rounded-full border-2 border-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                  >
                    <Facebook className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </Button>
                </a>
              </div>
              <p className="text-primary-foreground/60">
                Follow us on social media for latest updates, promotions, and beauty inspiration
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 pt-8 border-t border-secondary/20 text-center text-primary-foreground/60 text-sm"
          >
            <p>&copy; {currentYear} Glamour's Beauty Salon. {t('footer.rights')}.</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
