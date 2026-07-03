import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { profile } from "@/content/profile";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll-provider";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { CursorGlow } from "@/components/layout/cursor-glow";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandPalette } from "@/components/layout/command-palette";
import { AIAssistant } from "@/components/sections/assistant/ai-assistant";
import { EasterEgg } from "@/components/ui/easter-egg";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://rr-dev-delta.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.heroSubcopy,
  keywords: [
    "Rohit Raj",
    "Full Stack Developer",
    "AI Engineer",
    "Next.js Developer",
    "TraceLens AI",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: profile.name, url: profile.social.github }],
  creator: profile.name,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${profile.name} — ${profile.role}`,
    description: profile.heroSubcopy,
    siteName: `${profile.name} — Portfolio`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.heroSubcopy,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-bg font-sans text-white antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <div className="grid-overlay" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        <LoadingScreen />
        <ScrollProgress />
        <CursorGlow />
        <SmoothScrollProvider>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScrollProvider>
        <CommandPalette />
        <AIAssistant />
        <EasterEgg />
      </body>
    </html>
  );
}
