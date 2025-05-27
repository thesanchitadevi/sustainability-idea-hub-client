import Providers from "@/providers/Provider";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "EcoHive",
  description: "A platform for sharing and discovering sustainability ideas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <Toaster />
          <NextTopLoader showSpinner={false} />
        </Providers>
      </body>
    </html>
  );
}
