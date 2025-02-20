import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Effective Date: 02/20/2025</p>
        </div>

        <div className="space-y-8 bg-card/50 backdrop-blur-sm rounded-lg border p-6 sm:p-8 shadow-lg">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-muted-foreground">
              Welcome to Habibi Wash! Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information when you visit our website or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-2">
                <span className="font-semibold">Personal Information:</span>
                Name, phone number, email address, and payment details when you book a service.
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">Usage Data:</span>
                Information about your interaction with our website, including IP address, browser type, and pages visited.
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">Cookies and Tracking Technologies:</span>
                To enhance your browsing experience and improve our services.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Provide and manage our car detailing services</li>
              <li>Process payments securely</li>
              <li>Improve our website and customer experience</li>
              <li>Respond to inquiries and customer support requests</li>
              <li>Send promotions or updates (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Sharing of Information</h2>
            <p className="text-muted-foreground mb-4">
              We do not sell, rent, or trade your personal information. However, we may share your data with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Payment processors to handle transactions securely</li>
              <li>Service providers assisting in website maintenance and marketing</li>
              <li>Legal authorities if required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="text-muted-foreground">
              We implement industry-standard security measures to protect your data. However, no online transmission is 100% secure, so we encourage safe online practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Rights and Choices</h2>
            <p className="text-muted-foreground mb-4">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Access, update, or delete your personal information</li>
              <li>Opt out of promotional communications</li>
              <li>Disable cookies through your browser settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Third-Party Links</h2>
            <p className="text-muted-foreground">
              Our website may contain links to third-party sites. We are not responsible for their privacy policies or practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground">
              We may update this policy occasionally. Any changes will be posted on this page with a revised effective date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">For questions about this policy, contact us at:</p>
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
