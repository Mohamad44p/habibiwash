"use client"

import { motion } from "motion/react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMemo, useEffect, useState } from "react"

interface StepProps {
  currentStep: number
  steps: Array<{
    title: string
    completed: boolean
  }>
  onStepClick?: (step: number) => void
  className?: string
}

export function Steps({ currentStep, steps, onStepClick, className }: StepProps) {
  const [isMounted, setIsMounted] = useState(false)
  const memoizedSteps = useMemo(() => steps, [steps])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const progressWidth = isMounted 
    ? `${((currentStep - 1) / (memoizedSteps.length - 1)) * 100}%`
    : "0%"

  return (
    <nav 
      className={cn("max-w-full md:max-w-4xl mx-auto", className)}
      aria-label="Booking progress"
    >
      <div className="relative flex justify-between items-center">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted rounded-full" />

        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-primary to-primary/80 rounded-full"
          style={{ width: progressWidth }}
          transition={{ duration: 0.3 }}
        />

        {memoizedSteps.map((step, index) => (
          <motion.button
            key={index}
            type="button"
            disabled={!step.completed && index + 1 !== currentStep}
            onClick={() => onStepClick?.(index + 1)}
            className={cn(
              "relative flex flex-col items-center",
              (step.completed || index + 1 === currentStep) && "cursor-pointer",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full"
            )}
            whileHover={step.completed ? { scale: 1.05 } : undefined}
            whileTap={step.completed ? { scale: 0.95 } : undefined}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <div
                className={cn(
                  "w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10",
                  currentStep > index + 1 || step.completed
                    ? "border-primary bg-primary text-white"
                    : currentStep === index + 1
                      ? "border-primary bg-white text-primary"
                      : "border-muted bg-background text-muted-foreground",
                )}
              >
                {step.completed || currentStep > index + 1 ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Check className="w-5 h-5 md:w-7 md:h-7" />
                  </motion.div>
                ) : (
                  <span className="text-sm md:text-lg font-medium">{index + 1}</span>
                )}
              </div>

              {currentStep === index + 1 && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary"
                  initial={{ opacity: 0.5, scale: 1 }}
                  animate={{ opacity: 0, scale: 1.5 }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeOut",
                  }}
                />
              )}
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={cn(
                "absolute -bottom-6 md:-bottom-8 text-xs md:text-sm font-medium whitespace-nowrap transition-colors duration-300",
                currentStep === index + 1
                  ? "text-primary"
                  : step.completed
                    ? "text-foreground"
                    : "text-muted-foreground",
              )}
            >
              {step.title}
            </motion.span>
          </motion.button>
        ))}
      </div>
    </nav>
  )
}

