"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { motion, AnimatePresence } from "motion/react"
import { UserIcon, MailIcon, PhoneIcon, MessageSquareIcon } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  notes: z.string().optional(),
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
      notes: "",
    },
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container"
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
            Just a few details to complete your booking
          </p>
        </motion.div>

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
                        <Input placeholder="John Doe" {...field} className="text-lg py-3 md:py-4" />
                      </FormControl>
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
                        <Input type="email" placeholder="john@example.com" {...field} className="text-lg py-3 md:py-4" />
                      </FormControl>
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
                        <Input type="tel" placeholder="(555) 123-4567" {...field} className="text-lg py-3 md:py-4" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                key="notes-field"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
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
                          className="text-lg py-3 min-h-[120px]"
                        />
                      </FormControl>
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
              <Button type="button" variant="outline" onClick={onBack} size="lg" className="text-lg px-8 py-6">
                Back
              </Button>
              <Button
                type="submit"
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
              >
                Continue
              </Button>
            </motion.div>
          </form>
        </Form>
      </Card>
    </motion.div>
  )
}

