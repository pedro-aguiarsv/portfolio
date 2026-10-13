import dynamic from "next/dynamic"
import { notFound } from "next/navigation"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { SiteFooter } from "@/components/site-footer"
import { Tools } from "@/components/tools"
import { getCopy, isLocale, profile, siteUrl } from "@/data/site"

const Contact = dynamic(() => import("@/components/contact").then((mod) => mod.Contact))

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const copy = getCopy(raw)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    email: profile.email,
    url: `${siteUrl}/${raw}`,
    jobTitle: raw === "pt" ? "Coordenador de Retenção" : "Retention Coordinator",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nova Lima",
      addressRegion: "MG",
      addressCountry: "BR",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "PUC Minas",
    },
    sameAs: [profile.linkedin, profile.github],
    knowsAbout: copy.tools.groups.flatMap((group) => group.items),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="conteudo">
        <Hero locale={raw} />
        <About locale={raw} />
        <Projects locale={raw} />
        <Tools locale={raw} />
        <Experience locale={raw} />
        <Contact locale={raw} />
      </main>
      <SiteFooter locale={raw} />
    </>
  )
}
