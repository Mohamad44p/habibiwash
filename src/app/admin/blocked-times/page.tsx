import { getBlockedTimes } from "@/app/actions/blockedTimesActions";
import BlockedTimesManager from "@/components/admin/blockedTimes/BlockedTimesManager";

export default async function BlockedTimesPage() {
  const blockedTimes = await getBlockedTimes();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Manage Blocked Times</h1>
      <BlockedTimesManager initialBlockedTimes={blockedTimes} />
    </div>
  );
}
