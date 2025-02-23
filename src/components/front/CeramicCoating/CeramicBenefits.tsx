import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Shield, Droplets, Sun, Timer, Sparkles, Ban } from "lucide-react";

export default function CeramicBenefits() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4">Benefits</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Ceramic Coating
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the advantages of our professional ceramic coating service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow duration-300 bg-background"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const benefits = [
  {
    icon: <Shield className="h-5 w-5 text-primary" />,
    title: "Superior Protection",
    description: "Guards against scratches, UV rays, and chemical contaminants with 9H hardness."
  },
  {
    icon: <Droplets className="h-5 w-5 text-primary" />,
    title: "Hydrophobic Effect",
    description: "Water beads and rolls off easily, taking dirt and grime with it."
  },
  {
    icon: <Sun className="h-5 w-5 text-primary" />,
    title: "UV Protection",
    description: "Prevents oxidation and fading caused by harsh sunlight exposure."
  },
  {
    icon: <Timer className="h-5 w-5 text-primary" />,
    title: "Long-Lasting",
    description: "Provides protection for up to 5 years with proper maintenance."
  },
  {
    icon: <Sparkles className="h-5 w-5 text-primary" />,
    title: "Enhanced Gloss",
    description: "Creates a deep, mirror-like finish that enhances your vehicle's appearance."
  },
  {
    icon: <Ban className="h-5 w-5 text-primary" />,
    title: "Chemical Resistance",
    description: "Protects against harsh chemicals, bird droppings, and tree sap."
  }
];
