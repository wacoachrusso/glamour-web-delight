import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Product } from "@/integrations/supabase/types/product";
import { ProductImage } from "./ProductImage";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="h-full overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-square overflow-hidden">
        <ProductImage 
          imageUrl={product.image_url} 
          productName={product.name} 
          category={product.category}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-cormorant leading-tight">{product.name}</CardTitle>
        <CardDescription className="line-clamp-3 text-sm mt-2">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm font-medium text-muted-foreground">
          {product.category}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;