import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL("https://betcalcpro.com.br"),
  title: {
    default: "BetCalc Pro — Ferramentas de Probabilidade e Gestão de Risco",
    template: "%s | BetCalc Pro",
  },
  description:
    "Calculadoras gratuitas de probabilidade, gestão de risco e análise estatística. Ferramentas matemáticas para tomada de decisão informada.",
  keywords: [
    "probabilidade",
    "cálculo",
    "gestão de risco",
    "matemática",
    "estatística",
    "progressão",
    "simulador",
    "análise",
    "ferramentas",
    "gratuito",
  ],
  authors: [{ name: "BetCalc Pro" }],
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "BetCalc Pro — Ferramentas de Probabilidade e Gestão de Risco",
    description:
      "Calculadoras e simuladores gratuitos de probabilidade e gestão de risco.",
    type: "website",
    siteName: "BetCalc Pro",
    images: [{ url: "/og-image.png", width: 1344, height: 768 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BetCalc Pro",
    description: "Ferramentas gratuitas de probabilidade e gestão de risco",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "google-adsense-account": "ca-pub-3765222786344373",
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
    name: "BetCalc Pro",
    description:
      "Ferramentas gratuitas de probabilidade e gestão de risco",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
    },
  };

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3765222786344373"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = JSON.parse(localStorage.getItem('betcalc-storage'));
                  var state = stored && stored.state ? stored.state : {};
                  var theme = state.theme || 'dark';
                  var colorTheme = state.colorTheme || 'neon-green';
                  var consent = localStorage.getItem('cookie-consent');
                  if(!consent) {
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('consent', 'default', {
                      'ad_storage': 'denied',
                      'analytics_storage': 'denied',
                      'ad_user_data': 'denied',
                      'ad_personalization': 'denied',
                    });
                  }
                  document.documentElement.classList.toggle('dark', theme === 'dark');
                  document.documentElement.setAttribute('data-color-theme', colorTheme);
                } catch(e) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-color-theme', 'neon-green');
                }
              })();
            `,
          }}
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
