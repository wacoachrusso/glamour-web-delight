import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

const fetchTestimonials = async () => {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export function Testimonials() {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  })
  const { t } = useTranslation()

  if (isLoading) return (
    <div className="text-center text-lg text-muted-foreground animate-pulse">
      {t('testimonials.loading')}
    </div>
  )

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-50" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 relative z-10">
        {testimonials?.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="w-16 h-16 border-2 border-primary shadow-md">
                  <AvatarImage 
                    src={testimonial.image_url || `https://images.unsplash.com/photo-${
                      [
                        '1649972904349-6e44c42644a7',
                        '1486312338219-ce68d2c6f44d',
                        '1581091226825-a6a2a5aee158',
                        '1519389950473-47ba0277781c',
                        '1581092795360-fd1ca04f0952',
                        '1605810230434-7631ac76ec81'
                      ][index % 6]
                    }?auto=format&fit=crop&w=150&h=150&q=80`} 
                    alt={testimonial.client_name} 
                  />
                  <AvatarFallback className="bg-primary/20 text-primary-foreground font-cormorant text-xl">
                    {testimonial.client_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-cormorant text-xl font-semibold text-gray-800">
                    {testimonial.client_name}
                  </h3>
                  <div className="text-secondary text-lg mt-1">
                    {"★".repeat(testimonial.rating || 5)}
                    <span className="text-gray-300">
                      {"★".repeat(5 - (testimonial.rating || 5))}
                    </span>
                  </div>
                </div>
              </div>
              <blockquote className="flex-1">
                <p className="text-gray-600 font-montserrat leading-relaxed italic">
                  "{testimonial.testimonial}"
                </p>
              </blockquote>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}