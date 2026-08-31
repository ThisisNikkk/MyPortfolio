import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import SmoothScrolling from "@/components/layout/SmoothScrolling";
import Navbar from "@/components/Navbar";
import FooterComponent from "@/components/FooterComponent";
import { ThemeProvider } from "@/components/ThemeProvider";
import StructuredData from "@/components/StructuredData";
import { SITE_URL, absoluteUrl, person } from "@/lib/site-meta";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  // Lets Next resolve every relative metadata URL against the live origin.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nikhil Siwan — Software Developer",
    template: "%s | Nikhil Siwan",
  },
  description:
    "Portfolio of Nikhil Siwan — Software Developer specialising in AI agents, high-performance mobile apps, and enterprise SaaS design systems. Available for freelance and full-time opportunities.",
  keywords: [
    "Nikhil Siwan",
    "Product Designer",
    "Frontend Engineer",
    "UI/UX Designer",
    "React Developer",
    "Next.js Developer",
    "Mobile App Designer",
    "AI Agent Developer",
    "SaaS Design",
    "Design Systems",
    "Portfolio",
    "Freelance Designer India",
  ],
  authors: [{ name: person.name, url: SITE_URL }],
  creator: "Nikhil Siwan",
  publisher: "Nikhil Siwan",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Nikhil Siwan — Portfolio",
    title: "Nikhil Siwan — Product Designer & Frontend Engineer",
    description:
      "Crafting high-performance digital experiences — AI agents, mobile apps, and enterprise SaaS platforms. Explore my work and let's build something powerful together.",
    images: [
      {
        url: absoluteUrl("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Nikhil Siwan — Product Designer & Frontend Engineer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nikhil Siwan — Product Designer & Frontend Engineer",
    description:
      "Crafting high-performance digital experiences — AI agents, mobile apps, and enterprise SaaS platforms.",
    creator: "@ThisisNikkk",
    images: [absoluteUrl("/og-image.png")],
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  other: {
    "theme-color": "#c6f023",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // No h-full: Lenis needs <html> to grow with its content, and a
      // percentage min-height on <body> would then resolve against auto.
      className={`${urbanist.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        <StructuredData />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <SmoothScrolling>
            <Navbar />
            {children}
            <FooterComponent />
          </SmoothScrolling>
        </ThemeProvider>
      </body>
    </html>
  );
}

