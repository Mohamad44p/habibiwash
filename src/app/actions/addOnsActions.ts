"use server";

import { revalidatePath } from "next/cache";
import { AddOn, normalizeAddOn } from "@/types/addOn";
import db from "../db/db";

export async function getAddOns(): Promise<AddOn[]> {
  const addOns = await db.addOn.findMany();
  return addOns.map(normalizeAddOn);
}

export async function createAddOn(data: AddOn) {
  const result = await db.addOn.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      icon: data.icon, // Changed from image to icon
    },
  });

  // Revalidate both admin and home pages
  revalidatePath("/admin/add-ons");
  revalidatePath("/");
  return normalizeAddOn(result);
}

export async function updateAddOn(id: string, data: AddOn) {
  const result = await db.addOn.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      icon: data.icon, // Changed from image to icon
    },
  });

  // Revalidate both admin and home pages
  revalidatePath("/admin/add-ons");
  revalidatePath("/");
  return normalizeAddOn(result);
}

export async function deleteAddOn(id: string) {
  await db.addOn.delete({ where: { id } });
  // Revalidate both admin and home pages
  revalidatePath("/admin/add-ons");
  revalidatePath("/");
}
