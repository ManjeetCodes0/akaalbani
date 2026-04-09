import type { Metadata } from "next";
import { Noto_Sans_Gurmukhi, Noto_Serif_Gurmukhi } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const bodyFont = Noto_Sans_Gurmukhi({
  subsets: ["gurmukhi", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body"
});

const headingFont = Noto_Serif_Gurmukhi({
  subsets: ["gurmukhi", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading"
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://akaalbani.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "ਆਕਾਲ ਬਾਣੀ | ਪੰਜਾਬੀ ਨਿਊਜ਼",
    template: "%s | ਆਕਾਲ ਬਾਣੀ",
  },
  description: "ਪੰਜਾਬੀ ਵਿੱਚ ਤਾਜ਼ਾ ਖਬਰਾਂ, ਵਿਸ਼ਲੇਸ਼ਣ ਅਤੇ ਫੀਚਰ ਕਹਾਣੀਆਂ",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    siteName: "ਆਕਾਲ ਬਾਣੀ",
    locale: "pa_IN",
    type: "website",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    site: "@akaalbani",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD: Organization schema — tells Google who publishes this site
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  name: "ਆਕਾਲ ਬਾਣੀ",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo.png`,
  },
  sameAs: [],
  publishingPrinciples: `${BASE_URL}/about`,
};

// JSON-LD: WebSite schema with SearchAction (enables Google Sitelinks search box)
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ਆਕਾਲ ਬਾਣੀ",
  url: BASE_URL,
  inLanguage: "pa",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pa">
      <head>
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>{children}</body>
    </html>
  );
}
