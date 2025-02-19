"use client";

import { useState } from "react";
import { TimeSlot } from "@/types/timeSlot";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { deleteTimeSlot } from "@/app/actions/timeSlotsActions";
import { DataTable } from "../packages/data-table";

export default function TimeSlotsTable({
  initialTimeSlots,
}: {
  initialTimeSlots: TimeSlot[];
}) {
  const [timeSlots, setTimeSlots] = useState(initialTimeSlots);

  const columns = [
    {
      key: "startTime" as keyof TimeSlot,
      label: "Start Time",
      sortable: true,
    },
    {
      key: "endTime" as keyof TimeSlot,
      label: "End Time",
      sortable: true,
    },
    {
      key: "id" as keyof TimeSlot,
      label: "Actions",
      render: (_: string, timeSlot: TimeSlot) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/time-slots/${timeSlot.id}/edit`}>
            <Button variant="outline" size="sm">
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button
            variant="destructive"
            size="sm"
            onClick={async () => {
              if (confirm("Are you sure you want to delete this time slot?")) {
                await deleteTimeSlot(timeSlot.id!);
                setTimeSlots(timeSlots.filter((t) => t.id !== timeSlot.id));
              }
            }}
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={timeSlots} />;
}
