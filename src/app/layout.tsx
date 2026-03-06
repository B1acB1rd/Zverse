import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/layout/BottomNav";
import { MoodOverlay } from "@/components/layout/MoodOverlay";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zverse",
  description: "An identity-less social mirror.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} antialiased min-h-screen flex flex-col no-scrollbar`}
      >
        {/* Infrastructure Layers */}
        <MoodOverlay />

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-md mx-auto pb-20 pt-4 px-4">
          {children}
        </main>

        {/* Navigation */}
        <BottomNav />
      </body>
    </html>
  );
}
