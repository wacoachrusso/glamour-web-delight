import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useProductImage = (imageUrl: string | null) => {
  const [publicUrl, setPublicUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadImageUrl = async () => {
      if (!imageUrl) {
        console.log("No image URL provided");
        setError(true);
        return;
      }

      try {
        // Handle local paths starting with /lovable-uploads
        if (imageUrl.startsWith('/lovable-uploads')) {
          const cleanPath = imageUrl.replace('/lovable-uploads/', '');
          console.log("Processing local path:", cleanPath);
          
          const { data } = supabase.storage
            .from('salon_images')
            .getPublicUrl(cleanPath);

          if (!data?.publicUrl) {
            console.error("No public URL generated");
            setError(true);
            return;
          }

          console.log("Generated public URL:", data.publicUrl);
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

        if (!data?.publicUrl) {
          console.error("No public URL generated from storage");
          setError(true);
          return;
        }

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