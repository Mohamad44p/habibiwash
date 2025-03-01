import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Habibiwash Dashboard",
  description: "A modern dashboard with theme switching",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
