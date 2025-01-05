import { ImageOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

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
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadImageUrl = async () => {
      if (!product.image_url) {
        console.log("No image URL provided for product:", product.name);
        return;
      }

      try {
        // If it's already a full URL, use it directly
        if (product.image_url.startsWith('http')) {
          console.log("Using direct URL for product:", product.name, product.image_url);
          setImageUrl(product.image_url);
          return;
        }

        // Clean the filename - remove any path prefixes
        const filename = product.image_url.split('/').pop();
        if (!filename) {
          console.error("Invalid image URL format:", product.image_url);
          return;
        }

        console.log("Getting public URL for file:", filename);
        const { data } = supabase.storage
          .from('salon_images')
          .getPublicUrl(filename);

        console.log("Generated public URL:", data.publicUrl);
        setImageUrl(data.publicUrl);
      } catch (error) {
        console.error("Error processing image URL:", error);
      }
    };

    loadImageUrl();
  }, [product.image_url, product.name]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-xl">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="relative h-72 overflow-hidden bg-secondary/5 mb-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-contain p-4"
              onError={(e) => {
                console.error("Image failed to load:", imageUrl);
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`absolute inset-0 flex items-center justify-center ${imageUrl ? 'hidden' : ''}`}>
            <ImageOff className="w-16 h-16 text-secondary/30" />
          </div>
        </div>
        <p className="text-muted-foreground mb-2">{product.description}</p>
        <p className="font-semibold">${product.price.toFixed(2)}</p>
        <p className="text-sm text-green-600">Available in store</p>
      </CardContent>
    </Card>
  );
};

export default ProductCard;