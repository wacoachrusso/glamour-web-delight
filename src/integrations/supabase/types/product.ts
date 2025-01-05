export interface Product {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price: number;
  image_url: string | null;
  featured: boolean | null;
  created_at: string;
  stock_quantity: number;
}