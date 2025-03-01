"use client"

import type React from "react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, PackageIcon, CarIcon, CalendarIcon, SparklesIcon, UserIcon, HomeIcon } from 'lucide-react'
import type { BookingData } from "../BookingFlow"
import { useState } from "react"
import { createBooking } from "@/app/actions/bookingActions"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { sendBookingConfirmationEmail } from "@/app/actions/server/emailActions"

interface BookingSummaryProps {
  bookingData: BookingData
  onEdit: (step: number) => void
  totalPrice: number
}

export default function BookingSummary({ bookingData, onEdit, totalPrice }: BookingSummaryProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      
      // Create booking
      const booking = await createBooking(bookingData)
      if (!booking?.booking) {
        throw new Error("Booking creation failed")
      }

      try {
        // Send confirmation email
        await sendBookingConfirmationEmail(bookingData, totalPrice)
        toast({
          title: "Booking Confirmed",
          description: "Your booking has been successfully created. Check your email for confirmation details.",
          duration: 5000,
        })
      } catch (emailError) {
        console.error('Email sending failed:', emailError)
        // Still show success but mention email issue
        toast({
          title: "Booking Confirmed",
          description: "Your booking was created but we couldn't send the confirmation email. Please contact support.",
          duration: 5000,
        })
      }
      
      router.push(`/booking/confirmation/${booking.booking.id}`)
    } catch (error) {
      console.error(error)
      toast({
        title: "Booking Failed",
        description: "There was an error creating your booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const sections = [
    {
      icon: <PackageIcon className="w-6 h-6" />,
      title: "Package Details",
      editStep: 1,
      content: (
        <>
          <div className="font-medium text-lg">{bookingData.selectedPackage?.name}</div>
          <div className="text-muted-foreground">
            {bookingData.selectedPackage?.subPackages.find(
              (sp) => sp.id === bookingData.selectedSubPackage
            )?.name}
          </div>
        </>
      ),
    },
    {
      icon: <CarIcon className="w-6 h-6" />,
      title: "Vehicle Type",
      editStep: 3,
      content: (
        <div className="font-medium text-lg capitalize">
          {bookingData.vehicleType}
        </div>
      ),
    },
    {
      icon: <CalendarIcon className="w-6 h-6" />,
      title: "Appointment Time",
      editStep: 4,
      content: (
        <>
          <div className="font-medium text-lg">
            {bookingData.selectedDate && format(bookingData.selectedDate, "EEEE, MMMM d, yyyy")}
          </div>
          <div className="text-muted-foreground">
            {bookingData.selectedTime}
          </div>
        </>
      ),
    },
    ...(bookingData.selectedAddOns && bookingData.selectedAddOns.length > 0 ? [{
      icon: <SparklesIcon className="w-6 h-6" />,
      title: "Selected Add-ons",
      editStep: 5,
      content: (
        <>
          <div className="font-medium text-lg">
            {bookingData.selectedAddOns.length} {bookingData.selectedAddOns.length === 1 ? 'Add-on' : 'Add-ons'}
          </div>
          <div className="text-muted-foreground">
            {bookingData.selectedPackage?.addOns
              ?.filter(addon => bookingData.selectedAddOns?.includes(addon.id))
              .map(addon => addon.name)
              .join(', ')}
          </div>
        </>
      ),
    }] : []),
    {
      icon: <UserIcon className="w-6 h-6" />,
      title: "Contact Information",
      editStep: 6,
      content: (
        <div className="space-y-1">
          <div className="font-medium text-lg">{bookingData.customerInfo?.name}</div>
          <div className="text-muted-foreground">{bookingData.customerInfo?.email}</div>
          <div className="text-muted-foreground">{bookingData.customerInfo?.phone}</div>
          {bookingData.customerInfo?.notes && (
            <div className="text-sm text-muted-foreground italic mt-2">
              Note: {bookingData.customerInfo.notes}
            </div>
          )}
        </div>
      ),
    },
    {
      icon: <HomeIcon className="w-6 h-6" />,
      title: "Service Address",
      editStep: 6,
      content: (
        <div className="space-y-1">
          <div className="font-medium text-lg">{bookingData.customerInfo?.street}</div>
          <div className="text-muted-foreground">
            {bookingData.customerInfo?.city}, {bookingData.customerInfo?.state} {bookingData.customerInfo?.zipCode}
          </div>
          <div className="text-muted-foreground">{bookingData.customerInfo?.country}</div>
        </div>
      ),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex items-center justify-center gap-4 mb-4"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Review & Confirm
          </h1>
        </motion.div>
      </div>

      <Card className="overflow-hidden border-2 shadow-xl bg-gradient-to-br from-background to-muted/20">
        <div className="bg-primary text-primary-foreground p-6 text-center">
          <h3 className="text-xl font-medium mb-1">Total Amount</h3>
          <div className="text-3xl font-bold">${totalPrice.toFixed(2)}</div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="divide-y divide-border/50">
            <AnimatePresence mode="wait">
              {sections.map((section) => (
                <SummarySection
                  key={section.title}
                  icon={section.icon}
                  title={section.title}
                  editStep={section.editStep}
                  onEdit={onEdit}
                >
                  {section.content}
                </SummarySection>
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 pt-6 border-t"
          >
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              size="lg"
              className="w-full text-lg py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Confirm Booking
                  <span className="text-xl">→</span>
                </span>
              )}
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              By clicking confirm, you agree to our terms and conditions
            </p>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}

interface SummarySectionProps {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
  editStep: number
  onEdit: (step: number) => void
}

function SummarySection({ icon, title, children, editStep, onEdit }: SummarySectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="py-4"
    >
      <div className="flex items-start justify-between rounded-lg p-4 transition-colors hover:bg-muted/50">
        <div className="flex items-center gap-4">
          <div className="shrink-0 w-12 h-12 flex items-center justify-center text-primary bg-primary/10 rounded-full">
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-lg">{title}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(editStep)}
                className="h-7 px-2 text-xs font-medium text-primary hover:text-primary hover:bg-primary/10"
              >
                Edit
              </Button>
            </div>
            <div className="mt-1">{children}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
