"use server";

import { revalidatePath } from "next/cache";
import { Package, normalizePrismaPackage } from "@/types/package";
import db from "../db/db";
import { Prisma } from "@prisma/client";

const packageInclude = Prisma.validator<Prisma.PackageInclude>()({
  subPackages: {
    include: {
      prices: true,
      
    },
  },
  addOns: true,
});

type PackageWithRelations = Prisma.PackageGetPayload<{
  include: typeof packageInclude;
}>;

export async function getPackages(): Promise<Package[]> {
  try {
    const packages = await db.package.findMany({
      include: packageInclude,
    });

    return packages
      .map((pkg: PackageWithRelations) => normalizePrismaPackage(pkg))
      .filter((pkg): pkg is Package => pkg !== null);
  } catch (error) {
    console.error("Error fetching packages:", error);
    return [];
  }
}

export async function createPackage(data: Package) {
  try {
    const result = await db.package.create({
      data: {
        name: data.name,
        image: data.image ?? null,
        featured: data.featured ?? false,
        basePrice: data.basePrice,
        subPackages: {
          create: data.subPackages.map((subPackage) => ({
            name: subPackage.name,
            description: subPackage.description,
            duration: subPackage.duration,
            image: subPackage.image ?? null,
            prices: {
              create: subPackage.prices.map((price) => ({
                vehicleType: price.vehicleType,
                price: price.price,
              })),
            },
          })),
        },
      },
      include: packageInclude,
    });

    revalidatePath("/admin/packages");
    return normalizePrismaPackage(result);
  } catch (error) {
    console.error("Error creating package:", error);
    throw error;
  }
}

export async function updatePackage(id: string, data: Package) {
  try {
    await db.subPackage.deleteMany({
      where: { packageId: id },
    });

    const result = await db.package.update({
      where: { id },
      data: {
        name: data.name,
        image: data.image ?? null,
        featured: data.featured ?? false,
        basePrice: data.basePrice,
        subPackages: {
          create: data.subPackages.map((subPackage) => ({
            name: subPackage.name,
            description: subPackage.description,
            duration: subPackage.duration,
            image: subPackage.image ?? null,
            prices: {
              create: subPackage.prices.map((price) => ({
                vehicleType: price.vehicleType,
                price: price.price,
              })),
            },
          })),
        },
      },
      include: packageInclude,
    });

    revalidatePath("/admin/packages");
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
    revalidatePath("/admin/packages");
  } catch (error) {
    console.error("Error deleting package:", error);
    throw error;
  }
}
