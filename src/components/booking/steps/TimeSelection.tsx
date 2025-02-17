"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { addDays, format } from "date-fns"
import { Loader2, Clock } from "lucide-react"
import { getAvailableTimeSlots } from "@/app/actions/timeSlotsActions"
import { cn } from "@/lib/utils"

interface TimeSelectionProps {
  selectedDate?: Date
  selectedTime?: string
  onSelect: (date: Date, time: string) => void
  onBack: () => void
}

interface TimeSlot {
  startTime: string
  isBooked: boolean
}

export default function TimeSelection({ selectedDate, selectedTime, onSelect, onBack }: TimeSelectionProps) {
  const [date, setDate] = useState<Date | undefined>(selectedDate)
  const [time, setTime] = useState<string | undefined>(selectedTime)
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchTimeSlots = useCallback(async (date: Date) => {
    setIsLoading(true)
    try {
      const slots = await getAvailableTimeSlots(date)
      setTimeSlots(slots)
    } catch (error) {
      console.error("Error fetching time slots:", error)
      setTimeSlots([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (date) {
      fetchTimeSlots(date)
    }
  }, [date, fetchTimeSlots])

  const handleTimeSelect = (selectedTime: string) => {
    if (!timeSlots.find((slot) => slot.startTime === selectedTime)?.isBooked) {
      setTime(selectedTime)
    }
  }

  const memoizedTimeSlots = useMemo(() => timeSlots, [timeSlots])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container space-y-8"
    >
      <div className="text-center space-y-4">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
        >
          Choose Your Perfect Time
        </motion.h1>
        <motion.p 
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          className="text-lg md:text-xl text-muted-foreground"
        >
          Select a convenient date and time for your wash
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 md:p-8 shadow-lg bg-gradient-to-br from-background to-muted/20">
            <h2 className="text-xl md:text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Select Date
            </h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
              className="rounded-lg border-2 p-4 md:p-6 bg-card shadow-xl"
            />
          </Card>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4 md:p-8 shadow-lg bg-gradient-to-br from-background to-muted/20">
            <h2 className="text-xl md:text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {date ? `Available Times for ${format(date, "MMMM d, yyyy")}` : "Select a Date First"}
            </h2>
            {isLoading ? (
              <div className="flex items-center justify-center h-32 md:h-64">
                <Loader2 className="w-8 h-8 md:w-12 md:h-12 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] md:max-h-[600px] overflow-y-auto pr-2 md:pr-4">
                {memoizedTimeSlots.map((slot, index) => (
                  <motion.div
                    key={`${slot.startTime}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={time === slot.startTime ? "default" : "outline"}
                      className={cn(
                        "w-full h-16 md:h-24 relative group",
                        time === slot.startTime && "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2",
                        !slot.isBooked && "hover:border-primary hover:text-primary",
                        slot.isBooked && "bg-muted/50 border-dashed",
                      )}
                      onClick={() => handleTimeSelect(slot.startTime)}
                      disabled={slot.isBooked || !date}
                    >
                      <div className="flex flex-col items-center space-y-1 md:space-y-2">
                        <Clock
                          className={cn("w-4 h-4 md:w-6 md:h-6 transition-transform", "group-hover:scale-110 group-hover:text-primary")}
                        />
                        <span className="text-lg md:text-xl font-semibold">{slot.startTime}</span>
                        {slot.isBooked && (
                          <span className="absolute bottom-1 md:bottom-2 text-sm text-red-500 font-medium">Booked</span>
                        )}
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center gap-4 mt-6"
      >
        <Button variant="outline" onClick={onBack} size="lg" className="text-lg px-6 py-3 md:px-8 md:py-4">
          Back
        </Button>
        <Button
          onClick={() => date && time && onSelect(date, time)}
          disabled={!date || !time}
          size="lg"
          className="text-lg px-6 py-3 md:px-8 md:py-4"
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  )
}

