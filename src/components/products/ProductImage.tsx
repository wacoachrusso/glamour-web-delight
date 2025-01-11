import { ImageOff } from "lucide-react";
import { useProductImage } from "@/hooks/useProductImage";
import { useState, useEffect } from "react";

interface ProductImageProps {
  imageUrl: string | null;
  productName: string;
  category: string;
}

const getUnsplashFallbackImage = (category: string): string => {
  // Map categories to relevant smaller Unsplash photo IDs with specific sizes
  const categoryToPhotoMap: Record<string, string> = {
    "Hair Care": "photo-1522337360788-8b13dee7a37e?w=800&q=80",
    "Nail Care": "photo-1604654894610-df63bc536371?w=800&q=80",
    "Skin Care": "photo-1598440947619-2c35fc9aa908?w=800&q=80",
    "Makeup": "photo-1596462502278-27bfdc403348?w=800&q=80",
    "Tools": "photo-1522337094846-8a947d004604?w=800&q=80",
    "Accessories": "photo-1629132363165-f6f2648f9c9a?w=800&q=80",
  };
  
  const defaultPhoto = "photo-1487412720507-e7ab37603c6f?w=800&q=80";
  const photoId = categoryToPhotoMap[category] || defaultPhoto;
  
  return `https://source.unsplash.com/${photoId}`;
};

export const ProductImage = ({ imageUrl, productName, category }: ProductImageProps) => {
  const { publicUrl, error } = useProductImage(imageUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!publicUrl && !error) return;
    
    const img = new Image();
    img.src = error ? getUnsplashFallbackImage(category) : publicUrl;
    
    img.onload = () => {
      setImgSrc(img.src);
      setIsLoading(false);
    };
    
    img.onerror = () => {
      console.error("Image failed to load:", img.src);
      setImgSrc(getUnsplashFallbackImage(category));
      setIsLoading(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [publicUrl, error, category]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-secondary/5">
        <div className="animate-pulse w-full h-full bg-secondary/10" />
      </div>
    );
  }

  if (!imgSrc) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-secondary/5">
        <ImageOff className="w-16 h-16 text-secondary/30" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <img
        src={imgSrc}
        alt={productName}
        loading="lazy"
        className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
        onError={(e) => {
          console.error("Final fallback image failed to load");
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const fallback = document.createElement('div');
          fallback.className = 'flex items-center justify-center w-full h-full';
          fallback.innerHTML = '<div class="w-16 h-16 text-secondary/30"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18M8.5 8.5l7 7M21 12v3c0 2.2-1.8 4-4 4H7c-1.1 0-2.1-.4-2.8-1.2M3 12v-3c0-2.2 1.8-4 4-4h12"/></svg></div>';
          target.parentElement?.appendChild(fallback);
        }}
      />
    </div>
  );
};