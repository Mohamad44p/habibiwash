import db from "@/app/db/db";
import AddOnForm from "@/components/admin/addOns/AddOnForm";
import { notFound } from "next/navigation";
import { normalizeAddOn } from "@/types/addOn";

export default async function EditAddOnPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const result = await db.addOn.findUnique({
    where: { id: params.id },
  });

  if (!result) {
    notFound();
  }

  const normalizedAddOn = normalizeAddOn(result);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Edit Add-on: {normalizedAddOn.name}</h1>
      <AddOnForm initialData={normalizedAddOn} />
    </div>
  );
}
