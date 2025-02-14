import Layout from "@/components/admin/sidebar/layout";

export const metadata = {
  title: "Habibiwash Dashboard",
  description: "A modern dashboard with theme switching",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Layout>{children}</Layout>
    </main>
  );
}
