import { AddOn as PrismaAddOn } from "@prisma/client";
import { IconName } from "@/lib/icons/icons";

// For creating/updating add-ons
export interface AddOnInput {
  name: string;
  description: string;
  price: number;
  icon: IconName;
}

// For normalized add-ons (after fetching from DB)
export interface AddOn extends AddOnInput {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export function normalizeAddOn(addon: PrismaAddOn): AddOn {
  return {
    id: addon.id,
    name: addon.name,
    description: addon.description,
    price: addon.price,
    icon: addon.icon as IconName,
    createdAt: addon.createdAt,
    updatedAt: addon.updatedAt,
  };
}
