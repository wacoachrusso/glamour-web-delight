import { useQuery } from "@tanstack/react-query";
import { ArrowUp, Filter, Loader2, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ServiceCard from "@/components/services/ServiceCard";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ServicesPage = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const { data: services, isLoading } = useQuery({
    queryKey: ["allServices"],
    queryFn: async () => {
      console.log("Fetching all services...");
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('category');
      
      if (error) {
        console.error("Error fetching services:", error);
        throw error;
      }
      console.log("Fetched services:", data);
      return data;
    },
  });

  // Handle scroll events for the "back to top" button
  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 400);
  };

  useState(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter services based on category and search query
  const filteredServices = services?.filter(service => {
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get unique categories
  const categories = Array.from(new Set(services?.map(service => service.category) || []));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-b from-muted via-white/50 to-white/80">
      <Navbar />
      <main className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="w-24 h-0.5 bg-secondary mx-auto mb-8" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-cormorant font-bold mb-6 gradient-text">
              {t('services.title')} <span className="text-secondary">{t('services.highlight')}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search services..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
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

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {filteredServices?.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          {/* Back to Top Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: showScrollTop ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 bg-secondary text-white p-3 rounded-full shadow-lg hover:bg-secondary-light transition-all duration-300 ${
              showScrollTop ? 'visible' : 'invisible'
            }`}
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;