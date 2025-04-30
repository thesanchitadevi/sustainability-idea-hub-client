import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sustainability Idea Hub",
  description: "A platform for sharing and discovering sustainability ideas.",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <div className="w-full">{children}</div>
    </div>
  );
}
