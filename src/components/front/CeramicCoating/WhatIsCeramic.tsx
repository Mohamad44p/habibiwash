import { Badge } from "@/components/ui/badge";

export default function WhatIsCeramic() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge className="mb-4">What is Ceramic Coating?</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            The Science Behind{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Superior Protection
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Ceramic coating is a liquid polymer that chemically bonds with your vehicle&apos;s factory paint, 
            creating a layer of protection that can&apos;t be washed away like traditional waxes and sealants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">🔬</div>,
    title: "Nano-Technology",
    description: "Microscopic particles form an invisible shield that bonds at a molecular level with your car's paint."
  },
  {
    icon: <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">💪</div>,
    title: "Superior Hardness",
    description: "9H hardness rating provides exceptional resistance against scratches and environmental damage."
  },
  {
    icon: <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">⚡</div>,
    title: "Chemical Bond",
    description: "Creates a permanent bond with your vehicle's paint that won't wash away like traditional waxes."
  }
];
