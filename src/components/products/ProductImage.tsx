import { ImageOff } from "lucide-react";
import { useProductImage } from "@/hooks/useProductImage";

interface ProductImageProps {
  imageUrl: string | null;
  productName: string;
}

export const ProductImage = ({ imageUrl, productName }: ProductImageProps) => {
  const { publicUrl, error } = useProductImage(imageUrl);

  if (error || !publicUrl) {
    console.error("Failed to load image for product:", productName, "Error:", error);
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-muted/5">
        <ImageOff className="w-16 h-16 text-muted-foreground/30" />
      </div>
    );
  }

  return (
    <img
      src={publicUrl}
      alt={productName}
      className="w-full h-full object-contain p-4"
      onError={(e) => {
        console.error("Image failed to load:", publicUrl, "for product:", productName);
        const target = e.target as HTMLImageElement;
        target.parentElement?.classList.add('bg-muted/5');
        target.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.className = 'absolute inset-0 flex items-center justify-center';
        const icon = document.createElement('div');
        icon.innerHTML = `<svg class="w-16 h-16 text-muted-foreground/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" y1="2" x2="22" y2="22"></line><path d="M10.41 10.41a2 2 0 1 1-2.83-2.83"></path><line x1="13.5" y1="13.5" x2="6" y2="21"></line><line x1="18" y1="12" x2="21" y2="15"></line><path d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59"></path><path d="M21 15V5a2 2 0 0 0-2-2H9"></path></svg>`;
        fallback.appendChild(icon);
        target.parentElement?.appendChild(fallback);
      }}
    />
  );
};