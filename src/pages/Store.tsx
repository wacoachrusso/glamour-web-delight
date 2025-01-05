import { useState } from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "@/components/products/ProductCard";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // Get unique categories from products
  const categories = products 
    ? Array.from(new Set(products.map(product => product.category)))
    : [];

  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? products?.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-white">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-cormorant font-bold text-center mb-8">
          Our Products
        </h1>
        
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button
              variant={selectedCategory === null ? "secondary" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              All Products
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "secondary" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[32rem] bg-muted/20 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <>
            {filteredProducts?.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                No products found in this category.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Store;