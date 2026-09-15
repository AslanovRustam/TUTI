import type { Metadata, Viewport } from "next";

import SiteScripts from "@/components/SiteScripts";
import { site } from "@/content/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#faf7f1",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  description: site.description,
};

// Без JS блоки мають бути видно одразу — у CSS вони сховані.
const noJsFallback = ".reveal { opacity: 1; transform: none; }";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        {children}

        <SiteScripts />

        <noscript>
          <style dangerouslySetInnerHTML={{ __html: noJsFallback }} />
        </noscript>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
