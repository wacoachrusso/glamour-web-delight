import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

const Promotions = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Summer Special Offer */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-lg shadow-lg group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-secondary-light/80 mix-blend-multiply" />
            <img
              src="/lovable-uploads/2721060a-90fa-4a64-97e9-d7747f1a40a8.png"
              alt="Summer special promotion"
              className="w-full h-[300px] object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <h3 className="text-2xl font-playfair font-bold text-white mb-2">
                Summer Special
              </h3>
              <p className="text-white/90 mb-4">
                20% off on all hair coloring services this summer!
              </p>
              <Button
                variant="secondary"
                className="w-fit group"
              >
                Book Now
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>

          {/* New Client Offer */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-lg shadow-lg group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 mix-blend-multiply" />
            <img
              src="/lovable-uploads/2d83d154-d2c7-4d46-b712-8a6b5d698c37.png"
              alt="New client special offer"
              className="w-full h-[300px] object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <h3 className="text-2xl font-playfair font-bold text-white mb-2">
                New Client Special
              </h3>
              <p className="text-white/90 mb-4">
                15% off on your first visit! Experience luxury beauty services.
              </p>
              <Button
                variant="secondary"
                className="w-fit group"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Promotions;