import type { Metadata } from "next";

import { HeroUIProvider } from "@heroui/react";
import { Poppins } from "next/font/google";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"], 
  weight: ["400", "700"], 
  variable: "--font-poppins", 
});

export const metadata: Metadata = {
  title: "CRUD de productos",
  description: "CRUD de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${poppins.variable} dark antialiased`}
      >
        <HeroUIProvider>
          {children}
        </HeroUIProvider>
      </body>
    </html >
  );
}
