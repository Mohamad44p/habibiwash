import { ArrowRight, Shield, Clock, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>
      <main className="flex-1 relative">
        <section className="container mx-auto px-4 py-32 lg:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Your Car Deserves{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    The Best Care
                  </span>
                </h1>
                <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                  Experience premium car washing services with HabibiWash. Book your appointment today and give your
                  vehicle the shine it deserves.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="gap-2">
                  Book Now <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Our Services
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="space-y-2 text-center">
                  <Shield className="h-8 w-8 mx-auto text-primary" />
                  <h4 className="font-semibold">Premium Quality</h4>
                  <p className="text-sm text-muted-foreground">Top-notch service</p>
                </div>
                <div className="space-y-2 text-center">
                  <Clock className="h-8 w-8 mx-auto text-primary" />
                  <h4 className="font-semibold">Quick Service</h4>
                  <p className="text-sm text-muted-foreground">Save your time</p>
                </div>
                <div className="space-y-2 text-center">
                  <Award className="h-8 w-8 mx-auto text-primary" />
                  <h4 className="font-semibold">Satisfaction</h4>
                  <p className="text-sm text-muted-foreground">Guaranteed results</p>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-3xl" />
              <div className="relative bg-card rounded-2xl border p-6 shadow-2xl overflow-hidden">
                <Image
                  src="/HeroImage.jpg"
                  alt="Car Wash"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover mb-6"
                />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold">Quick Booking</h3>
                      <p className="text-sm text-muted-foreground">Schedule your car wash in seconds</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Book Now
                    </Button>
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
  )
}

