import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductImage } from "./ProductImage";
import { MapPin, Phone, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type Product = {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  category: string;
};

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toast } = useToast();

  const handleContactClick = () => {
    window.location.href = 'tel:+1234567890';
    toast({
      title: "Contact Information",
      description: "Calling our store now...",
    });
  };

  const handleLearnMoreClick = () => {
    toast({
      title: "Product Details",
      description: "Redirecting to detailed product information...",
    });
    // You can update this to navigate to a product detail page
    window.location.href = '/contact';
  };

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 group animate-fadeIn">
      <CardHeader className="space-y-2">
        <div className="text-sm text-secondary uppercase tracking-wider font-medium">
          {product.category}
        </div>
        <CardTitle className="text-2xl font-cormorant">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="relative h-80 overflow-hidden bg-secondary/5 mb-6 rounded-md group-hover:shadow-inner transition-all">
          <ProductImage 
            imageUrl={product.image_url} 
            productName={product.name} 
          />
        </div>
        <div className="space-y-6 flex-grow">
          <p className="text-muted-foreground leading-relaxed">
            {product.description || `Experience the luxury of professional-grade ${product.name.toLowerCase()} designed to enhance your hair care routine.`}
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center text-sm text-green-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Available at our salon in downtown</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="w-full border-secondary hover:bg-secondary/10"
                onClick={handleContactClick}
              >
                <Phone className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
              <Button 
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                onClick={handleLearnMoreClick}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;