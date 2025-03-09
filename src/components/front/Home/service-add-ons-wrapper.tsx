import { getAddOns } from "@/app/actions/addOnsActions";
import { ServiceAddOns } from "./service-add-ons";
import { unstable_cache } from 'next/cache';

// Cache the getAddOns function with a short TTL
const getCachedAddOns = unstable_cache(
  async () => {
    return getAddOns();
  },
  ['home-addons'],
  { revalidate: 60 } // Revalidate every 60 seconds
);

export async function ServiceAddOnsWrapper() {
  const addOns = await getCachedAddOns();

  return <ServiceAddOns initialAddOns={addOns} />;
}
    