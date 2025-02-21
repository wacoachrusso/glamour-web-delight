import { Facebook, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

const SocialMedia = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="space-y-8"
    >
      <h3 className="text-3xl font-cormorant font-semibold text-secondary tracking-wide">
        {t('footer.follow')}
      </h3>
      <div className="space-y-8">
        <div className="flex space-x-6 justify-center">
          <a
            href="https://www.instagram.com/glamours.beauty.salon/"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label="Follow us on Instagram"
          >
            <Button
              variant="outline"
              size="lg"
              className="w-16 h-16 rounded-full border-2 border-secondary/40 hover:border-secondary bg-white/80 hover:bg-secondary/5 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm"
            >
              <Instagram className="w-7 h-7 text-secondary group-hover:scale-110 transition-transform duration-300" />
            </Button>
          </a>
          <a
            href="https://www.facebook.com/people/Glamours-Beauty-Salon/100085002544559/"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label="Follow us on Facebook"
          >
            <Button
              variant="outline"
              size="lg"
              className="w-16 h-16 rounded-full border-2 border-secondary/40 hover:border-secondary bg-white/80 hover:bg-secondary/5 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm"
            >
              <Facebook className="w-7 h-7 text-secondary group-hover:scale-110 transition-transform duration-300" />
            </Button>
          </a>
        </div>
        <p className="text-primary-foreground/70 text-center font-medium tracking-wide">
          Follow us on social media for latest updates, promotions, and beauty inspiration
        </p>
      </div>
    </motion.div>
  );
};

export default SocialMedia;