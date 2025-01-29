import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PortfolioImage } from "@/types/portfolio";

const getLocalImages = (): PortfolioImage[] => [
  {
    id: '1',
    title: 'Luxurious Balayage',
    description: 'A stunning balayage treatment that creates a natural, sun-kissed look with seamless color transitions from root to tip.',
    image_url: '/lovable-uploads/Balayage5.jpg',
    category: 'Hair Color'
  },
  {
    id: '2',
    title: 'Modern Balayage Style',
    description: 'Contemporary balayage technique featuring soft, blended colors that create dimension and movement in the hair.',
    image_url: '/lovable-uploads/Bayalage.jpg',
    category: 'Hair Color'
  },
  {
    id: '3',
    title: 'Blonde Highlights Transformation',
    description: 'Bright, face-framing highlights that brighten the complexion and add dimension to natural hair color.',
    image_url: '/lovable-uploads/Blonde hair color with highlights.jpg',
    category: 'Hair Color'
  },
  {
    id: '4',
    title: 'Classic Eyelash Extensions',
    description: 'Full, natural-looking eyelash extensions that enhance your eyes and eliminate the need for mascara.',
    image_url: '/lovable-uploads/EyelashExtensions.jpg',
    category: 'Beauty'
  },
  {
    id: '5',
    title: 'Professional Gel Manicure',
    description: 'Long-lasting, chip-resistant gel manicure with a perfect glossy finish that stays beautiful for weeks.',
    image_url: '/lovable-uploads/Gel manicure.jpg',
    category: 'Nails'
  },
  {
    id: '6',
    title: 'Traditional Highlights',
    description: 'Classic highlighting technique creating beautiful, light-catching dimension throughout the hair.',
    image_url: '/lovable-uploads/Highlights.jpg',
    category: 'Hair Color'
  },
  {
    id: '7',
    title: 'Natural Sun-Kissed Highlights',
    description: 'Subtle, natural-looking highlights that mimic the effect of time spent in the summer sun.',
    image_url: '/lovable-uploads/Highlights2.jpg',
    category: 'Hair Color'
  },
  {
    id: '8',
    title: 'Multi-Dimensional Highlights',
    description: 'Strategic placement of varying highlight tones creating depth and dimension for a dynamic look.',
    image_url: '/lovable-uploads/Highlights3.jpg',
    category: 'Hair Color'
  },
  {
    id: '9',
    title: 'Layered Balayage Blend',
    description: 'Expertly layered haircut combined with soft balayage coloring for movement and dimension.',
    image_url: '/lovable-uploads/Layers haircut and balayage.jpg',
    category: 'Hair Style'
  },
  {
    id: '10',
    title: 'Modern Layered Cut',
    description: 'Fresh, contemporary layered haircut that adds volume and movement to the hair.',
    image_url: '/lovable-uploads/Layers haircut.jpg',
    category: 'Hair Style'
  },
  {
    id: '11',
    title: 'Trendy Curtain Bangs',
    description: 'Soft, face-framing curtain bangs with layers that perfectly blend into the rest of the hairstyle.',
    image_url: '/lovable-uploads/Layers with curtain bangs.jpg',
    category: 'Hair Style'
  },
  {
    id: '12',
    title: 'Partial Highlight Design',
    description: 'Strategic partial highlights focused on the crown and face-framing sections for a natural glow.',
    image_url: '/lovable-uploads/Partial highlights.jpg',
    category: 'Hair Color'
  },
  {
    id: '13',
    title: 'Short Cut with Bright Highlights',
    description: 'Modern short haircut enhanced with bright highlights for a bold, contemporary look.',
    image_url: '/lovable-uploads/Short hair cut and highlights.jpg',
    category: 'Hair Style'
  }
];

export const usePortfolioImages = () => {
  return useQuery({
    queryKey: ["portfolioImages"],
    queryFn: async () => {
      console.log("Fetching portfolio images...");
      
      const localImages = getLocalImages();

      const { data: supabaseImages, error } = await supabase
        .from('portfolio_images')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching portfolio images:", error);
        return localImages;
      }
      
      const allImages = [...localImages, ...supabaseImages];
      const uniqueImages = allImages.filter((item, index, self) =>
        index === self.findIndex((t) => t.image_url === item.image_url)
      );
      
      console.log("Fetched portfolio images:", uniqueImages);
      return uniqueImages;
    },
  });
};
