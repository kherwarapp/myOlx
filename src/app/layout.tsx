import type { Metadata } from "next";
// import { HeroUIProvider } from "@heroui/react";
import "./globals.css";
import { HeroUIProvider } from "@heroui/system";

export const metadata: Metadata = {
  title: "My HeroUI App",
  description: "Next.js + Tailwind + HeroUI setup",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <HeroUIProvider>{children}</HeroUIProvider>
      </body>
    </html>
  );
}
