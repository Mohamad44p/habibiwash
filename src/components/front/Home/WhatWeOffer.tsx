import Image from "next/image"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { Sparkles, PaintBucket, Shield, Calendar } from "lucide-react"

export default function WhatWeOffer() {
  return (
    <section className="container mx-auto px-4 py-32">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
          What We{" "}
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Offer</span>
        </h2>
        <p className="mt-4 text-xl text-muted-foreground">
          Experience our premium car care services tailored to elevate your vehicle&apos;s appearance and protection
        </p>
      </div>
      <BentoGrid className="max-w-5xl mx-auto md:auto-rows-[24rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={`${item.className} transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl group`}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </section>
  )
}

const ImageBackground = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative w-full h-full overflow-hidden rounded-xl">
    <Image
      src={src || "/images/Car2.jpg"}
      alt={alt}
      fill
      quality={100}
      className="absolute object-cover top-0 left-0 w-full h-full transition-all duration-300 ease-in-out"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
  </div>
)

const VideoBackground = () => (
  <div className="relative w-full h-full overflow-hidden rounded-xl">
    <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
      <source src="/video1.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
  </div>
)

const items = [
  {
    title: "Car Wash & Detailing",
    description:
      "Comprehensive interior and exterior cleaning, including engine bay and pet hair removal. We ensure your vehicle looks and feels brand new, inside and out.",
    header: <ImageBackground src="/images/Car2.jpg" alt="Car Wash & Detailing" />,
    className: "md:col-span-2",
    icon: <Sparkles className="h-4 w-4 text-primary" />,
  },
  {
    title: "Paint Correction & Restoration",
    description:
      "Advanced paint correction to remove scratches, swirl marks, and oxidation. We use clay bar treatment, expert polishing, and waxing for a flawless, mirror-like finish.",
    header: <ImageBackground src="/images/Car3.jpg" alt="Paint Correction & Restoration" />,
    className: "md:col-span-1",
    icon: <PaintBucket className="h-4 w-4 text-primary" />,
  },
  {
    title: "Ceramic Coating",
    description:
      "Cutting-edge ceramic coating for superior protection. Creates a durable, hydrophobic layer that repels contaminants, enhances gloss, and provides long-lasting, showroom-quality shine.",
    header: <ImageBackground src="/images/Car4.jpg" alt="Ceramic Coating" />,
    className: "md:col-span-1",
    icon: <Shield className="h-4 w-4 text-primary" />,
  },
  {
    title: "Book Your Service",
    description:
      "Ready to transform your vehicle? Schedule your preferred service now and experience the pinnacle of car care with our expert team.",
    header: <VideoBackground />,
    className: "md:col-span-2",
    icon: <Calendar className="h-4 w-4 text-primary" />,
  },
]

