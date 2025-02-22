"use client"

import { motion } from "motion/react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, SubPackage } from "@/types/package"
import { cn } from "@/lib/utils"
import { Clock, Check, Car, CarIcon, Truck } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface SubPackageSelectionProps {
  mainPackage?: Package
  selected?: string
  onSelect: (subPackageId: string, vehicleType: string) => void
  onBack: () => void
}

const vehicleTypes = [
  { id: "SEDAN", name: "Sedan", icon: Car },
  { id: "SUV", name: "SUV", icon: CarIcon },
  { id: "XL_SUV_TRUCK", name: "XL SUV/Truck", icon: Truck },  // Updated
]

export default function SubPackageSelection({
  mainPackage,
  selected,
  onSelect,
  onBack,
}: SubPackageSelectionProps) {
  const [selectedVehicles, setSelectedVehicles] = useState<Record<string, string>>({})

  if (!mainPackage) return null

  const handleVehicleSelect = (subPackageId: string, vehicleType: string) => {
    const newSelectedVehicles = { ...selectedVehicles, [subPackageId]: vehicleType }
    setSelectedVehicles(newSelectedVehicles)
    onSelect(subPackageId, vehicleType)
  }

  const getVehiclePrice = (subPkg: SubPackage, vehicleType: string): number => {
    const price = subPkg.prices.find((p) => 
      p.vehicleType.toLowerCase() === vehicleType.toLowerCase()
    )?.price
    
    return price || 0
  }

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
          {mainPackage.name}
        </motion.h1>
        <motion.p
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          className="text-lg md:text-xl text-muted-foreground"
        >
          Choose your preferred service level
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mainPackage.subPackages.map((subPkg) => {
          const selectedVehicle = selectedVehicles[subPkg.id]
          const currentPrice = selectedVehicle ? getVehiclePrice(subPkg, selectedVehicle) : 0

          return (
            <motion.div
              key={subPkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card
                className={cn(
                  "relative overflow-hidden group transition-all duration-300",
                  "hover:shadow-2xl hover:shadow-primary/20",
                  selected === subPkg.id && "ring-2 ring-primary"
                )}
              >
                {/* Image section */}
                {subPkg.image && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={subPkg.image}
                      alt={subPkg.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold">{subPkg.name}</h3>
                  
                  {/* Duration */}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{subPkg.duration}</span>
                  </div>

                  {/* Description with proper HTML rendering */}
                  <div 
                    className="prose prose-sm dark:prose-invert max-w-none [&>ul]:mt-2 [&>ul]:space-y-1 [&>h4]:font-bold [&>h4]:text-base [&>ul>li>ul]:ml-4 [&>ul>li>ul]:mt-1 [&>ul>li>ul]:space-y-1"
                    dangerouslySetInnerHTML={{ __html: subPkg.description }}
                  />

                  {/* Vehicle type selection */}
                  <div className="space-y-3 pt-4">
                    <p className="font-medium text-sm text-muted-foreground">Select Vehicle Type:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {vehicleTypes.map((vehicle) => {
                        const price = getVehiclePrice(subPkg, vehicle.id)
                        const isSelected = selectedVehicle === vehicle.id && selected === subPkg.id
                        const Icon = vehicle.icon

                        return (
                          <Button
                            key={vehicle.id}
                            variant={isSelected ? "default" : "outline"}
                            className={cn(
                              "flex flex-col items-center p-3 h-auto gap-2",
                              isSelected && "bg-primary text-primary-foreground"
                            )}
                            onClick={() => handleVehicleSelect(subPkg.id, vehicle.id)}
                          >
                            <Icon className="w-6 h-6" />
                            <div className="text-center">
                              <div className="text-xs font-medium">{vehicle.name}</div>
                              <div className="text-sm font-bold">${price}</div>
                            </div>
                          </Button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Selected price display */}
                  {selectedVehicle && selected === subPkg.id && (
                    <div className="pt-4 text-center">
                      <p className="text-2xl font-bold text-primary">
                        ${currentPrice.toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Selection indicator */}
                {selected === subPkg.id && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-primary text-primary-foreground p-2 rounded-full">
                      <Check className="w-5 h-5" />
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={onBack} size="lg">
          Back
        </Button>
      </div>
    </motion.div>
  )
}
