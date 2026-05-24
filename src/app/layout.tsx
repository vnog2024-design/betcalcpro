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
  alternates: {
    canonical: "https://betcalcpro.com.br",
  },
  openGraph: {
    title: "BetCalc Pro — Ferramentas de Probabilidade e Gestão de Risco",
    description:
      "Calculadoras e simuladores gratuitos de probabilidade e gestão de risco.",
    type: "website",
    url: "https://betcalcpro.com.br",
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
    "google-site-verification": "Kf7SATy7yvEEuCFxk4av2Y9nv07qi_DDuw9TJP9LxJ8",
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": "https://betcalcpro.com.br"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Ferramentas",
        "item": "https://betcalcpro.com.br/martingale"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Artigos",
        "item": "https://betcalcpro.com.br/artigos"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "FAQ",
        "item": "https://betcalcpro.com.br/faq"
      }
    ]
  };

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3765222786344373"
          crossOrigin="anonymous"
        />
        <Script id="sw-register" strategy="afterInteractive">
          {`
            (function() {
              // Only register Service Worker in production (not localhost)
              var isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

              if (isDev && 'serviceWorker' in navigator) {
                // In development: unregister any existing SW and clear caches
                navigator.serviceWorker.getRegistrations().then(function(regs) {
                  regs.forEach(function(reg) { reg.unregister(); });
                });
                if ('caches' in window) {
                  caches.keys().then(function(names) {
                    names.forEach(function(name) { caches.delete(name); });
                  });
                }
                console.log('[BetCalc] Dev mode: Service Worker disabled, caches cleared');
                return;
              }

              // In production: register SW with update checking
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(reg) {
                    // Check for updates every 30 seconds
                    setInterval(function() { reg.update(); }, 30000);
                  }).catch(function() {});
                });

                // When a new SW takes over, force reload
                navigator.serviceWorker.addEventListener('controllerchange', function() {
                  window.location.reload();
                });
              }
            })();
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
