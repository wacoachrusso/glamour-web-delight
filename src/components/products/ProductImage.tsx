import { useProductImage } from "@/hooks/useProductImage";
import { useState, useEffect } from "react";
import ClickableImage from "../shared/ClickableImage";
import ImageLoadingState from "../shared/ImageLoadingState";

interface ProductImageProps {
  imageUrl: string | null;
  productName: string;
  category: string;
}

export const ProductImage = ({ imageUrl, productName, category }: ProductImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!imageUrl) {
      console.log("No image URL provided for product:", productName);
      setImgSrc(getUnsplashFallbackImage(category));
      setIsLoading(false);
      return;
    }

    // For local uploads, use the URL directly
    if (imageUrl.startsWith('/lovable-uploads/')) {
      console.log("Loading local image for", productName, ":", imageUrl);
      setImgSrc(imageUrl);
      setIsLoading(false);
      return;
    }

    // For external URLs, load them directly
    if (imageUrl.startsWith('http')) {
      console.log("Loading external image for", productName, ":", imageUrl);
      setImgSrc(imageUrl);
      setIsLoading(false);
      return;
    }

    // For Supabase storage paths
    console.log("Loading Supabase storage image for", productName, ":", imageUrl);
    const img = new Image();
    img.src = imageUrl;
    
    img.onload = () => {
      setImgSrc(imageUrl);
      setIsLoading(false);
      console.log("Image loaded successfully for:", productName);
    };
    
    img.onerror = () => {
      console.error("Error loading image for:", productName, "Using fallback.");
      setImgSrc(getUnsplashFallbackImage(category));
      setIsLoading(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl, productName, category]);

  return (
    <div className="relative w-full h-full">
      <ImageLoadingState 
        isLoading={isLoading} 
        hasError={!imgSrc} 
        className="absolute inset-0"
      />
      
      {imgSrc && (
        <ClickableImage
          src={imgSrc}
          alt={productName}
          className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
        />
      )}
    </div>
  );
};

const getUnsplashFallbackImage = (category: string): string => {
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