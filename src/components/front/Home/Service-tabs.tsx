"use client";

import { useState, useEffect, useMemo, memo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

import type { Package } from "@/types/package";
import { VehicleType } from "@prisma/client";
import Link from "next/link";

interface ServiceTabsProps {
  packages: Package[];
}

const AnimatedPrice = memo(({ price }: { price: number }) => {
  const [displayPrice, setDisplayPrice] = useState(price);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Only animate when the price actually changes
  useEffect(() => {
    if (price !== displayPrice) {
      setShouldAnimate(true);
    }
  }, [price, displayPrice]);

  useEffect(() => {
    if (!shouldAnimate) return;

    const duration = 500; // ms
    const steps = 20;
    const stepDuration = duration / steps;
    const increment = (price - displayPrice) / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setDisplayPrice((prev) => {
        const newPrice = prev + increment;
        return currentStep === steps ? price : Number(newPrice.toFixed(2));
      });

      if (currentStep === steps) {
        clearInterval(timer);
        setShouldAnimate(false);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [price, displayPrice, shouldAnimate]);

  return (
    <span className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
      ${displayPrice.toFixed(2)}
    </span>
  );
});

AnimatedPrice.displayName = "AnimatedPrice";

function ServiceTabsComponent({ packages }: ServiceTabsProps) {
  const [selectedTab, setSelectedTab] = useState(packages[0]?.id || "");
  const [selectedVehicleType, setSelectedVehicleType] = useState<VehicleType>(
    VehicleType.SEDAN
  );

  // Memoize the current package to prevent unnecessary re-renders
  const currentPackage = useMemo(() => 
    packages.find((pkg) => pkg.id === selectedTab),
    [packages, selectedTab]
  );

  // Memoize the getPrice function to prevent unnecessary re-renders
  const getPrice = useMemo(() => 
    (prices: { vehicleType: string; price: number }[], type: VehicleType) => {
      return prices.find((p) => p.vehicleType === type)?.price || 0;
    },
    []
  );

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <Badge className="inline-block bg-primary text-primary-foreground rounded-full px-4 py-1 text-sm font-medium mb-4">
          Pricing
        </Badge>
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
          Choose Your Perfect Detail Package
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transparent pricing, exceptional service. No hidden fees, just
          sparkling results.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center mb-12 overflow-x-auto pb-4 sm:pb-0"
      >
        <div className="inline-flex rounded-full bg-muted p-2 min-w-full sm:min-w-0 shadow-lg">
          {packages.map((pkg) => (
            <motion.button
              key={pkg.id}
              onClick={() => setSelectedTab(pkg.id)}
              className={cn(
                "flex-1 sm:flex-none px-4 sm:px-8 py-3 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                selectedTab === pkg.id
                  ? "bg-background text-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {pkg.name}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="wait" key={selectedTab}>
          {currentPackage?.subPackages.map((subPkg, index) => (
            <motion.div
              key={subPkg.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              layout
            >
              <Card className="relative h-full flex flex-col overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
                {index === 1 && (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 text-sm font-semibold z-10">
                    Most Popular
                  </Badge>
                )}
                {subPkg.image && (
                  <div className="relative h-48 overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${subPkg.image})` }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  </div>
                )}

                <CardHeader className="relative z-10 -mt-16 text-center">
                  <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <h3 className="text-2xl font-bold mb-2">{subPkg.name}</h3>
                    <AnimatedPrice
                      price={getPrice(subPkg.prices, selectedVehicleType)}
                    />
                    <div className="flex items-center justify-center gap-2 text-muted-foreground mt-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{subPkg.duration}</span>
                    </div>
                    <Select
                      value={selectedVehicleType}
                      onValueChange={(value) =>
                        setSelectedVehicleType(value as VehicleType)
                      }
                    >
                      <SelectTrigger className="w-full bg-background/50 backdrop-blur-sm border-primary/20 mt-4">
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(VehicleType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type === "XL_SUV_TRUCK" ? "XL SUV/Truck" : type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 pt-6">
                  <div
                    className="prose prose-sm dark:prose-invert max-w-none [&>ul]:mt-2 [&>ul]:space-y-1 [&>h4]:font-bold [&>h4]:text-base [&>ul>li>ul]:ml-4 [&>ul>li>ul]:mt-1 [&>ul>li>ul]:space-y-1"
                    dangerouslySetInnerHTML={{ __html: subPkg.description }}
                  />
                </CardContent>

                <CardFooter className="pt-6">
                  <Link href="/booking">
                    <Button className="w-full" size="lg">
                      Book Now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Memoize the entire component to prevent unnecessary re-renders
export default memo(ServiceTabsComponent);
