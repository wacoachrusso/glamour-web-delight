import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useProductImage = (imageUrl: string | null) => {
  const [publicUrl, setPublicUrl] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const loadImageUrl = async () => {
      console.log("Loading image with URL:", imageUrl);
      
      if (!imageUrl) {
        console.log("No image URL provided");
        setError(true);
        return;
      }

      try {
        // Handle local paths starting with /lovable-uploads
        if (imageUrl.startsWith('/lovable-uploads')) {
          console.log("Processing local path:", imageUrl);
          const imagePath = imageUrl.replace('/lovable-uploads/', '');
          const { data } = supabase.storage
            .from('salon_images')
            .getPublicUrl(imagePath);
          
          console.log("Generated public URL:", data.publicUrl);
          setPublicUrl(data.publicUrl);
          setError(false);
          return;
        }

        // Handle full URLs (including Supabase URLs)
        if (imageUrl.startsWith('http')) {
          console.log("Using direct URL:", imageUrl);
          setPublicUrl(imageUrl);
          setError(false);
          return;
        }

        // Handle other cases through Supabase storage
        const { data } = supabase.storage
          .from('salon_images')
          .getPublicUrl(imageUrl);

        console.log("Generated public URL from storage:", data.publicUrl);
        setPublicUrl(data.publicUrl);
        setError(false);
      } catch (err) {
        console.error("Error loading image:", err, "for URL:", imageUrl);
        setError(true);
      }
    };

    loadImageUrl();
  }, [imageUrl]);

  return { publicUrl, error };
};