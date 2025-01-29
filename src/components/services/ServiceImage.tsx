import { useTranslation } from "react-i18next";
import { useImageLoader } from "@/hooks/useImageLoader";
import ClickableImage from "../shared/ClickableImage";
import ImageLoadingState from "../shared/ImageLoadingState";

interface ServiceImageProps {
  imageUrl: string | null;
  serviceName: string;
  category: string;
}

export const ServiceImage = ({ imageUrl, serviceName, category }: ServiceImageProps) => {
  const { t } = useTranslation();
  const { finalUrl, isLoading, error } = useImageLoader(imageUrl, serviceName);

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-secondary/5">
      <ImageLoadingState 
        isLoading={isLoading} 
        hasError={error} 
        className="absolute inset-0"
      />
      
      {finalUrl && !error && !isLoading && (
        <ClickableImage
          src={finalUrl}
          alt={t(`services.categories.${category.toLowerCase()}`)}
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
        />
      )}
    </div>
  );
};