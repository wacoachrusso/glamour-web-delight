import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image_url: string | null;
}

const FeaturedProducts = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("featured", true)
        .limit(3);
      
      if (error) throw error;
      return data as Product[];
    },
  });

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-pulse">Loading products...</div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
            Featured <span className="gradient-text">Products</span>
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Discover our handpicked selection of luxury beauty products
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products?.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <Card className="bg-white border-secondary/20 hover:border-secondary transition-all duration-300 overflow-hidden">
                {product.image_url && (
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl font-playfair">{product.name}</CardTitle>
                  <CardDescription>{product.category}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-primary-foreground/80 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-secondary text-lg">
                      ${product.price}
                    </span>
                    <div className="flex items-center text-secondary">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-secondary hover:bg-secondary-light text-secondary-foreground"
                  >
                    Add to Cart
                    <ShoppingBag className="ml-2 h-4 w-4" />
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
            View All Products
            <ShoppingBag className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;