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
    <footer className="relative mt-20">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary/20 via-secondary to-secondary/20" />
      
      <div className="bg-white/95 backdrop-blur-md">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20">
            {/* Contact Information */}
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

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <h3 className="text-3xl font-cormorant font-semibold text-secondary">
                {t('footer.hours')}
              </h3>
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-white/50 to-secondary/5 rounded-xl p-6 backdrop-blur-sm border border-secondary/10 shadow-sm">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-secondary" />
                    </div>
                    <span className="text-primary-foreground/80 font-medium">
                      Open 7 days a week
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-primary-foreground/60">Every day</span>
                      <span className="text-primary-foreground font-medium">
                        10:00 AM - 7:00 PM
                      </span>
                    </div>
                    <p className="text-sm text-primary-foreground/60 italic mt-4 text-center">
                      Including holidays
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-8"
            >
              <h3 className="text-3xl font-cormorant font-semibold text-secondary">
                {t('footer.follow')}
              </h3>
              <div className="space-y-6">
                <div className="flex space-x-4 justify-center">
                  <a
                    href="https://www.instagram.com/glamours.beauty.salon/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-14 h-14 rounded-full border-2 border-secondary/50 hover:border-secondary bg-white hover:bg-secondary/10 transition-all duration-300"
                    >
                      <Instagram className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform" />
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
                      className="w-14 h-14 rounded-full border-2 border-secondary/50 hover:border-secondary bg-white hover:bg-secondary/10 transition-all duration-300"
                    >
                      <Facebook className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform" />
                    </Button>
                  </a>
                </div>
                <p className="text-primary-foreground/60 text-center">
                  Follow us on social media for latest updates, promotions, and beauty inspiration
                </p>
              </div>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 pt-8 border-t border-secondary/20"
          >
            <p className="text-center text-primary-foreground/60 text-sm">
              &copy; {currentYear} Glamour's Beauty Salon. {t('footer.rights')}.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;