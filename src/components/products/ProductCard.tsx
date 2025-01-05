import { ImageOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  category: string;
};

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const loadImageUrl = async () => {
      console.log("Loading image for product:", product.name);
      
      if (!product.image_url) {
        console.log("No image URL for product:", product.name);
        setImageError(true);
        return;
      }

      try {
        // If it's a local path starting with /lovable-uploads
        if (product.image_url.startsWith('/lovable-uploads')) {
          const { data: publicUrl } = supabase.storage
            .from('salon_images')
            .getPublicUrl(product.image_url.replace('/lovable-uploads/', ''));
          
          console.log("Generated public URL:", publicUrl);
          setImageUrl(publicUrl.publicUrl);
          return;
        }

        // If it's already a full URL (including Supabase URLs)
        if (product.image_url.startsWith('http')) {
          console.log("Using direct URL:", product.image_url);
          setImageUrl(product.image_url);
          return;
        }

        // For any other case, try to get URL from Supabase storage
        const { data: publicUrl } = supabase.storage
          .from('salon_images')
          .getPublicUrl(product.image_url);

        console.log("Fallback public URL:", publicUrl);
        setImageUrl(publicUrl.publicUrl);
      } catch (error) {
        console.error("Error loading image for product:", product.name, error);
        setImageError(true);
      }
    };

    loadImageUrl();
  }, [product.image_url, product.name]);

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-playfair">{product.name}</CardTitle>
        <div className="text-sm text-secondary uppercase tracking-wider">
          {product.category}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="relative h-72 overflow-hidden bg-secondary/5 mb-4 rounded-md">
          {!imageError && imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-contain p-4"
              onError={() => {
                console.error("Image failed to load:", imageUrl);
                setImageError(true);
              }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageOff className="w-16 h-16 text-secondary/30" />
            </div>
          )}
        </div>
        <p className="text-muted-foreground">{product.description}</p>
        <p className="text-sm text-green-600 mt-4">Available in store</p>
      </CardContent>
    </Card>
  );
};

export default ProductCard;