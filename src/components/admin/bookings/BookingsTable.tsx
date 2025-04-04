"use client"

import { useState } from "react"
import type { Booking, BookingStatus } from "@/types/booking"
import { Button } from "@/components/ui/button"
import { Eye, CheckCircle, XCircle, Trash2 } from "lucide-react"
import Link from "next/link"
import { updateBookingStatus, deleteBooking } from "@/app/actions/bookingsActions"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "../packages/data-table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function BookingsTable({
  initialBookings,
}: {
  initialBookings: Booking[]
}) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings)

  const getStatusBadge = (status: BookingStatus) => {
    const variants = {
      PENDING: "warning",
      CONFIRMED: "default",
      COMPLETED: "default",
      CANCELLED: "destructive",
    } as const
    return <Badge variant={variants[status]}>{status}</Badge>
  }

  const columns = [
    {
      key: "customerName" as keyof Booking,
      label: "Customer",
      sortable: true,
    },
    {
      key: "package" as keyof Booking,
      label: "Package",
      render: (value: Booking["package"]) => value.name,
    },
    {
      key: "date" as keyof Booking,
      label: "Date",
      sortable: true,
      render: (value: Booking["date"]) => format(new Date(value), "PPP"),
    },
    {
      key: "timeSlot" as keyof Booking,
      label: "Time",
      render: (value: Booking["timeSlot"]) => `${value?.startTime} - ${value?.endTime}`,
    },
    {
      key: "street" as keyof Booking,
      label: "Address",
      render: (_: unknown, booking: Booking) => (
        <div className="max-w-[200px] truncate" title={`${booking.street}, ${booking.city}, ${booking.state} ${booking.zipCode}`}>
          {booking.street && booking.city ? `${booking.street}, ${booking.city}` : "No address provided"}
        </div>
      ),
    },
    {
      key: "status" as keyof Booking,
      label: "Status",
      sortable: true,
      render: (value: Booking["status"]) => getStatusBadge(value),
    },
    {
      key: "totalPrice" as keyof Booking,
      label: "Total Price",
      sortable: true,
      render: (value: Booking["totalPrice"]) => <span className="font-medium">${value.toFixed(2)}</span>,
    },
    {
      key: "id" as keyof Booking,
      label: "Actions",
      render: (value: Booking["id"], booking: Booking) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/bookings/${booking.id}`}>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
          </Link>
          {booking.status === "PENDING" && (
            <>
              <Button
                variant="default"
                size="sm"
                onClick={async () => {
                  const updated = await updateBookingStatus(booking.id!, "CONFIRMED")
                  setBookings(bookings.map((b) => (b.id === updated.id ? updated : b)))
                }}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={async () => {
                  const updated = await updateBookingStatus(booking.id!, "CANCELLED")
                  setBookings(bookings.map((b) => (b.id === updated.id ? updated : b)))
                }}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </>
          )}
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Booking</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this booking? This action cannot be undone and will permanently remove all booking data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    const success = await deleteBooking(booking.id!);
                    if (success) {
                      setBookings(bookings.filter((b) => b.id !== booking.id));
                    }
                  }}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ]

  return <DataTable columns={columns} data={bookings} />
}