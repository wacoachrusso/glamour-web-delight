import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const { t } = useTranslation();
  
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
      {/* Parallax Background - Optimized for mobile */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 bg-[url('/lovable-uploads/2721060a-90fa-4a64-97e9-d7747f1a40a8.png')] bg-cover bg-center bg-no-repeat"
      />
      
      {/* Overlay with gradient - Improved mobile contrast */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-muted"
        style={{ opacity: 0.9 }}
      />
      
      {/* Decorative Elements - Responsive positioning */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-[10%] left-[5%] w-24 h-24 md:w-32 md:h-32 rounded-full bg-secondary blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-[10%] right-[5%] w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary blur-3xl"
        />
      </div>
      
      {/* Content - Mobile-optimized spacing and typography */}
      <div className="container mx-auto px-4 z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8"
          >
            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-16 md:w-24 h-0.5 bg-secondary mx-auto"
            />
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg text-secondary-light font-montserrat tracking-wide"
            >
              {t('hero.welcome')}
            </motion.p>
            
            {/* Main Heading - Responsive typography */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair font-bold text-white leading-tight"
            >
              {t('hero.title')}
            </motion.h1>
            
            {/* Description - Improved readability */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg md:text-xl lg:text-2xl font-montserrat text-white/90 max-w-2xl mx-auto leading-relaxed px-4"
            >
              {t('hero.description')}
            </motion.p>

            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="w-16 md:w-24 h-0.5 bg-secondary mx-auto"
            />

            {/* CTA Buttons - Mobile-friendly layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-6 px-4"
            >
              <Button 
                className="w-full sm:w-auto bg-secondary hover:bg-secondary-light text-secondary-foreground text-base md:text-lg px-6 py-4 md:px-8 md:py-6 rounded-none border-2 border-secondary hover:border-secondary-light transition-all duration-300 min-w-[200px] hover:scale-105"
              >
                {t('hero.bookNow')} <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                className="w-full sm:w-auto bg-transparent border-2 border-secondary hover:bg-secondary/10 text-white text-base md:text-lg px-6 py-4 md:px-8 md:py-6 rounded-none transition-all duration-300 min-w-[200px] hover:scale-105"
              >
                {t('hero.ourServices')} <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient - Enhanced mobile visibility */}
      <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-muted to-transparent" />
    </div>
  );
};

export default Hero;