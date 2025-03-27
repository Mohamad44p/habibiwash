/* eslint-disable @next/next/no-img-element */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
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
import { UploadCloud, X } from "lucide-react";

const testimonialSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(2, "Role must be at least 2 characters"),
  comment: z.string().min(10, "Comment must be at least 10 characters"),
  rating: z.number().min(1).max(5),
  service: z.string().min(2, "Service must be at least 2 characters"),
  active: z.boolean().default(true),
  imageUrl: z.string().optional(),
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
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
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
        imageUrl: testimonial.imageUrl,
      });
      
      if (testimonial.imageUrl) {
        setImagePreview(testimonial.imageUrl);
      }
    } else if (!open) {
      form.reset({
        rating: 5,
        active: true,
        name: '',
        role: '',
        comment: '',
        service: '',
      });
      setImagePreview(null);
    }
  }, [open, testimonial, form]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Preview the image locally
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Upload to Vercel Blob
    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      
      const { url } = await response.json();
      form.setValue("imageUrl", url);
      
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };
  
  const handleRemoveImage = () => {
    form.setValue("imageUrl", undefined);
    setImagePreview(null);
  };

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
          
          <div className="space-y-2">
            <Label>Customer Image</Label>
            <div className="flex flex-col items-center gap-2">
              {imagePreview ? (
                <div className="relative w-24 h-24 overflow-hidden rounded-full border border-border">
                  <img
                    src={imagePreview}
                    alt="Customer"
                    className="object-cover w-full h-full"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-0 right-0 size-6"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-lg p-4 text-center bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer w-full">
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <UploadCloud className="w-8 h-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {uploading ? "Uploading..." : "Upload customer image"}
                    </span>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
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

          <Button 
            type="submit" 
            className="w-full"
            disabled={uploading}
          >
            {testimonial ? "Update" : "Create"} Testimonial
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
