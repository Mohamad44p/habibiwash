"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { createTestimonial, updateTestimonial } from "@/app/actions/testimonialActions";
import type { Testimonial, TestimonialFormData } from "@/types/testimonial";
import { useEffect } from "react";

const testimonialSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(2, "Role must be at least 2 characters"),
  comment: z.string().min(10, "Comment must be at least 10 characters"),
  rating: z.number().min(1).max(5),
  service: z.string().min(2, "Service must be at least 2 characters"),
  active: z.boolean().default(true),
});

interface TestimonialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testimonial?: Testimonial;
  onSuccess: (testimonial: Testimonial) => void;
}

export function TestimonialDialog({
  open,
  onOpenChange,
  testimonial,
  onSuccess,
}: TestimonialDialogProps) {
  const form = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      rating: 5,
      active: true,
    },
  });

  // Reset form when dialog opens/closes or testimonial changes
  useEffect(() => {
    if (open && testimonial) {
      form.reset({
        name: testimonial.name,
        role: testimonial.role,
        comment: testimonial.comment,
        rating: testimonial.rating,
        service: testimonial.service,
        active: testimonial.active,
      });
    } else if (!open) {
      form.reset({
        rating: 5,
        active: true,
        name: '',
        role: '',
        comment: '',
        service: '',
      });
    }
  }, [open, testimonial, form]);

  const onSubmit = async (data: TestimonialFormData) => {
    try {
      const result = testimonial
        ? await updateTestimonial(testimonial.id, data)
        : await createTestimonial(data);

      if (result.success && result.testimonial) {
        toast({
          title: "Success",
          description: `Testimonial ${testimonial ? "updated" : "created"} successfully`,
        });
        onSuccess(result.testimonial);
      } else {
        toast({
          title: "Error",
          description: result.error || `Failed to ${testimonial ? "update" : "create"} testimonial`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {testimonial ? "Edit Testimonial" : "Add New Testimonial"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...form.register("name")} />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="role">Role (Vehicle)</Label>
            <Input id="role" {...form.register("role")} />
            {form.formState.errors.role && (
              <p className="text-sm text-destructive">
                {form.formState.errors.role.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="comment">Comment</Label>
            <Textarea id="comment" {...form.register("comment")} />
            {form.formState.errors.comment && (
              <p className="text-sm text-destructive">
                {form.formState.errors.comment.message}
              </p>
            )}
          </div>

          <div>
            <Label>Rating</Label>
            <Select
              onValueChange={(value) => form.setValue("rating", parseInt(value))}
              defaultValue={form.getValues("rating")?.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>
                    {rating} Star{rating > 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="service">Service</Label>
            <Input id="service" {...form.register("service")} />
            {form.formState.errors.service && (
              <p className="text-sm text-destructive">
                {form.formState.errors.service.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={form.watch("active")}
              onCheckedChange={(checked) => form.setValue("active", checked)}
            />
            <Label htmlFor="active">Active</Label>
          </div>

          <Button type="submit" className="w-full">
            {testimonial ? "Update" : "Create"} Testimonial
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
