export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  service: string;
  active: boolean;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TestimonialFormData = Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>;
