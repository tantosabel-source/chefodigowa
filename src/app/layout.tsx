import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { photos } from "@/lib/photo-stories";
import { site } from "@/lib/site";
import "./globals.css";

const display = localFont({
  src: [
    { path: "./fonts/barlow-condensed-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/barlow-condensed-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/barlow-condensed-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-barlow",
  display: "swap",
  fallback: ["Arial Narrow", "Arial", "sans-serif"],
});

const sans = localFont({
  src: "./fonts/roboto-variable.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-roboto",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const title = `${site.chef} — African chef & culinary storyteller`;
const description = "Meet Odondise ‘Odi’ Gowa Omotto: chef, food and nutrition advocate, and culinary storyteller. Explore recipes, kitchen stories and collaborations from Addis Ababa and beyond.";

export const metadata: Metadata = {
  title: { default: title, template: `%s · ${site.chef}` },
  description,
  keywords: [site.chef, "Odi Gowa", "African chef", "culinary storytelling", "Chefs' Manifesto", "Marcus Addis"],
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: photos.portrait.src, alt: photos.portrait.alt }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-cream text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-forest focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
