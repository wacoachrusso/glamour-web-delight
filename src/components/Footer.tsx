import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-secondary/20">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-xl md:text-2xl font-playfair font-semibold gradient-text">
              {t('footer.contact')}
            </h3>
            <div className="space-y-3">
              <a 
                href="tel:+19733445199" 
                className="flex items-center text-primary-foreground/80 hover:text-secondary transition-colors text-sm md:text-base"
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                {t('nav.phone')}
              </a>
              <a 
                href="mailto:info@glamoursalon.com" 
                className="flex items-center text-primary-foreground/80 hover:text-secondary transition-colors text-sm md:text-base"
              >
                <Mail className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                info@glamoursalon.com
              </a>
              <div className="flex items-center text-primary-foreground/80 text-sm md:text-base">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0" />
                <span>{t('nav.address')}</span>
              </div>
            </div>
          </motion.div>

          {/* Opening Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-xl md:text-2xl font-playfair font-semibold gradient-text">
              {t('footer.hours')}
            </h3>
            <div className="space-y-2 text-primary-foreground/80 text-sm md:text-base">
              <p>
                {t('footer.weekdays')}: {t('footer.weekdayHours')}
              </p>
              <p>
                {t('footer.saturday')}: {t('footer.saturdayHours')}
              </p>
              <p>
                {t('footer.sunday')}: {t('footer.sundayHours')}
              </p>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-xl md:text-2xl font-playfair font-semibold gradient-text">
              {t('footer.follow')}
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary/10 text-secondary hover:bg-secondary hover:text-secondary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary/10 text-secondary hover:bg-secondary hover:text-secondary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-secondary/20 text-center text-primary-foreground/60 text-sm md:text-base"
        >
          <p>&copy; {currentYear} Glamour's Beauty Salon. {t('footer.rights')}.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;