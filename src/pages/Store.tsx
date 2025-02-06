import { useState } from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTranslation } from "react-i18next";
import CategoryFilter from "@/components/store/CategoryFilter";
import ProductGrid from "@/components/store/ProductGrid";
import LoadingGrid from "@/components/store/LoadingGrid";

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { t } = useTranslation();

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      console.log("Fetching products...");
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("category", { ascending: true });

      if (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
      
      console.log("Products fetched successfully:", data?.length);
      return data;
    },
    retry: 2,
  });

  const categories = products 
    ? Array.from(new Set(products.map(product => product.category)))
    : [];

  const filteredProducts = selectedCategory
    ? products?.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/50 to-white">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-cormorant font-bold text-center mb-8">
          {t('products.title')} <span className="text-secondary">{t('products.highlight')}</span>
        </h1>

        <div className="text-center mb-12">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('products.subtitle')}
          </p>
        </div>
        
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        {error ? (
          <Alert variant="destructive" className="mb-8">
            <AlertDescription>
              {t('products.errorLoading')}
            </AlertDescription>
          </Alert>
        ) : isLoading ? (
          <LoadingGrid />
        ) : (
          <ProductGrid products={filteredProducts} isLoading={isLoading} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Store;