import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-[url('/lovable-uploads/2721060a-90fa-4a64-97e9-d7747f1a40a8.png')] bg-cover bg-center"
        style={{ opacity: 0.15 }}
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
            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-playfair font-bold text-primary-foreground leading-tight">
              Elevate Your Beauty
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl font-montserrat text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Experience luxury beauty services in an elegant setting. 
              Your journey to radiance begins here.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
            >
              <Button 
                className="bg-secondary hover:bg-secondary-light text-secondary-foreground text-lg px-8 py-6 rounded-none border-2 border-secondary hover:border-secondary-light transition-all duration-300 min-w-[200px]"
              >
                Book Now <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                className="bg-transparent border-2 border-secondary hover:bg-secondary/10 text-primary-foreground text-lg px-8 py-6 rounded-none transition-all duration-300 min-w-[200px]"
              >
                Our Services <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-muted to-transparent" />
    </div>
  );
};

export default Hero;