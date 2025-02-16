"use server";

import { revalidatePath } from "next/cache";
import { TimeSlot, normalizeTimeSlot } from "@/types/timeSlot";
import db from "../db/db";

export async function getTimeSlots(): Promise<TimeSlot[]> {
  const timeSlots = await db.timeSlot.findMany();
  return timeSlots.map(normalizeTimeSlot);
}

export async function createTimeSlot(data: TimeSlot) {
  const result = await db.timeSlot.create({
    data: {
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
    },
  });

  revalidatePath("/admin/time-slots");
  return normalizeTimeSlot(result);
}

export async function updateTimeSlot(id: string, data: TimeSlot) {
  const result = await db.timeSlot.update({
    where: { id },
    data: {
      startTime: data.startTime,
      endTime: data.endTime,
    },
  });

  revalidatePath("/admin/time-slots");
  return normalizeTimeSlot(result);
}

export async function deleteTimeSlot(id: string) {
  await db.timeSlot.delete({ where: { id } });
  revalidatePath("/admin/time-slots");
}

export async function getAvailableTimeSlots(date: Date) {
  const bookings = await db.booking.findMany({
    where: {
      date: date,
    },
    select: {
      time: true
    }
  });

  const bookedTimes = new Set(bookings.map(b => b.time));
  
  const timeSlots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (const minute of [0, 30]) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeSlots.push({
        startTime: time,
        isBooked: bookedTimes.has(time)
      });
    }
  }

  return timeSlots;
}
