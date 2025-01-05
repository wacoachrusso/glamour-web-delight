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
      <div className="absolute inset-0 flex items-center justify-center bg-secondary/5">
        <ImageOff className="w-16 h-16 text-secondary/30" />
      </div>
    );
  }

  return (
    <img
      src={publicUrl}
      alt={productName}
      className="w-full h-full object-contain p-4"
      onError={(e) => {
        console.error("Image failed to load:", publicUrl);
        const target = e.target as HTMLImageElement;
        target.parentElement?.classList.add('bg-secondary/5');
        target.replaceWith(
          Object.assign(document.createElement('div'), {
            className: 'flex items-center justify-center w-full h-full',
            innerHTML: `<svg class="w-16 h-16 text-secondary/30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.998 2h18v20h-18z"></path><path d="M3 15l5-5c1.65-1.65 4.35-1.65 6 0l5 5"></path><path d="M14 14l1-1c1.65-1.65 4.35-1.65 6 0l4 4"></path><circle cx="8.5" cy="8.5" r="1.5"></circle></svg>`
          })
        );
      }}
    />
  );
};