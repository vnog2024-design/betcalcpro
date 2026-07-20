import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { AdConfigProvider } from "@/components/ads/ad-config-provider";
import { VideowallOverlay } from "@/components/ads/videowall-overlay";
import { AdNotification } from "@/components/ads/ad-notification";
import { AdExitPopup } from "@/components/ads/ad-exit-popup";
import { AdInterstitial } from "@/components/ads/ad-interstitial";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Flags de controle — lidas em tempo de build via environment variables
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

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
    // Mantido mesmo antes da aprovação — é necessário para o Google verificar a titularidade da conta
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
        {/* Adskeeper preloader — carrega no <head> e escaneia o DOM automaticamente */}
        <script async src="https://jsc.adskeeper.com/site/1104734.js" />

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

                  // Initialize dataLayer and gtag BEFORE loading gtag.js
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}

                  // Check stored consent and set Consent Mode v2 defaults
                  var consentRaw = localStorage.getItem('cookie-consent');
                  var consentData = null;
                  try {
                    consentData = consentRaw ? JSON.parse(consentRaw) : null;
                  } catch(e) {}

                  if (consentData && consentData.accepted === true) {
                    // User previously accepted all cookies
                    gtag('consent', 'default', {
                      'ad_storage': 'granted',
                      'analytics_storage': 'granted',
                      'ad_user_data': 'granted',
                      'ad_personalization': 'granted',
                    });
                  } else {
                    // No consent or essential-only: deny all by default
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
        {/*
          Google Analytics (gtag.js) — só carrega quando o GA_ID real estiver configurado.
          Para obter o ID:
          1. Acesse https://analytics.google.com
          2. Admin → Criar Propriedade → Fluxos de Dados → Web
          3. Copie o Measurement ID (formato G-XXXXXXXXXX)
          4. Defina NEXT_PUBLIC_GA_MEASUREMENT_ID no .env

          O Consent Mode v2 segue funcionando via dataLayer mesmo sem o script do GA,
          pois os defaults são configurados no script inline acima.
        */}
        {GA_ID && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  anonymize_ip: true,
                  cookie_flags: 'SameSite=None;Secure',
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AdConfigProvider>
          {children}
          {/* MGID trigger — must run AFTER all widget divs are in DOM */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");`,
            }}
          />
          <VideowallOverlay />
          <AdNotification />
          <AdExitPopup />
          <AdInterstitial />
        </AdConfigProvider>
      </body>
    </html>
  );
}
