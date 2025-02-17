"use client";

import { motion } from "motion/react";
import type { Package } from "@/types/package";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SparklesIcon, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PackageSelectionProps {
  packages: Package[];
  selected?: Package;
  onSelect: (pkg: Package, subPkg: string) => void;
}

interface SubPackagePreviewProps {
  subPackage: Package['subPackages'][0];
}

const SubPackagePreview = ({ subPackage }: SubPackagePreviewProps) => {
  return (
    <div className="space-y-4">
      {subPackage.image && (
        <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
          <Image
            src={subPackage.image}
            alt={subPackage.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold">{subPackage.name}</h4>
          <p className="text-sm text-muted-foreground">
            Duration: {subPackage.duration} minutes
          </p>
        </div>
        <div className="prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: subPackage.description }} />
        <div className="space-y-2">
          <h5 className="font-medium">Pricing:</h5>
          <div className="grid grid-cols-2 gap-2">
            {subPackage.prices.map((price) => (
              <div
                key={price.vehicleType}
                className="flex justify-between items-center p-2 bg-muted rounded-lg"
              >
                <span>{price.vehicleType}</span>
                <span className="font-semibold">${price.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PackageSelection({
  packages,
  selected,
  onSelect,
}: PackageSelectionProps) {
  const [selectedSubPackage, setSelectedSubPackage] = useState<Package['subPackages'][0] | null>(null);

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
          Choose Your Perfect Package
        </motion.h1>
        <motion.p
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Select from our carefully curated washing packages
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
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
            >
              <div className="relative h-32 md:h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <Image
                  src={pkg.image ?? "/Logo1.png"}
                  alt={pkg.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                {pkg.featured && (
                  <Badge className="absolute top-2 md:top-4 right-2 md:right-4 z-20 bg-primary">
                    <SparklesIcon className="w-4 h-4 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>

              <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold">{pkg.name}</h3>
                </div>
                <div className="space-y-2 md:space-y-3">
                  {pkg.subPackages.map((subPkg) => (
                    <div key={`${pkg.id}-${subPkg.id}`} className="flex gap-2">
                      <motion.div className="flex-1" whileTap={{ scale: 0.98 }}>
                        <a
                          className={cn(
                            buttonVariants({
                              variant:
                                selected?.id === pkg.id ? "default" : "outline",
                            }),
                            "w-full justify-between group relative overflow-hidden text-lg md:text-xl py-3 md:py-4"
                          )}
                          onClick={() => onSelect(pkg, subPkg.id ?? "")}
                        >
                          <span>{subPkg.name}</span>
                          <span className="font-bold text-xl">
                            ${subPkg.prices[0].price}
                          </span>
                          <div className="absolute inset-0 bg-primary/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                        </a>
                      </motion.div>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            className={cn(
                              buttonVariants({ variant: "outline" }),
                              "px-3"
                            )}
                            onClick={() => setSelectedSubPackage(subPkg)}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] max-h-[90vh]">
                          <DialogHeader>
                            <DialogTitle>Package Preview</DialogTitle>
                          </DialogHeader>
                          <ScrollArea className="max-h-[calc(90vh-80px)] pr-4">
                            {selectedSubPackage && (
                              <SubPackagePreview subPackage={selectedSubPackage} />
                            )}
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
