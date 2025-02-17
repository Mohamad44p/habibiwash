"use server";

import { revalidatePath } from "next/cache";
import db from "../db/db";

export async function createBlockedTime(data: {
  date?: Date;
  startTime?: string;
  endTime?: string;
  isFullDay: boolean;
  reason?: string;
}) {
  const result = await db.blockedTime.create({ data });
  revalidatePath("/admin/blocked-times");
  return result;
}

export async function deleteBlockedTime(id: string) {
  await db.blockedTime.delete({ where: { id } });
  revalidatePath("/admin/blocked-times");
}

export async function getBlockedTimes() {
  return await db.blockedTime.findMany({
    orderBy: { createdAt: 'desc' }
  });
}
