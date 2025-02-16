"use client";

import { useState } from "react";
import { TimeSlot } from "@/types/timeSlot";
import { ColumnDef } from "@tanstack/react-table";
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

  const columns: ColumnDef<TimeSlot>[] = [
    {
      accessorKey: "startTime",
      header: "Start Time",
    },
    {
      accessorKey: "endTime",
      header: "End Time",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/time-slots/${row.original.id}/edit`}>
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
                await deleteTimeSlot(row.original.id!);
                setTimeSlots(timeSlots.filter((t) => t.id !== row.original.id));
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

  return (
    <DataTable
      columns={columns}
      data={timeSlots}
      filterColumn="startTime"
      filterPlaceholder="Filter time slots..."
    />
  );
}
