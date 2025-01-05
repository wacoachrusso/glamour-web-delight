import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductImage } from "./ProductImage";
import { MapPin, Phone } from "lucide-react";

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
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 group">
      <CardHeader className="space-y-2">
        <div className="text-sm text-secondary uppercase tracking-wider font-medium">
          {product.category}
        </div>
        <CardTitle className="text-xl font-cormorant">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="relative h-72 overflow-hidden bg-secondary/5 mb-4 rounded-md group-hover:shadow-inner transition-all">
          <ProductImage 
            imageUrl={product.image_url} 
            productName={product.name} 
          />
        </div>
        <p className="text-muted-foreground mb-4 flex-grow">
          {product.description}
        </p>
        <div className="space-y-4 mt-auto">
          <div className="flex items-center text-sm text-green-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>Available in store</span>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="w-full border-secondary hover:bg-secondary/10"
              onClick={() => window.location.href = 'tel:+1234567890'}
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
            <Button 
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              onClick={() => window.location.href = '/contact'}
            >
              Learn More
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;