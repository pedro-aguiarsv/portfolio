import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { FunnelRail } from "@/components/funnel-rail"
import { SiteHeader } from "@/components/site-header"
import { DeferredToaster } from "@/components/deferred-toaster"
import { getCopy, isLocale, siteUrl, type Locale } from "@/data/site"
import "../globals.css"

export const viewport: Viewport = {
  themeColor: "#12110e",
}

export function generateStaticParams() {
  return [{ locale: "pt" }, { locale: "en" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : "pt"
  const copy = getCopy(locale)
  const path = `/${locale}`

  return {
    metadataBase: new URL(siteUrl),
    title: copy.meta.title,
    description: copy.meta.description,
    alternates: {
      canonical: path,
      languages: {
        "pt-BR": "/pt",
        en: "/en",
      },
    },
    openGraph: {
      title: copy.meta.title,
      description: copy.meta.description,
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: copy.meta.title,
      description: copy.meta.description,
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const copy = getCopy(raw)

  return (
    <html lang={raw === "en" ? "en" : "pt-BR"} className="h-full antialiased">
      <head>
        <link
          rel="preload"
          href="/fonts/familjen-grotesk-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/fonts/newsreader-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/newsreader-italic-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full">
        <a href="#conteudo" className="skip-link">
          {copy.skip}
        </a>
        <FunnelRail locale={raw} />
        <SiteHeader locale={raw} />
        {children}
        <DeferredToaster />
      </body>
    </html>
  )
}
