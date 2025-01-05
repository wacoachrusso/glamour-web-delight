import { ImageOff } from "lucide-react";
import { useProductImage } from "@/hooks/useProductImage";

interface ProductImageProps {
  imageUrl: string | null;
  productName: string;
}

const getUnsplashFallbackImage = (productName: string): string => {
  // Map product names or categories to relevant Unsplash photo IDs
  const productToPhotoMap: Record<string, string> = {
    "Shampoo": "photo-1585232004423-244e0e6904e3",
    "Conditioner": "photo-1535585209827-a15fcdbc4c2d",
    "Hair Mask": "photo-1526947425960-945c6e72858f",
    "Hair Oil": "photo-1597354984706-fac992d9306f",
    "Styling Cream": "photo-1556229162-5c63ed9c4efb",
    "Hair Spray": "photo-1559599101-f09722fb4948",
    "Hair Serum": "photo-1585232004423-244e0e6904e3",
    "Leave-in Conditioner": "photo-1535585209827-a15fcdbc4c2d",
    "Hair Color": "photo-1527799820374-dcf8d9d4a388",
    "Hair Treatment": "photo-1516975080664-ed2fc6a32937",
  };

  // Default fallback for products without specific mappings
  const defaultPhoto = "photo-1522337360788-8b13dee7a37e";
  
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
          const fallbackUrl = getUnsplashFallbackImage(productName);
          (e.target as HTMLImageElement).src = fallbackUrl;
          (e.target as HTMLImageElement).className = "w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105";
        }}
      />
    </div>
  );
};