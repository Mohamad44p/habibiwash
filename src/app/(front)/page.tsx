import FAQ from "@/components/front/Home/FAQ"
import Hero from "@/components/front/Home/Hero"
import { ServiceAddOns } from "@/components/front/Home/service-add-ons"
import ServiceTabs from "@/components/front/Home/Service-tabs"
import WhatWeOffer from "@/components/front/Home/WhatWeOffer"

export default function Home() {
  return (
    <main className="bg-background text-foreground">
    
      <Hero />
      <WhatWeOffer/>
      <ServiceTabs/>
      <ServiceAddOns />
      <FAQ />

    </main>
  )
}

