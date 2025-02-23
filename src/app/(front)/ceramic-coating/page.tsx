import CeramicBenefits from "@/components/front/CeramicCoating/CeramicBenefits"
import CeramicFAQ from "@/components/front/CeramicCoating/CeramicFAQ"
import CeramicHero from "@/components/front/CeramicCoating/CeramicHero"
import WhatIsCeramic from "@/components/front/CeramicCoating/WhatIsCeramic"
import WhyChooseUs from "@/components/front/CeramicCoating/WhyChooseUs"


export default function CeramicCoatingPage() {
  return (
    <main className="bg-background">
      <CeramicHero />
      <WhatIsCeramic />
      <CeramicBenefits />
      <WhyChooseUs />
      <CeramicFAQ />
    </main>
  )
}
