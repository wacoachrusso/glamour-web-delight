import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const { t } = useTranslation();
  
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 bg-[url('/lovable-uploads/2721060a-90fa-4a64-97e9-d7747f1a40a8.png')] bg-cover bg-center"
      />
      
      {/* Overlay with gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-muted"
        style={{ opacity: 0.85 }}
      />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-secondary blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-primary blur-3xl"
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-24 h-0.5 bg-secondary mx-auto"
            />
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-secondary-light font-montserrat tracking-wide"
            >
              {t('hero.welcome')}
            </motion.p>
            
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-6xl md:text-7xl lg:text-8xl font-playfair font-bold text-white leading-tight"
            >
              {t('hero.title')}
            </motion.h1>
            
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl md:text-2xl font-montserrat text-white/90 max-w-2xl mx-auto leading-relaxed"
            >
              {t('hero.description')}
            </motion.p>

            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="w-24 h-0.5 bg-secondary mx-auto"
            />

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
            >
              <Button 
                className="bg-secondary hover:bg-secondary-light text-secondary-foreground text-lg px-8 py-6 rounded-none border-2 border-secondary hover:border-secondary-light transition-all duration-300 min-w-[200px] hover:scale-105"
              >
                {t('hero.bookNow')} <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                className="bg-secondary/40 backdrop-blur-md border-2 border-secondary hover:bg-secondary/60 text-white text-lg px-8 py-6 rounded-none transition-all duration-300 min-w-[200px] hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t('hero.ourServices')} <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-muted to-transparent" />
    </div>
  );
};

export default Hero;