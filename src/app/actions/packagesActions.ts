"use server";

import { revalidatePath } from "next/cache";
import { Package, normalizePrismaPackage } from "@/types/package";
import db from "../db/db";

export async function getPackages(): Promise<Package[]> {
  const packages = await db.package.findMany({
    include: {
      subPackages: {
        include: {
          prices: true,
        },
      },
    },
  });
  
  return packages.map(normalizePrismaPackage);
}

export async function createPackage(data: Package) {
  const result = await db.package.create({
    data: {
      name: data.name,
      image: data.image,
      subPackages: {
        create: data.subPackages.map((subPackage) => ({
          name: subPackage.name,
          description: subPackage.description,
          duration: subPackage.duration,
          prices: {
            create: subPackage.prices.map(price => ({
              vehicleType: price.vehicleType,
              price: price.price,
            })),
          },
        })),
      },
    },
    include: {
      subPackages: {
        include: {
          prices: true,
        },
      },
    },
  });

  revalidatePath("/admin/packages");
  return normalizePrismaPackage(result);
}

export async function updatePackage(id: string, data: Package) {
  // First, delete existing sub-packages and their prices
  await db.subPackage.deleteMany({
    where: { packageId: id }
  });

  // Then update the package with new data
  const result = await db.package.update({
    where: { id },
    data: {
      name: data.name,
      image: data.image,
      subPackages: {
        create: data.subPackages.map((subPackage) => ({
          name: subPackage.name,
          description: subPackage.description,
          duration: subPackage.duration,
          prices: {
            create: subPackage.prices.map(price => ({
              vehicleType: price.vehicleType,
              price: price.price,
            })),
          },
        })),
      },
    },
    include: {
      subPackages: {
        include: {
          prices: true,
        },
      },
    },
  });

  revalidatePath("/admin/packages");
  return normalizePrismaPackage(result);
}

export async function deletePackage(id: string) {
  await db.package.delete({ where: { id } });
  revalidatePath("/admin/packages");
}
