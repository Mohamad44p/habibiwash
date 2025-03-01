import { getQuote } from "@/app/actions/quoteActions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Car, User, Mail, Phone, MessageSquare, CalendarCheck, CheckSquare } from "lucide-react";
import { exteriorServices, interiorServices } from "@/lib/constants/services";

export default async function QuoteDetailsPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const quote = await getQuote(params.id);

  if (!quote) {
    notFound();
  }

  const statusVariants = {
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
    APPROVED: "bg-green-100 text-green-800 border-green-200",
    REJECTED: "bg-red-100 text-red-800 border-red-200",
    REVIEWED: "bg-blue-100 text-blue-800 border-blue-200",
  };

  const getServiceLabel = (id: string) => {
    const exteriorService = exteriorServices.find(s => s.id === id);
    if (exteriorService) return exteriorService.label;
    
    const interiorService = interiorServices.find(s => s.id === id);
    return interiorService?.label || id;
  };

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <Link href="/admin/quotes">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Quotes
        </Button>
      </Link>

      <Card>
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-4">
                Quote Request #{quote.id.slice(0, 8)}
                <Badge className={`px-3 py-1 ${statusVariants[quote.status as keyof typeof statusVariants]}`}>
                  {quote.status}
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Submitted on {format(new Date(quote.createdAt), "PPp")}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <section className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Customer Information</h3>
              <div className="space-y-3">
                <div className="flex items-center text-muted-foreground">
                  <User className="w-4 h-4 mr-3" />
                  <span>{quote.firstName} {quote.lastName}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Mail className="w-4 h-4 mr-3" />
                  <span>{quote.email}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Phone className="w-4 h-4 mr-3" />
                  <span>{quote.phone}</span>
                </div>
                {quote.zipCode && (
                  <div className="flex items-center text-muted-foreground">
                    <CalendarCheck className="w-4 h-4 mr-3" />
                    <span>ZIP Code: {quote.zipCode}</span>
                  </div>
                )}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Vehicle Information</h3>
              <div className="flex items-center text-muted-foreground">
                <Car className="w-4 h-4 mr-3" />
                <span>{quote.vehicle}</span>
              </div>
            </section>
          </div>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Requested Services</h3>
            
            {quote.exteriorServices.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Exterior Services</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {quote.exteriorServices.map((serviceId) => (
                    <div key={serviceId} className="flex items-center text-muted-foreground">
                      <CheckSquare className="w-4 h-4 mr-2" />
                      <span>{getServiceLabel(serviceId)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {quote.interiorServices.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Interior Services</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {quote.interiorServices.map((serviceId) => (
                    <div key={serviceId} className="flex items-center text-muted-foreground">
                      <CheckSquare className="w-4 h-4 mr-2" />
                      <span>{getServiceLabel(serviceId)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {quote.message && (
            <section className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Additional Message</h3>
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start">
                  <MessageSquare className="w-4 h-4 mr-3 mt-1 text-muted-foreground" />
                  <p className="text-muted-foreground whitespace-pre-wrap">{quote.message}</p>
                </div>
              </div>
            </section>
          )}

          <section className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Contact Preference</h3>
            <div className="flex items-center text-muted-foreground">
              <Phone className="w-4 h-4 mr-3" />
              <span>Preferred contact method: {quote.contactMethod}</span>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
