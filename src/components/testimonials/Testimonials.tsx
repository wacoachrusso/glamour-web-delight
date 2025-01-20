import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useTranslation } from "react-i18next"
import { FeatureSteps } from "@/components/ui/feature-steps"

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

  const features = testimonials?.map((testimonial) => ({
    step: testimonial.client_name,
    title: "★".repeat(testimonial.rating || 5),
    content: testimonial.testimonial,
    image: testimonial.image_url || '/placeholder.svg'
  })) || []

  return (
    <FeatureSteps
      features={features}
      title={t('testimonials.title')}
      autoPlayInterval={5000}
      className="bg-muted/30 backdrop-blur-sm"
    />
  )
}