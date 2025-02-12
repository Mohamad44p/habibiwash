import Hero from "@/components/front/Home/Hero"
import Navbar from "@/components/front/Home/Navbar"
import WhatWeOffer from "@/components/front/Home/WhatWeOffer"

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <WhatWeOffer/>
    </main>
  )
}

