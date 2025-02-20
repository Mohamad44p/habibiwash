import { ScrollText } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <ScrollText className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last Updated: 02/20/2025</p>
        </div>

        <div className="space-y-8 bg-card/50 backdrop-blur-sm rounded-lg border p-6 sm:p-8 shadow-lg">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground">
              By accessing or using Habibi Wash services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
            <p className="text-muted-foreground mb-4">
              Habibi Wash provides professional car detailing services, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Interior and exterior cleaning</li>
              <li>Paint protection services</li>
              <li>Ceramic coating application</li>
              <li>Premium detailing packages</li>
              <li>Additional services as specified in service descriptions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Booking and Cancellation</h2>
            <div className="space-y-4 text-muted-foreground">
              <h3 className="font-semibold text-foreground">3.1 Booking</h3>
              <p>Appointments must be scheduled in advance through our website or authorized booking channels.</p>
              
              <h3 className="font-semibold text-foreground">3.2 Cancellation Policy</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>24-hour notice required for cancellations</li>
                <li>Late cancellations may incur a fee</li>
                <li>No-shows will be charged a service fee</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Pricing and Payment</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>All prices are subject to change without notice. Payment is required at the time of service completion.</p>
              <ul className="list-disc list-inside space-y-2">
                <li>We accept major credit cards and digital payments</li>
                <li>Additional charges may apply for excessive dirt or special treatments</li>
                <li>Prices may vary based on vehicle size and condition</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Service Guarantees</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>We strive for 100% customer satisfaction. If you&apos;re not satisfied with our service:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Notify us within 24 hours of service completion</li>
                <li>We will rectify any issues at no additional cost</li>
                <li>Quality guarantees apply to specific services as indicated</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Customer Responsibilities</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Provide accurate vehicle information</li>
              <li>Remove personal belongings before service</li>
              <li>Inform us of any existing damage or concerns</li>
              <li>Ensure vehicle accessibility at scheduled time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Liability</h2>
            <p className="text-muted-foreground">
              While we take utmost care with your vehicle, we are not liable for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
              <li>Pre-existing damage or conditions</li>
              <li>Normal wear and tear</li>
              <li>Items left in the vehicle</li>
              <li>Damage caused by environmental factors</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Privacy and Data</h2>
            <p className="text-muted-foreground">
              Your privacy is important to us. Please review our Privacy Policy for information on how we collect, use, and protect your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Modifications</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
            <p className="text-muted-foreground">For questions about these terms, contact us at:</p>
            <div className="mt-4 space-y-2 text-muted-foreground">
              <p>Habibi Wash</p>
              <p>Email: habibiwash99@gmail.com</p>
              <p>Phone: +1 (945)-309-0185</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
