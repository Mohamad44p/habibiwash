import { Suspense } from "react";
import { getPackages } from "@/app/actions/packagesActions";
import PackagesTable from "@/components/admin/packages/PackagesTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <div className="container mx-auto py-10" suppressHydrationWarning>
      <h1 className="text-2xl font-bold mb-5">Car Washing Packages</h1>
      <div className="py-5">
        <Link href="/admin/packages/create" className="py-5">
          <Button>Create New Package</Button>
        </Link>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <PackagesTable initialPackages={packages} />
      </Suspense>
    </div>
  );
}
