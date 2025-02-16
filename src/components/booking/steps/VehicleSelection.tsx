"use client"

import { motion } from "motion/react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Car, Truck, CarIcon } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface VehicleSelectionProps {
  onSelect: (type: string) => void
  onBack: () => void
}

const vehicleTypes = [
  {
    id: "sedan",
    name: "Sedan",
    icon: Car,
    description: "Standard size car, 4-door sedan",
  },
  {
    id: "suv",
    name: "SUV",
    icon: CarIcon,
    description: "Sport utility vehicle or crossover",
  },
  {
    id: "truck",
    name: "Truck",
    icon: Truck,
    description: "Pickup truck or commercial vehicle",
  },
]

export default function VehicleSelection({ onSelect, onBack }: VehicleSelectionProps) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Select Your Vehicle Type</h2>
        <p className="text-xl text-muted-foreground">Choose the type of vehicle you&apos;ll be bringing in</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {vehicleTypes.map((vehicle) => {
          const Icon = vehicle.icon
          return (
            <motion.div
              key={vehicle.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={cn(
                  "p-8 cursor-pointer transition-all duration-300",
                  "hover:shadow-xl hover:border-primary/50",
                  selected === vehicle.id && [
                    "border-2 border-primary",
                    "shadow-lg shadow-primary/20",
                    "bg-primary/5"
                  ]
                )}
                onClick={() => setSelected(vehicle.id)}
              >
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className={cn(
                    "p-8 rounded-full transition-all duration-300",
                    selected === vehicle.id
                      ? "bg-primary text-white"
                      : "bg-primary/10 text-primary group-hover:bg-primary/20"
                  )}>
                    <Icon className="w-20 h-20" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    {vehicle.name}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {vehicle.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="flex justify-center gap-6 pt-8">
        <Button variant="outline" onClick={onBack} size="lg" className="text-lg px-8 py-6">
          Back
        </Button>
        <Button
          onClick={() => selected && onSelect(selected)}
          disabled={!selected}
          size="lg"
          className="text-lg px-8 py-6"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

