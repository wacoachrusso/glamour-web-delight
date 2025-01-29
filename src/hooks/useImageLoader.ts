import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useImageLoader = (imageUrl: string | null, itemName: string) => {
  const [finalUrl, setFinalUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      setIsLoading(true);
      setError(false);

      if (!imageUrl) {
        console.log("No image URL provided for:", itemName);
        setError(true);
        setIsLoading(false);
        return;
      }

      try {
        let url = imageUrl;

        if (imageUrl.startsWith('/lovable-uploads/')) {
          console.log("Using local public file for", itemName, ":", imageUrl);
          url = imageUrl;
        } else if (imageUrl.startsWith('http')) {
          if (imageUrl.includes('storage/v1/object/public/salon_images/')) {
            const storagePath = imageUrl.split('salon_images/')[1];
            console.log("Extracted storage path for", itemName, ":", storagePath);
            
            const { data } = supabase.storage
              .from('salon_images')
              .getPublicUrl(storagePath);

            if (data?.publicUrl) {
              url = data.publicUrl;
              console.log("Using public URL for", itemName, ":", url);
            }
          }
        } else {
          console.log("Getting storage URL for", itemName, "from path:", imageUrl);
          
          const { data } = supabase.storage
            .from('salon_images')
            .getPublicUrl(imageUrl);

          if (data?.publicUrl) {
            url = data.publicUrl;
            console.log("Using public URL for", itemName, ":", url);
          }
        }

        // Test image loading
        const img = new Image();
        img.src = url;
        
        img.onload = () => {
          setFinalUrl(url);
          setIsLoading(false);
          console.log("Image loaded successfully for:", itemName);
        };
        
        img.onerror = () => {
          console.error("Error loading image for:", itemName);
          setError(true);
          setIsLoading(false);
        };
      } catch (error) {
        console.error("Error processing image URL for:", itemName, error);
        setError(true);
        setIsLoading(false);
      }
    };

    loadImage();
  }, [imageUrl, itemName]);

  return { finalUrl, isLoading, error };
};