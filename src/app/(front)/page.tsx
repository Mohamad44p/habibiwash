import FAQ from "@/components/front/Home/FAQ"
import Hero from "@/components/front/Home/Hero"
import { ServiceAddOnsWrapper } from "@/components/front/Home/service-add-ons-wrapper"
import ServiceTabs from "@/components/front/Home/Service-tabs"
import WhatWeOffer from "@/components/front/Home/WhatWeOffer"
import { getPackages } from "@/app/actions/packagesActions"
import TestimonialsServer from "@/components/front/Home/TestimonialsServer"
import { unstable_cache } from 'next/cache'

// Cache the getPackages function with a short TTL to ensure fresh data
// while still benefiting from caching
const getCachedPackages = unstable_cache(
  async () => {
    return getPackages();
  },
  ['home-packages'],
  { revalidate: 60 } // Revalidate every 60 seconds
);

export default async function Home() {
  const packages = await getCachedPackages();

  return (
    <main className="bg-background text-foreground">
      <Hero />
      <WhatWeOffer/>
      <ServiceTabs packages={packages} />
      <ServiceAddOnsWrapper />
      <TestimonialsServer/>
      <FAQ />
    </main>
  )
}

