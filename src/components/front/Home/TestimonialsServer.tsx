import { getTestimonials } from "@/app/actions/testimonialActions";
import Testimonials from "./Testimonials";

export default async function TestimonialsServer() {
  const testimonials = await getTestimonials(true);
  return <Testimonials testimonials={testimonials} />;
}
