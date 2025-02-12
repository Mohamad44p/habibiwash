import FAQ from "@/components/front/Home/FAQ"
import Footer from "@/components/front/Home/Footer"
import Hero from "@/components/front/Home/Hero"
import Navbar from "@/components/front/Home/Navbar"
import { ServiceAddOns } from "@/components/front/Home/service-add-ons"
import ServiceTabs from "@/components/front/Home/Service-tabs"
import WhatWeOffer from "@/components/front/Home/WhatWeOffer"

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <WhatWeOffer/>
      <ServiceTabs/>
      <ServiceAddOns />
      <FAQ />
      <Footer />
    </main>
  )
}

