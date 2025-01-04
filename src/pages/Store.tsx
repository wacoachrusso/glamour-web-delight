import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  stock_quantity: number;
  category: string;
};

export default function Store() {
  const { toast } = useToast();
  const [cart, setCart] = useState<{ [key: string]: { product: Product; quantity: number } }>({});

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data as Product[];
    },
  });

  const addToCart = (product: Product) => {
    if (product.stock_quantity <= 0) {
      toast({
        title: "Out of Stock",
        description: "Sorry, this product is currently out of stock.",
        variant: "destructive",
      });
      return;
    }

    setCart((prev) => {
      const currentQuantity = prev[product.id]?.quantity || 0;
      if (currentQuantity >= product.stock_quantity) {
        toast({
          title: "Maximum Quantity Reached",
          description: "You've reached the maximum available quantity for this product.",
          variant: "destructive",
        });
        return prev;
      }

      return {
        ...prev,
        [product.id]: {
          product,
          quantity: currentQuantity + 1,
        },
      };
    });

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const cartTotal = Object.values(cart).reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">Loading products...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Products Grid */}
          <div className="flex-1">
            <h1 className="text-4xl font-playfair mb-8">Our Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products?.map((product) => (
                <Card key={product.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    {product.image_url && (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                    )}
                    <p className="text-muted-foreground mb-2">{product.description}</p>
                    <p className="font-semibold">${product.price.toFixed(2)}</p>
                    <p className={`text-sm ${
                      product.stock_quantity > 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      {product.stock_quantity > 0 
                        ? `In Stock (${product.stock_quantity} available)` 
                        : "Out of Stock"}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => addToCart(product)}
                      disabled={product.stock_quantity <= 0}
                      className="w-full"
                    >
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Shopping Cart */}
          <div className="md:w-80">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Shopping Cart</CardTitle>
              </CardHeader>
              <CardContent>
                {Object.values(cart).length === 0 ? (
                  <p className="text-muted-foreground">Your cart is empty</p>
                ) : (
                  <div className="space-y-4">
                    {Object.values(cart).map(({ product, quantity }) => (
                      <div key={product.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {quantity} × ${product.price.toFixed(2)}
                          </p>
                        </div>
                        <p className="font-medium">
                          ${(product.price * quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-medium">
                        <p>Subtotal</p>
                        <p>${cartTotal.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  disabled={Object.values(cart).length === 0}
                >
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}