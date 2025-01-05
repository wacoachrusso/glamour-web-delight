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

  useEffect(() => {
    const loadImageUrl = async () => {
      console.log("Starting image load for product:", product.name);
      console.log("Original image_url:", product.image_url);

      if (!product.image_url) {
        console.log("No image URL provided for product:", product.name);
        return;
      }

      try {
        // If it starts with /lovable-uploads, it's a direct path
        if (product.image_url.startsWith('/lovable-uploads')) {
          console.log("Using direct path for product:", product.name, "Path:", product.image_url);
          setImageUrl(product.image_url);
          return;
        }

        // If it's already a full URL, use it directly
        if (product.image_url.startsWith('http')) {
          console.log("Using direct URL for product:", product.name, "URL:", product.image_url);
          setImageUrl(product.image_url);
          return;
        }

        // Otherwise, get the URL from Supabase storage
        console.log("Attempting to get Supabase storage URL for:", product.image_url);
        const { data } = supabase.storage
          .from('salon_images')
          .getPublicUrl(product.image_url);

        if (data) {
          console.log("Generated public URL for", product.name, ":", data.publicUrl);
          setImageUrl(data.publicUrl);
        } else {
          console.log("No public URL generated for product:", product.name);
        }
      } catch (error) {
        console.error("Error loading image for product:", product.name, error);
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
        <p className="text-muted-foreground">{product.description}</p>
        <p className="text-sm text-green-600 mt-4">Available in store</p>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
