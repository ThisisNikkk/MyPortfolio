import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import SmoothScrolling from "@/components/layout/SmoothScrolling";
import Navbar from "@/components/Navbar";
import FooterComponent from "@/components/FooterComponent";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
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
  authors: [{ name: "Nikhil Siwan", url: "https://nikhilsiwan.dev" }],
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
    canonical: "https://nikhilsiwan.dev",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nikhilsiwan.dev",
    siteName: "Nikhil Siwan — Portfolio",
    title: "Nikhil Siwan — Product Designer & Frontend Engineer",
    description:
      "Crafting high-performance digital experiences — AI agents, mobile apps, and enterprise SaaS platforms. Explore my work and let's build something powerful together.",
    images: [
      {
        url: "https://nikhilsiwan.dev/og-image.png",
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
    images: ["https://nikhilsiwan.dev/og-image.png"],
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
      className={`${urbanist.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
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

