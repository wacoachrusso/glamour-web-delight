import { ImageOff } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  stock_quantity: number;
  category: string;
};

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  index?: number; // Added index as an optional prop
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const getImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http')) return imageUrl;
    
    // Remove the /lovable-uploads/ prefix if it exists
    const filename = imageUrl.replace('/lovable-uploads/', '');
    
    const { data } = supabase.storage
      .from('salon_images')
      .getPublicUrl(filename);
    
    return data.publicUrl;
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-xl">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="relative h-72 overflow-hidden bg-secondary/5 mb-4">
          {product.image_url ? (
            <img
              src={getImageUrl(product.image_url)}
              alt={product.name}
              className="w-full h-full object-contain p-4"
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
        <p className="text-muted-foreground mb-2">{product.description}</p>
        <p className="font-semibold">${product.price.toFixed(2)}</p>
        <p className={`text-sm ${
          product.stock_quantity > 0 ? "text-green-600" : "text-red-600"
        }`}>
          {product.stock_quantity > 0 
            ? `In Stock (${product.stock_quantity} available)` 
            : "Out of Stock"}
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onAddToCart?.(product)}
          disabled={product.stock_quantity <= 0}
          className="w-full"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;