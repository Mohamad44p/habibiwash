"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { addDays, format, parse } from "date-fns"
import { Loader2, Clock, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DayContentProps } from "react-day-picker";

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

  const fetchTimeSlots = useCallback(async () => {
    setIsLoading(true)
    try {
      // Generate default time slots from 9AM to 5PM
      const defaultSlots: TimeSlot[] = [];
      for (let hour = 9; hour <= 17; hour++) {
        const formattedHour = hour.toString().padStart(2, '0');
        defaultSlots.push({
          startTime: `${formattedHour}:00`,
          isBooked: false
        });
      }
      setTimeSlots(defaultSlots);
    } catch (error) {
      console.error("Error setting default time slots:", error)
      setTimeSlots([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (date) {
      fetchTimeSlots()
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
      className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
    >
      <div className="text-center space-y-4">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent"
        >
          Schedule Your Wash
        </motion.h1>
        <motion.p 
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Pick a date and time that works best for you. We&apos;re available 7 days a week.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="overflow-hidden border-2 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="p-6 space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span className="inline-block p-2 rounded-full bg-primary/10">
                  <Clock className="w-5 h-5 text-primary" />
                </span>
                Select Date
              </h2>
              <div className="relative">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    
                    const compareDate = new Date(date);
                    compareDate.setHours(0, 0, 0, 0);
                    
                    return compareDate < today || date > addDays(new Date(), 30);
                  }}
                  className="rounded-md border-0 p-0"
                  classNames={{
                    months: "space-y-4",
                    month: "space-y-4",
                    caption: "flex justify-center pt-1 relative items-center mb-4",
                    caption_label: "text-sm font-semibold",
                    nav: "space-x-1 flex items-center",
                    nav_button: cn(
                      "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                      "hover:bg-primary/10 rounded-full flex items-center justify-center",
                      "disabled:opacity-30 disabled:hover:bg-transparent"
                    ),
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse",
                    head_row: "flex w-full justify-around mb-2",
                    head_cell: cn(
                      "text-muted-foreground w-9 font-medium text-[0.8rem] flex items-center justify-center"
                    ),
                    row: "flex w-full justify-around mt-2",
                    cell: cn(
                      "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                      "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                    ),
                    day: cn(
                      "h-9 w-9 p-0 font-normal rounded-full transition-all duration-200",
                      "hover:bg-primary/10 hover:text-primary focus:bg-primary/20 focus:text-primary",
                      "aria-selected:opacity-100"
                    ),
                    day_selected: cn(
                      "bg-primary text-primary-foreground hover:bg-primary/90",
                      "hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                      "shadow-sm"
                    ),
                    day_today: cn(
                      "bg-accent text-accent-foreground",
                      "hover:bg-primary/10 hover:text-primary"
                    ),
                    day_outside: "text-muted-foreground opacity-50",
                    day_disabled: "text-muted-foreground opacity-50",
                    day_hidden: "invisible",
                  }}
                  components={{
                    DayContent: (props: DayContentProps) => {
                      if (!props.date) return null;
                      
                      const currentDate = props.date instanceof Date ? props.date : new Date(props.date);
                      const selectedDate = date instanceof Date ? date : date ? new Date(date) : null;
                      const today = new Date();
                      
                      const isSelected = selectedDate && 
                        currentDate.toDateString() === selectedDate.toDateString();
                      const isToday = currentDate.toDateString() === today.toDateString();
                      
                      return (
                        <div className="relative w-full h-full flex items-center justify-center">
                          <span className={cn(
                            "flex items-center justify-center rounded-full",
                            "w-8 h-8 text-sm transition-colors",
                            isSelected && "bg-primary text-primary-foreground font-medium",
                            !isSelected && isToday && "bg-accent text-accent-foreground font-medium",
                            !isSelected && "hover:bg-primary/10"
                          )}>
                            {currentDate.getDate()}
                          </span>
                        </div>
                      );
                    },
                  }}
                />
              </div>
              {date && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-4 text-center"
                >
                  <p className="text-sm text-muted-foreground">
                    Selected: <span className="font-medium text-foreground">{format(date, "EEEE, MMMM d, yyyy")}</span>
                  </p>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="overflow-hidden border-2 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="p-6 space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span className="inline-block p-2 rounded-full bg-primary/10">
                  <Clock className="w-5 h-5 text-primary" />
                </span>
                {date ? (
                  <div className="flex flex-col">
                    <span>Available Times</span>
                    <span className="text-sm text-muted-foreground font-normal">
                      {format(date, "EEEE, MMMM d")}
                    </span>
                  </div>
                ) : (
                  "Select a Date First"
                )}
              </h2>

              {isLoading ? (
                <div className="flex items-center justify-center h-[400px]">
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">Loading available times...</p>
                  </div>
                </div>
              ) : (
                <ScrollArea className="h-[400px] pr-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {memoizedTimeSlots.map((slot, index) => {
                      const formattedTime = format(
                        parse(slot.startTime, "HH:mm", new Date()),
                        "h:mm a"
                      );
                      
                      return (
                        <motion.div
                          key={`${slot.startTime}-${index}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03 }}
                        >
                          <Button
                            variant={time === slot.startTime ? "default" : "outline"}
                            className={cn(
                              "w-full h-10 relative group transition-all duration-200",
                              time === slot.startTime && "ring-1 ring-primary ring-offset-1",
                              !slot.isBooked && "hover:border-primary/50 hover:bg-primary/5",
                              slot.isBooked && "bg-muted/50 border-dashed cursor-not-allowed"
                            )}
                            onClick={() => handleTimeSelect(slot.startTime)}
                            disabled={slot.isBooked || !date}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-sm font-medium">
                                {formattedTime}
                              </span>
                              {time === slot.startTime && (
                                <CheckCircle className="w-3 h-3 text-primary-foreground" />
                              )}
                              {slot.isBooked && (
                                <span className="text-xs text-muted-foreground">
                                  Full
                                </span>
                              )}
                            </div>
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>
                </ScrollArea>
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center gap-4 pt-6"
      >
        <Button 
          variant="outline" 
          onClick={onBack} 
          size="lg"
          className="min-w-[120px] font-medium"
        >
          Back
        </Button>
        <Button
          onClick={() => date && time && onSelect(date, time)}
          disabled={!date || !time}
          size="lg"
          className="min-w-[120px] font-medium"
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  );
}

