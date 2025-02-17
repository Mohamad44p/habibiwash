import { getBooking } from "@/app/actions/bookingsActions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Car, User, Mail, Phone, MessageSquare } from "lucide-react";
import { AVAILABLE_ICONS } from "@/lib/icons/icons";
import { AddOn } from "@/types/booking";

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

  const statusVariants = {
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
    CONFIRMED: "bg-blue-100 text-blue-800 border-blue-200",
    COMPLETED: "bg-green-100 text-green-800 border-green-200",
    CANCELLED: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <Link href="/admin/bookings">
        <Button variant="outline" className="mb-6 hover:bg-slate-100">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Bookings
        </Button>
      </Link>

      <Card className="shadow-lg border-slate-200">
        <CardHeader className="border-b bg-slate-50">
          <CardTitle className="flex justify-between items-center">
            <span>Booking #{booking.id.slice(0, 8)}</span>
            <Badge className={`px-4 py-1 text-sm font-medium rounded-full border ${statusVariants[booking.status]}`}>
              {booking.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Customer Details</h3>
              <div className="space-y-3">
                <div className="flex items-center text-slate-600">
                  <User className="w-4 h-4 mr-3" />
                  <span>{booking.customerName}</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Mail className="w-4 h-4 mr-3" />
                  <span>{booking.customerEmail}</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Phone className="w-4 h-4 mr-3" />
                  <span>{booking.customerPhone}</span>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Service Details</h3>
              <div className="space-y-3">
                <div className="flex items-center text-slate-600">
                  <Calendar className="w-4 h-4 mr-3" />
                  <span>{format(new Date(booking.date), "PPPP")}</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Clock className="w-4 h-4 mr-3" />
                  <span>{booking.timeSlot?.startTime} - {booking.timeSlot?.endTime}</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Car className="w-4 h-4 mr-3" />
                  <span>{booking.vehicleType}</span>
                </div>
              </div>
            </section>
          </div>

          {booking.addOns && booking.addOns.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Add-on Services</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {booking.addOns.map((addon: AddOn) => {
                  const IconComponent = AVAILABLE_ICONS[addon.icon as keyof typeof AVAILABLE_ICONS];
                  return (
                    <div
                      key={addon.id}
                      className="flex items-center p-3 rounded-lg bg-slate-50 border border-slate-200"
                    >
                      {IconComponent && <IconComponent className="w-4 h-4 mr-2 text-slate-600" />}
                      <div>
                        <p className="font-medium text-slate-800">{addon.name}</p>
                        <p className="text-sm text-slate-500">${addon.price}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {booking.notes && (
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Additional Notes</h3>
              <div className="flex items-start bg-slate-50 p-4 rounded-lg border border-slate-200">
                <MessageSquare className="w-4 h-4 mr-3 mt-1 text-slate-600" />
                <p className="text-slate-600">{booking.notes}</p>
              </div>
            </section>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
