import { ImageOff } from "lucide-react";
import { useProductImage } from "@/hooks/useProductImage";

interface ProductImageProps {
  imageUrl: string | null;
  productName: string;
}

export const ProductImage = ({ imageUrl, productName }: ProductImageProps) => {
  const { publicUrl, error } = useProductImage(imageUrl);

  if (error || !publicUrl) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <ImageOff className="w-16 h-16 text-secondary/30" />
      </div>
    );
  }

  return (
    <img
      src={publicUrl}
      alt={productName}
      className="w-full h-full object-contain p-4"
      onError={() => {
        console.error("Image failed to load:", publicUrl);
      }}
    />
  );
};