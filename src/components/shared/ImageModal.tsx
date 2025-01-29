import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
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
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 overflow-hidden">
        <ScrollArea className="w-full h-full max-h-[90vh]">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <img
              src={imageUrl}
              alt={alt || "Enlarged view"}
              className={cn(
                "max-w-full h-auto object-contain",
                "cursor-zoom-out"
              )}
              onClick={onClose}
              style={{
                maxHeight: "calc(90vh - 2rem)", // Account for padding
                width: "auto"
              }}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;