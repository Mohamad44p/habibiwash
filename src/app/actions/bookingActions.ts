"use server";

import { revalidatePath } from "next/cache";
import db from "../db/db";
import type { BookingData } from "@/components/booking/BookingFlow";

export async function validateTimeSlot(date: Date, time: string) {
  const existingBooking = await db.booking.findFirst({
    where: {
      date: date,
      time: time,
      NOT: { status: "CANCELLED" }
    }
  });

  return !existingBooking;
}

export async function createBooking(data: BookingData) {
  try {
    // Validate time slot availability
    const isAvailable = await validateTimeSlot(data.selectedDate!, data.selectedTime!);
    if (!isAvailable) {
      throw new Error("This time slot is no longer available");
    }

    // Create time slot and booking in a transaction
    const booking = await db.$transaction(async (tx) => {
      const timeSlot = await tx.timeSlot.upsert({
        where: {
          date_startTime: {
            date: data.selectedDate!,
            startTime: data.selectedTime!
          }
        },
        create: {
          date: data.selectedDate!,
          startTime: data.selectedTime!,
          endTime: data.selectedTime!,
          isActive: true
        },
        update: {}
      });

      return tx.booking.create({
        data: {
          packageId: data.selectedPackage?.id ?? '',
          subPackageId: data.selectedSubPackage ?? '',
          vehicleType: data.vehicleType ?? '',
          date: data.selectedDate!,
          time: data.selectedTime!,
          timeSlotId: timeSlot.id,
          status: "PENDING",
          addOns: {
            connect: data.selectedAddOns?.map(id => ({ id })) || []
          },
          customerName: data.customerInfo?.name ?? '',
          customerEmail: data.customerInfo?.email ?? '',
          customerPhone: data.customerInfo?.phone ?? '',
          notes: data.customerInfo?.notes ?? '',
        },
      });
    });

    revalidatePath("/booking");
    return { success: true, booking };
  } catch (error) {
    console.error('Booking creation error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create booking' 
    };
  }
}
