import { useState } from "react";
import { ImageOff } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ServiceImageProps {
  imageUrl: string | null;
  serviceName: string;
  category: string;
}

export const ServiceImage = ({ imageUrl, serviceName, category }: ServiceImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  const getImageUrl = (url: string | null) => {
    console.log("Service:", serviceName, "Image URL:", url);
    if (!url) return null;
    
    if (url.startsWith('/lovable-uploads/')) {
      const fullUrl = `${window.location.origin}${url}`;
      console.log("Using uploaded image with full URL:", fullUrl);
      return fullUrl;
    }
    
    console.log("No valid image URL found for:", serviceName);
    return null;
  };

  const handleImageLoad = () => {
    console.log("Image loaded successfully for:", serviceName);
    setIsLoading(false);
  };

  const handleImageError = () => {
    console.error("Error loading image for service:", serviceName);
    setImageError(true);
    setIsLoading(false);
  };

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-secondary/5">
      {isLoading && (
        <div className="absolute inset-0">
          <div className="animate-pulse w-full h-full bg-secondary/10" />
        </div>
      )}
      {getImageUrl(imageUrl) && !imageError && (
        <img
          src={getImageUrl(imageUrl)}
          alt={t(`services.categories.${category.toLowerCase()}`)}
          onError={handleImageError}
          onLoad={handleImageLoad}
          loading="lazy"
          className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1 ${
            isLoading ? "opacity-0" : ""
          }`}
        />
      )}
      {(imageError || !getImageUrl(imageUrl)) && !isLoading && (
        <div className="flex items-center justify-center w-full h-full">
          <ImageOff className="w-16 h-16 text-secondary/30" />
        </div>
      )}
    </div>
  );
};