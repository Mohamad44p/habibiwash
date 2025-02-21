"use client";

import { motion } from "motion/react";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitQuote } from "@/app/actions/quoteActions";
import type { QuoteFormData } from "@/types/quote";
import { toast } from "@/hooks/use-toast";
import { exteriorServices, interiorServices } from "@/lib/constants/services";

const quoteFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  vehicle: z.string().min(3, "Vehicle information is required"),
  zipCode: z.string().optional(),
  exteriorServices: z.array(z.string()).min(1, "Please select at least one exterior service"),
  interiorServices: z.array(z.string()),
  contactMethod: z.string().min(1, "Please select a contact method"),
  message: z.string().optional(),
  newsletter: z.boolean().default(false),
});
type FormInputProps = ComponentPropsWithoutRef<typeof Input> & {
  error?: string;
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ error, ...props }, ref) => (
    <div className="space-y-2">
      <Input ref={ref} {...props} className={error ? "border-destructive" : ""} />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
);
FormInput.displayName = "FormInput";
FormInput.displayName = "FormInput";

export default function QuoteForm() {
  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      exteriorServices: [],
      interiorServices: [],
      newsletter: false,
      contactMethod: "",
    },
  });

  const { formState: { errors, isSubmitting }, reset } = form;

  const onSubmit = async (data: QuoteFormData) => {
    try {
      const result = await submitQuote(data);
      if (result.success) {
        toast({
          title: "Success",
          description: "Quote request submitted successfully!",
        });
        reset();
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to submit quote request",
          variant: "destructive",
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while submitting the quote",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative min-h-screen pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4">Get a Quote</Badge>
          <h1 className="text-4xl font-bold mb-4">
            Request a{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Custom Quote
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tell us about your vehicle and the services you&apos;re interested
            in, and we&apos;ll provide you with a detailed quote.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 sm:p-8 shadow-lg">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name*</Label>
                  <FormInput
                    id="firstName"
                    {...form.register("firstName")}
                    error={errors.firstName?.message}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name*</Label>
                  <FormInput
                    id="lastName"
                    {...form.register("lastName")}
                    error={errors.lastName?.message}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email*</Label>
                  <FormInput
                    id="email"
                    {...form.register("email")}
                    type="email"
                    error={errors.email?.message}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number*</Label>
                  <FormInput
                    id="phone"
                    {...form.register("phone")}
                    type="tel"
                    error={errors.phone?.message}
                  />
                </div>
                <div>
                  <Label htmlFor="vehicle">Vehicle Year & Model*</Label>
                  <FormInput
                    id="vehicle"
                    {...form.register("vehicle")}
                    error={errors.vehicle?.message}
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <FormInput
                    id="zipCode"
                    {...form.register("zipCode")}
                    error={errors.zipCode?.message}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Exterior Services (click all that apply)*</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {exteriorServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={service.id}
                        value={service.id}
                        checked={form.watch("exteriorServices").includes(service.id)}
                        onCheckedChange={(checked) => {
                          const current = form.getValues("exteriorServices");
                          if (checked) {
                            form.setValue("exteriorServices", [...current, service.id]);
                          } else {
                            form.setValue(
                              "exteriorServices",
                              current.filter((id) => id !== service.id)
                            );
                          }
                        }}
                      />
                      <Label htmlFor={service.id} className="font-normal">
                        {service.label}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.exteriorServices && (
                  <p className="text-sm text-destructive">{errors.exteriorServices.message}</p>
                )}
              </div>

              <div className="space-y-4">
                <Label>Interior Services (optional)</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {interiorServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={service.id}
                        value={service.id}
                        checked={form.watch("interiorServices").includes(service.id)}
                        onCheckedChange={(checked) => {
                          const current = form.getValues("interiorServices");
                          if (checked) {
                            form.setValue("interiorServices", [...current, service.id]);
                          } else {
                            form.setValue(
                              "interiorServices",
                              current.filter((id) => id !== service.id)
                            );
                          }
                        }}
                      />
                      <Label htmlFor={service.id} className="font-normal">
                        {service.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Contact Method*</Label>
                <Select 
                  onValueChange={(value) => form.setValue("contactMethod", value)}
                  value={form.watch("contactMethod")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select contact method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">Phone Call</SelectItem>
                    <SelectItem value="text">Text Message</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
                {errors.contactMethod && (
                  <p className="text-sm text-destructive">{errors.contactMethod.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Additional Message</Label>
                <Textarea
                  id="message"
                  {...form.register("message")}
                  placeholder="Any additional details or special requests..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  {...form.register("newsletter")}
                  id="newsletter"
                />
                <Label htmlFor="newsletter" className="font-normal">
                  Yes, subscribe me to your newsletter.
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </div>
                ) : (
                  "Submit Quote Request"
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
