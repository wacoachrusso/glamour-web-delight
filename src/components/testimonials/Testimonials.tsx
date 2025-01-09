import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
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
    <div className="text-center text-lg text-muted-foreground">
      {t('testimonials.loading')}
    </div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
      {testimonials?.map((testimonial) => (
        <Card key={testimonial.id} className="bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="flex flex-col items-center p-6 space-y-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={testimonial.image_url} alt={testimonial.client_name} />
              <AvatarFallback>{testimonial.client_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <blockquote className="text-center text-lg text-muted-foreground italic">
              "{testimonial.testimonial}"
            </blockquote>
            <div className="text-center">
              <div className="font-semibold text-lg">{testimonial.client_name}</div>
              <div className="text-secondary text-lg">
                {"★".repeat(testimonial.rating || 5)}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}