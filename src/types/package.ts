import { VehicleType as PrismaVehicleType } from '@prisma/client';

export { VehicleType } from '@prisma/client';

export interface Price {
  id: string;
  vehicleType: string;
  price: number;
}

export interface SubPackage {
  id: string;
  name: string;
  description: string;
  duration: number;
  image?: string | null;
  prices: Price[];
}

export interface Package {
  id: string;
  name: string;
  image?: string | null;
  featured: boolean;
  basePrice: number;
  subPackages: SubPackage[];
  addOns?: AddOn[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Add a new interface for form data
export interface PackageFormPrice {
  id?: string;
  vehicleType: PrismaVehicleType;
  price: number;
}

export interface PackageFormSubPackage {
  id?: string;
  name: string;
  description: string;
  duration: number;
  image?: string | null;
  prices: PackageFormPrice[];
}

export interface PackageFormData {
  name: string;
  image?: string | null;
  featured: boolean;
  basePrice: number;
  subPackages: PackageFormSubPackage[];
}

export type AddOn = {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
};

type PrismaPrice = {
  id: string;
  vehicleType: PrismaVehicleType;
  price: number;
  subPackageId: string;
  createdAt: Date;
  updatedAt: Date;
};

type PrismaSubPackage = {
  id: string;
  name: string;
  description: string;
  duration: number;
  packageId: string;
  prices: PrismaPrice[];
  createdAt: Date;
  updatedAt: Date;
  image: string | null; // Add image field
};

type PrismaAddOn = {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
};

type PrismaPackage = {
  id: string;
  name: string;
  image: string | null;
  featured: boolean; // Add featured field
  subPackages: PrismaSubPackage[];
  addOns: PrismaAddOn[]; // Add addOns field
  createdAt: Date;
  updatedAt: Date;
  basePrice: number;
};

// Type guard for Prisma response
export function isPrismaPackage(obj: unknown): obj is Package {
  const pkg = obj as Record<string, unknown>;
  return pkg && 
    typeof pkg.name === 'string' && 
    Array.isArray(pkg.subPackages) &&
    pkg.subPackages.every((sp: unknown) => {
      const subPkg = sp as Record<string, unknown>;
      return typeof subPkg.name === 'string' &&
        typeof subPkg.description === 'string' &&
        typeof subPkg.duration === 'number' &&
        Array.isArray(subPkg.prices);
    });
}

export function normalizePrismaPackage(prismaPackage: PrismaPackage): Package {
  if (!prismaPackage.id) throw new Error('Package must have an ID');
  
  return {
    id: prismaPackage.id,
    name: prismaPackage.name,
    image: prismaPackage.image ?? undefined,
    featured: prismaPackage.featured ?? false,
    subPackages: prismaPackage.subPackages.map((subPackage) => ({
      id: subPackage.id,
      name: subPackage.name,
      description: subPackage.description,
      duration: subPackage.duration,
      prices: subPackage.prices.map((price) => ({
        id: price.id,
        vehicleType: price.vehicleType,
        price: price.price,
        subPackageId: price.subPackageId,
        createdAt: price.createdAt,
        updatedAt: price.updatedAt,
      })),
      packageId: subPackage.packageId,
      createdAt: subPackage.createdAt,
      updatedAt: subPackage.updatedAt,
      image: subPackage.image ?? undefined,
    })),
    addOns: prismaPackage.addOns.map((addOn) => ({
      id: addOn.id,
      name: addOn.name,
      description: addOn.description,
      price: addOn.price,
      icon: addOn.icon,
    })),
    createdAt: prismaPackage.createdAt,
    updatedAt: prismaPackage.updatedAt,
    basePrice: prismaPackage.basePrice,
  };
}
