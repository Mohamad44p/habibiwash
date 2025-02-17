import db from "@/app/db/db";
import PackageForm from "@/components/admin/packages/PackageForm";
import { notFound } from "next/navigation";
import {normalizePrismaPackage } from "@/types/package";

export default async function EditPackagePage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const result = await db.package.findUnique({
    where: { id: params.id },
    include: {
      subPackages: {
        include: {
          prices: true,
        },
      },
      addOns: true,
    },
  });

  if (!result) {
    notFound();
  }

  const normalizedPackage = normalizePrismaPackage(result);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Edit Package: {normalizedPackage.name}</h1>
      <PackageForm initialData={normalizedPackage} />
    </div>
  );
}
