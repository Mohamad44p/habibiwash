import { ArrowRight, Shield, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative top-16 sm:top-14 flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>
      <main className="relative">
        <section className="container mx-auto px-4 py-8 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Your Car Deserves{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    The Best Care
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground sm:leading-8">
                  Experience premium car washing services with HabibiWash. Book
                  your appointment today and give your vehicle the shine it
                  deserves.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/booking">
                  <Button size="lg" className="gap-2">
                    Book Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/booking">
                  <Button size="lg" variant="outline">
                    Our Services
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8">
                <div className="space-y-2 text-center">
                  <Shield className="h-8 w-8 mx-auto text-primary" />
                  <h4 className="font-semibold">Premium Quality</h4>
                  <p className="text-sm text-muted-foreground">
                    Top-notch service
                  </p>
                </div>
                <div className="space-y-2 text-center">
                  <Clock className="h-8 w-8 mx-auto text-primary" />
                  <h4 className="font-semibold">Quick Service</h4>
                  <p className="text-sm text-muted-foreground">
                    Save your time
                  </p>
                </div>
                <div className="space-y-2 text-center">
                  <Award className="h-8 w-8 mx-auto text-primary" />
                  <h4 className="font-semibold">Satisfaction</h4>
                  <p className="text-sm text-muted-foreground">
                    Guaranteed results
                  </p>
                </div>
              </div>
            </div>
            <div className="relative lg:hidden mb-8">
              <div className="aspect-video rounded-2xl overflow-hidden">
                <Image
                  src="/car.png"
                  alt="Car Wash"
                  fill
                  className="object-cover"
                  priority
                  quality={100}
                />
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-3xl" />
              <div className="relative bg-card rounded-2xl border p-6 shadow-2xl overflow-hidden">
                <div className="flex justify-center translate-x-12">
                  <Image
                    src="/car.png"
                    alt="Car Wash"
                    width={600}
                    height={400}
                    quality={100}
                    className="rounded-lg object-cover mb-6"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold">Quick Booking</h3>
                      <p className="text-sm text-muted-foreground">
                        Schedule your car wash in seconds
                      </p>
                    </div>
                    <Link href="/booking">
                      <Button variant="outline" size="sm">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="h-2 rounded-full bg-primary/20" />
                      <div className="h-2 w-2/3 rounded-full bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 rounded-full bg-primary/20" />
                      <div className="h-2 w-2/3 rounded-full bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 rounded-full bg-primary/20" />
                      <div className="h-2 w-2/3 rounded-full bg-muted" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
