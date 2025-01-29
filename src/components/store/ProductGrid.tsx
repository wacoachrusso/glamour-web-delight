import { Product } from "@/integrations/supabase/types/product";
import ProductCard from "@/components/products/ProductCard";
import { useTranslation } from "react-i18next";

interface ProductGridProps {
  products: Product[] | null;
  isLoading: boolean;
}

const ProductGrid = ({ products, isLoading }: ProductGridProps) => {
  const { t } = useTranslation();

  if (!products || products.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        {t('store.noProducts')}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;