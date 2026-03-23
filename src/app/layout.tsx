import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";
import "./globals.css";
import ScrollIndicator from "@/components/shared/scroll-indicator";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nuzhat Nower | Project Manager",
  description:
    "Portfolio of Nuzhat Nower - Project Manager and former developer from Dhaka, Bangladesh. Passionate about merging technical expertise with business mindset.",
  keywords: [
    "Nuzhat Nower",
    "Project Manager",
    "Software Developer",
    "Portfolio",
    "Dhaka",
    "Bangladesh",
  ],
  icons: [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_PATH === "/" ? "/" : process.env.NEXT_PUBLIC_BASE_PATH}images/frida.png`,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        jetbrainsMono.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <ScrollIndicator />
        <Footer />
      </body>
    </html>
  );
}
