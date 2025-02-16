import { Suspense } from "react";
import { getTimeSlots } from "@/app/actions/timeSlotsActions";
import TimeSlotsTable from "@/components/admin/timeSlots/TimeSlotsTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function TimeSlotsPage() {
  const timeSlots = await getTimeSlots();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Time Slots Management</h1>
      <Link href="/admin/time-slots/create">
        <Button>Create New Time Slot</Button>
      </Link>
      <Suspense fallback={<div>Loading...</div>}>
        <TimeSlotsTable initialTimeSlots={timeSlots} />
      </Suspense>
    </div>
  );
}
