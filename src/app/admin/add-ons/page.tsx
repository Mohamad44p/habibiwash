import { Suspense } from "react";
import { getAddOns } from "@/app/actions/addOnsActions";
import AddOnsTable from "@/components/admin/addOns/AddOnsTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AddOnsPage() {
  const addOns = await getAddOns();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Add-ons Management</h1>
      <Link href="/admin/add-ons/create">
        <Button>Create New Add-on</Button>
      </Link>
      <Suspense fallback={<div>Loading...</div>}>
        <AddOnsTable initialAddOns={addOns} />
      </Suspense>
    </div>
  );
}
