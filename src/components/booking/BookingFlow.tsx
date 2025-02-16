"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import type { Package } from "@/types/package"
import PackageSelection from "./steps/PackageSelection"
import { Steps } from "./Steps"
import VehicleSelection from "./steps/VehicleSelection"
import TimeSelection from "./steps/TimeSelection"
import AddOnsSelection from "./steps/AddOnsSelection"
import BookingForm from "./steps/BookingForm"
import BookingSummary from "./steps/BookingSummary"
import { useLocalStorage } from "@/lib/useLocalStorage"

interface BookingFlowProps {
  initialPackages: Package[]
}

export type BookingData = {
  selectedPackage?: Package
  selectedSubPackage?: string
  vehicleType?: string
  selectedDate?: Date
  selectedTime?: string
  selectedAddOns?: string[]
  customerInfo?: {
    name: string
    email: string
    phone: string
    notes?: string
  }
}

export default function BookingFlow({ initialPackages }: BookingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useLocalStorage<BookingData>("bookingData", {})

  const handleStepChange = useCallback(
    (newStep: number) => {
      if (newStep < currentStep || isStepValid(currentStep)) {
        setCurrentStep(newStep)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentStep],
  )

  const isStepValid = useCallback(
    (step: number): boolean => {
      switch (step) {
        case 1:
          return !!bookingData.selectedPackage
        case 2:
          return !!bookingData.vehicleType
        case 3:
          return !!bookingData.selectedDate && !!bookingData.selectedTime
        case 4:
          return true // Add-ons are optional
        case 5:
          return !!bookingData.customerInfo?.name
        default:
          return false
      }
    },
    [bookingData],
  )

  const steps = [
    { title: "Select Package", completed: !!bookingData.selectedPackage },
    { title: "Vehicle Type", completed: !!bookingData.vehicleType },
    { title: "Select Time", completed: !!bookingData.selectedTime },
    { title: "Add-ons", completed: true }, // Optional
    { title: "Your Details", completed: !!bookingData.customerInfo },
  ]

  return (
    <div className="w-full max-w-7xl px-4">
      <Steps currentStep={currentStep} steps={steps} />

      <div className="mt-8 flex justify-center">
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && (
                <PackageSelection
                  packages={initialPackages}
                  selected={bookingData.selectedPackage}
                  onSelect={(pkg, subPkg) => {
                    setBookingData((prev: BookingData) => ({
                      ...prev,
                      selectedPackage: pkg as Package,
                      selectedSubPackage: subPkg as string,
                    }))
                    handleStepChange(2)
                  }}
                />
              )}

              {currentStep === 2 && (
                <VehicleSelection
                  onSelect={(type) => {
                    setBookingData((prev: BookingData) => ({ ...prev, vehicleType: type as string }))
                    handleStepChange(3)
                  }}
                  onBack={() => handleStepChange(1)}
                />
              )}

              {currentStep === 3 && (
                <TimeSelection
                  onSelect={(date, time) => {
                    setBookingData((prev: BookingData) => ({
                      ...prev,
                      selectedDate: date,
                      selectedTime: time,
                    }))
                    handleStepChange(4)
                  }}
                  onBack={() => handleStepChange(2)}
                />
              )}

              {currentStep === 4 && (
                <AddOnsSelection
                  onSelect={(addOns) => {
                    setBookingData((prev: BookingData) => ({ ...prev, selectedAddOns: addOns }))
                    handleStepChange(5)
                  }}
                  onBack={() => handleStepChange(3)}
                />
              )}

              {currentStep === 5 && (
                <BookingForm
                  onSubmit={(customerInfo) => {
                    setBookingData((prev: BookingData) => ({ ...prev, customerInfo }))
                    handleStepChange(6)
                  }}
                  onBack={() => handleStepChange(4)}
                  initialData={bookingData.customerInfo}
                />
              )}

              {currentStep === 6 && <BookingSummary bookingData={bookingData} onEdit={setCurrentStep} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

