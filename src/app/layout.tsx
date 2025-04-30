import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sustainability Idea Hub",
  description: "A platform for sharing and discovering sustainability ideas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider> */}
        {children}
      </body>
    </html>
  );
}
