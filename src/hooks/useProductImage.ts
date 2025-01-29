import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useProductImage = (imageUrl: string | null) => {
  const [publicUrl, setPublicUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!imageUrl) {
      console.log("No image URL provided");
      setError(true);
      return;
    }

    // For local uploads, use the URL directly
    if (imageUrl.startsWith('/lovable-uploads/')) {
      console.log("Using local image path:", imageUrl);
      setPublicUrl(imageUrl);
      return;
    }

    // For external URLs, use them directly
    if (imageUrl.startsWith('http')) {
      console.log("Using external URL:", imageUrl);
      setPublicUrl(imageUrl);
      return;
    }

    // For Supabase storage paths
    try {
      const { data } = supabase.storage
        .from('salon_images')
        .getPublicUrl(imageUrl);

      if (!data?.publicUrl) {
        console.error("No public URL generated from storage");
        setError(true);
        return;
      }

      console.log("Generated public URL:", data.publicUrl);
      setPublicUrl(data.publicUrl);
    } catch (error) {
      console.error("Error loading image:", error);
      setError(true);
    }
  }, [imageUrl]);

  return { publicUrl, error };
};