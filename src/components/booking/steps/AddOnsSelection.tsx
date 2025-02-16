"use client"

import { motion } from "motion/react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, type LucideIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { getAddOns } from "@/app/actions/addOnsActions"
import type { AddOn } from "@/types/addOn"
import { AVAILABLE_ICONS } from "@/lib/icons/icons"

interface AddOnsSelectionProps {
  onSelect: (addOns: string[]) => void
  onBack: () => void
}

export default function AddOnsSelection({ onSelect, onBack }: AddOnsSelectionProps) {
  const [addOns, setAddOns] = useState<AddOn[]>([])
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])

  useEffect(() => {
    const loadAddOns = async () => {
      const data = await getAddOns()
      setAddOns(data)
    }
    loadAddOns()
  }, [])

  const handleContinue = () => {
    onSelect(selectedAddOns)
  }

  return (
    <div className="space-y-12">
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold">Additional Services</h1>
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Enhance your service with these premium add-ons. Choose the extras that best suit your needs.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {addOns.map((addon) => {
          const IconComponent = AVAILABLE_ICONS[addon.icon] as LucideIcon
          return (
            <motion.div
              key={addon.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card
                className={`p-8 cursor-pointer transition-all duration-300 ${
                  selectedAddOns.includes(addon.id)
                    ? "border-primary ring-4 ring-primary ring-opacity-50 shadow-lg"
                    : "hover:shadow-md"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <Checkbox
                    id={addon.id}
                    checked={selectedAddOns.includes(addon.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedAddOns([...selectedAddOns, addon.id])
                      } else {
                        setSelectedAddOns(selectedAddOns.filter((id) => id !== addon.id))
                      }
                    }}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
                      <label htmlFor={addon.id} className="text-xl font-semibold cursor-pointer">
                        {addon.name}
                      </label>
                    </div>
                    <p className="text-lg text-muted-foreground mb-4">{addon.description}</p>
                    <p className="text-2xl font-bold text-primary">+${addon.price.toFixed(2)}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="flex justify-center gap-6">
        <Button variant="outline" onClick={onBack} size="lg" className="text-lg px-8 py-6">
          Back
        </Button>
        <Button onClick={handleContinue} size="lg" className="text-lg px-8 py-6">
          Continue
        </Button>
      </div>
    </div>
  )
}

