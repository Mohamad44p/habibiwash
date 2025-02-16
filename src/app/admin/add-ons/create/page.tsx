import AddOnForm from "@/components/admin/addOns/AddOnForm";

export default function CreateAddOnPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Create New Add-on</h1>
      <AddOnForm />
    </div>
  );
}
