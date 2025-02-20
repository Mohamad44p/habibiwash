import FAQ from "@/components/front/Home/FAQ"
import Hero from "@/components/front/Home/Hero"
import { ServiceAddOnsWrapper } from "@/components/front/Home/service-add-ons-wrapper"
import ServiceTabs from "@/components/front/Home/Service-tabs"
import WhatWeOffer from "@/components/front/Home/WhatWeOffer"
import { getPackages } from "@/app/actions/packagesActions"

export default async function Home() {
  const packages = await getPackages();

  return (
    <main className="bg-background text-foreground">
      <Hero />
      <WhatWeOffer/>
      <ServiceTabs packages={packages} />
      <ServiceAddOnsWrapper />
      <FAQ />
    </main>
  )
}

