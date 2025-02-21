import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const BusinessHours = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-8"
    >
      <h3 className="text-3xl font-cormorant font-semibold text-secondary tracking-wide">
        {t('footer.hours')}
      </h3>
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-white/80 to-secondary/5 rounded-2xl p-8 backdrop-blur-sm border border-secondary/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-4 mb-8">
            <div className="h-12 w-12 rounded-full bg-secondary/15 flex items-center justify-center transform transition-transform duration-300 hover:scale-110 hover:bg-secondary/20">
              <Clock className="w-6 h-6 text-secondary" />
            </div>
            <span className="text-primary-foreground/90 font-medium tracking-wide">
              {t('footer.openWeek')}
            </span>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-center py-2 border-b border-secondary/10">
              <span className="text-primary-foreground/70 font-medium">{t('footer.everyday')}</span>
              <span className="text-primary-foreground font-semibold tracking-wide">
                10:00 AM - 7:00 PM
              </span>
            </div>
            <p className="text-sm text-primary-foreground/70 italic mt-4 text-center font-medium">
              {t('footer.includingHolidays')}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BusinessHours;