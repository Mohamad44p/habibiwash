"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { addDays, format } from "date-fns"
import { Loader2, Clock } from "lucide-react"
import { getAvailableTimeSlots } from "@/app/actions/timeSlotsActions"
import { cn } from "@/lib/utils"

interface TimeSelectionProps {
  onSelect: (date: Date, time: string) => void
  onBack: () => void
}

interface TimeSlot {
  startTime: string
  isBooked: boolean
}

export default function TimeSelection({ onSelect, onBack }: TimeSelectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (selectedDate) {
      setIsLoading(true)
      getAvailableTimeSlots(selectedDate)
        .then((slots) => {
          setTimeSlots(slots)
          setSelectedTime(undefined)
        })
        .catch((error) => {
          console.error("Error fetching time slots:", error)
          setTimeSlots([])
        })
        .finally(() => setIsLoading(false))
    }
  }, [selectedDate])

  const handleTimeSelect = (time: string) => {
    if (!timeSlots.find((slot) => slot.startTime === time)?.isBooked) {
      setSelectedTime(time)
    }
  }

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Select Date & Time</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose your preferred appointment date and time from our available slots.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
        <Card className="p-8 shadow-lg bg-gradient-to-br from-background to-muted/20">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Select Date
          </h2>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
            className="rounded-lg border-2 p-6 bg-card shadow-xl"
          />
        </Card>

        <Card className="p-8 shadow-lg bg-gradient-to-br from-background to-muted/20">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {selectedDate ? `Available Times for ${format(selectedDate, "MMMM d, yyyy")}` : "Select a Date First"}
          </h2>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 max-h-[600px] overflow-y-auto pr-4">
              {timeSlots.map((slot) => (
                <motion.div
                  key={slot.startTime}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={selectedTime === slot.startTime ? "default" : "outline"}
                    className={cn(
                      "w-full h-24 relative group",
                      selectedTime === slot.startTime && "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2",
                      !slot.isBooked && "hover:border-primary hover:text-primary",
                      slot.isBooked && "bg-muted/50 border-dashed"
                    )}
                    onClick={() => handleTimeSelect(slot.startTime)}
                    disabled={slot.isBooked || !selectedDate}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <Clock className={cn(
                        "w-6 h-6 transition-transform",
                        "group-hover:scale-110 group-hover:text-primary"
                      )} />
                      <span className="text-xl font-semibold">{slot.startTime}</span>
                      {slot.isBooked && (
                        <span className="absolute bottom-2 text-sm text-red-500 font-medium">
                          Booked
                        </span>
                      )}
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="flex justify-center gap-6">
        <Button variant="outline" onClick={onBack} size="lg" className="text-lg px-8 py-6">
          Back
        </Button>
        <Button
          onClick={() => selectedDate && selectedTime && onSelect(selectedDate, selectedTime)}
          disabled={!selectedDate || !selectedTime}
          size="lg"
          className="text-lg px-8 py-6"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

