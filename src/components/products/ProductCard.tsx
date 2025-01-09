import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductImage } from "./ProductImage";
import { MapPin, Phone, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const handleContactClick = () => {
    window.location.href = 'tel:+1234567890';
    toast({
      title: t('products.addedToCart'),
      description: t('products.addedToCartDescription', { name: product.name }),
    });
  };

  const handleLearnMoreClick = () => {
    toast({
      title: t('products.addedToCart'),
      description: t('products.addedToCartDescription', { name: product.name }),
    });
    window.location.href = '/contact';
  };

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 group animate-fadeIn">
      <CardHeader className="space-y-2">
        <div className="text-sm text-secondary uppercase tracking-wider font-medium">
          {t('products.categories.' + product.category.toLowerCase())}
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
            {product.description || t('products.defaultDescription', { product: product.name.toLowerCase() })}
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center text-sm text-green-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{t('products.availableAt')}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="w-full border-secondary hover:bg-secondary/10"
                onClick={handleContactClick}
              >
                <Phone className="w-4 h-4 mr-2" />
                {t('nav.contact')}
              </Button>
              <Button 
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                onClick={handleLearnMoreClick}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {t('products.learnMore')}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;