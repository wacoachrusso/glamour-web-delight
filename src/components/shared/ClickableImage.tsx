import { useState } from "react";
import { cn } from "@/lib/utils";
import ImageModal from "./ImageModal";

interface ClickableImageProps {
  src: string;
  alt?: string;
  className?: string;
}

const ClickableImage = ({ src, alt, className }: ClickableImageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt || ""}
        className={cn(
          "cursor-zoom-in transition-transform hover:scale-[1.02]",
          className
        )}
        onClick={() => setIsModalOpen(true)}
      />
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={src}
        alt={alt}
      />
    </>
  );
};

export default ClickableImage;