import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Product } from "@/integrations/supabase/types/product";
import { ProductImage } from "./ProductImage";
import { getTranslatedProductContent } from "@/utils/productTranslations";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const translatedProduct = getTranslatedProductContent(product);

  return (
    <Card className="h-full overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-square overflow-hidden">
        <ProductImage 
          imageUrl={translatedProduct.image_url} 
          productName={translatedProduct.name} 
          category={translatedProduct.category}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-cormorant leading-tight">{translatedProduct.name}</CardTitle>
        <CardDescription className="line-clamp-3 text-sm mt-2">
          {translatedProduct.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm font-medium text-muted-foreground">
          {translatedProduct.category}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;