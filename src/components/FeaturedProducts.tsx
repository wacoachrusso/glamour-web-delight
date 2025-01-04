import { useQuery } from "@tanstack/react-query";
import { ShoppingBag } from "lucide-react";
import { useTranslation } from "react-i18next";
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
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-pulse text-primary-foreground/60">{t('products.loading')}</div>
      </div>
    );
  }

  if (!products?.length) {
    return null;
  }

  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <SectionHeader 
          titleKey="products.title"
          highlightKey="products.highlight"
          subtitleKey="products.subtitle"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <ViewAllButton textKey="products.viewAll" Icon={ShoppingBag} />
      </div>
    </section>
  );
};

export default FeaturedProducts;