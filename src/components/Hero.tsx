import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const { t } = useTranslation();
  
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 bg-[url('/lovable-uploads/2721060a-90fa-4a64-97e9-d7747f1a40a8.png')] bg-cover bg-center"
      />
      
      {/* Overlay with gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-transparent"
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl text-white/90 font-montserrat"
            >
              Welcome to
            </motion.h2>
            
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold leading-tight"
            >
              <span className="text-white">Glamour's</span>{" "}
              <span className="bg-gradient-to-r from-secondary via-secondary-light to-primary bg-clip-text text-transparent">
                Beauty Salon
              </span>
            </motion.h1>
            
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
            >
              Experience luxury beauty services in a warm, welcoming environment
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-8"
            >
              <Button 
                className="bg-white hover:bg-white/90 text-primary-foreground text-lg px-8 py-6 rounded-full group transition-all duration-300 hover:shadow-lg"
              >
                View Services
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Business Hours */}
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  🕐
                </motion.div>
              </div>
              <div>
                <h3 className="font-playfair font-semibold">Business Hours</h3>
                <p className="text-primary-foreground/60">Open Every Day 10:00 AM - 7:00 PM</p>
              </div>
            </div>

            {/* Visit Us */}
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                📍
              </div>
              <div>
                <h3 className="font-playfair font-semibold">Visit Us</h3>
                <p className="text-primary-foreground/60">275 Adams St, Newark, NJ 07105</p>
              </div>
            </div>

            {/* Contact Us */}
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                📞
              </div>
              <div>
                <h3 className="font-playfair font-semibold">Contact Us</h3>
                <p className="text-primary-foreground/60">(973) 344-5199</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;