import { ImageOff } from "lucide-react";
import { useProductImage } from "@/hooks/useProductImage";

interface ProductImageProps {
  imageUrl: string | null;
  productName: string;
  category: string;
}

const getUnsplashFallbackImage = (category: string): string => {
  // Map categories to relevant Unsplash photo IDs
  const categoryToPhotoMap: Record<string, string> = {
    "Hair Care": "photo-1522337360788-8b13dee7a37e",
    "Nail Care": "photo-1604654894610-df63bc536371",
    "Skin Care": "photo-1598440947619-2c35fc9aa908",
    "Makeup": "photo-1596462502278-27bfdc403348",
    "Tools": "photo-1522337094846-8a947d004604",
    "Accessories": "photo-1629132363165-f6f2648f9c9a",
  };

  // Default fallback for categories without specific mappings
  const defaultPhoto = "photo-1487412720507-e7ab37603c6f";
  
  // Try to find a matching photo ID, or use default
  const photoId = categoryToPhotoMap[category] || defaultPhoto;
  
  return `https://source.unsplash.com/${photoId}`;
};

export const ProductImage = ({ imageUrl, productName, category }: ProductImageProps) => {
  const { publicUrl, error } = useProductImage(imageUrl);

  // If there's an error or no URL, use Unsplash fallback
  if (error || !publicUrl) {
    const fallbackUrl = getUnsplashFallbackImage(category);
    return (
      <div className="relative w-full h-full">
        <img
          src={fallbackUrl}
          alt={productName}
          className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            console.error("Fallback image failed to load:", fallbackUrl);
            const target = e.target as HTMLImageElement;
            target.parentElement?.classList.add('bg-secondary/5');
            target.replaceWith(
              Object.assign(document.createElement('div'), {
                className: 'flex items-center justify-center w-full h-full',
                innerHTML: `<div class="flex items-center justify-center"><ImageOff className="w-16 h-16 text-secondary/30" /></div>`
              })
            );
          }}
        />
      </div>
    );
  }

  // Try to use the original image first
  return (
    <div className="relative w-full h-full">
      <img
        src={publicUrl}
        alt={productName}
        className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        onError={(e) => {
          console.log("Original image failed to load, falling back to Unsplash");
          const fallbackUrl = getUnsplashFallbackImage(category);
          (e.target as HTMLImageElement).src = fallbackUrl;
          (e.target as HTMLImageElement).className = "w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105";
        }}
      />
    </div>
  );
};