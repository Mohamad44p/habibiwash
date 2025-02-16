import TimeSlotForm from "@/components/admin/timeSlots/TimeSlotForm";

export default function CreateTimeSlotPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Create New Time Slot</h1>
      <TimeSlotForm />
    </div>
  );
}
