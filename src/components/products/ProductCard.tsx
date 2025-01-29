import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Product } from "@/integrations/supabase/types/product";
import { ProductImage } from "./ProductImage";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="h-full overflow-hidden group">
      <ProductImage 
        imageUrl={product.image_url} 
        productName={product.name} 
        category={product.category}
      />
      <CardHeader>
        <CardTitle className="text-xl">{product.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          {product.category}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;