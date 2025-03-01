"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { motion, AnimatePresence } from "motion/react"
import { UserIcon, MailIcon, PhoneIcon, MessageSquareIcon, AlertCircle, HomeIcon } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

const phoneRegex = /^(\+\d{1,3}[-.]?)?\s*(?:\(?\d{3}\)?[-.]?\s*)?\d{3}[-.]?\s*\d{4}$/;

const formSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
  email: z.string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters"),
  phone: z.string()
    .regex(phoneRegex, "Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 digits"),
  street: z.string()
    .min(5, "Street address must be at least 5 characters")
    .max(100, "Street address must be less than 100 characters"),
  city: z.string()
    .min(2, "City must be at least 2 characters")
    .max(50, "City must be less than 50 characters"),
  state: z.string()
    .min(2, "State must be at least 2 characters")
    .max(50, "State must be less than 50 characters"),
  zipCode: z.string()
    .min(5, "Zip code must be at least 5 characters")
    .max(10, "Zip code must be less than 10 characters"),
  country: z.string()
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country must be less than 50 characters")
    .default("United States"),
  notes: z.string()
    .max(500, "Notes must be less than 500 characters")
    .optional(),
})

interface BookingFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void
  onBack: () => void
  initialData?: z.infer<typeof formSchema>
}

export default function BookingForm({ onSubmit, onBack, initialData }: BookingFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      notes: "",
    },
    mode: "onChange",
  })

  const { formState: { errors, isValid, isSubmitting } } = form;

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container max-w-screen"
    >
      <Card className="p-6 md:p-8 shadow-xl bg-gradient-to-br from-background to-muted/20">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center space-y-4 mb-6 md:mb-8"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Almost There!
          </h2>
          <p className="text-xl text-muted-foreground">
            Please provide your contact details
          </p>
        </motion.div>

        {hasErrors && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please fix the errors below to continue
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
            <AnimatePresence>
              <motion.div
                key="name-field"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-lg">
                        <UserIcon className="w-5 h-5 text-primary" />
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe" 
                          {...field} 
                          className={cn(
                            "text-lg py-3 md:py-4",
                            errors.name && "border-destructive focus-visible:ring-destructive"
                          )}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter your full name as it appears on official documents
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                key="contact-fields"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="grid gap-6 md:gap-8 sm:grid-cols-2"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-lg">
                        <MailIcon className="w-5 h-5 text-primary" />
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="john@example.com" 
                          {...field} 
                          className={cn(
                            "text-lg py-3 md:py-4",
                            errors.email && "border-destructive focus-visible:ring-destructive"
                          )}
                        />
                      </FormControl>
                      <FormDescription>
                        We&apos;ll send booking confirmation to this email
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-lg">
                        <PhoneIcon className="w-5 h-5 text-primary" />
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="tel" 
                          placeholder="(555) 123-4567" 
                          {...field} 
                          className={cn(
                            "text-lg py-3 md:py-4",
                            errors.phone && "border-destructive focus-visible:ring-destructive"
                          )}
                        />
                      </FormControl>
                      <FormDescription>
                        For booking updates and notifications
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                key="address-fields"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <HomeIcon className="w-5 h-5 text-primary" />
                  Address Information
                </h3>
                
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="flex items-center gap-2">
                        Street Address
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="123 Main St" 
                          {...field} 
                          className={cn(
                            "text-lg py-3 md:py-4",
                            errors.street && "border-destructive focus-visible:ring-destructive"
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="City" 
                            {...field} 
                            className={cn(
                              "text-lg py-3 md:py-4",
                              errors.city && "border-destructive focus-visible:ring-destructive"
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="State" 
                            {...field} 
                            className={cn(
                              "text-lg py-3 md:py-4",
                              errors.state && "border-destructive focus-visible:ring-destructive"
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 mt-4">
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="12345" 
                            {...field} 
                            className={cn(
                              "text-lg py-3 md:py-4",
                              errors.zipCode && "border-destructive focus-visible:ring-destructive"
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Country" 
                            {...field} 
                            className={cn(
                              "text-lg py-3 md:py-4",
                              errors.country && "border-destructive focus-visible:ring-destructive"
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </motion.div>

              <motion.div
                key="notes-field"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-lg">
                        <MessageSquareIcon className="w-5 h-5 text-primary" />
                        Special Notes (Optional)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any special requests or information..."
                          {...field}
                          className={cn(
                            "text-lg py-3 min-h-[120px] resize-none",
                            errors.notes && "border-destructive focus-visible:ring-destructive"
                          )}
                        />
                      </FormControl>
                      <FormDescription>
                        Add any special instructions or requests for your booking
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-6 pt-6"
            >
              <Button 
                type="button" 
                variant="outline" 
                onClick={onBack} 
                size="lg" 
                className="text-lg px-8 py-6"
              >
                Back
              </Button>
              <Button
                type="submit"
                size="lg"
                disabled={!isValid || isSubmitting}
                className={cn(
                  "text-lg px-8 py-6",
                  "bg-gradient-to-r from-primary to-primary/80",
                  "hover:from-primary/90 hover:to-primary/70",
                  "transition-all duration-300",
                  !isValid && "opacity-50 cursor-not-allowed"
                )}
              >
                Continue
              </Button>
            </motion.div>
          </form>
        </Form>
      </Card>
    </motion.div>
  );
}

