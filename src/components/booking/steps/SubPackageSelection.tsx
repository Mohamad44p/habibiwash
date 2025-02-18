"use client"

import { motion } from "motion/react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package } from "@/types/package"
import { cn } from "@/lib/utils"
import { Clock, Check } from "lucide-react"
import Image from "next/image"

interface SubPackageSelectionProps {
  mainPackage?: Package
  selected?: string
  onSelect: (subPackageId: string) => void
  onBack: () => void
}

export default function SubPackageSelection({
  mainPackage,
  selected,
  onSelect,
  onBack,
}: SubPackageSelectionProps) {
  if (!mainPackage) return null

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
        {mainPackage.subPackages.map((subPkg) => (
          <motion.div
            key={subPkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card
              className={cn(
                "relative overflow-hidden group cursor-pointer transition-all duration-300",
                "hover:shadow-2xl hover:shadow-primary/20",
                selected === subPkg.id && "ring-2 ring-primary"
              )}
              onClick={() => subPkg.id && onSelect(subPkg.id)}
            >
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
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{subPkg.duration} minutes</span>
                </div>
                <div className="prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: subPkg.description }} />
                <div className="pt-4">
                  <p className="text-lg font-semibold">Starting from ${Math.min(...subPkg.prices.map(p => p.price)).toFixed(2)}</p>
                </div>
              </div>

              {selected === subPkg.id && (
                <div className="absolute top-4 right-4">
                  <div className="bg-primary text-primary-foreground p-2 rounded-full">
                    <Check className="w-5 h-5" />
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={onBack} size="lg">
          Back
        </Button>
      </div>
    </motion.div>
  )
}
