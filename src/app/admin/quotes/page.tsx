import { Suspense } from "react";
import { getQuotes } from "@/app/actions/quoteActions";
import QuotesTable from "@/components/admin/quotes/QuotesTable";

export default async function QuotesPage() {
  const quotes = await getQuotes();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Quote Requests</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <QuotesTable initialQuotes={quotes} />
      </Suspense>
    </div>
  );
}
