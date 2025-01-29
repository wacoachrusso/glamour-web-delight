import { useState, useEffect } from "react";
import { ImageOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";

interface ServiceImageProps {
  imageUrl: string | null;
  serviceName: string;
  category: string;
}

export const ServiceImage = ({ imageUrl, serviceName, category }: ServiceImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [finalImageUrl, setFinalImageUrl] = useState<string | null>(null);
  const { t } = useTranslation();

  const getImageUrl = async (url: string | null) => {
    if (!url) {
      console.log("No image URL provided for:", serviceName);
      return null;
    }
    
    try {
      // Handle local uploads from public folder
      if (url.startsWith('/lovable-uploads/')) {
        console.log("Using local public file for", serviceName, ":", url);
        return url;
      }
      
      // Handle external URLs (like Unsplash)
      if (url.startsWith('http')) {
        console.log("Using external URL for", serviceName, ":", url);
        return url;
      }
      
      // Handle storage bucket paths
      console.log("Getting storage URL for", serviceName, "from path:", url);
      const { data: publicUrlData } = supabase.storage
        .from('salon_images')
        .getPublicUrl(url);

      if (!publicUrlData?.publicUrl) {
        console.error("No public URL generated for", serviceName);
        return null;
      }

      // Try to get a signed URL as fallback if needed
      if (!publicUrlData.publicUrl.includes('salon_images')) {
        const { data: signedData, error: signedError } = await supabase.storage
          .from('salon_images')
          .createSignedUrl(url, 3600);

        if (signedError || !signedData?.signedUrl) {
          console.error("Error getting signed URL for", serviceName, ":", signedError);
          return null;
        }

        console.log("Using signed URL for", serviceName, ":", signedData.signedUrl);
        return signedData.signedUrl;
      }

      console.log("Using public URL for", serviceName, ":", publicUrlData.publicUrl);
      return publicUrlData.publicUrl;
    } catch (error) {
      console.error("Error processing image URL for:", serviceName, error);
      return null;
    }
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

  useEffect(() => {
    const loadImage = async () => {
      const url = await getImageUrl(imageUrl);
      
      if (url) {
        console.log("Setting final image URL for", serviceName, ":", url);
        setFinalImageUrl(url);
        
        const img = new Image();
        img.src = url;
        img.onload = handleImageLoad;
        img.onerror = handleImageError;
      } else {
        setImageError(true);
        setIsLoading(false);
      }
    };
    
    loadImage();
  }, [imageUrl, serviceName]);

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-secondary/5">
      {isLoading && (
        <div className="absolute inset-0">
          <div className="animate-pulse w-full h-full bg-secondary/10" />
        </div>
      )}
      {finalImageUrl && !imageError && (
        <img
          src={finalImageUrl}
          alt={t(`services.categories.${category.toLowerCase()}`)}
          onError={handleImageError}
          onLoad={handleImageLoad}
          loading="lazy"
          className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      )}
      {(imageError || !finalImageUrl) && !isLoading && (
        <div className="flex items-center justify-center w-full h-full">
          <ImageOff className="w-16 h-16 text-secondary/30" />
        </div>
      )}
    </div>
  );
};