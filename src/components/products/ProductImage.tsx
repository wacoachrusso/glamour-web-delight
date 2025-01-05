import { ImageOff } from "lucide-react";
import { useProductImage } from "@/hooks/useProductImage";

interface ProductImageProps {
  imageUrl: string | null;
  productName: string;
}

const getUnsplashFallbackImage = (productName: string): string => {
  // Map product names or categories to relevant Unsplash photo IDs
  const productToPhotoMap: Record<string, string> = {
    "Laptop": "photo-1488590528505-98d2b5aba04b",
    "Desktop Computer": "photo-1498050108023-c5249f4df085",
    "Smart Watch": "photo-1649972904349-6e44c42644a7",
    "Tablet": "photo-1486312338219-ce68d2c6f44d",
    // Add more mappings as needed for other products
  };

  // Default fallback for products without specific mappings
  const defaultPhoto = "photo-1721322800607-8c38375eef04";
  
  // Try to find a matching photo ID, or use default
  const photoId = productToPhotoMap[productName] || defaultPhoto;
  
  return `https://source.unsplash.com/${photoId}`;
};

export const ProductImage = ({ imageUrl, productName }: ProductImageProps) => {
  const { publicUrl, error } = useProductImage(imageUrl);

  // If there's an error or no URL, use Unsplash fallback
  if (error || !publicUrl) {
    const fallbackUrl = getUnsplashFallbackImage(productName);
    return (
      <img
        src={fallbackUrl}
        alt={productName}
        className="w-full h-full object-cover rounded-md"
        onError={(e) => {
          console.error("Fallback image failed to load:", fallbackUrl);
          const target = e.target as HTMLImageElement;
          target.parentElement?.classList.add('bg-secondary/5');
          target.replaceWith(
            Object.assign(document.createElement('div'), {
              className: 'flex items-center justify-center w-full h-full',
              innerHTML: `<div class="flex items-center justify-center"><svg class="w-16 h-16 text-secondary/30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.998 2h18v20h-18z"></path><path d="M3 15l5-5c1.65-1.65 4.35-1.65 6 0l5 5"></path><path d="M14 14l1-1c1.65-1.65 4.35-1.65 6 0l4 4"></path><circle cx="8.5" cy="8.5" r="1.5"></circle></svg></div>`
            })
          );
        }}
      />
    );
  }

  // Try to use the original image first
  return (
    <img
      src={publicUrl}
      alt={productName}
      className="w-full h-full object-contain p-4"
      onError={(e) => {
        console.log("Original image failed to load, falling back to Unsplash");
        const fallbackUrl = getUnsplashFallbackImage(productName);
        (e.target as HTMLImageElement).src = fallbackUrl;
        (e.target as HTMLImageElement).className = "w-full h-full object-cover rounded-md";
      }}
    />
  );
};