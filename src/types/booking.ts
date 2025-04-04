export type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

export interface AddOn {
  id: string;
  name: string;
  price: number;
  icon: string;
}

export interface Booking {
  id: string;
  packageId: string;
  package: { name: string };
  subPackageId?: string;
  vehicleType: string;
  date: Date;
  timeSlot: { startTime: string; endTime: string };
  timeSlotId: string;
  addOns: AddOn[];  // Changed from string[] to AddOn[]
  status: BookingStatus;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  createdAt: Date;
  updatedAt: Date;
  totalPrice: number;  // Add this line
}

export type PrismaBooking = {
  id: string;
  packageId: string;
  subPackageId: string | null;
  vehicleType: string;
  date: Date;
  time: string;
  timeSlotId: string;
  addOns?: AddOn[];  // Changed from string[] to AddOn[]
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  country: string | null;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
  package: {
    name: string;
  };
  timeSlot: {
    startTime: string;
    endTime: string;
  };
  totalPrice: number;  // Add this line
};

export function normalizeBooking(prismaBooking: PrismaBooking): Booking {
  return {
    ...prismaBooking,
    addOns: prismaBooking.addOns || [],
    status: prismaBooking.status || "PENDING",
    subPackageId: prismaBooking.subPackageId || undefined,
    notes: prismaBooking.notes || undefined,
    street: prismaBooking.street || undefined,
    city: prismaBooking.city || undefined,
    state: prismaBooking.state || undefined,
    zipCode: prismaBooking.zipCode || undefined,
    country: prismaBooking.country || undefined
  };
}
