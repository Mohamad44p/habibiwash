"use client";

import { motion } from "motion/react";
import type { Package } from "@/types/package";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SparklesIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface PackageSelectionProps {
  packages: Package[];
  selected?: Package;
  onSelect: (pkg: Package) => void;
}

export default function PackageSelection({
  packages,
  selected,
  onSelect,
}: PackageSelectionProps) {
  // Calculate minimum price for a package across all subpackages and vehicle types
  const getMinimumPrice = (pkg: Package): number => {
    return pkg.subPackages.reduce((minPrice, subPkg) => {
      const subPackageMinPrice = subPkg.prices.reduce((min, price) => {
        return Math.min(min, price.price);
      }, Infinity);
      return Math.min(minPrice, subPackageMinPrice);
    }, Infinity);
  };

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
          Choose Your Package
        </motion.h1>
        <motion.p
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          className="text-lg md:text-xl text-muted-foreground"
        >
          Select your preferred washing package
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const minimumPrice = getMinimumPrice(pkg);
          
          return (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card
                className={cn(
                  "relative overflow-hidden group cursor-pointer transition-all duration-300",
                  "hover:shadow-2xl hover:shadow-primary/20",
                  selected?.id === pkg.id && "ring-2 ring-primary"
                )}
                onClick={() => onSelect(pkg)}
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <Image
                    src={pkg.image ?? "/Logo1.png"}
                    alt={pkg.name}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  {pkg.featured && (
                    <Badge className="absolute top-4 right-4 z-20 bg-primary">
                      <SparklesIcon className="w-4 h-4 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold">{pkg.name}</h3>
                  <p className="text-muted-foreground">
                    Starting from ${minimumPrice.toFixed(2)}
                  </p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
