import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Card } from "@/components/ui/card"
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
            <Card className="bg-white/95 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300 p-8 h-full flex flex-col">
              <blockquote className="flex-1 mb-6">
                <p className="text-gray-700 font-montserrat text-lg leading-relaxed italic">
                  "{testimonial.testimonial}"
                </p>
              </blockquote>
              <div className="mt-auto">
                <div className="text-secondary text-lg mb-2">
                  {"★".repeat(testimonial.rating || 5)}
                  <span className="text-gray-300">
                    {"★".repeat(5 - (testimonial.rating || 5))}
                  </span>
                </div>
                <h3 className="font-cormorant text-xl font-semibold text-gray-800">
                  {testimonial.client_name}
                </h3>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}