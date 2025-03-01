import PackageForm from "@/components/admin/packages/PackageForm";

export default function CreatePackagePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Create New Package</h1>
      <PackageForm />
    </div>
  )
}