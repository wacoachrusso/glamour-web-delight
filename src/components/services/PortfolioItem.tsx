import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import ClickableImage from "../shared/ClickableImage";

interface PortfolioImage {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category: string;
}

interface PortfolioItemProps {
  image: PortfolioImage;
  index: number;
}

const PortfolioItem = ({ image, index }: PortfolioItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative aspect-square overflow-hidden rounded-xl bg-muted"
    >
      {image.image_url ? (
        <ClickableImage
          src={image.image_url}
          alt={image.title}
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-110"
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <ImageOff className="h-12 w-12 text-muted-foreground/40" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-lg font-semibold">{image.title}</h3>
          {image.description && (
            <p className="mt-1 text-sm text-white/80">{image.description}</p>
          )}
          <span className="mt-2 inline-block text-xs text-white/60">{image.category}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioItem;