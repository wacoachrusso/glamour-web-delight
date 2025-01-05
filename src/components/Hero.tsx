import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronRight, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const { t } = useTranslation();
  
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
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
            linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(248,215,215,0.2) 100%)
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
            className="space-y-12"
          >
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-7xl sm:text-8xl md:text-9xl font-cormorant font-bold text-white leading-tight tracking-tight"
            >
              Discover Your <br />
              <span className="text-secondary">Timeless Beauty</span>
            </motion.h1>
            
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-2xl md:text-3xl font-montserrat text-white/90 max-w-2xl mx-auto leading-relaxed tracking-wide font-light"
            >
              Where luxury meets transformation
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex justify-center pt-8"
            >
              <a 
                href="tel:+19733445199"
                className="inline-flex items-center justify-center bg-secondary hover:bg-secondary-light text-secondary-foreground text-lg px-12 py-7 
                          transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl
                          font-montserrat tracking-wider uppercase min-w-[240px] relative overflow-hidden rounded-md
                          after:absolute after:inset-0 after:z-[-1] after:bg-secondary-light/20
                          after:translate-y-[100%] hover:after:translate-y-0 after:transition-transform after:duration-300"
              >
                <Phone className="mr-2 h-5 w-5" />
                (973) 344-5199
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-muted via-muted/50 to-transparent" />
    </div>
  );
};

export default Hero;