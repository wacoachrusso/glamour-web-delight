import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Calendar, Award, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const MeetTheOwner = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/lovable-uploads/2d83d154-d2c7-4d46-b712-8a6b5d698c37.png";
    img.onload = () => setImageLoaded(true);
    
    const logo = new Image();
    logo.src = "/lovable-uploads/3c07d34d-d0dd-4c09-bb31-2cea54fc22e0.png";
    logo.onload = () => setLogoLoaded(true);
    
    return () => {
      img.onload = null;
      logo.onload = null;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary/10">
      <Navbar />
      <main 
        className="container mx-auto px-4 py-8 md:py-16 max-w-7xl"
        role="main"
        aria-label="Meet Angie Padilla - Owner Profile"
      >
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start">
          {/* Image Section with Loading State */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative space-y-4 md:space-y-8"
          >
            <div 
              className="absolute inset-0 bg-secondary/10 rounded-2xl transform rotate-3"
              aria-hidden="true"
            ></div>
            {!imageLoaded && (
              <Skeleton className="relative z-10 rounded-2xl w-full aspect-[3/4]" />
            )}
            <img
              src="/lovable-uploads/2d83d154-d2c7-4d46-b712-8a6b5d698c37.png"
              alt="Angie Padilla - Owner of Glamour's Beauty Salon"
              className={`relative z-10 rounded-2xl shadow-xl w-full h-auto object-cover transition-transform duration-300 ${
                imageLoaded ? 'opacity-100 hover:scale-[1.02]' : 'opacity-0'
              }`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Logo Section with Sparkle Animation */}
            <div className="relative z-10 flex justify-center mt-8 md:mt-12">
              {!logoLoaded && (
                <Skeleton className="w-64 md:w-96 h-32 md:h-48 rounded-xl" />
              )}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.4, 0, 0.2, 1]
                }}
                className="relative"
              >
                <div 
                  className="absolute inset-0 animate-pulse mix-blend-overlay opacity-50 bg-gradient-radial from-secondary/20 via-transparent to-transparent rounded-xl"
                  aria-hidden="true"
                ></div>
                <img
                  src="/lovable-uploads/3c07d34d-d0dd-4c09-bb31-2cea54fc22e0.png"
                  alt="Glamour's Beauty Salon Logo"
                  className={`w-64 md:w-80 h-auto transition-all duration-500 ${
                    logoLoaded 
                      ? 'opacity-100 scale-100 animate-shimmer' 
                      : 'opacity-0 scale-95'
                  }`}
                  loading="lazy"
                  onLoad={() => setLogoLoaded(true)}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 md:space-y-8"
          >
            {/* Header and Stats */}
            <div className="space-y-4 md:space-y-6">
              <h1 
                className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 gradient-text"
                tabIndex={0}
              >
                Meet Angie Padilla
              </h1>
              <p 
                className="text-lg text-gray-600 italic"
                tabIndex={0}
              >
                "Beauty is an art, and every client is my masterpiece."
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div 
                  className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-md border border-secondary/20 flex items-center space-x-4"
                  tabIndex={0}
                  role="region"
                  aria-label="Years of Experience"
                >
                  <Calendar className="text-secondary h-6 w-6 md:h-8 md:w-8" aria-hidden="true" />
                  <div>
                    <p className="font-cormorant text-2xl md:text-3xl font-bold text-secondary">22+</p>
                    <p className="text-sm text-gray-600">Years Experience</p>
                  </div>
                </div>
                <div 
                  className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-md border border-secondary/20 flex items-center space-x-4"
                  tabIndex={0}
                  role="region"
                  aria-label="Client Count"
                >
                  <Users className="text-secondary h-6 w-6 md:h-8 md:w-8" aria-hidden="true" />
                  <div>
                    <p className="font-cormorant text-2xl md:text-3xl font-bold text-secondary">1000+</p>
                    <p className="text-sm text-gray-600">Happy Clients</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Content */}
            <div 
              className="prose prose-lg max-w-none space-y-4 md:space-y-6 text-gray-600"
              tabIndex={0}
            >
              <p>
                From playing with dolls' hair as a young girl to becoming one of Newark's most sought-after stylists, 
                <span className="font-semibold"> Angie's journey in beauty has been nothing short of magical</span>. 
                Her passion for hairstyling wasn't just a childhood dream – it was her calling.
              </p>
              
              <p>
                After graduating from <span className="font-semibold">New Horizon in West New York</span>, 
                Angie's thirst for knowledge led her to specialized courses at Alfapart and Salerm, 
                mastering the art of hair coloring. But she didn't stop there. Her dedication to education 
                culminated in earning a degree in total image from 
                <span className="font-semibold"> Thomas Edison State University</span>.
              </p>

              <p>
                Today, <span className="font-semibold">Glamour's Beauty Salon</span> stands as a testament 
                to Angie's vision of making everyone feel beautiful in their own unique way. Her specialty 
                in updos and comprehensive styling services isn't just about hair – it's about creating 
                confidence and bringing out the natural beauty in every client who walks through our doors.
              </p>
            </div>

            {/* Awards Section */}
            <div 
              className="flex items-center space-x-2 text-secondary"
              role="region"
              aria-label="Awards and Recognition"
              tabIndex={0}
            >
              <Award className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
              <Star className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
              <span className="text-sm md:text-base font-medium">Multiple Excellence in Service Awards</span>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MeetTheOwner;