"use client"

import { motion } from "motion/react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Car, Truck, CarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

interface VehicleSelectionProps {
  selected?: string
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

export default function VehicleSelection({ selected, onSelect, onBack }: VehicleSelectionProps) {
  // Memoize vehicle types
  const memoizedVehicleTypes = useMemo(() => vehicleTypes, [])

  return (
    <div className="container space-y-8">
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          What Type of Vehicle Do You Have?
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground">
          Select your vehicle type for a customized washing experience
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {memoizedVehicleTypes.map((vehicle) => {
          const Icon = vehicle.icon
          return (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { delay: 0.1 }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={cn(
                  "relative p-4 md:p-8 cursor-pointer transition-all duration-300",
                  "hover:shadow-xl hover:shadow-primary/20",
                  selected === vehicle.id && [
                    "border-2 border-primary",
                    "bg-primary/5",
                    "transform scale-[1.02]"
                  ]
                )}
                onClick={() => onSelect(vehicle.id)}
              >
                {/* New animated selection indicator */}
                {selected === vehicle.id && (
                  <motion.div
                    layoutId="selection-indicator"
                    className="absolute inset-0 border-2 border-primary rounded-lg"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 relative z-10">
                  <div
                    className={cn(
                      "p-6 md:p-8 rounded-full transition-all duration-300",
                      selected === vehicle.id
                        ? "bg-primary text-white"
                        : "bg-primary/10 text-primary group-hover:bg-primary/20",
                    )}
                  >
                    <Icon className="w-12 h-12 md:w-20 md:h-20" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    {vehicle.name}
                  </h3>
                  <p className="text-md md:text-lg text-muted-foreground">{vehicle.description}</p>
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
        <Button
          onClick={() => selected && onSelect(selected)}
          disabled={!selected}
          size="lg"
          className="text-lg px-6 py-3 md:px-8 md:py-4"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

