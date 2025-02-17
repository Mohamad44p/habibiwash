import type React from "react";
import type { Metadata } from "next";
import Footer from "@/components/front/Home/Footer";
import Navbar from "@/components/front/Home/Navbar";

export const metadata: Metadata = {
  title: {
    default: "Habibiwash - Car Washing Service in Dallas, TX",
    template: "%s | Habibiwash",
  },
  description:
    "Book your car wash with Habibiwash, the premier car washing service in Dallas, Texas. Quick, convenient, and professional car cleaning at your fingertips.",
  keywords: [
    "car wash",
    "Dallas",
    "Texas",
    "auto detailing",
    "vehicle cleaning",
    "mobile car wash",
  ],
  authors: [{ name: "Habibiwash" }],
  creator: "Habibiwash",
  publisher: "Habibiwash",
  formatDetection: {
    telephone: true,
    address: true,
  },
  metadataBase: new URL("https://habibiwash.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Habibiwash - Premier Car Washing Service in Dallas",
    description:
      "Experience the best car wash in Dallas with Habibiwash. Book your appointment today for a spotless, shiny ride.",
    url: "https://habibiwash.com",
    siteName: "Habibiwash",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Habibiwash - Top-rated Car Wash in Dallas",
    description:
      "Get your car sparkling clean with Habibiwash, Dallas' favorite car washing service. Book now!",
    creator: "@habibiwash",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
