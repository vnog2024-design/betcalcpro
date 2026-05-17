import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#00ff88",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://betcalcpro.com"),
  title: "BetCalc Pro — Ferramentas Inteligentes para Apostadores",
  description: "Calculadoras avançadas, simuladores e estratégias para apostadores de cassino online. Martingale, Fibonacci, Soros, Crash e muito mais.",
  keywords: ["apostas", "martingale", "calculadora", "crash", "double", "fibonacci", "soros", "gestão de banca", "cassino online", "masaniello", "progressão"],
  authors: [{ name: "BetCalc Pro" }],
  icons: { icon: "/logo.svg" },
  manifest: "/manifest.json",
  openGraph: {
    title: "BetCalc Pro — Ferramentas Inteligentes para Apostadores",
    description: "Calculadoras avançadas, simuladores e estratégias para apostadores.",
    type: "website",
    siteName: "BetCalc Pro",
    images: [{ url: "/og-image.png", width: 1344, height: 768 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BetCalc Pro",
    description: "Ferramentas inteligentes para apostadores",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "BetCalc Pro",
    "description": "Ferramentas inteligentes para apostadores de cassino online",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL",
    },
  };

  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
