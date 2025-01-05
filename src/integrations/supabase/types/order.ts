export interface Order {
  id: string;
  status: string;
  subtotal: number;
  tax: number;
  total: number;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string | null;
  product_id: string | null;
  quantity: number;
  price_at_time: number;
  created_at: string;
}