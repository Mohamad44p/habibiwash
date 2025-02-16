"use client";

import { useState } from "react";
import { Booking, BookingStatus } from "@/types/booking";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { updateBookingStatus } from "@/app/actions/bookingsActions";
import { DataTable } from "../packages/data-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function BookingsTable({
  initialBookings,
}: {
  initialBookings: Booking[];
}) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  const getStatusBadge = (status: BookingStatus) => {
    const variants = {
      PENDING: "warning",
      CONFIRMED: "default",
      COMPLETED: "default",
      CANCELLED: "destructive",
    } as const;
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const columns: ColumnDef<Booking>[] = [
    {
      accessorKey: "customerName",
      header: "Customer",
    },
    {
      accessorKey: "package.name",
      header: "Package",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => format(new Date(row.original.date), "PPP"),
    },
    {
      accessorKey: "timeSlot",
      header: "Time",
      cell: ({ row }) => `${row.original.timeSlot?.startTime} - ${row.original.timeSlot?.endTime}`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => getStatusBadge(row.original.status),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/bookings/${row.original.id}`}>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
          </Link>
          {row.original.status === "PENDING" && (
            <>
              <Button
                variant="default"
                size="sm"
                onClick={async () => {
                  const updated = await updateBookingStatus(row.original.id!, "CONFIRMED");
                  setBookings(bookings.map(b => 
                    b.id === updated.id ? updated : b
                  ));
                }}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={async () => {
                  const updated = await updateBookingStatus(row.original.id!, "CANCELLED");
                  setBookings(bookings.map(b => 
                    b.id === updated.id ? updated : b
                  ));
                }}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={bookings}
      filterColumn="customerName"
      filterPlaceholder="Filter bookings..."
    />
  );
}
