import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useProductImage = (imageUrl: string | null) => {
  const [publicUrl, setPublicUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);

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
          const { data } = supabase.storage
            .from('salon_images')
            .getPublicUrl(imageUrl.replace('/lovable-uploads/', ''));
          
          console.log("Generated public URL from local path:", data.publicUrl);
          setPublicUrl(data.publicUrl);
          return;
        }

        // Handle full URLs (including Supabase URLs)
        if (imageUrl.startsWith('http')) {
          console.log("Using direct URL:", imageUrl);
          setPublicUrl(imageUrl);
          return;
        }

        // Handle other cases through Supabase storage
        const { data } = supabase.storage
          .from('salon_images')
          .getPublicUrl(imageUrl);

        console.log("Generated public URL from storage:", data.publicUrl);
        setPublicUrl(data.publicUrl);
      } catch (error) {
        console.error("Error loading image:", error);
        setError(true);
      }
    };

    loadImageUrl();
  }, [imageUrl]);

  return { publicUrl, error };
};