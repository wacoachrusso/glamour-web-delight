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
  );
};

export default SocialMedia;