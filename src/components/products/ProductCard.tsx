import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductImage } from "./ProductImage";

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
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-playfair">{product.name}</CardTitle>
        <div className="text-sm text-secondary uppercase tracking-wider">
          {product.category}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="relative h-72 overflow-hidden bg-secondary/5 mb-4 rounded-md">
          <ProductImage 
            imageUrl={product.image_url} 
            productName={product.name} 
          />
        </div>
        <p className="text-muted-foreground">{product.description}</p>
        <p className="text-sm text-green-600 mt-4">Available in store</p>
      </CardContent>
    </Card>
  );
};

export default ProductCard;