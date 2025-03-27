"use server";

import db from "../db/db";
import { revalidatePath } from "next/cache";
import type { TestimonialFormData, Testimonial } from "@/types/testimonial";

export async function createTestimonial(data: TestimonialFormData) {
  try {
    const testimonial = await db.testimonial.create({
      data
    });
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true, testimonial: formatTestimonial(testimonial) };
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return { success: false, error: "Failed to create testimonial" };
  }
}

export async function updateTestimonial(id: string, data: TestimonialFormData) {
  try {
    const testimonial = await db.testimonial.update({
      where: { id },
      data
    });
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true, testimonial: formatTestimonial(testimonial) };
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return { success: false, error: "Failed to update testimonial" };
  }
}

function formatTestimonial(testimonial: {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  service: string;
  active: boolean;
  imageUrl?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}): Testimonial {
  return {
    ...testimonial,
    imageUrl: testimonial.imageUrl || undefined,
    createdAt: new Date(testimonial.createdAt),
    updatedAt: new Date(testimonial.updatedAt),
  };
}

export async function deleteTestimonial(id: string) {
  try {
    await db.testimonial.delete({
      where: { id }
    });
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return { success: false, error: "Failed to delete testimonial" };
  }
}

export async function getTestimonials(activeOnly = false) {
  try {
    const testimonials = await db.testimonial.findMany({
      where: activeOnly ? { active: true } : undefined,
      orderBy: { createdAt: "desc" }
    });
    return testimonials.map(formatTestimonial);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}
