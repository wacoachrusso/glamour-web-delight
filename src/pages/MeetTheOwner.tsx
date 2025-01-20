import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Calendar, Award, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const MeetTheOwner = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/lovable-uploads/2d83d154-d2c7-4d46-b712-8a6b5d698c37.png";
    img.onload = () => setImageLoaded(true);
    
    return () => {
      img.onload = null;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary/10">
      <Navbar />
      <main className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image Section with Loading State */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-secondary/10 rounded-2xl transform rotate-3"></div>
            {!imageLoaded && (
              <Skeleton className="relative z-10 rounded-2xl w-full aspect-[3/4]" />
            )}
            <img
              src="/lovable-uploads/2d83d154-d2c7-4d46-b712-8a6b5d698c37.png"
              alt="Angie Padilla - Owner of Glamour's Beauty Salon"
              className={`relative z-10 rounded-2xl shadow-xl w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />
          </motion.div>

          {/* Content Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Header and Stats */}
            <div className="space-y-6">
              <h1 className="font-cormorant text-5xl md:text-6xl font-bold text-gray-900 gradient-text">
                Meet Angie Padilla
              </h1>
              <p className="text-lg text-gray-600 italic">
                "Beauty is an art, and every client is my masterpiece."
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md border border-secondary/20 flex items-center space-x-4">
                  <Calendar className="text-secondary h-8 w-8" />
                  <div>
                    <p className="font-cormorant text-3xl font-bold text-secondary">22+</p>
                    <p className="text-gray-600 text-sm">Years Experience</p>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md border border-secondary/20 flex items-center space-x-4">
                  <Users className="text-secondary h-8 w-8" />
                  <div>
                    <p className="font-cormorant text-3xl font-bold text-secondary">1000+</p>
                    <p className="text-gray-600 text-sm">Happy Clients</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Content */}
            <div className="prose prose-lg max-w-none space-y-6 text-gray-600">
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
            <div className="flex items-center space-x-2 text-secondary">
              <Award className="h-6 w-6" />
              <Star className="h-6 w-6" />
              <span className="text-sm font-medium">Multiple Excellence in Service Awards</span>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MeetTheOwner;