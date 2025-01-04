import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeader from "./shared/SectionHeader";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    text: "Absolutely love this salon! The staff is incredibly professional and the atmosphere is so relaxing. My hair has never looked better!",
    rating: 5,
    image: "/lovable-uploads/2d83d154-d2c7-4d46-b712-8a6b5d698c37.png",
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    text: "The attention to detail and personalized service is outstanding. I won't trust my hair to anyone else!",
    rating: 5,
    image: "/lovable-uploads/61e5db9a-2533-4a68-a338-13395392c7ed.png",
  },
  {
    id: 3,
    name: "Emily Chen",
    text: "Found my go-to salon! The stylists are true artists and the results always exceed my expectations.",
    rating: 5,
    image: "/lovable-uploads/513dcf5a-b256-4137-a428-3656375e1aa4.png",
  },
];

const Testimonials = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-muted/50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader 
          titleKey="testimonials.title"
          highlightKey="testimonials.highlight"
          subtitleKey="testimonials.subtitle"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-secondary/10"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-playfair text-lg font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-secondary text-secondary"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;