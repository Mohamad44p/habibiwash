"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepProps {
  currentStep: number;
  steps: Array<{
    title: string;
    completed: boolean;
  }>;
  onStepClick?: (step: number) => void;
}

export function Steps({ currentStep, steps, onStepClick }: StepProps) {
  return (
    <div className="max-w-4xl mx-auto mb-12 px-4">
      <div className="relative flex justify-between items-center">
        {/* Background line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted rounded-full" />

        {/* Progress line */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full"
          initial={{ width: "0%" }}
          animate={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              "relative flex flex-col items-center",
              onStepClick && step.completed && "cursor-pointer"
            )}
            onClick={() => onStepClick && step.completed && onStepClick(index + 1)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10",
                  currentStep > index + 1 || step.completed
                    ? "border-primary bg-primary text-white"
                    : currentStep === index + 1
                    ? "border-primary bg-white text-primary"
                    : "border-muted bg-background text-muted-foreground"
                )}
              >
                {step.completed || currentStep > index + 1 ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Check className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>

              {/* Pulse animation for current step */}
              {currentStep === index + 1 && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary"
                  initial={{ opacity: 0.5, scale: 1 }}
                  animate={{ opacity: 0, scale: 1.5 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              )}
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className={cn(
                "absolute -bottom-8 text-sm font-medium whitespace-nowrap transition-colors duration-300",
                currentStep === index + 1
                  ? "text-primary"
                  : step.completed
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {step.title}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  );
}
