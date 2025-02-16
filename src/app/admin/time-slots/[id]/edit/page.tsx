import db from "@/app/db/db";
import TimeSlotForm from "@/components/admin/timeSlots/TimeSlotForm";
import { notFound } from "next/navigation";
import { normalizeTimeSlot } from "@/types/timeSlot";

export default async function EditTimeSlotPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const result = await db.timeSlot.findUnique({
    where: { id: params.id },
  });

  if (!result) {
    notFound();
  }

  const normalizedTimeSlot = normalizeTimeSlot(result);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">
        Edit Time Slot: {normalizedTimeSlot.startTime} - {normalizedTimeSlot.endTime}
      </h1>
      <TimeSlotForm initialData={normalizedTimeSlot} />
    </div>
  );
}
