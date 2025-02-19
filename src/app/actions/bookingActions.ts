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

async function calculateTotalPrice(data: BookingData): Promise<number> {
  try {
    // Get selected subpackage price based on vehicle type
    const subPackage = data.selectedPackage?.subPackages.find(
      (sp) => sp.id === data.selectedSubPackage
    );
    
    const basePrice = subPackage?.prices.find(
      (p) => p.vehicleType.toLowerCase() === data.vehicleType?.toLowerCase()
    )?.price || 0;

    // Get add-ons prices directly from the database
    const addOnsTotal = data.selectedAddOns?.length 
      ? await db.addOn.findMany({
          where: {
            id: {
              in: data.selectedAddOns
            }
          },
          select: {
            price: true
          }
        }).then(addOns => addOns.reduce((sum, addon) => sum + addon.price, 0))
      : 0;

    return basePrice + addOnsTotal;
  } catch (error) {
    console.error('Error calculating total price:', error);
    throw error;
  }
}

export async function createBooking(data: BookingData) {
  try {
    // Validate time slot availability
    const isAvailable = await validateTimeSlot(data.selectedDate!, data.selectedTime!);
    if (!isAvailable) {
      throw new Error("This time slot is no longer available");
    }

    // Calculate total price
    const totalPrice = await calculateTotalPrice(data);

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
          totalPrice: totalPrice, // Add the calculated total price
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
