"use server";

import { revalidatePath } from "next/cache";
import {
  Booking,
  BookingStatus,
  normalizeBooking,
  PrismaBooking,
} from "@/types/booking";
import db from "../db/db";

type PrismaBookingResult = Omit<PrismaBooking, "addOns"> & {
  addOns: { id: string }[];
};

function transformBooking(booking: PrismaBookingResult) {
  return {
    ...booking,
    addOns: booking.addOns.map((addon) => addon.id),
  };
}

export async function getBookings(): Promise<Booking[]> {
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
        },
      },
    },
  });

  return bookings.map((booking) => normalizeBooking(transformBooking(booking)));
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
        },
      },
    },
  });

  if (!booking) return null;
  return normalizeBooking(transformBooking(booking));
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
        },
      },
    },
  });

  revalidatePath("/admin/bookings");
  return normalizeBooking(transformBooking(result));
}
