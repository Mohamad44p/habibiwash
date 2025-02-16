"use client"

import type React from "react"

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, CalendarIcon, CarIcon, PackageIcon, SparklesIcon, UserIcon } from "lucide-react"
import { format } from "date-fns"
import type { BookingData } from "../BookingFlow"
import { useState } from "react"
import { createBooking } from "@/app/actions/bookingActions"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

interface BookingSummaryProps {
  bookingData: BookingData
  onEdit: (step: number) => void
}

export default function BookingSummary({ bookingData, onEdit }: BookingSummaryProps) {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Review Your Booking</h1>
        <p className="text-muted-foreground">Please verify your booking details before confirming</p>
      </div>

      <Card className="p-6 space-y-6 shadow-lg">
        <SummarySection
          icon={<PackageIcon className="w-5 h-5" />}
          title="Selected Package"
          editStep={1}
          onEdit={onEdit}
        >
          <div className="font-medium">{bookingData.selectedPackage?.name}</div>
          <div className="text-sm text-muted-foreground">
            {bookingData.selectedPackage?.subPackages.find((sp) => sp.id === bookingData.selectedSubPackage)?.name}
          </div>
        </SummarySection>

        <SummarySection icon={<CarIcon className="w-5 h-5" />} title="Vehicle Type" editStep={2} onEdit={onEdit}>
          <div className="font-medium capitalize">{bookingData.vehicleType}</div>
        </SummarySection>

        <SummarySection
          icon={<CalendarIcon className="w-5 h-5" />}
          title="Appointment Time"
          editStep={3}
          onEdit={onEdit}
        >
          <div className="font-medium">
            {bookingData.selectedDate && format(bookingData.selectedDate, "MMMM d, yyyy")}
          </div>
          <div className="text-sm text-muted-foreground">{bookingData.selectedTime}</div>
        </SummarySection>

        {bookingData.selectedAddOns && bookingData.selectedAddOns.length > 0 && (
          <SummarySection
            icon={<SparklesIcon className="w-5 h-5" />}
            title="Selected Add-ons"
            editStep={4}
            onEdit={onEdit}
          >
            <div className="text-sm text-muted-foreground">
              {bookingData.selectedAddOns.length} add-on{bookingData.selectedAddOns.length !== 1 ? "s" : ""} selected
            </div>
          </SummarySection>
        )}

        <SummarySection
          icon={<UserIcon className="w-5 h-5" />}
          title="Contact Information"
          editStep={5}
          onEdit={onEdit}
        >
          <div className="space-y-1">
            <div className="font-medium">{bookingData.customerInfo?.name}</div>
            <div className="text-sm text-muted-foreground">{bookingData.customerInfo?.email}</div>
            <div className="text-sm text-muted-foreground">{bookingData.customerInfo?.phone}</div>
          </div>
        </SummarySection>

        <div className="flex justify-center pt-4">
          <Button onClick={handleSubmit} disabled={isSubmitting} size="lg">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm Booking
          </Button>
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
    <div className="flex items-start justify-between group">
      <div className="flex gap-3">
        <div className="mt-1 text-primary">{icon}</div>
        <div>
          <h3 className="font-medium mb-1">{title}</h3>
          {children}
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onEdit(editStep)}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        Edit
      </Button>
    </div>
  )
}

