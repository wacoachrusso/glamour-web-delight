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

          // Add quality and size parameters to the URL if it's an image service that supports it
          const optimizedUrl = new URL(data.publicUrl);
          optimizedUrl.searchParams.set('quality', '80');
          optimizedUrl.searchParams.set('width', '800');
          
          console.log("Generated optimized URL:", optimizedUrl.toString());
          setPublicUrl(optimizedUrl.toString());
          return;
        }

        // Handle full URLs (including Supabase URLs)
        if (imageUrl.startsWith('http')) {
          // Try to optimize the URL if it's from a known image service
          try {
            const url = new URL(imageUrl);
            if (url.hostname.includes('unsplash.com')) {
              url.searchParams.set('w', '800');
              url.searchParams.set('q', '80');
              setPublicUrl(url.toString());
              return;
            }
          } catch (e) {
            console.warn("Could not parse URL for optimization:", imageUrl);
          }
          
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

        // Add optimization parameters if supported
        const optimizedUrl = new URL(data.publicUrl);
        optimizedUrl.searchParams.set('quality', '80');
        optimizedUrl.searchParams.set('width', '800');

        console.log("Generated optimized URL from storage:", optimizedUrl.toString());
        setPublicUrl(optimizedUrl.toString());
      } catch (error) {
        console.error("Error loading image:", error);
        setError(true);
      }
    };

    loadImageUrl();
  }, [imageUrl]);

  return { publicUrl, error };
};