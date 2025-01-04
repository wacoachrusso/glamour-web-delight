import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Scissors, Clock, ImageOff, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Database } from "@/integrations/supabase/types";

type Service = Database['public']['Tables']['services']['Row'];

const Services = () => {
  const { data: services, isLoading } = useQuery({
    queryKey: ["featuredServices"],
    queryFn: async () => {
      console.log("Fetching services...");
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('category')
        .limit(6);
      
      if (error) {
        console.error("Error fetching services:", error);
        throw error;
      }
      console.log("Fetched services:", data);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <Scissors className="w-12 h-12 text-secondary animate-spin" />
          <p className="text-lg text-primary-foreground/60">Loading our luxurious services...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-primary/5">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
            Featured <span className="text-secondary">Styles</span>
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Discover our most popular and trending hairstyles, created by our expert stylists
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services?.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-white">
                <div className="relative h-64 overflow-hidden">
                  {service.image_url ? (
                    <img
                      src={service.image_url}
                      alt={service.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`absolute inset-0 flex items-center justify-center ${service.image_url ? 'hidden' : ''}`}>
                    <ImageOff className="w-16 h-16 text-secondary/30" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-playfair font-bold mb-2">{service.name}</h3>
                  <p className="text-primary-foreground/70 text-sm mb-4">{service.description}</p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <span className="flex items-center text-sm text-primary-foreground/60">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration} min
                    </span>
                    <span className="text-sm font-medium text-secondary">
                      {service.category}
                    </span>
                  </div>

                  <Button 
                    className="w-full bg-secondary hover:bg-secondary-light text-white rounded-full group relative overflow-hidden"
                  >
                    Book Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-playfair font-bold mb-6">
              Why Choose Us
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Experience the difference with our premium services and dedicated team
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "👩‍💇‍♀️",
                title: "Expert Stylists",
                description: "Our team of certified professionals brings years of experience"
              },
              {
                icon: "✨",
                title: "Premium Products",
                description: "We use only the highest quality beauty products"
              },
              {
                icon: "💝",
                title: "Satisfaction Guaranteed",
                description: "Your happiness is our priority"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-2xl mb-6 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-playfair font-bold mb-4 text-center">{feature.title}</h3>
                <p className="text-primary-foreground/70 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;