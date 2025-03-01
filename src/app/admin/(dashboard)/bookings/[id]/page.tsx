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
    PENDING: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
    CONFIRMED: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    COMPLETED: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800",
    CANCELLED: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800",
  };

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <Link href="/admin/bookings">
        <Button variant="outline" className="mb-6 hover:bg-muted">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Bookings
        </Button>
      </Link>

      <Card className="shadow-lg border-border dark:bg-card">
        <CardHeader className="border-b bg-muted/50 dark:bg-background/50">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-4">
                Booking #{booking.id.slice(0, 8)}
                <Badge className={`px-4 py-1 text-sm font-medium rounded-full border ${statusVariants[booking.status]}`}>
                  {booking.status}
                </Badge>
              </CardTitle>
              <p className="text-lg font-bold text-primary dark:text-primary/90">
                Total Amount: ${booking.totalPrice.toFixed(2)}
              </p>
            </div>
            <div className="text-sm text-muted-foreground dark:text-muted-foreground/90">
              Created: {format(new Date(booking.createdAt), "PPp")}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <section className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2 dark:border-border">
                Customer Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center text-muted-foreground dark:text-muted-foreground/90">
                  <User className="w-4 h-4 mr-3" />
                  <span>{booking.customerName}</span>
                </div>
                <div className="flex items-center text-muted-foreground dark:text-muted-foreground/90">
                  <Mail className="w-4 h-4 mr-3" />
                  <span>{booking.customerEmail}</span>
                </div>
                <div className="flex items-center text-muted-foreground dark:text-muted-foreground/90">
                  <Phone className="w-4 h-4 mr-3" />
                  <span>{booking.customerPhone}</span>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2 dark:border-border">
                Service Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center text-muted-foreground dark:text-muted-foreground/90">
                  <Calendar className="w-4 h-4 mr-3" />
                  <span>{format(new Date(booking.date), "PPPP")}</span>
                </div>
                <div className="flex items-center text-muted-foreground dark:text-muted-foreground/90">
                  <Clock className="w-4 h-4 mr-3" />
                  <span>{booking.timeSlot?.startTime} - {booking.timeSlot?.endTime}</span>
                </div>
                <div className="flex items-center text-muted-foreground dark:text-muted-foreground/90">
                  <Car className="w-4 h-4 mr-3" />
                  <span className="capitalize">{booking.vehicleType}</span>
                </div>
              </div>
            </section>
          </div>

          {booking.addOns && booking.addOns.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2 dark:border-border">
                Add-on Services (${booking.addOns.reduce((sum, addon) => sum + addon.price, 0).toFixed(2)})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {booking.addOns.map((addon: AddOn) => {
                  const IconComponent = AVAILABLE_ICONS[addon.icon as keyof typeof AVAILABLE_ICONS];
                  return (
                    <div
                      key={addon.id}
                      className="flex items-center p-3 rounded-lg bg-muted/50 dark:bg-muted/20 border border-border"
                    >
                      {IconComponent && <IconComponent className="w-4 h-4 mr-2 text-primary dark:text-primary/80" />}
                      <div>
                        <p className="font-medium">{addon.name}</p>
                        <p className="text-sm text-muted-foreground dark:text-muted-foreground/90">
                          ${addon.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {booking.notes && (
            <section className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2 dark:border-border">
                Additional Notes
              </h3>
              <div className="flex items-start bg-muted/50 dark:bg-muted/20 p-4 rounded-lg border border-border">
                <MessageSquare className="w-4 h-4 mr-3 mt-1 text-muted-foreground" />
                <p className="text-muted-foreground dark:text-muted-foreground/90">
                  {booking.notes}
                </p>
              </div>
            </section>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
