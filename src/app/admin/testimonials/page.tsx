import { Suspense } from "react";
import TestimonialsTable from "@/components/admin/testimonials/TestimonialsTable";
import { getTestimonials } from "@/app/actions/testimonialActions";

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Testimonials Management</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <TestimonialsTable initialTestimonials={testimonials} />
      </Suspense>
    </div>
  );
}
