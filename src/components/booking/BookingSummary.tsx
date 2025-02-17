"use client"

import type React from "react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, CalendarIcon, CarIcon, PackageIcon, SparklesIcon, UserIcon } from 'lucide-react'
import { format } from "date-fns"
import { useState, useMemo } from "react"
import { createBooking } from "@/app/actions/bookingActions"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { BookingData } from "./BookingFlow"

interface BookingSummaryProps {
  bookingData: BookingData
  onEdit: (step: number) => void
  totalPrice: number;
}

export default function BookingSummary({ bookingData, onEdit, totalPrice }: BookingSummaryProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      const booking = await createBooking(bookingData)
      if (!booking?.booking) {
        throw new Error("Booking creation failed")
      }
      toast({
        title: "Booking Confirmed",
        description: "Your booking has been successfully created.",
        duration: 5000,
      })
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

  const memoizedBookingData = useMemo(() => bookingData, [bookingData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container"
    >
      <div className="text-center mb-8 md:mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
        >
          Review Your Booking
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg md:text-xl text-muted-foreground"
        >
          Please verify your booking details before confirming
        </motion.p>
      </div>

      <Card className="p-6 md:p-8 space-y-6 md:space-y-8 shadow-xl bg-gradient-to-br from-background to-muted/20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Booking Summary</h2>
          <div className="text-xl font-bold text-primary">Total: ${totalPrice?.toFixed(2)}</div>
        </div>
        <AnimatePresence>
          <SummarySection
            icon={<PackageIcon className="w-5 h-5 md:w-6 md:h-6" />}
            title="Selected Package"
            editStep={1}
            onEdit={onEdit}
          >
            <div className="font-medium text-lg">{memoizedBookingData.selectedPackage?.name}</div>
            <div className="text-muted-foreground">
              {memoizedBookingData.selectedPackage?.subPackages.find((sp) => sp.id === memoizedBookingData.selectedSubPackage)?.name}
            </div>
          </SummarySection>

          <SummarySection icon={<CarIcon className="w-5 h-5 md:w-6 md:h-6" />} title="Vehicle Type" editStep={2} onEdit={onEdit}>
            <div className="font-medium text-lg capitalize">{memoizedBookingData.vehicleType}</div>
          </SummarySection>

          <SummarySection
            icon={<CalendarIcon className="w-5 h-5 md:w-6 md:h-6" />}
            title="Appointment Time"
            editStep={3}
            onEdit={onEdit}
          >
            <div className="font-medium text-lg">
              {memoizedBookingData.selectedDate && format(memoizedBookingData.selectedDate, "MMMM d, yyyy")}
            </div>
            <div className="text-muted-foreground">{memoizedBookingData.selectedTime}</div>
          </SummarySection>

          {memoizedBookingData.selectedAddOns && memoizedBookingData.selectedAddOns.length > 0 && (
            <SummarySection
              icon={<SparklesIcon className="w-5 h-5 md:w-6 md:h-6" />}
              title="Selected Add-ons"
              editStep={4}
              onEdit={onEdit}
            >
              <div className="text-muted-foreground">
                {memoizedBookingData.selectedAddOns.length} add-on{memoizedBookingData.selectedAddOns.length !== 1 ? "s" : ""} selected
              </div>
            </SummarySection>
          )}

          <SummarySection
            icon={<UserIcon className="w-5 h-5 md:w-6 md:h-6" />}
            title="Contact Information"
            editStep={5}
            onEdit={onEdit}
          >
            <div className="space-y-1">
              <div className="font-medium text-lg">{memoizedBookingData.customerInfo?.name}</div>
              <div className="text-muted-foreground">{memoizedBookingData.customerInfo?.email}</div>
              <div className="text-muted-foreground">{memoizedBookingData.customerInfo?.phone}</div>
            </div>
          </SummarySection>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center pt-6 md:pt-8"
        >
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            size="lg"
            className="text-lg px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                Confirm Booking
              </motion.span>
            )}
          </Button>
        </motion.div>
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
      key={`summary-section-${title}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="flex items-start justify-between group bg-card hover:bg-muted/50 p-4 rounded-lg transition-all duration-300"
    >
      <div className="flex gap-4">
        <div className="mt-1 text-primary bg-primary/10 p-2 rounded-full">{icon}</div>
        <div>
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          {children}
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onEdit(editStep)}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        Edit
      </Button>
    </motion.div>
  )
}
