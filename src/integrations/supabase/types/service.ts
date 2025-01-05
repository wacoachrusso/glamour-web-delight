export interface Service {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price: number;
  duration: number;
  image_url: string | null;
  created_at: string;
}