import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Plus, ImageOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";
import { useTranslation } from "react-i18next";

type Product = Database['public']['Tables']['products']['Row'];

const FeaturedProducts = () => {
  const { toast } = useToast();
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

  const getImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http')) return imageUrl;
    
    const filename = imageUrl.split('/').pop();
    if (!filename) return null;
    
    const { data } = supabase.storage
      .from('salon_images')
      .getPublicUrl(filename);
    
    return data.publicUrl;
  };

  const handleAddToCart = (product: Product) => {
    toast({
      title: t('products.addedToCart'),
      description: t('products.addedToCartDescription', { name: product.name }),
      duration: 3000,
    });
  };

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
            {t('products.title')} <span className="gradient-text">{t('products.highlight')}</span>
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            {t('products.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Card className="bg-white border-secondary/20 hover:border-secondary transition-all duration-300 overflow-hidden h-full">
                <div className="relative">
                  <div className="relative h-72 overflow-hidden bg-secondary/5">
                    {product.image_url ? (
                      <img
                        src={getImageUrl(product.image_url)}
                        alt={product.name}
                        className="w-full h-full object-cover p-4 transform group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          console.error("Image failed to load:", product.image_url);
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`absolute inset-0 flex items-center justify-center ${product.image_url ? 'hidden' : ''}`}>
                      <ImageOff className="w-16 h-16 text-secondary/30" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                      {t(`products.categories.${product.category.toLowerCase()}`)}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-playfair">{product.name}</CardTitle>
                  <CardDescription className="text-primary-foreground/60">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-semibold text-secondary">
                      {t('products.price', { price: product.price })}
                    </span>
                    <div className="flex items-center text-secondary">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-secondary hover:bg-secondary-light text-secondary-foreground group relative overflow-hidden"
                  >
                    <span className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full opacity-10"></span>
                    {t('products.addToCart')}
                    <Plus className="ml-2 h-4 w-4" />
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
            {t('products.viewAll')}
            <ShoppingBag className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;