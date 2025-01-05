import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-secondary/20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-playfair font-semibold gradient-text">
              {t('footer.contact')}
            </h3>
            <div className="space-y-4">
              <a 
                href="tel:+19733445199" 
                className="flex items-center text-primary-foreground/80 hover:text-secondary transition-colors group"
              >
                <Phone className="w-5 h-5 mr-3 group-hover:text-secondary transition-colors" />
                {t('nav.phone')}
              </a>
              <a 
                href="mailto:glamoursbeautysalon1@gmail.com" 
                className="flex items-center text-primary-foreground/80 hover:text-secondary transition-colors group"
              >
                <Mail className="w-5 h-5 mr-3 group-hover:text-secondary transition-colors" />
                glamoursbeautysalon1@gmail.com
              </a>
              <div className="flex items-start text-primary-foreground/80 group">
                <MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                <span>{t('nav.address')}</span>
              </div>
            </div>
          </motion.div>

          {/* Opening Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-playfair font-semibold gradient-text">
              {t('footer.hours')}
            </h3>
            <div className="space-y-4 text-primary-foreground/80">
              <div className="flex items-center justify-between">
                <span className="font-medium">Every day</span>
                <span>10:00 AM - 7:00 PM</span>
              </div>
              <p className="text-sm text-primary-foreground/60 italic">
                Open 7 days a week including holidays
              </p>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-playfair font-semibold gradient-text">
              {t('footer.follow')}
            </h3>
            <div className="flex space-x-6">
              <a
                href="https://www.instagram.com/glamours.beauty.salon/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary/10 text-secondary hover:bg-secondary hover:text-secondary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/people/Glamours-Beauty-Salon/100085002544559/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary/10 text-secondary hover:bg-secondary hover:text-secondary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
            <p className="text-sm text-primary-foreground/60">
              Follow us on social media for latest updates, promotions, and beauty inspiration
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 pt-8 border-t border-secondary/20 text-center text-primary-foreground/60 text-sm"
        >
          <p>&copy; {currentYear} Glamour's Beauty Salon. {t('footer.rights')}.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;