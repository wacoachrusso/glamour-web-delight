import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const fetchTestimonials = async () => {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export function TestimonialCarousel() {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  })

  if (isLoading) return <div>Loading testimonials...</div>

  return (
    <Carousel className="w-full max-w-4xl mx-auto px-16">
      <CarouselContent>
        {testimonials?.map((testimonial) => (
          <CarouselItem key={testimonial.id}>
            <Card className="border-none shadow-none">
              <CardContent className="flex flex-col items-center p-6">
                <Avatar className="w-20 h-20 mb-4">
                  <AvatarImage src={testimonial.image_url} alt={testimonial.client_name} />
                  <AvatarFallback>{testimonial.client_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <blockquote className="text-center text-lg text-muted-foreground mb-4">
                  "{testimonial.testimonial}"
                </blockquote>
                <div className="text-center">
                  <div className="font-semibold">{testimonial.client_name}</div>
                  <div className="text-sm text-muted-foreground">
                    {"★".repeat(testimonial.rating || 5)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}