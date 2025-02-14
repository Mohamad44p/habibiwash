"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ServicePackage {
  name: string;
  description: string;
  basePrice: number;
  addOns: string[];
  features: {
    interior?: string[];
    exterior?: string[];
  };
  popular?: boolean;
}

export default function ServiceTabs() {
  const [selectedTab, setSelectedTab] = useState("interior-exterior");
  const [xlVehicles, setXlVehicles] = useState<Record<string, boolean>>({});

  const services: Record<string, ServicePackage[]> = {
    "interior-exterior": [
      {
        name: "Express Clean",
        description:
          "Our 60-90 minute detail. Designed for well-maintained vehicles that need a light detail.",
        basePrice: 198,
        addOns: ["Pet Hair Removal ($29-69)", "Clay Bar Treatment ($50)"],
        features: {
          interior: [
            "Wipe & Clean All Surfaces",
            "Vacuum Interior",
            "Clean Windows & Mirrors",
            "Clean Floor Mats & Carpets",
            "Air Freshener Treatment",
            "Detail Trunk",
          ],
          exterior: [
            "Professional Hand Wash",
            "Clean & Wash Wheel Wells",
            "Detail Rim Faces & Tires",
            "Dress Exterior Trim/Tires",
            "Clean Door Jams",
            "Clean Windows",
          ],
        },
      },
      {
        name: "Gold (The Standard)",
        description:
          "Our most popular package. A thorough interior & exterior detail for your vehicle.",
        basePrice: 268,
        popular: true,
        addOns: ["Shampoo Seats ($50)", "Shampoo Carpets ($50)"],
        features: {
          interior: [
            "Wipe & Clean All Surfaces",
            "Double Vacuum Interior",
            "Steam Clean Full Interior",
            "Clean Crevices, Vents, Cup Holders, Etc..",
            "Clean & Protect Plastic",
            "Clean Windows & Mirrors",
            "Leather Conditioner Treatment",
            "Deep Clean Floor Mats & Carpets",
            "Air Freshener Treatment",
            "Detail Trunk",
          ],
          exterior: [
            "Professional Hand Wash",
            "Paint Decontamination (Clay Bar)",
            "Clean & Wash Wheel Wells",
            "Detail Rim Faces & Tires",
            "Dress Exterior Trim/Tires",
            "Clean Door Jams",
            "Clean Windows",
            "Wax Protection (30 Days)",
          ],
        },
      },
      {
        name: "Diamond (The Works)",
        description:
          "Is your car in need of a full in-depth makeover? This is the package to get your car looking like new again.",
        basePrice: 468,
        addOns: ["Headlight Restoration ($100)", "Engine Bay ($60)"],
        features: {
          interior: [
            "Deep Clean All Surfaces",
            "Double Vacuum Interior",
            "Shampoo Carpets & Seats",
            "Steam Clean Full Interior",
            "Clean Crevices, Vents, Cup Holders, Etc..",
            "Clean & Protect Plastic",
            "Leather Conditioner Treatment",
            "Clean Windows & Mirrors",
            "Deep Clean Floor Mats & Carpets",
            "Air Freshener Treatment",
            "Detail Trunk",
          ],
          exterior: [
            "Wax & Buff (1-Step Paint Polish)",
            "Light Swirl Removal (Spot Polish)",
            "Professional Hand Wash",
            "Paint Decontamination (Clay Bar)",
            "Detail Rim Faces & Tires",
            "Clean & Wash Wheel Wells",
            "Dress Exterior Trim/Tires",
            "Clean Door Jams",
            "Detail Windows",
            "Ceramic Protection (6 mon)",
          ],
        },
      },
    ],
    "interior-only": [
      {
        name: "Interior Express Clean",
        description: "Quick interior refresh for well-maintained vehicles.",
        basePrice: 149,
        addOns: ["Pet Hair Removal ($29-69)"],
        features: {
          interior: [
            "Wipe & Clean All Surfaces",
            "Vacuum Interior",
            "Clean Windows & Mirrors",
            "Clean Floor Mats & Carpets",
            "Air Freshener Treatment",
            "Detail Trunk",
          ],
        },
      },
    ],
    "exterior-only": [
      {
        name: "Exterior Express Clean",
        description: "Professional exterior cleaning and protection.",
        basePrice: 129,
        addOns: ["Clay Bar Treatment ($50)"],
        features: {
          exterior: [
            "Professional Hand Wash",
            "Clean & Wash Wheel Wells",
            "Detail Rim Faces & Tires",
            "Dress Exterior Trim/Tires",
            "Clean Door Jams",
            "Clean Windows",
          ],
        },
      },
    ],
  };

  const calculatePrice = (basePrice: number, packageId: string) => {
    return xlVehicles[packageId] ? basePrice + 30 : basePrice;
  };

  const toggleXlVehicle = (packageId: string) => {
    setXlVehicles((prev) => ({ ...prev, [packageId]: !prev[packageId] }));
  };

  return (
    <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4">
      <div className="text-center mb-8 sm:mb-16">
        <Badge className="inline-block bg-black text-white rounded-full px-4 py-1 text-sm font-medium mb-4">
          Pricing
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Book a detail online in minutes
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Simple and transparent pricing is what we do. No hidden costs or fees
          ever.
        </p>
      </div>

      <div className="flex justify-center mb-8 sm:mb-12 overflow-x-auto pb-4 sm:pb-0">
        <div className="inline-flex rounded-full bg-muted/30 p-1.5 min-w-full sm:min-w-0">
          {Object.keys(services).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedTab(key)}
              className={cn(
                "flex-1 sm:flex-none px-3 sm:px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                selectedTab === key
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {key
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </button>
          ))}
        </div>
      </div>

      {Object.entries(services).map(([key, packages]) => (
        <div
          key={key}
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto transition-all duration-300",
            selectedTab === key ? "grid" : "hidden"
          )}
        >
          {packages.map((pkg, index) => {
            const packageId = `${key}-${index}`;
            return (
              <Card
                key={packageId}
                className={cn(
                  "relative overflow-hidden border transition-all duration-300 hover:shadow-lg",
                  pkg.popular
                    ? "border-primary shadow-md"
                    : "hover:border-primary/50"
                )}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 w-20 h-20">
                    <div className="absolute transform rotate-45 bg-primary text-primary-foreground font-medium py-1 right-[-35px] top-[32px] w-[170px] text-center text-sm">
                      Most Popular
                    </div>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="min-h-[500px]">
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-muted-foreground mb-6">
                      {pkg.description}
                    </p>

                    <div className="bg-muted/50 rounded-lg p-4 mb-6">
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Starting at
                          </p>
                          <motion.div
                            key={calculatePrice(pkg.basePrice, packageId)}
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 0.3 }}
                            className="text-4xl font-bold"
                          >
                            ${calculatePrice(pkg.basePrice, packageId)}
                          </motion.div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`xl-upgrade-${packageId}`}
                            checked={xlVehicles[packageId] || false}
                            onCheckedChange={() => toggleXlVehicle(packageId)}
                          />
                          <Label
                            htmlFor={`xl-upgrade-${packageId}`}
                            className="text-sm"
                          >
                            XL Vehicle
                            <span className="block text-muted-foreground">
                              +$30
                            </span>
                          </Label>
                        </div>
                      </div>
                    </div>

                    {pkg.addOns.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">Popular Add-Ons:</h4>
                        <ul className="text-muted-foreground space-y-1">
                          {pkg.addOns.map((addon, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-primary/50 rounded-full"></span>
                              {addon}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {pkg.features.interior && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">Interior:</h4>
                        <ul className="space-y-2">
                          {pkg.features.interior.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-primary/70 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {pkg.features.exterior && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">Exterior:</h4>
                        <ul className="space-y-2">
                          {pkg.features.exterior.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-primary/70 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 absolute bottom-0 left-0 right-0">
                  <Button
                    className="w-full"
                    variant={pkg.popular ? "default" : "outline"}
                    size="lg"
                  >
                    Schedule Online
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ))}
    </div>
  );
}
