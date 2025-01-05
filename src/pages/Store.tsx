import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/products/ProductCard";
import SectionHeader from "@/components/shared/SectionHeader";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  stock_quantity: number;
  category: string;
};

export default function Store() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      console.log("Fetching all products...");
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("category", { ascending: true });
      
      if (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
      console.log("Fetched products:", data);
      return data as Product[];
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse text-primary-foreground/60 text-base md:text-lg text-center">
            Loading products...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <SectionHeader
          titleKey="store.title"
          highlightKey="store.highlight"
          subtitleKey="store.subtitle"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}