import { Suspense } from "react";
import { getPackages } from "@/app/actions/packagesActions";
import BookingFlow from "@/components/booking/BookingFlow";
import { Skeleton } from "@/components/ui/skeleton";

export const revalidate = 3600;

async function BookingData() {
  const packages = await getPackages();
  return <BookingFlow initialPackages={packages} />;
}

export default function BookingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/95">
      <Suspense fallback={<BookingFlowSkeleton />}>
        <BookingData />
      </Suspense>
    </main>
  );
}

function BookingFlowSkeleton() {
  return (
    <div className="w-full max-w-4xl space-y-8">
      <Skeleton className="h-8 w-3/4 mx-auto" />
      <Skeleton className="h-64 w-full" />
      <div className="flex justify-center space-x-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}

