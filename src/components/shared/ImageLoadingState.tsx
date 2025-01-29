import { ImageOff } from "lucide-react";

interface ImageLoadingStateProps {
  isLoading: boolean;
  hasError: boolean;
  className?: string;
}

const ImageLoadingState = ({ isLoading, hasError, className = "" }: ImageLoadingStateProps) => {
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="animate-pulse w-full h-full bg-secondary/10" />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <ImageOff className="w-16 h-16 text-secondary/30" />
      </div>
    );
  }

  return null;
};

export default ImageLoadingState;