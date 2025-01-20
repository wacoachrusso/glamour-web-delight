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
  );
};

export default BusinessHours;