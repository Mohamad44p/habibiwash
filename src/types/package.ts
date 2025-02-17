export type Price = {
  id?: string;
  vehicleType: string;
  price: number;
  subPackageId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type SubPackage = {
  id?: string;
  name: string;
  description: string;
  duration: number;
  prices: Price[];
  packageId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  image?: string; // Add image field
};

export type AddOn = {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
};

export type Package = {
  id?: string;
  name: string;
  image?: string;
  featured?: boolean; // Add featured field
  subPackages: SubPackage[];
  addOns?: AddOn[]; // Make addOns optional
  createdAt?: Date;
  updatedAt?: Date;
};

type PrismaPrice = {
  id: string;
  vehicleType: string;
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
  return {
    id: prismaPackage.id,
    name: prismaPackage.name,
    image: prismaPackage.image ?? undefined,
    featured: prismaPackage.featured,
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
      image: subPackage.image ?? undefined, // Add image field
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
  };
}
