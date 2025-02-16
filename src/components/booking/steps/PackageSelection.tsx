"use client"

import { motion } from "motion/react"
import type { Package } from "@/types/package"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Image from "next/image"

interface PackageSelectionProps {
  packages: Package[]
  selected?: Package
  onSelect: (pkg: Package, subPkg: string) => void
}

export default function PackageSelection({ packages, selected, onSelect }: PackageSelectionProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Choose Your Package</h1>
        <p className="text-xl text-muted-foreground">Select the perfect wash package for your vehicle</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <Card
              className={`p-8 cursor-pointer relative overflow-hidden transition-all duration-300 ${
                selected?.id === pkg.id
                  ? "border-2 border-primary shadow-xl transform scale-[1.02] bg-primary/5"
                  : "hover:shadow-lg hover:border-primary/50 hover:scale-[1.01]"
              }`}
            >
              {pkg.featured && (
                <div className="absolute -right-12 top-8 rotate-45 bg-gradient-to-r from-yellow-500 to-amber-500 px-14 py-2 text-white font-semibold shadow-lg">
                  Featured
                </div>
              )}

              <div className="relative rounded-xl overflow-hidden mb-6 group">
                <Image
                  src={pkg.image || "/placeholder.jpg"}
                  alt={pkg.name}
                  width={400}
                  height={250}
                  className="w-full h-64 object-cover transform transition-transform group-hover:scale-110"
                />
                {selected?.id === pkg.id && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-white rounded-full p-3"
                    >
                      <Check className="w-8 h-8 text-primary" />
                    </motion.div>
                  </div>
                )}
              </div>

              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                {pkg.name}
              </h3>

              <div className="space-y-4">
                {pkg.subPackages.map((subPkg) => (
                  <Button
                    key={subPkg.id}
                    variant={
                      selected?.id === pkg.id && selected?.subPackages.some((sp) => sp.id === subPkg.id)
                        ? "default"
                        : "outline"
                    }
                    className="w-full justify-between text-lg py-6"
                    onClick={() => onSelect(pkg, subPkg.id ?? "")}
                  >
                    <span>{subPkg.name}</span>
                    <span className="font-bold text-xl">${subPkg.prices[0].price}</span>
                  </Button>
                ))}
              </div>

              {selected?.id === pkg.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 left-4 bg-primary text-white p-2 rounded-full"
                >
                  <Check className="w-6 h-6" />
                </motion.div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

