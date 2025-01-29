import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt?: string;
}

const ImageModal = ({ isOpen, onClose, imageUrl, alt }: ImageModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0">
        <div className="relative w-full h-full">
          <img
            src={imageUrl}
            alt={alt || "Enlarged view"}
            className={cn(
              "w-full h-full object-contain",
              "cursor-zoom-out"
            )}
            onClick={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;