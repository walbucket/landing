import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SkipLink } from "@/components/SkipLink";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://walbucket.com'),
  title: {
    default: "Walbucket - Decentralized Media Storage for Developers",
    template: "%s | Walbucket",
  },
  description: "Cloudinary-like API for decentralized media storage on Sui blockchain. Built-in encryption, flexible gas strategies, and seamless integration.",
  keywords: ["walbucket", "sui", "blockchain", "storage", "walrus", "seal", "encryption", "media", "cloudinary", "sdk", "decentralized-storage", "web3", "sui blockchain", "file storage"],
  authors: [{ name: "Walbucket Team" }],
  creator: "Walbucket Team",
  publisher: "Walbucket",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://walbucket.com',
    siteName: "Walbucket",
    title: "Walbucket - Decentralized Media Storage for Developers",
    description: "Cloudinary-like API for decentralized media storage on Sui blockchain. Built-in encryption, flexible gas strategies, and seamless integration.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Walbucket - Decentralized Media Storage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Walbucket - Decentralized Media Storage for Developers",
    description: "Cloudinary-like API for decentralized media storage on Sui blockchain",
    creator: "@walbucket",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://walbucket.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SkipLink />
            <div className="flex min-h-screen flex-col">
              <Navigation />
              <main className="flex-1" id="main-content" role="main" tabIndex={-1}>
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
