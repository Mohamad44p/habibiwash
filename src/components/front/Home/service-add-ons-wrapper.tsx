import { getAddOns } from "@/app/actions/addOnsActions";
import { ServiceAddOns } from "./service-add-ons";

export async function ServiceAddOnsWrapper() {
  const addOns = await getAddOns();

  return <ServiceAddOns initialAddOns={addOns} />;
}
    