import { useQuery } from "@tanstack/react-query";
import { ShoppingBag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "./products/ProductCard";
import SectionHeader from "./shared/SectionHeader";
import ViewAllButton from "./shared/ViewAllButton";

const FeaturedProducts = () => {
  const { t } = useTranslation();
  
  const { data: products, isLoading } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      console.log("Fetching featured products...");
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .limit(3)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching featured products:", error);
        throw error;
      }
      console.log("Fetched featured products:", data);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-full min-h-[40vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <ShoppingBag className="w-12 h-12 text-secondary animate-pulse" />
          <p className="text-lg text-primary-foreground/60">{t('products.loading')}</p>
        </motion.div>
      </div>
    );
  }

  if (!products?.length) {
    return null;
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-muted/50 to-muted" />
      
      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-40 right-20 w-96 h-96 rounded-full bg-secondary blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute bottom-40 left-20 w-72 h-72 rounded-full bg-primary blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader 
          titleKey="products.title"
          highlightKey="products.highlight"
          subtitleKey="products.subtitle"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {products?.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <ViewAllButton textKey="products.viewAll" Icon={ShoppingBag} />
      </div>
    </section>
  );
};

export default FeaturedProducts;