import { useQuery } from "@tanstack/react-query";
import { ArrowUp, Loader2, Search, Scissors } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/services/ServiceCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ServicesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const { data: services, isLoading } = useQuery({
    queryKey: ["allServices"],
    queryFn: async () => {
      console.log("Fetching all services...");
      const { data: storageImages } = await supabase
        .storage
        .from('salon_images')
        .list();

      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('category');
      
      if (error) {
        console.error("Error fetching services:", error);
        throw error;
      }

      const getDefaultImageForCategory = (category: string, name: string) => {
        const categoryMap: { [key: string]: string } = {
          'Hair': '/lovable-uploads/Layers with curtain bangs.jpg',
          'Color': '/lovable-uploads/Blonde hair color with highlights.jpg',
          'Facial': '/lovable-uploads/facials.jpg',
          'Waxing': '/lovable-uploads/spa-services-card-waxing.avif',
          'Nails': '/lovable-uploads/Gel manicure.jpg',
          'Lashes': '/lovable-uploads/EyelashExtensions.jpg',
          'Makeup': '/lovable-uploads/MAKE UP.webp'
        };

        if (name.toLowerCase().includes('highlight')) return '/lovable-uploads/Highlights3.jpg';
        if (name.toLowerCase().includes('balayage')) return '/lovable-uploads/Layers haircut and balayage.jpg';
        if (name.toLowerCase().includes('layer')) return '/lovable-uploads/Layers with curtain bangs.jpg';
        if (name.toLowerCase().includes('cut')) return '/lovable-uploads/Short hair cut and highlights.jpg';
        if (name.toLowerCase().includes('color')) return '/lovable-uploads/Blonde hair color with highlights.jpg';
        
        return categoryMap[category] || '/2721060a-90fa-4a64-97e9-d7747f1a40a8.png';
      };

      const mappedServices = await Promise.all(data.map(async service => {
        if (!service.image_url) {
          return {
            ...service,
            image_url: getDefaultImageForCategory(service.category, service.name)
          };
        }

        if (service.image_url.startsWith('/lovable-uploads/')) {
          return service;
        }

        const storageImage = storageImages?.find(img => 
          img.name === service.image_url || 
          `${service.category.toLowerCase()}/${service.image_url}` === img.name
        );

        if (storageImage) {
          const { data: storageData } = supabase.storage
            .from('salon_images')
            .getPublicUrl(storageImage.name);

          return {
            ...service,
            image_url: storageData.publicUrl
          };
        }

        return {
          ...service,
          image_url: getDefaultImageForCategory(service.category, service.name)
        };
      }));

      console.log("Fetched services:", mappedServices);
      return mappedServices;
    },
  });

  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 400);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredServices = services?.filter(service => {
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = Array.from(new Set(services?.map(service => service.category) || []));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="w-12 h-12 text-secondary animate-spin" />
          <p className="text-lg text-primary-foreground/60">{t('services.loading')}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/50 via-background to-background">
      <Navbar />
      
      <main className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="w-32 h-1 bg-secondary mx-auto mb-8 rounded-full" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-cormorant font-bold mb-6">
              Our <span className="text-secondary">Services</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover our range of professional beauty and wellness services
            </p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/portfolio')}
              className="border-2 border-secondary hover:bg-secondary/10 text-primary-foreground group"
            >
              View Our Work
              <Scissors className="ml-2 h-4 w-4 transition-transform group-hover:rotate-45" />
            </Button>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto mb-16 p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border-2 border-secondary/30 relative before:absolute before:inset-0 before:bg-radiant-warm before:opacity-5 before:rounded-xl"
          >
            <div className="relative z-10">
              <h2 className="text-2xl font-cormorant font-semibold text-center mb-4">Find Your Perfect Service</h2>
              <p className="text-muted-foreground text-center mb-8">Use our search tools to quickly find the service you're looking for</p>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5 transition-colors group-hover:text-secondary/80" />
                  <Input
                    type="text"
                    placeholder="Search services..."
                    className="pl-10 border-secondary/30 focus:border-secondary shadow-sm focus:shadow-md transition-shadow duration-300 bg-white/90"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-[200px] border-secondary/30 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white/90">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices?.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </main>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-secondary text-white p-3 rounded-full shadow-lg hover:bg-secondary/90 transition-all duration-300 ${
          showScrollTop ? 'visible' : 'invisible'
        }`}
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>

      <Footer />
    </div>
  );
};

export default ServicesPage;