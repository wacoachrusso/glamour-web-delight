import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ContactInfo from "./footer/ContactInfo";
import BusinessHours from "./footer/BusinessHours";
import SocialMedia from "./footer/SocialMedia";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary/20 via-secondary to-secondary/20" />
      
      <div className="bg-white/95 backdrop-blur-md">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20">
            <ContactInfo />
            <BusinessHours />
            <SocialMedia />
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