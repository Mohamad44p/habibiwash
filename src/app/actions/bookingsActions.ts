"use server";

import { revalidatePath } from "next/cache";
import {
  Booking,
  BookingStatus,
  normalizeBooking,
  PrismaBooking,
  AddOn
} from "@/types/booking";
import db from "../db/db";

type PrismaBookingResult = Omit<PrismaBooking, "addOns"> & {
  addOns: AddOn[];
};

export async function getBookings(): Promise<Booking[]> {
  try {
    const bookings = await db.booking.findMany({
      include: {
        package: {
          select: {
            name: true,
          },
        },
        timeSlot: {
          select: {
            startTime: true,
            endTime: true,
          },
        },
        addOns: {
          select: {
            id: true,
            name: true,
            price: true,
            icon: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' }
    });

    return bookings.map((booking) => normalizeBooking(booking as PrismaBookingResult));
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
}

export async function getBooking(id: string): Promise<Booking | null> {
  const booking = await db.booking.findUnique({
    where: { id },
    include: {
      package: {
        select: {
          name: true,
        },
      },
      timeSlot: {
        select: {
          startTime: true,
          endTime: true,
        },
      },
      addOns: {
        select: {
          id: true,
          name: true,
          price: true,
          icon: true,
        },
      },
    },
  });

  if (!booking) return null;
  return normalizeBooking({
    ...booking,
    addOns: booking.addOns.map((addon) => ({
      id: addon.id,
      name: addon.name,
      price: addon.price,
      icon: addon.icon,
    })),
  });
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  const result = await db.booking.update({
    where: { id },
    data: { status },
    include: {
      package: {
        select: {
          name: true,
        },
      },
      timeSlot: {
        select: {
          startTime: true,
          endTime: true,
        },
      },
      addOns: {
        select: {
          id: true,
          name: true,
          price: true,
          icon: true,
        },
      },
    },
  });

  revalidatePath("/admin/bookings");
  return normalizeBooking(result as PrismaBookingResult);
}
