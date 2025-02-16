import { getBooking } from "@/app/actions/bookingsActions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function BookingDetailsPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const booking = await getBooking(params.id);

  if (!booking) {
    notFound();
  }

  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  return (
    <div className="container mx-auto py-10">
      <Link href="/admin/bookings">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Bookings
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Booking Details</span>
            <Badge className={statusColors[booking.status]}>{booking.status}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Customer Information</h3>
              <p>Name: {booking.customerName}</p>
              <p>Email: {booking.customerEmail}</p>
              <p>Phone: {booking.customerPhone}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Booking Information</h3>
              <p>Package: {booking.package?.name}</p>
              <p>Vehicle Type: {booking.vehicleType}</p>
              <p>Date: {format(new Date(booking.date), "PPP")}</p>
              <p>Time: {booking.timeSlot?.startTime} - {booking.timeSlot?.endTime}</p>
            </div>
          </div>

          {booking.addOns.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Add-ons</h3>
              <div className="flex gap-2 flex-wrap">
                {booking.addOns.map((addOn) => (
                  <Badge key={addOn} variant="secondary">
                    {addOn}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {booking.notes && (
            <div>
              <h3 className="font-semibold mb-2">Notes</h3>
              <p className="text-gray-600">{booking.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
