"use server";

import { revalidatePath } from "next/cache";
import { Package, PackageFormData, normalizePrismaPackage } from "@/types/package";
import db from "../db/db";
import { Prisma, VehicleType } from "@prisma/client";

const packageInclude = {
  subPackages: {
    include: {
      prices: true,
    },
  },
  addOns: true,
} satisfies Prisma.PackageInclude;

export async function getPackages(): Promise<Package[]> {
  try {
    const packages = await db.package.findMany({
      include: packageInclude,
    });

    return packages
      .map((pkg) => normalizePrismaPackage(pkg))
      .filter((pkg): pkg is Package => pkg !== null);
  } catch (error) {
    console.error("Error fetching packages:", error);
    return [];
  }
}

export async function createPackage(data: PackageFormData) {
  try {
    const result = await db.package.create({
      data: {
        name: data.name,
        image: data.image ?? null,
        featured: data.featured,
        basePrice: data.basePrice,
        subPackages: {
          create: data.subPackages.map((subPackage) => ({
            name: subPackage.name,
            description: subPackage.description,
            duration: subPackage.duration, // Keep as string, don't convert to number
            image: subPackage.image ?? null,
            prices: {
              create: subPackage.prices.map((price) => ({
                vehicleType: price.vehicleType,
                price: price.price,
              })),
            },
          })),
        },
        addOns: { connect: [] },
      },
      include: packageInclude,
    });

    // Revalidate both admin and home pages
    revalidatePath("/admin/packages");
    revalidatePath("/");
    return normalizePrismaPackage(result);
  } catch (error) {
    console.error("Error creating package:", error);
    throw error;
  }
}

export async function updatePackage(id: string, data: PackageFormData) {
  try {
    await db.subPackage.deleteMany({
      where: { packageId: id },
    });

    const result = await db.package.update({
      where: { id },
      data: {
        name: data.name,
        image: data.image ?? null,
        featured: data.featured,
        basePrice: data.basePrice,
        subPackages: {
          create: data.subPackages.map((subPackage) => ({
            name: subPackage.name,
            description: subPackage.description,
            duration: subPackage.duration, // Keep as string
            image: subPackage.image ?? null,
            prices: {
              create: subPackage.prices.map((price) => ({
                vehicleType: price.vehicleType as VehicleType,
                price: price.price,
              })),
            },
          })),
        },
      },
      include: packageInclude,
    });

    // Revalidate both admin and home pages
    revalidatePath("/admin/packages");
    revalidatePath("/");
    const normalized = normalizePrismaPackage(result);
    return normalized ?? undefined;
  } catch (error) {
    console.error("Error updating package:", error);
    throw error;
  }
}

export async function deletePackage(id: string) {
  try {
    await db.package.delete({ where: { id } });
    // Revalidate both admin and home pages
    revalidatePath("/admin/packages");
    revalidatePath("/");
  } catch (error) {
    console.error("Error deleting package:", error);
    throw error;
  }
}
