import { Suspense } from "react";
import { getBookings } from "@/app/actions/bookingsActions";
import BookingsTable from "@/components/admin/bookings/BookingsTable";

export default async function BookingsPage() {
  const bookings = await getBookings();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Bookings Management</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <BookingsTable initialBookings={bookings} />
      </Suspense>
    </div>
  );
}
