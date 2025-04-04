import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Habibiwash - Car detailing Service in Dallas, TX",
    template: "%s | Habibiwash",
  },
  description:
    "Book your car detailing with Habibiwash, the premier car detailing service in Dallas, Texas. Quick, convenient, and professional car cleaning at your fingertips.",
  keywords: [
    "car detailing",
    "car wash",
    "car cleaning",
    "car maintenance",
    "car care",
    "car detailing",
    "car waxing",
    "car polishing",
    "car cleaning",
    "car detailing",
    "Dallas",
    "Texas",
    "auto detailing",
    "vehicle cleaning",
    "mobile car detailing",
  ],
  authors: [{ name: "Habibiwash" }],
  creator: "Habibiwash",
  publisher: "Habibiwash",
  formatDetection: {
    telephone: true,
    address: true,
  },
  metadataBase: new URL("https://www.habibiwash.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Habibiwash - Premier Car Detailing Service in Dallas",
    description:
      "Experience the best car detailing in Dallas with Habibiwash. Book your appointment today for a spotless, shiny ride.",
    url: "https://www.habibiwash.com",
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
    title: "Habibiwash - Top-rated Car Detailing in Dallas",
    description:
      "Get your car sparkling clean with Habibiwash, Dallas' favorite car detailing service. Book now!",
    creator: "@habibiwash",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8618247453312071"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
