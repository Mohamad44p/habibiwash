"use client"

import { motion } from "motion/react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, type LucideIcon, Check } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { getAddOns } from "@/app/actions/addOnsActions"
import type { AddOn } from "@/types/addOn"
import { AVAILABLE_ICONS } from "@/lib/icons/icons"
import { cn } from "@/lib/utils"

interface AddOnsSelectionProps {
  selectedAddOns: string[]
  onSelect: (addOns: string[]) => void
  onBack: () => void
}

export default function AddOnsSelection({ selectedAddOns, onSelect, onBack }: AddOnsSelectionProps) {
  const [addOns, setAddOns] = useState<AddOn[]>([])
  const [selected, setSelected] = useState<string[]>(selectedAddOns)

  const loadAddOns = useCallback(async () => {
    const data = await getAddOns()
    setAddOns(data)
  }, [])

  useEffect(() => {
    loadAddOns()
  }, [loadAddOns])

  const handleSelect = (addonId: string) => {
    setSelected(prev => {
      const newSelected = prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
      return newSelected
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container max-w-screen space-y-8"
    >
      <div className="text-center space-y-4">
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex items-center justify-center gap-4"
        >
          <Sparkles className="w-8 h-8 text-primary animate-pulse" />
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Enhance Your Service
          </h1>
          <Sparkles className="w-8 h-8 text-primary animate-pulse" />
        </motion.div>
        <motion.p 
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Customize your wash with our premium add-ons for the perfect finish
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addOns.map((addon, index) => {
          const IconComponent = AVAILABLE_ICONS[addon.icon] as LucideIcon
          const isSelected = selected.includes(addon.id)

          return (
            <motion.div
              key={addon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={cn(
                  "group relative overflow-hidden cursor-pointer transition-all duration-300",
                  "hover:shadow-xl hover:shadow-primary/20 transform-gpu",
                  "border-2",
                  isSelected
                    ? "border-primary bg-primary/5 scale-[1.02]"
                    : "border-transparent hover:border-primary/50"
                )}
                onClick={() => handleSelect(addon.id)}
              >
                {/* Selection indicator */}
                {isSelected && (
                  <motion.div
                    layoutId="selection-ring"
                    className="absolute inset-0 border-2 border-primary rounded-lg"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <div className="p-6 space-y-6">
                  <div className="flex items-start gap-4">
                    {/* Icon container */}
                    <div className={cn(
                      "p-3 rounded-full transition-all duration-300",
                      isSelected
                        ? "bg-primary text-white scale-110"
                        : "bg-primary/10 text-primary group-hover:bg-primary/20"
                    )}>
                      {IconComponent && <IconComponent className="w-6 h-6" />}
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-xl font-semibold">
                          {addon.name}
                        </h3>
                        <div className={cn(
                          "flex items-center gap-2 text-lg font-bold",
                          "bg-gradient-to-r",
                          isSelected
                            ? "from-primary to-primary/80 bg-clip-text text-transparent"
                            : "text-muted-foreground"
                        )}>
                          +${addon.price.toFixed(2)}
                        </div>
                      </div>
                      <p className="text-muted-foreground line-clamp-[7]">{addon.description}</p>
                    </div>
                  </div>

                  <div className={cn(
                    "flex items-center gap-2 text-sm transition-colors",
                    isSelected ? "text-primary" : "text-muted-foreground"
                  )}>
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                      isSelected ? "border-primary" : "border-muted-foreground"
                    )}>
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                    {isSelected ? "Selected" : "Click to select"}
                  </div>
                </div>

                <div className={cn(
                  "absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-300",
                  "group-hover:opacity-100"
                )} />
              </Card>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center gap-4 pt-8"
      >
        <Button 
          variant="outline" 
          onClick={onBack} 
          size="lg" 
          className="min-w-[140px] text-lg"
        >
          Back
        </Button>
        <Button 
          onClick={() => onSelect(selected)}
          size="lg"
          className={cn(
            "min-w-[140px] text-lg",
            "bg-gradient-to-r from-primary to-primary/80",
            "hover:from-primary/90 hover:to-primary/70"
          )}
        >
          Continue {selected.length > 0 && `(${selected.length})`}
        </Button>
      </motion.div>
    </motion.div>
  )
}

