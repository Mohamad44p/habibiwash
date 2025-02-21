"use client";

import { useState } from "react";
import type { Quote, QuoteStatus } from "@/types/quote";
import type { Column } from "@/types/data-table";
import { DataTable } from "../packages/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { updateQuoteStatus } from "@/app/actions/quoteActions";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import Link from "next/link";

export default function QuotesTable({
  initialQuotes,
}: {
  initialQuotes: Quote[];
}) {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);

  const columns: Column<Quote>[] = [
    {
      key: "firstName",
      label: "Customer",
      render: (_, quote) => `${quote.firstName} ${quote.lastName}`,
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "vehicle",
      label: "Vehicle",
    },
    {
      key: "createdAt",
      label: "Submitted",
      render: (value) => format(new Date(value), "PPp"),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => <Badge>{value}</Badge>,
    },
    {
      key: "id",
      label: "Actions",
      render: (_, quote) => (
        <div className="flex gap-2">
          <Link href={`/admin/quotes/${quote.id}`}>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
          </Link>
          {quote.status === "PENDING" && (
            <>
              <Button
                size="sm"
                onClick={() => handleStatusUpdate(quote.id, "APPROVED" as QuoteStatus)}
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleStatusUpdate(quote.id, "REJECTED" as QuoteStatus)}
              >
                Reject
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  const handleStatusUpdate = async (id: string, status: QuoteStatus) => {
    const updated = await updateQuoteStatus(id, status);
    if (updated) {
      setQuotes(quotes.map((q) => (q.id === updated.id ? updated as Quote : q)));
    }
  };

  return <DataTable columns={columns} data={quotes} />;
}
