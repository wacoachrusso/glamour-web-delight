import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Scissors, Sparkles, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  image_url: string | null;
}

const Services = () => {
  const { data: services, isLoading } = useQuery({
    queryKey: ["featuredServices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .limit(3);
      
      if (error) throw error;
      return data as Service[];
    },
  });

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-pulse">Loading services...</div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Experience luxury beauty services tailored to enhance your natural beauty
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services?.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white/50 backdrop-blur-sm border-secondary/20 hover:border-secondary transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair">{service.name}</CardTitle>
                  <CardDescription>{service.category}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-primary-foreground/80">{service.description}</p>
                  <div className="flex items-center justify-between text-sm text-primary-foreground/60">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration} min
                    </span>
                    <span className="font-semibold text-secondary">
                      ${service.price}
                    </span>
                  </div>
                  <Button 
                    className="w-full bg-secondary hover:bg-secondary-light text-secondary-foreground"
                  >
                    Book Now
                    <Sparkles className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button 
            variant="outline"
            className="border-2 border-secondary hover:bg-secondary/10 text-primary-foreground"
          >
            View All Services
            <Scissors className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;