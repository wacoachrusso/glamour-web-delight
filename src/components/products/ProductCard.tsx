import { motion } from "framer-motion";
import { ImageOff, Plus, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";

type Product = Database['public']['Tables']['products']['Row'];

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();

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

  return (
    <motion.div
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
  );
};

export default ProductCard;