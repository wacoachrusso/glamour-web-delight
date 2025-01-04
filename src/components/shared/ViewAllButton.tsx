import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

interface ViewAllButtonProps {
  textKey: string;
  Icon: LucideIcon;
}

const ViewAllButton = ({ textKey, Icon }: ViewAllButtonProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="text-center mt-12"
    >
      <Button 
        variant="outline"
        className="border-2 border-secondary hover:bg-secondary/10 text-primary-foreground group relative overflow-hidden"
      >
        {t(textKey)}
        <Icon className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  );
};

export default ViewAllButton;