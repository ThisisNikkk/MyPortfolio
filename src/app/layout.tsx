import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import SmoothScrolling from "@/components/layout/SmoothScrolling";
import Navbar from "@/components/Navbar";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Premium Portfolio | Antigravity Design",
  description: "A visually stunning next-generation creative portfolio built with Next.js, Framer Motion, Tailwind CSS, and Lenis smooth scrolling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScrolling>
          <Navbar />
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}

