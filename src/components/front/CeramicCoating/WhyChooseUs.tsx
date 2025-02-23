import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-3xl" />
            <div className="relative">
              <Image
                src="/ceramic.webp"
                alt="Ceramic Coating Application"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl" />
            </div>
          </div>

          <div>
            <Badge className="mb-4">Why Choose Us</Badge>
            <h2 className="text-3xl font-bold mb-6">
              Expert{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Ceramic Coating
              </span>{" "}
              Application
            </h2>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    title: "Professional Application",
    description:
      "Our certified technicians ensure proper application for maximum durability and protection.",
  },
  {
    title: "Premium Products",
    description:
      "We use only the highest quality ceramic coating products available in the market.",
  },
  {
    title: "Thorough Preparation",
    description:
      "Complete paint correction and surface preparation before coating application.",
  },
  {
    title: "Quality Guarantee",
    description:
      "We stand behind our work with satisfaction guarantee and ongoing support.",
  },
];
