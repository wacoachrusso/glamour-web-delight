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
  index?: number;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const getImageUrl = async (imageUrl: string | null) => {
    if (!imageUrl) {
      console.log("No image URL provided for product:", product.name);
      return null;
    }

    try {
      // If it's already a full URL, return it
      if (imageUrl.startsWith('http')) {
        console.log("Using direct URL for product:", product.name, imageUrl);
        return imageUrl;
      }

      // Clean the filename - remove any path prefixes
      const filename = imageUrl.split('/').pop();
      if (!filename) {
        console.error("Invalid image URL format:", imageUrl);
        return null;
      }

      console.log("Getting public URL for file:", filename);
      const { data } = supabase.storage
        .from('salon_images')
        .getPublicUrl(filename);

      console.log("Generated public URL:", data.publicUrl);
      return data.publicUrl;
    } catch (error) {
      console.error("Error processing image URL:", error);
      return null;
    }
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
              src={product.image_url}
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