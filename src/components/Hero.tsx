import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const { t } = useTranslation();
  
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 bg-[url('/lovable-uploads/789a6486-f3a1-4fb4-bc1e-61ac0a7ea95b.png')] bg-cover bg-center bg-no-repeat"
      />
      
      {/* Enhanced Overlay with multiple gradients */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(248,215,215,0.2) 100%)
          `
        }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Elegant Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl font-montserrat text-white/90 tracking-wider uppercase"
            >
              {t('hero.welcome')}
            </motion.p>
            
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-6xl sm:text-7xl md:text-8xl font-cormorant font-bold text-white leading-tight tracking-tight"
            >
              {t('hero.title')} <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-secondary-light to-secondary">
                {t('hero.highlight')}
              </span>
            </motion.h1>
            
            {/* Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl font-montserrat text-white/90 max-w-2xl mx-auto leading-relaxed"
            >
              {t('hero.description')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
            >
              {/* Primary CTA - Book Now */}
              <a 
                href="tel:+19733445199"
                className="group inline-flex items-center justify-center bg-gradient-to-r from-secondary to-secondary-light text-secondary-foreground text-lg px-12 py-7 
                          transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl
                          font-montserrat tracking-wider uppercase min-w-[240px] relative overflow-hidden rounded-md
                          after:absolute after:inset-0 after:z-[-1] after:bg-white/20
                          after:translate-y-[100%] hover:after:translate-y-0 after:transition-transform after:duration-300"
              >
                <Phone className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                {t('hero.bookNow')}
              </a>

              {/* Secondary CTA - Learn More */}
              <a 
                href="#services"
                className="inline-flex items-center justify-center text-white text-lg
                          transition-all duration-300 font-montserrat tracking-wider uppercase
                          hover:text-secondary group"
              >
                {t('hero.learnMore')}
                <ChevronDown className="ml-2 h-5 w-5 animate-bounce" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-muted via-muted/50 to-transparent" />
      
      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80"
      >
        <ChevronDown className="h-8 w-8 animate-bounce" />
      </motion.div>
    </div>
  );
};

export default Hero;