"use client"

import { motion } from "motion/react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, type LucideIcon } from "lucide-react"
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

  const handleContinue = () => {
    onSelect(selected)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container space-y-8"
    >
      <div className="text-center space-y-4">
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex items-center justify-center gap-4"
        >
          <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary animate-pulse" />
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Enhance Your Service
          </h1>
          <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary animate-pulse" />
        </motion.div>
        <motion.p 
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          className="text-lg md:text-xl text-muted-foreground"
        >
          Choose from our premium add-ons to perfect your wash
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {addOns.map((addon) => {
          const IconComponent = AVAILABLE_ICONS[addon.icon] as LucideIcon
          return (
            <motion.div
              key={addon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.1 }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={cn(
                  "p-4 md:p-6 cursor-pointer transition-all duration-300",
                  selected.includes(addon.id)
                    ? "border-primary ring-4 ring-primary ring-opacity-50 shadow-lg"
                    : "hover:shadow-md"
                )}
              >
                <div className="flex items-start space-x-4">
                  <Checkbox
                    id={addon.id}
                    checked={selected.includes(addon.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelected([...selected, addon.id])
                      } else {
                        setSelected(selected.filter((id) => id !== addon.id))
                      }
                    }}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 md:mb-3">
                      {IconComponent && <IconComponent className="h-5 w-5 md:h-6 md:w-6 text-primary" />}
                      <label htmlFor={addon.id} className="text-lg md:text-xl font-semibold cursor-pointer">
                        {addon.name}
                      </label>
                    </div>
                    <p className="text-md md:text-lg text-muted-foreground mb-3 md:mb-4">{addon.description}</p>
                    <p className="text-xl font-bold text-primary">+${addon.price.toFixed(2)}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Button variant="outline" onClick={onBack} size="lg" className="text-lg px-6 py-3 md:px-8 md:py-4">
          Back
        </Button>
        <Button onClick={handleContinue} size="lg" className="text-lg px-6 py-3 md:px-8 md:py-4">
          Continue
        </Button>
      </div>
    </motion.div>
  )
}

