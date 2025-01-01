import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-secondary-light overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" />
      <div className="container mx-auto px-4 z-10">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-playfair font-bold text-primary-foreground mb-6"
          >
            Welcome to Glamour's
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-montserrat text-primary-foreground/80 mb-8 max-w-2xl mx-auto"
          >
            Experience luxury beauty services in an elegant setting. Your journey to
            radiance begins here.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <button className="bg-secondary hover:bg-secondary-light text-secondary-foreground px-8 py-3 rounded-full transition-all duration-300 font-montserrat text-lg">
              Book Appointment
            </button>
            <button className="bg-transparent border-2 border-secondary hover:bg-secondary/10 text-primary-foreground px-8 py-3 rounded-full transition-all duration-300 font-montserrat text-lg">
              View Services
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;