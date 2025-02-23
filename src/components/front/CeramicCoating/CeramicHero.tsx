"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import Link from "next/link";

export default function CeramicHero() {
  return (
    <div className="relative top-16 sm:top-14 flex flex-col">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>
      <section className="container mx-auto px-4 py-8 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="space-y-6 sm:space-y-8 lg:sticky lg:top-24">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Ultimate{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Protection
                </span>{" "}
                for Your Vehicle
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground sm:leading-8">
                Experience the future of car protection with our professional ceramic coating services. 
                Long-lasting shine and protection that keeps your vehicle looking new for years.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/booking">
                <Button size="lg" className="gap-2">
                  Get Protected Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#benefits">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4 p-4 bg-card rounded-lg border">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h4 className="font-semibold">Professional Grade Protection</h4>
                <p className="text-sm text-muted-foreground">
                  9H Hardness Rating | Up to 5 Years Protection
                </p>
              </div>
            </div>
          </div>

          <div className="relative group mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-3xl" />
            <div className="relative rounded-xl overflow-hidden aspect-[9/16] max-h-[70vh] shadow-2xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover scale-105"
                style={{ 
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              >
                <source src="/videos/ceramic-coating.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
                <div className="max-w-[80%]">
                  <p className="text-sm text-white/90 font-medium">
                    Professional Ceramic Coating Process
                  </p>
                  <p className="text-xs text-white/70 mt-1">
                    Watch our experts at work
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/30 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 via-transparent to-primary/10 group-hover:from-primary/20 group-hover:to-primary/20 transition-all duration-500" />
            
            <div className="absolute top-4 right-4 bg-background/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-xs text-white/90 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Playing
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
