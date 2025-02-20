"use client";

import { LucideIcon, Sparkles } from "lucide-react";
import { AVAILABLE_ICONS } from "@/lib/icons/icons";
import { AddOn } from "@/types/addOn";

const ADDON_ITEM_CLASS = "flex items-center justify-between p-2.5 rounded-xl hover:bg-accent/30 group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-transparent hover:border-primary/10 bg-background/50";
const ADDON_ICON_WRAPPER_CLASS = "rounded-full bg-primary/5 p-1.5 group-hover:bg-primary/20 transition-colors duration-300 ring-1 ring-primary/10 group-hover:ring-primary/30";
const ADDON_PRICE_CLASS = "text-sm font-semibold bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-transparent group-hover:scale-105 transition-transform";

interface ServiceAddOnsProps {
  initialAddOns: AddOn[];
}

export function ServiceAddOns({ initialAddOns }: ServiceAddOnsProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="relative overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background rounded-2xl p-4 sm:p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-muted/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50"></div>
        
        <div className="relative mb-4 sm:mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary/70" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Premium Add-ons
            </h2>
            <Sparkles className="w-4 h-4 text-primary/70" />
          </div>
          <p className="text-center">
            <span className="text-xs text-muted-foreground/90">
              Enhance your service with our premium add-ons
            </span>
            <span className="text-[11px] italic ml-1 text-muted-foreground/60 block">
              (*some add-ons included in packages)
            </span>
          </p>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-x-8 sm:gap-y-2">
          {initialAddOns.map((addon) => {
            const IconComponent = AVAILABLE_ICONS[addon.icon] as LucideIcon;
            return (
              <div 
                key={addon.id} 
                className={ADDON_ITEM_CLASS}
              >
                <div className="flex items-center gap-3">
                  <div className={ADDON_ICON_WRAPPER_CLASS}>
                    {IconComponent && <IconComponent className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />}
                  </div>
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    {addon.name}
                  </span>
                </div>
                <span className={ADDON_PRICE_CLASS}>
                  +${addon.price}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
