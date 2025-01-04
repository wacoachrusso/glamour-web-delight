import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface SectionHeaderProps {
  titleKey: string;
  highlightKey: string;
  subtitleKey: string;
}

const SectionHeader = ({ titleKey, highlightKey, subtitleKey }: SectionHeaderProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-24 h-0.5 bg-secondary mx-auto mb-8"
      />
      <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
        {t(titleKey)} <span className="gradient-text">{t(highlightKey)}</span>
      </h2>
      <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
        {t(subtitleKey)}
      </p>
    </motion.div>
  );
};

export default SectionHeader;