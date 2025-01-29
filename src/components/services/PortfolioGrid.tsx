import { PortfolioImage } from "@/types/portfolio";
import PortfolioItem from "./PortfolioItem";

interface PortfolioGridProps {
  images: PortfolioImage[];
}

const PortfolioGrid = ({ images }: PortfolioGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {images?.map((image, index) => (
        <PortfolioItem key={image.id} image={image} index={index} />
      ))}
    </div>
  );
};

export default PortfolioGrid;