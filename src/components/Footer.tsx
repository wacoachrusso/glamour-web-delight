import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ContactInfo from "./footer/ContactInfo";
import BusinessHours from "./footer/BusinessHours";
import SocialMedia from "./footer/SocialMedia";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Decorative top border with enhanced gradient */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent opacity-80" />
      
      <div className="bg-gradient-to-b from-white/98 to-white/95 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-20">
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--secondary-rgb),0.08),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(var(--secondary-rgb),0.08),transparent_70%)]" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24"
          >
            <ContactInfo />
            <BusinessHours />
            <SocialMedia />
          </motion.div>

          {/* Enhanced Copyright Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative mt-20 pt-8 border-t border-secondary/10"
          >
            <p className="text-center text-primary-foreground/70 text-sm font-medium tracking-wide">
              &copy; {currentYear} Glamour's Beauty Salon. {t('footer.rights')}.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;